-- ─────────────────────────────────────────────────────────────
--  Note:D — schema
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

-- ── bug reports ─────────────────────────────────────────────
--  Anyone signed in may file one, and a guest is exactly the person most
--  likely to walk into something broken. Only the reporter and an admin
--  can read it back.
create table if not exists public.bug_reports (
  id          uuid primary key default gen_random_uuid(),
  reporter_id uuid references public.profiles(id) on delete set null,
  content     text not null,
  status      text not null default 'open' check (status in ('open','resolved')),
  created_at  timestamptz not null default now()
);

create index if not exists bug_reports_status_created_idx
  on public.bug_reports (status, created_at desc);

-- ── daily sends ─────────────────────────────────────────────
--  One article a day goes to the study's open chat. This is the record of
--  what already went, which is what stops a repeat and what drives the
--  "least recently sent" rotation once every article has had a turn.
--
--  `sent_on` is the Korean calendar day, written by the API rather than
--  derived here: `at time zone` is STABLE, not IMMUTABLE, so a Seoul-day
--  expression cannot be indexed. Unique on it, so two calls on one morning
--  cannot both take a pick.
--
--  `message` holds the text that was sent, so a retry the same day returns
--  exactly what went out the first time instead of paying for a new summary.
create table if not exists public.daily_sends (
  id         uuid primary key default gen_random_uuid(),
  article_id uuid not null references public.articles(id) on delete cascade,
  sent_at    timestamptz not null default now(),
  sent_on    date not null unique,
  message    text not null default ''
);

create index if not exists daily_sends_article_idx
  on public.daily_sends (article_id, sent_at desc);

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
  base         text;
  candidate    text;
  display_name text;
  n            int := 1;
