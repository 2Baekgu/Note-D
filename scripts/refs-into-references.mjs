/**
 * Moves a body's trailing reference section into the article's References
 * field, where the page already has a place for it.
 *
 *   node --experimental-strip-types --import ./scripts/register-ts.mjs \
 *        --env-file-if-exists=.env.local scripts/refs-into-references.mjs [--apply]
 *
 * Without --apply it only prints the plan. With it, every article's original
 * content is written to a backup file first.
 */
import { createClient } from "@supabase/supabase-js";
import { writeFileSync } from "node:fs";
import { toBlocks, blocksToDoc } from "../lib/content/doc.ts";
import { fetchPreview, safeUrl } from "../lib/link-preview.ts";

const APPLY = process.argv.includes("--apply");
const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });

const LABEL = /^\s*(references?|참고\s*(자료|문헌)?|출처|관련\s*자료)\s*[:：)]?\s*$/i;
/** "출처) https://…" and friends — a label with its link on the same line. */
const LABELLED = /^\s*(참고|출처|reference|관련\s*자료)\s*[:：)]/i;
/** A line that is nothing but a domain, which is what a pasted link card
 *  leaves behind under its title and description. */
const BARE_HOST = /^\s*(https?:\/\/)?(www\.)?[\w-]+(\.[\w-]+){1,3}\s*$/i;
const hasUrl = (t) => /https?:\/\//.test(t);

const clean = (t) => (t ?? "").replace(/\*\*/g, "").replace(/\s+/g, " ").trim();
const host = (u) => { try { return new URL(u).hostname.replace(/^www\./, ""); } catch { return ""; } };
const tidyUrl = (u) => {
  u = u.replace(/[)\],.]+$/, "");
  try {
    const x = new URL(u);
    ["utm_source", "utm_medium", "utm_campaign", "utm_content"].forEach((p) => x.searchParams.delete(p));
    return x.toString();
  } catch { return u; }
};
const isCitation = (t) => /\(\d{4}\)|et al\.|doi/i.test(t) && t.length < 160;
const trimSiteSuffix = (t) => t.replace(/\s+[-|·—]\s+[^-|·—]{1,25}$/, "");

const textOf = (b) => clean(b.type === "list" ? b.items.join(" ") : (b.text ?? ""));

/** Where the article stops and its sources begin.
 *
 *  Walks back from the end while each block still reads as a source: a link,
 *  a bare domain, or the title and blurb a pasted link card leaves above one.
 *  A heading, a picture or a paragraph of actual prose ends the run — which
 *  is what keeps a mid-article link, or a section that happens to end on a
 *  video, out of it. */
function sourcesStart(blocks) {
  let i = blocks.length;
  let sawHost = false;
  let sawUrl = false;

  // A pasted card is [link, title, blurb, domain], but the last one in a run
  // often loses its domain line — leaving the run ending on prose. Walking
  // back from prose stops at once, so look ahead a little first.
  const tailIsProse = (() => {
    const last = blocks[blocks.length - 1];
    if (!last || last.type !== "paragraph") return false;
    const t = textOf(last);
    return !hasUrl(t) && !BARE_HOST.test(t);
  })();
  if (tailIsProse) {
    for (let k = blocks.length - 2; k >= Math.max(0, blocks.length - 5); k--) {
      const t = textOf(blocks[k]);
      if (hasUrl(t) || BARE_HOST.test(t)) { sawHost = true; break; }
      if (blocks[k].type !== "paragraph" || t.length > 220) break;
    }
    if (!sawHost) return -1;
  }

  while (i > 0) {
    const b = blocks[i - 1];
    const t = textOf(b);

    if (b.type === "heading") {
      if (LABEL.test(t)) return i - 1;      // "Reference" — take the heading too
      break;
    }
    if (b.type === "paragraph" && LABEL.test(t)) return i - 1;
    if (b.type === "divider") { i--; continue; }
    if (b.type === "embed") { i--; continue; }

    if (hasUrl(t) || LABELLED.test(t)) { sawUrl = true; sawHost = false; i--; continue; }
    if (BARE_HOST.test(t)) { sawHost = true; i--; continue; }
    // A card's title or blurb, which sits between its link and its domain.
    if (b.type === "paragraph" && sawHost && t.length < 220) { i--; continue; }
    break;
  }
  return sawUrl ? i : -1;
}

