import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { site } from "@/lib/site";

/* Pretendard is the only typeface in the system — Korean, Latin and numerals.
   Swap this <link> for `next/font/local` if the woff2 files get vendored;
   nothing else needs to change because every component reads --font-sans. */
const PRETENDARD =
  "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.css";

/* Headline serif. Noto Serif KR carries Hangul so Korean titles never fall
   back to a system myeongjo; Fraunces carries Latin on the same line. */
const HEADLINE_SERIF =
  "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,600;9..144,700" +
  "&family=Noto+Serif+KR:wght@300;400;600;700" +
  "&display=swap";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — UX/UI Study Journal`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: site.fullName,
    description: site.description,
    type: "website",
    locale: "ko_KR",
  },
};

export const viewport: Viewport = {
  themeColor: "#f2f0eb",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href={PRETENDARD} />
        <link rel="stylesheet" href={HEADLINE_SERIF} />
      </head>
      <body className="min-h-dvh antialiased">
        <a
          href="#main"
          className="t-label sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-pill focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          본문으로 건너뛰기
        </a>
        <AuthProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
