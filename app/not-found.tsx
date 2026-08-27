import { ButtonLink } from "@/components/ui/Button";
import { PageFrame } from "@/components/site/PageFrame";

export default function NotFound() {
  return (
    <PageFrame>
      <div className="shell section-pad flex min-h-[60vh] flex-col justify-center">
        <p className="t-label text-accent">404</p>
        <h1 className="t-display mt-6">
          여기엔 아무것도
          <br />
          없습니다
        </h1>
        <p className="t-body-lg mt-6 max-w-[38ch] text-ink-muted">
          주소가 바뀌었거나, 아직 발행되지 않은 글일 수 있습니다.
        </p>
        <div className="mt-12 flex flex-wrap gap-3">
          <ButtonLink href="/">Back home</ButtonLink>
          <ButtonLink href="/articles" variant="secondary">
            Browse the archive →
          </ButtonLink>
        </div>
      </div>
    </PageFrame>
  );
}
