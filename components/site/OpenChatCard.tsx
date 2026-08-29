import Image from "next/image";

export const OPEN_CHAT_URL = "https://open.kakao.com/o/gaQwl9Ki";

/** The study's open chat. A bot posts one article there every weekday
 *  morning, which is the reason to join — so the card leads with that
 *  rather than with the invitation. */
export function OpenChatCard() {
  return (
    <div className="surface grid gap-10 p-8 sm:p-10 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-14">
      <div>
        <p className="t-label text-accent">Open chat</p>
        <h2 className="t-h1 mt-4 text-balance">
          평일 아침 8시,
          <br />
          아티클 한 편이 도착합니다
        </h2>
        <p className="t-body-lg mt-6 max-w-[46ch] text-ink-muted">
          Note:D는 오픈채팅방을 운영합니다. 출근 시간에 맞춰 그날의 아티클을 한 편씩
          소개해요. 새로 올라온 글만이 아니라 지난 글까지 돌아가며 보내니, 읽을거리가
          필요하면 들어와서 알림을 받아주세요.
        </p>
      </div>

      <a
        href={OPEN_CHAT_URL}
        target="_blank"
        rel="noreferrer noopener"
        className="group mx-auto block w-full max-w-[13rem] shrink-0"
      >
        <span className="block rounded-md border border-line bg-paper p-4 transition-colors duration-[var(--duration-base)] ease-out-quint group-hover:border-ink">
          <Image
            src="/images/site/openchat-qr.svg"
            alt="Note:D 오픈채팅방 QR 코드"
            width={180}
            height={180}
            className="h-auto w-full"
            unoptimized
          />
        </span>
        <span className="t-caption mt-3 block text-center text-ink-faint">
          QR 코드를 촬영하거나 누르면 오픈채팅방이 열립니다
        </span>
      </a>
    </div>
  );
}