begin
  display_name := coalesce(
    nullif(new.raw_user_meta_data->>'full_name', ''),
    nullif(new.raw_user_meta_data->>'name', ''),
    split_part(new.email, '@', 1)
  );

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

  insert into public.profiles (id, name, handle, email, profile_image, title, bio)
  values (
    new.id,
    display_name,
    candidate,
    new.email,
    new.raw_user_meta_data->>'avatar_url',
    -- Something rather than nothing: an all-blank member page reads as broken.
    'UX/UI Designer',
    '안녕하세요, 저는 ' || display_name || '입니다. 잘 부탁드립니다.'
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
alter table public.profiles    enable row level security;
alter table public.articles    enable row level security;
alter table public.comments    enable row level security;
alter table public.bug_reports enable row level security;
alter table public.daily_sends  enable row level security;

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

-- Bug reports: file your own, read your own; an admin reads and closes all.
drop policy if exists "anyone signed in files a report" on public.bug_reports;
create policy "anyone signed in files a report" on public.bug_reports
  for insert with check (auth.uid() = reporter_id);

drop policy if exists "reporters and admins read reports" on public.bug_reports;
create policy "reporters and admins read reports" on public.bug_reports
  for select using (auth.uid() = reporter_id or public.is_admin());

drop policy if exists "admins resolve reports" on public.bug_reports;
create policy "admins resolve reports" on public.bug_reports
  for update using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admins delete reports" on public.bug_reports;
create policy "admins delete reports" on public.bug_reports
  for delete using (public.is_admin());

-- daily_sends carries no policy on purpose. RLS with no policy denies every
-- anon and authenticated request, so the table is unreachable with the
-- publishable key. /api/daily-pick reaches it with the service role and is
-- itself gated by DAILY_PICK_TOKEN — that route is the only way in.

-- ── Storage bucket for cover images ─────────────────────────
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "media is public" on storage.objects;
create policy "media is public" on storage.objects
  for select using (bucket_id = 'media');

-- Publishing rights gate the article folders. A screenshot attached to a bug
-- report is the one thing a guest must still be able to upload.
drop policy if exists "members upload media" on storage.objects;
create policy "members upload media" on storage.objects
  for insert to authenticated with check (
    bucket_id = 'media'
    and (public.can_publish() or (storage.foldername(name))[1] = 'bug-reports')
  );

-- ── first admin ─────────────────────────────────────────────
--  Sign in with Google once, then run this with that address so the
--  Studio's admin screens unlock. There is no other way in by design.
--
--    update public.profiles set role = 'admin' where email = 'you@gmail.com';

-- ── comments gain a parent and an edited-at ─────────────────
alter table public.comments
  add column if not exists parent_id uuid references public.comments(id) on delete cascade;
alter table public.comments
  add column if not exists updated_at timestamptz;

create index if not exists comments_parent_idx on public.comments (parent_id, created_at);

-- Editing your own comment. Deleting was already allowed; this is its pair.
drop policy if exists "authors edit their comments" on public.comments;
create policy "authors edit their comments" on public.comments
  for update using (auth.uid() = author_id) with check (auth.uid() = author_id);

-- ── reactions ───────────────────────────────────────────────
--  One row per person per emoji, so the primary key is the rule: you cannot
--  react twice the same way, and taking it back is a delete.
create table if not exists public.comment_reactions (
  comment_id uuid not null references public.comments(id) on delete cascade,
  user_id    uuid not null references public.profiles(id) on delete cascade,
  emoji      text not null check (char_length(emoji) between 1 and 12),
  created_at timestamptz not null default now(),
  primary key (comment_id, user_id, emoji)
);

alter table public.comment_reactions enable row level security;

drop policy if exists "reactions are public" on public.comment_reactions;
create policy "reactions are public" on public.comment_reactions
  for select using (true);

drop policy if exists "react as yourself" on public.comment_reactions;
create policy "react as yourself" on public.comment_reactions
  for insert with check (auth.uid() = user_id);

drop policy if exists "take back your reaction" on public.comment_reactions;
create policy "take back your reaction" on public.comment_reactions
  for delete using (auth.uid() = user_id);

-- ── notifications ───────────────────────────────────────────
create table if not exists public.notifications (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references public.profiles(id) on delete cascade,
  actor_id   uuid references public.profiles(id) on delete set null,
  type       text not null check (type in ('comment', 'reply', 'reaction')),
  article_id uuid references public.articles(id) on delete cascade,
  comment_id uuid references public.comments(id) on delete cascade,
  emoji      text,
  read_at    timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists notifications_inbox_idx
  on public.notifications (user_id, created_at desc);

alter table public.notifications enable row level security;

-- Yours to read and to mark read; nobody writes one by hand. The triggers
-- below are security definer, so they insert past this.
drop policy if exists "your own notifications" on public.notifications;
create policy "your own notifications" on public.notifications
  for select using (auth.uid() = user_id);

drop policy if exists "mark your notifications read" on public.notifications;
create policy "mark your notifications read" on public.notifications
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "clear your notifications" on public.notifications;
create policy "clear your notifications" on public.notifications
  for delete using (auth.uid() = user_id);

-- ── who gets told ───────────────────────────────────────────
--  In the database rather than the client: a notification nobody can forge,
--  and one that still arrives however the comment was written.

create or replace function public.notify_on_comment()
returns trigger language plpgsql security definer set search_path = public as $$
declare
  article_author uuid;
  parent_author  uuid;
begin
  select author_id into article_author from public.articles where id = new.article_id;

  if new.parent_id is not null then
    select author_id into parent_author from public.comments where id = new.parent_id;
    -- The person being replied to hears first.
    if parent_author is not null and parent_author <> new.author_id then
      insert into public.notifications (user_id, actor_id, type, article_id, comment_id)
      values (parent_author, new.author_id, 'reply', new.article_id, new.id);
    end if;
  end if;

  -- The article's author hears too, unless they already did as the parent.
  if article_author is not null
     and article_author <> new.author_id
     and (parent_author is null or parent_author <> article_author) then
    insert into public.notifications (user_id, actor_id, type, article_id, comment_id)
    values (article_author, new.author_id, 'comment', new.article_id, new.id);
  end if;

  return new;
end $$;

drop trigger if exists comments_notify on public.comments;
create trigger comments_notify
  after insert on public.comments
  for each row execute function public.notify_on_comment();

create or replace function public.notify_on_reaction()
returns trigger language plpgsql security definer set search_path = public as $$
declare
  target_author uuid;
  target_article uuid;
begin
  select author_id, article_id into target_author, target_article
  from public.comments where id = new.comment_id;

  if target_author is not null and target_author <> new.user_id then
    insert into public.notifications (user_id, actor_id, type, article_id, comment_id, emoji)
    values (target_author, new.user_id, 'reaction', target_article, new.comment_id, new.emoji);
  end if;

  return new;
end $$;

drop trigger if exists reactions_notify on public.comment_reactions;
create trigger reactions_notify
  after insert on public.comment_reactions
  for each row execute function public.notify_on_reaction();
