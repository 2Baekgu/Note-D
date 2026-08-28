# Note:D — UX/UI Study Journal

디자인을 읽고 쓰는 UX/UI 스터디의 온라인 매거진 겸 아카이브.
멤버가 각자 공부한 것을 아티클로 발행하고, 편한 시간에 읽고, 댓글로 이야기하는 공간입니다.

아티클 32편은 스터디를 진행하며 각자 쓴 원문을 옮겨온 것입니다.
Tistory([Doodle Day](https://dooday.tistory.com)) 21편은 **이수연**, Notion 11편은 **시에나**가 썼고,
각 글 하단 References에 원문 링크가 남아 있습니다.

## 실행

```bash
npm install
npm run dev
```

`http://localhost:3000` — 환경변수 없이도 샘플 데이터로 전체 화면이 동작합니다.
로그인 화면의 **Demo mode**에서 멤버를 고르면 글쓰기와 댓글까지 바로 확인할 수 있습니다.

## 구조

```
app/
  page.tsx                 홈 — Latest / Topics / Members
  articles/                아카이브(검색·토픽·정렬) + 상세
  members/                 멤버 목록 + 개인 페이지
  about/                   스터디 소개
  login/                   Google 로그인 · 데모 로그인
  studio/                  멤버용 CMS (목록 / 작성 / 편집)
  studio/admin/            운영자 전용 — 역할 승인 · 전체 아티클
  auth/callback/           Supabase OAuth 콜백
components/
  ui/                      디자인 시스템 프리미티브 (Button · Chip · Avatar · Divider · SectionHead)
  site/                    Header · Footer
  article/                 카드 · 매스너리 · 커버아트 · 본문 브라우저 · 댓글
  content/                 에디토리얼 마크다운 렌더러
  home/ studio/ auth/
lib/
  types.ts                 도메인 타입 (Supabase 스키마와 1:1)
  repo.ts                  데이터 접근 — Supabase 우선, 없으면 샘플 데이터
  content/parse.ts         본문 파서 + 읽기 시간
  studio.ts                초안 저장 · 커버 업로드
  data/                    멤버 · 카테고리 · 댓글
    articles/posts/        아티클 32편 (한 편당 한 파일)
supabase/schema.sql        테이블 · RLS · 스토리지 버킷
scripts/seed.mjs           샘플 콘텐츠를 Supabase로 밀어넣기
```

### 데이터 흐름

모든 페이지는 `lib/repo.ts`만 통해 데이터를 읽습니다.
`NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`가 있으면 DB를,
없으면 `lib/data/`의 샘플을 사용합니다. 화면 코드는 어느 쪽인지 알 필요가 없습니다.

## 권한

역할은 `profiles.role` 하나로 정해지고, 화면이 아니라 **RLS 정책이** 강제합니다.

| 역할 | 할 수 있는 일 |
| --- | --- |
| (비로그인) | 발행된 아티클 읽기 · 멤버 보기 · 검색 |
| `guest` | + 댓글 |
| `member` | + Studio에서 자기 글 작성 · 발행 · 커버 업로드 |
| `admin` | + 모든 글 편집/삭제, `/studio/admin`에서 역할 변경 |

가입은 누구에게나 열려 있습니다. 구글로 처음 로그인하면 트리거가 `profiles` 행을
`guest`로 만들고, 운영자가 `/studio/admin`에서 `member`로 올려야 글을 쓸 수 있습니다.
자기 역할은 스스로 못 바꿉니다 — `guard_profile_role` 트리거가 그 컬럼을 되돌립니다.

## 배포

로컬은 환경변수 없이도 샘플 데이터로 돌지만, 로그인과 발행이 실제로 되려면
Supabase와 Vercel이 필요합니다. 계정 생성과 키 발급은 직접 해주세요.

### 1. Supabase 프로젝트

1. [supabase.com](https://supabase.com)에서 프로젝트를 만듭니다.
2. SQL Editor에 `supabase/schema.sql` 전체를 붙여넣고 실행합니다.
   테이블 · RLS 정책 · 프로필 자동 생성 트리거 · `media` 버킷이 함께 만들어집니다.
3. Settings → API에서 **Project URL**과 **anon key**를 복사해 둡니다.

### 2. 구글 로그인

1. Google Cloud Console → APIs & Services → Credentials →
   **Create OAuth client ID** → Web application.
2. Authorized redirect URI에 Supabase가 알려주는 주소를 넣습니다:
   `https://<project-ref>.supabase.co/auth/v1/callback`
3. 발급된 Client ID / Secret을 Supabase → Authentication → Providers → Google에 붙여넣고 켭니다.
4. Authentication → URL Configuration:
   - Site URL: `https://<배포 도메인>`
   - Redirect URLs: `https://<배포 도메인>/auth/callback`, `http://localhost:3000/auth/callback`

### 3. 아티클 32편 옮기기

시드는 두 멤버를 **실제 구글 주소로** 만들어야 합니다. 같은 이메일이면 나중에
구글로 로그인할 때 그 계정에 연결되고, 32편의 저자가 그대로 이어집니다.

```bash
NEXT_PUBLIC_SUPABASE_URL=… \
SUPABASE_SERVICE_ROLE_KEY=… \
SEED_SUYEON_EMAIL=…@gmail.com \
SEED_SIENNA_EMAIL=…@gmail.com \
npm run seed
```

`SUPABASE_SERVICE_ROLE_KEY`는 RLS를 우회하는 키입니다. 로컬에서만 쓰고
Vercel 환경변수에는 넣지 마세요.

### 4. Vercel

1. 저장소를 GitHub에 올리고 Vercel에서 import 합니다.
2. 환경변수 세 개를 등록합니다 — `NEXT_PUBLIC_SUPABASE_URL`,
   `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_SITE_URL`(배포 도메인).
3. 배포 후 도메인을 바꿨다면 2-4의 URL도 함께 고쳐주세요.

### 5. 로그인, 그리고 운영자 되기

가입 절차는 따로 없습니다. 배포된 사이트에서 **Continue with Google**을 누르는 것이
곧 가입이고, 그때 `profiles` 행이 만들어집니다.

- **3단계에서 `SEED_SUYEON_EMAIL`에 본인 지메일을 넣었다면** — 그 주소로 이미
  `role='admin'`인 계정이 있고, 같은 주소의 구글 로그인은 그 계정에 연결됩니다.
  처음 로그인하는 순간 바로 운영자이고, 32편의 저자도 그대로 이어집니다.
- **넣지 않았다면** — 구글 로그인이 별개의 `guest` 계정을 만듭니다. Supabase
  SQL Editor에서 한 줄로 올려주세요:

  ```sql
  update public.profiles set role = 'admin' where email = 'you@gmail.com';
  ```

로그인 후 확인:

```sql
select email, role, handle from public.profiles order by joined_at;
```

`role`이 `admin`이면 헤더 Studio → **Admin** 링크가 보입니다.
이후 새로 가입하는 사람은 전부 `guest`로 들어오고, `/studio/admin`에서 멤버로 올립니다.

## 디자인 시스템

토큰은 [app/globals.css](app/globals.css) 한 곳에만 정의합니다. 컴포넌트는 색·크기·라운드·간격을
하드코딩하지 않고 이 토큰만 씁니다. 표현할 수 없는 값이 생기면 컴포넌트가 아니라 토큰을 늘립니다.

| 레이어 | 규칙 |
| --- | --- |
| 타이포 | **Pretendard 단독.** 위계는 굵기(400/600/700)와 크기로만 |
| 타입 스케일 | `t-display` `t-h1` `t-h2` `t-h3` `t-body-lg` `t-body` `t-caption` `t-label` — 8단계가 전부 |
| 컬러 | 13개, 유채색 액센트는 버밀리언 1개 |
| 스페이싱 | 4px 베이스, 허용 스텝 `1 2 3 4 6 8 12 16 24`. 섹션 간격은 `--space-section` |
| 라운드 | `sm 8px` / `md 12px` / `pill 9999px` — 3개 |
| Elevation | 기본은 그림자 없음(헤어라인 보더). `--shadow-raise`(hover) · `--shadow-float`(떠 있는 표면) |
| 보더 | `1px` + `--line` 하나. 강조용 굵은 선 없음 |
| 컨트롤 높이 | md 44px · sm 36px (버튼 · 입력 · 세그먼티드 공통) |
| 모션 | `--duration-fast/base/slow` + `--ease` 하나 |

공통 컴포넌트: `Button`(primary/secondary/ghost + inverse 2종) · `Chip`(pill 한 종류, tone 5종) ·
`Avatar`(5사이즈) · `Divider` · `SectionHead` · `ArticleCard` · `.field` · `.surface`.

**ArticleCard는 한 종류입니다** — 미디어 + 스크림 + 오버레이 텍스트. 리듬은 카드 비율(`ratio`)과
제목 크기(`size` → h3/h2/h1)로만 만들고, 카드 구조 자체는 어디서나 동일합니다. 흰 텍스트 가독성은
아트워크에 맡기지 않고 `--scrim-card` 토큰 하나로 모든 카드에 똑같이 보장합니다.

예외는 하나입니다. `Avatar`의 이니셜 글자 크기는 원 지름에 비례(`px * 0.42`)합니다 — 본문 텍스트가
아니라 도형 안의 광학적 크기라서 타입 스케일을 따르지 않습니다.

## 본문 문법

Studio 에디터와 샘플 아티클이 같은 파서(`lib/content/parse.ts`)를 씁니다.
본문 이미지는 문법을 몰라도 됩니다 — 에디터에 끌어다 놓거나 붙여넣으면
Storage에 올라가고 `![alt](url)`이 커서 자리에 들어갑니다.

| 문법 | 결과 |
| --- | --- |
| `## 제목` / `### 소제목` | heading |
| `> 인용문` + `> — 출처` | 인용 블록 |
| `- 항목` / `1. 항목` | 리스트 |
| `!! 문장` | 하이라이트 박스 |
| `![설명](url "캡션")` | 이미지 |
| `@embed <youtube-url>` | 영상 임베드 |
| `**굵게**` `*기울임*` `==형광==` `[링크](url)` | 인라인 |
| `---` | 구분선 |

이미지 `url`에 `art:0`~`art:9`를 쓰면 실제 사진 대신 생성 아트웍이 들어갑니다.

## 이미지

원문에서 가져온 이미지는 `public/images/<slug>/` 아래에 있고, 각 글의 첫 이미지가 커버가 됩니다.
`coverImage`가 비어 있으면(원문에 이미지가 없던 2편) 슬러그와 토픽을 시드로 한 SVG 커버 아트가
대신 그려집니다 — `components/article/CoverArt.tsx`.

## 스택

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Supabase (Auth / Postgres / Storage)
Pretendard Variable
