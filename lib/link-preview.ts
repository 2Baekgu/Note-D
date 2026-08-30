import "server-only";
import { site } from "@/lib/site";

/** Open Graph for a pasted link, so the editor can offer a bookmark card.
 *
 *  Fetching a URL the caller chose is the shape of an SSRF: left open it lets
 *  anyone use the deploy as a proxy into whatever it can reach. `safeUrl` is
 *  the guard — public http(s) hosts only — and the read is small and brief. */

const TIMEOUT_MS = 6_000;
/** Metadata lives in <head>; no need to read a whole page to find it. */
const MAX_BYTES = 512 * 1024;

/** Hostnames that resolve inside the network the function runs in. */
const PRIVATE_HOST =
  /^(localhost|.*\.local|.*\.internal|\[?::1\]?|0\.0\.0\.0|10\..*|127\..*|169\.254\..*|192\.168\..*|172\.(1[6-9]|2\d|3[01])\..*)$/i;

export interface LinkPreview {
  url: string;
  title: string;
  description: string;
  image: string;
  site: string;
}

export function safeUrl(raw: string): URL | null {
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return null;
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") return null;
  if (PRIVATE_HOST.test(url.hostname)) return null;
  return url;
}

const NAMED: Record<string, string> = {
  quot: '"',
  apos: "'",
  lt: "<",
  gt: ">",
  nbsp: " ",
  amp: "&",
};

/** Metadata arrives HTML-escaped, in whichever of the three forms the page
 *  used — named, decimal, or hex. `&amp;` is unescaped last so a double
 *  escape like `&amp;#x27;` resolves the way the author meant it. */
function decode(value: string): string {
  return value
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replace(/&(quot|apos|lt|gt|nbsp);/g, (_, name) => NAMED[name])
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

/** Reads a meta tag by property or name, in whichever attribute order the
 *  page happens to use. */
export function meta(html: string, key: string): string {
  const patterns = [
    new RegExp(`<meta[^>]+(?:property|name)=["']${key}["'][^>]*content=["']([^"']*)["']`, "i"),
    new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]*(?:property|name)=["']${key}["']`, "i"),
  ];
  for (const re of patterns) {
    const m = html.match(re);
    if (m?.[1]) return decode(m[1]);
  }
  return "";
}

export function previewFrom(url: URL, html: string): LinkPreview {
  const image = meta(html, "og:image") || meta(html, "twitter:image");
  let resolved = "";
  if (image) {
    try {
      resolved = new URL(image, url).toString();
    } catch {
      /* a malformed og:image is simply no image */
    }
  }

  return {
    url: url.toString(),
    title:
      meta(html, "og:title") ||
      meta(html, "twitter:title") ||
      decode(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "") ||
      url.hostname,
    description:
      meta(html, "og:description") ||
      meta(html, "twitter:description") ||
      meta(html, "description"),
    image: resolved,
    site: meta(html, "og:site_name") || url.hostname.replace(/^www\./, ""),
  };
}

/** Never throws: a link that cannot be read still becomes a card, just a
 *  plainer one. */
export async function fetchPreview(target: URL): Promise<LinkPreview> {
  try {
    const res = await fetch(target, {
      signal: AbortSignal.timeout(TIMEOUT_MS),
      redirect: "follow",
      headers: {
        // Sites serve their richest metadata to crawlers. The address is
        // where an annoyed webmaster would write to; it follows the site
        // rather than being spelled out twice.
        "user-agent": `Mozilla/5.0 (compatible; NotedBot/1.0; +${site.url})`,
        accept: "text/html,application/xhtml+xml",
      },
    });

    if (!res.ok || !(res.headers.get("content-type") ?? "").includes("html")) {
      return previewFrom(target, "");
    }

    // Read only the opening of the document, then stop.
    const reader = res.body?.getReader();
    let html = "";
    if (reader) {
      const decoder = new TextDecoder();
      let size = 0;
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        size += value.byteLength;
        html += decoder.decode(value, { stream: true });
        if (size >= MAX_BYTES || /<\/head>/i.test(html)) break;
      }
      await reader.cancel().catch(() => {});
    }

    return previewFrom(target, html);
  } catch {
    return previewFrom(target, "");
  }
}
