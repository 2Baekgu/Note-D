import Link from "next/link";
import { site } from "@/lib/site";
import { topics } from "@/lib/data/topics";
import { GridRule } from "./GridRule";
import { Wordmark } from "./Wordmark";

/** The page closes the way it opens: hairline cells inside the frame, with a
 *  square at every crossing. No inverted block. */
export function Footer() {
  const index = [
    { label: "Home", href: "/" },
    ...site.nav,
    { label: "Studio", href: "/studio" },
  ];

  return (
    <footer className="blueprint">
      {/* Vertical frame lines, closed off at the bottom. */}
      <div className="blueprint-frame" aria-hidden="true">
        <span className="blueprint-corner blueprint-corner-bl" />
        <span className="blueprint-corner blueprint-corner-br" />
      </div>

      <GridRule />

      <div className="frame-row">
        <div className="grid md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1.2fr)]">
          <div className="frame-cell py-12">
            <Wordmark className="h-[46px]" />
            <p className="t-body mt-4 max-w-[30ch] text-ink-muted">{site.tagline}</p>
            <p className="t-label mt-8 text-ink-faint">
              Since {site.since} · {site.kind}
            </p>
            <p className="t-label mt-3 text-ink-faint">
              문의 ·{" "}
              {/* t-label uppercases; an address should read as it is written. */}
              <a href={`mailto:${site.contact}`} className="link-underline normal-case">
                {site.contact}
              </a>
            </p>
          </div>

          <nav className="frame-cell py-12" aria-label="사이트 메뉴">
            <p className="t-label text-ink-faint">Index</p>
            <ul className="mt-6 space-y-3">
              {index.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="t-body link-underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="frame-cell py-12" aria-label="주제">
            <p className="t-label text-ink-faint">Topics</p>
            <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-3">
              {topics.map((t) => (
                <li key={t.slug}>
                  <Link href={`/articles?topic=${t.slug}`} className="t-body link-underline">
                    {t.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <GridRule />

      <div className="frame-row">
        <div className="grid md:grid-cols-2">
          <p className="frame-cell t-caption py-6 text-ink-faint">
            © {new Date().getFullYear()} {site.name}. 디자인을 읽고 쓰는 UX/UI 스터디.
          </p>
          <p className="frame-cell t-caption py-6 text-ink-faint md:text-right">
            글의 저작권은 각 작성자에게 있습니다.
          </p>
        </div>
      </div>

      <GridRule />
    </footer>
  );
}