const { data } = await sb.from("articles")
  .select("id,slug,title,content,references_json")
  .eq("status", "published").order("published_at");

const plan = [];
for (const a of data) {
  const blocks = toBlocks(a.content);
  const cut = sourcesStart(blocks);
  // Never eat the article: a run this long is a false read.
  if (cut < 0 || cut < 3 || blocks.length - cut > blocks.length * 0.45) continue;

  const found = [];
  for (const b of blocks.slice(cut)) {
    for (const raw of b.type === "list" ? b.items : [b.text ?? ""]) {
      if (!raw) continue;
      const links = [...raw.matchAll(/\[([^\]]*)\]\((https?:[^)\s]+)\)/g)];
      const outside = clean(raw.replace(/\[([^\]]*)\]\((https?:[^)\s]+)\)/g, " ").replace(LABELLED, ""));
      const cite = isCitation(outside) ? outside : null;
      if (links.length) links.forEach((m, i) => found.push({ url: tidyUrl(m[2]), cite: i === 0 ? cite : null }));
      else [...raw.matchAll(/https?:\/\/\S+/g)].forEach((m) => found.push({ url: tidyUrl(m[0]), cite }));
    }
  }
  const seen = new Set();
  const urls = found.filter((f) => !seen.has(f.url) && seen.add(f.url));
  if (urls.length) plan.push({ article: a, blocks, cut, urls });
}

for (const p of plan) {
  console.log(`\n━━ ${p.article.title.slice(0, 46)}`);
  p.refs = [];
  for (const u of p.urls) {
    const target = safeUrl(u.url);
    let title = "";
    if (target) { try { title = (await fetchPreview(target)).title; } catch { /* hostname will do */ } }
    title = trimSiteSuffix(clean(title)).replace(/^["“']|["”']$/g, "");
    const bare = title.replace(/^www\./, "");
    const usable = bare && !/^https?:/i.test(bare) && bare !== host(u.url);
    const lab = u.cite ?? (usable ? title : host(u.url));
    p.refs.push({ label: lab.length > 95 ? lab.slice(0, 92).trimEnd() + "…" : lab, url: u.url, source: host(u.url) });
    console.log(`   • ${p.refs.at(-1).label}\n     ${u.url.slice(0, 90)}`);
  }
}

console.log(`\n대상 ${plan.length}편 / 링크 ${plan.reduce((n, p) => n + p.refs.length, 0)}개`);
if (!APPLY) { console.log("\n미리보기입니다. 반영하려면 --apply"); process.exit(0); }

writeFileSync(
  `refs-backup-${Date.now()}.json`,
  JSON.stringify(plan.map((p) => ({ id: p.article.id, slug: p.article.slug, content: p.article.content, references_json: p.article.references_json })), null, 2),
);

for (const p of plan) {
  const kept = p.blocks.slice(0, p.cut);
  // Whatever was already there stays first — "원문 보기" is the source.
  const merged = [...(p.article.references_json ?? [])];
  for (const r of p.refs) if (!merged.some((m) => m.url === r.url)) merged.push(r);
  const { error } = await sb.from("articles")
    .update({ content: JSON.stringify(blocksToDoc(kept)), references_json: merged })
    .eq("id", p.article.id);
  console.log(`${error ? "✗ " + error.message : "✓"} ${p.article.slug} — 본문 ${p.blocks.length}→${kept.length}블록, references ${(p.article.references_json ?? []).length}→${merged.length}`);
}
