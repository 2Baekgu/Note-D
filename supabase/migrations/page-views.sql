-- ─────────────────────────────────────────────────────────────
--  What gets read, and by how many people.
--  Run once in the Supabase SQL editor. Safe to re-run.
-- ─────────────────────────────────────────────────────────────
--
--  One row per page opened. Deliberately thin: a path, which article it was
--  if it was one, a visitor tag the browser makes up for itself, and the
--  host a reader arrived from. No addresses, no fingerprints — the question
--  this answers is "was this read", not "who read it".

create table if not exists public.page_views (
  id            uuid primary key default gen_random_uuid(),
  path          text not null check (char_length(path) between 1 and 300),
  article_id    uuid references public.articles(id) on delete set null,
  -- A random tag kept in the reader's own browser. It tells two visits apart
  -- without telling us anything about either of them.
  visitor       text not null check (char_length(visitor) between 6 and 64),
  is_member     boolean not null default false,
  -- Host only. A full referrer URL can carry a search query someone typed.
  referrer_host text check (referrer_host is null or char_length(referrer_host) <= 120),
  viewed_at     timestamptz not null default now()
);

create index if not exists page_views_time_idx on public.page_views (viewed_at desc);
create index if not exists page_views_article_idx
  on public.page_views (article_id, viewed_at desc);

alter table public.page_views enable row level security;

-- Anyone may say they read something; only an admin may look at the record.
drop policy if exists "record a visit" on public.page_views;
create policy "record a visit" on public.page_views
  for insert with check (true);

drop policy if exists "admins read visits" on public.page_views;
create policy "admins read visits" on public.page_views
  for select using (public.is_admin());

grant insert on public.page_views to anon, authenticated;
grant select on public.page_views to authenticated;
