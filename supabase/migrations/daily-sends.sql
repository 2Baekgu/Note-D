-- ─────────────────────────────────────────────────────────────
--  daily_sends — the record of which article went to the open chat, and when.
--  Run once in the Supabase SQL editor. Safe to re-run.
-- ─────────────────────────────────────────────────────────────

create extension if not exists "pgcrypto";

create table if not exists public.daily_sends (
  id         uuid primary key default gen_random_uuid(),
  article_id uuid not null references public.articles(id) on delete cascade,
  sent_at    timestamptz not null default now(),
  -- The Korean calendar day. Written by the API, because `at time zone` is
  -- STABLE rather than IMMUTABLE and so cannot be indexed here.
  sent_on    date not null unique,
  -- What actually went out, so a retry the same morning repeats it verbatim
  -- instead of paying for a second summary.
  message    text not null default ''
);

create index if not exists daily_sends_article_idx
  on public.daily_sends (article_id, sent_at desc);

alter table public.daily_sends enable row level security;

-- No policy, deliberately. RLS with no policy denies every anon and
-- authenticated request, so nobody holding the publishable key can read or
-- write this table. /api/daily-pick reaches it with the service role and is
-- itself gated by DAILY_PICK_TOKEN — that route is the only way in.
