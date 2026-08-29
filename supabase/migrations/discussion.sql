-- ─────────────────────────────────────────────────────────────
--  Replies, reactions and notifications on the discussion.
--  Run once in the Supabase SQL editor. Safe to re-run.
-- ─────────────────────────────────────────────────────────────

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
