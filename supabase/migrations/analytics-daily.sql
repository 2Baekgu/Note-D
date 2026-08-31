-- ─────────────────────────────────────────────────────────────
--  A day's reading, kept after Vercel stops keeping it.
--  Run once in the Supabase SQL editor. Safe to re-run.
-- ─────────────────────────────────────────────────────────────
--
--  Vercel does the counting — no cookies, bots excluded — but a Hobby plan
--  only guarantees a month of history. One row per day, written by a cron
--  job that asks Vercel for figures it still has, is enough to keep a running
--  total for as long as the study lasts: 365 rows a year.
--
--  Nothing writes here from a browser. The job holds the service key, which
--  passes row-level security, so no insert policy is needed at all.

create table if not exists public.analytics_daily (
  day        date primary key,
  views      integer not null default 0 check (views >= 0),
  visitors   integer not null default 0 check (visitors >= 0),
  updated_at timestamptz not null default now()
);

alter table public.analytics_daily enable row level security;

-- Readable by an admin, and by nobody else. Written only by the job.
drop policy if exists "admins read daily analytics" on public.analytics_daily;
create policy "admins read daily analytics" on public.analytics_daily
  for select using (public.is_admin());

grant select on public.analytics_daily to authenticated;
