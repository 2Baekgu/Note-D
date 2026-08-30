import { Node, mergeAttributes } from "@tiptap/core";

/** A YouTube video, played where it is written about.
 *
 *  The frame is loaded lazily and served from the no-cookie host, so a piece
 *  with three videos in it costs nothing until the reader scrolls to one.
 *  That is what makes a real player affordable here rather than a picture of
 *  one. */

/** The id out of any of the shapes YouTube hands out, and the second to start
 *  at when the link carries one. `null` when it is not a YouTube link. */
export function parseYoutube(url: string): { id: string; start: number } | null {
  let parsed: URL;
  try {
    parsed = new URL(url.trim());
  } catch {
    return null;
  }

  const host = parsed.hostname.replace(/^www\./, "");
  let id = "";

  if (host === "youtu.be") id = parsed.pathname.slice(1);
  else if (host.endsWith("youtube.com") || host.endsWith("youtube-nocookie.com")) {
    if (parsed.pathname === "/watch") id = parsed.searchParams.get("v") ?? "";
    else if (parsed.pathname.startsWith("/shorts/")) id = parsed.pathname.split("/")[2] ?? "";
    else if (parsed.pathname.startsWith("/embed/")) id = parsed.pathname.split("/")[2] ?? "";
  }

  id = id.split("/")[0];
  if (!/^[A-Za-z0-9_-]{6,}$/.test(id)) return null;

  // `t=157s`, `t=157`, or `start=157` — all mean the same thing.
  const raw = parsed.searchParams.get("t") ?? parsed.searchParams.get("start") ?? "";
  const m = raw.match(/^(\d+)h?/) && raw.match(/(\d+)/);
  const start = m ? Number(m[1]) : 0;

  return { id, start: Number.isFinite(start) ? start : 0 };
}

export const embedUrl = (id: string, start = 0) =>
  `https://www.youtube-nocookie.com/embed/${id}${start ? `?start=${start}` : ""}`;

export const watchUrl = (id: string, start = 0) =>
  `https://www.youtube.com/watch?v=${id}${start ? `&t=${start}s` : ""}`;

/** YouTube's own still, at the largest size that exists for every video. */
export const thumbUrl = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

export const Youtube = Node.create({
  name: "youtube",
  group: "block",
  atom: true,
  draggable: true,

  addAttributes() {
    // None of these are DOM attributes: the id and the start time are written
    // as `data-` below, and the title is the caption. Left to themselves they
    // would each also appear on the <figure> verbatim.
    const hidden = { renderHTML: () => ({}) };
    return {
      videoId: { default: "", ...hidden },
      start: { default: 0, ...hidden },
      title: { default: "", ...hidden },
    };
  },

  parseHTML() {
    return [
      {
        tag: "figure.tiptap-video",
        getAttrs: (el) => {
          const id = (el as HTMLElement).getAttribute("data-video-id") ?? "";
          if (!id) return false;
          return {
            videoId: id,
            start: Number((el as HTMLElement).getAttribute("data-start")) || 0,
            title: (el as HTMLElement).querySelector("figcaption")?.textContent ?? "",
          };
        },
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    const id = String(node.attrs.videoId ?? "");
    const start = Number(node.attrs.start) || 0;
    const title = String(node.attrs.title ?? "");

    const frame = [
      "div",
      { class: "tiptap-video-frame" },
      [
        "iframe",
        {
          src: embedUrl(id, start),
          title: title || "YouTube",
          loading: "lazy",
          frameborder: "0",
          allow:
            "accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
          allowfullscreen: "true",
          referrerpolicy: "strict-origin-when-cross-origin",
        },
      ],
    ];

    const attrs = mergeAttributes(HTMLAttributes, {
      class: "tiptap-video",
      "data-video-id": id,
      "data-start": String(start),
    });

    return title
      ? ["figure", attrs, frame, ["figcaption", {}, title]]
      : ["figure", attrs, frame];
  },
});
