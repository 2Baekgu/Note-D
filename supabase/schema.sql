-- ─────────────────────────────────────────────────────────────
--  Notes:D — schema
--  Run in the Supabase SQL editor (or `supabase db push`).
-- ─────────────────────────────────────────────────────────────

create extension if not exists "pgcrypto";

-- ── profiles ────────────────────────────────────────────────
create table if not exists public.profiles (
  id            uuid primary key references auth.users on delete cascade,
  name          text not null,
  handle        text not null unique,
  email         text not null,
  profile_image text,
  role          text not null default 'guest' check (role in ('admin','member','guest')),
  title         text default '',
  bio           text default '',
  joined_at     date not null default current_date
);

-- ── articles ────────────────────────────────────────────────
create table if not exists public.articles (
  id              uuid primary key default gen_random_uuid(),
  title           text not null,
  slug            text not null unique,
  subtitle        text default '',
  content         text not null default '',
  cover_image     text,
  author_id       uuid not null references public.profiles(id) on delete cascade,
  topics          text[] not null default '{UX}',
  published_at    date   not null default current_date,
  status          text   not null default 'draft' check (status in ('draft','published')),
  references_json jsonb  not null default '[]'::jsonb,
  featured        boolean not null default false,
  sample          boolean not null default false,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists articles_status_published_at_idx
  on public.articles (status, published_at desc);
create index if not exists articles_author_idx on public.articles (author_id);
create index if not exists articles_topics_idx on public.articles using gin (topics);

-- ── comments ────────────────────────────────────────────────
create table if not exists public.comments (
  id         uuid primary key default gen_random_uuid(),
  article_id uuid not null references public.articles(id) on delete cascade,
  author_id  uuid not null references public.profiles(id) on delete cascade,
  content    text not null check (char_length(content) between 1 and 4000),
  created_at timestamptz not null default now()
);

create index if not exists comments_article_idx
  on public.comments (article_id, created_at);

-- ── updated_at trigger ──────────────────────────────────────
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists articles_touch_updated_at on public.articles;
create trigger articles_touch_updated_at
  before update on public.articles
  for each row execute function public.touch_updated_at();

-- ── profile row for every new auth user ─────────────────────
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
declare
  base      text;
  candidate text;
  n         int := 1;
begin
  base := regexp_replace(
    lower(coalesce(
      nullif(new.raw_user_meta_data->>'handle', ''),
      split_part(new.email, '@', 1)
    )),
    '[^a-z0-9]+', '-', 'g'
  );
  base := trim(both '-' from base);
  if base = '' then base := 'member'; end if;

  -- handle is unique. Without this loop a second suyeon@… would raise here
  -- and roll the whole signup back, so the person could never register.
  candidate := base;
  while exists (select 1 from public.profiles where handle = candidate) loop
    n := n + 1;
    candidate := base || '-' || n;
  end loop;

  insert into public.profiles (id, name, handle, email, profile_image)
  values (
    new.id,
    coalesce(
      nullif(new.raw_user_meta_data->>'full_name', ''),
      nullif(new.raw_user_meta_data->>'name', ''),
      split_part(new.email, '@', 1)
    ),
    candidate,
    new.email,
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ── role helpers ────────────────────────────────────────────
--  security definer so a policy on `profiles` can read `profiles`
--  without recursing through its own RLS.

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select coalesce((select role = 'admin' from public.profiles where id = auth.uid()), false)
$$;

create or replace function public.can_publish()
returns boolean language sql stable security definer set search_path = public as $$
  select coalesce(
    (select role in ('admin','member') from public.profiles where id = auth.uid()),
    false
  )
$$;

-- RLS grants row access, not column access, so "you may edit your profile"
-- would otherwise let anyone hand themselves the admin role. Pin the column.
create or replace function public.guard_profile_role()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  -- auth.uid() is null only when there is no end user behind the request,
  -- i.e. the service role — which already bypasses RLS and is how seeding
  -- and other server-side work assigns roles. An anonymous caller never
  -- reaches this trigger, because no RLS policy lets it update a profile.
  if new.role is distinct from old.role
     and auth.uid() is not null
     and not public.is_admin() then
    new.role := old.role;
  end if;
  return new;
end $$;

drop trigger if exists profiles_guard_role on public.profiles;
create trigger profiles_guard_role
  before update on public.profiles
  for each row execute function public.guard_profile_role();

-- ── Row Level Security ──────────────────────────────────────
alter table public.profiles   enable row level security;
alter table public.articles   enable row level security;
alter table public.comments   enable row level security;

-- Anyone may read profiles, categories and published articles.
drop policy if exists "profiles are public" on public.profiles;
create policy "profiles are public" on public.profiles
  for select using (true);

drop policy if exists "own profile is editable" on public.profiles;
create policy "own profile is editable" on public.profiles
  for update using (auth.uid() = id);

drop policy if exists "admins manage profiles" on public.profiles;
create policy "admins manage profiles" on public.profiles
  for update using (public.is_admin()) with check (public.is_admin());

drop policy if exists "published articles are public" on public.articles;
create policy "published articles are public" on public.articles
  for select using (
    status = 'published' or auth.uid() = author_id or public.is_admin()
  );

-- Signing up is open, but publishing is not: a fresh account is `guest`
-- until an admin promotes it, and these three policies are what enforce it.
drop policy if exists "members write their own articles" on public.articles;
create policy "members write their own articles" on public.articles
  for insert with check (auth.uid() = author_id and public.can_publish());

drop policy if exists "authors update their own articles" on public.articles;
create policy "authors update their own articles" on public.articles
  for update
  using ((auth.uid() = author_id and public.can_publish()) or public.is_admin())
  with check ((auth.uid() = author_id and public.can_publish()) or public.is_admin());

drop policy if exists "authors delete their own articles" on public.articles;
create policy "authors delete their own articles" on public.articles
  for delete using (
    (auth.uid() = author_id and public.can_publish()) or public.is_admin()
  );

-- Comments: everyone reads, signed-in members write, authors edit their own.
drop policy if exists "comments are public" on public.comments;
create policy "comments are public" on public.comments
  for select using (true);

drop policy if exists "members comment" on public.comments;
create policy "members comment" on public.comments
  for insert with check (auth.uid() = author_id);

-- Guests may comment; that is the point of letting anyone sign up.
drop policy if exists "authors manage their comments" on public.comments;
create policy "authors manage their comments" on public.comments
  for delete using (auth.uid() = author_id or public.is_admin());

-- ── Storage bucket for cover images ─────────────────────────
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "media is public" on storage.objects;
create policy "media is public" on storage.objects
  for select using (bucket_id = 'media');

drop policy if exists "members upload media" on storage.objects;
create policy "members upload media" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'media' and public.can_publish());

-- ── first admin ─────────────────────────────────────────────
--  Sign in with Google once, then run this with that address so the
--  Studio's admin screens unlock. There is no other way in by design.
--
--    update public.profiles set role = 'admin' where email = 'you@gmail.com';
