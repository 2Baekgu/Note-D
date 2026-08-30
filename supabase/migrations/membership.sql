-- ─────────────────────────────────────────────────────────────
--  Signing up, then asking to write.
--  Run once in the Supabase SQL editor. Safe to re-run.
-- ─────────────────────────────────────────────────────────────
--
--  Anyone may sign up and read; writing is asked for. A guest introduces
--  themselves, an admin reads that and decides. Until then the guest keeps
--  the account they already have.

-- ── the application lives on the profile ────────────────────
--  A separate table would need its own policies and its own cleanup, and
--  there is only ever one live application per person.
alter table public.profiles
  add column if not exists membership_note text;
alter table public.profiles
  add column if not exists applied_at timestamptz;

-- ── admins hear about people, not only about comments ───────
alter table public.notifications drop constraint if exists notifications_type_check;
alter table public.notifications add constraint notifications_type_check
  check (type in ('comment', 'reply', 'reaction', 'signup', 'membership_request'));

-- `article_id` was never required, but say so plainly: these two carry none.
alter table public.notifications alter column article_id drop not null;

-- ── who to tell ─────────────────────────────────────────────
--  Both of these are security definer for the same reason the comment
--  triggers are: nothing but a trigger may insert a notification, so an
--  alert cannot be forged.

create or replace function public.notify_admins(
  kind text,
  actor uuid
) returns void language plpgsql security definer set search_path = public as $$
begin
  insert into public.notifications (user_id, actor_id, type)
  select p.id, actor, kind
  from public.profiles p
  where p.role = 'admin' and p.id <> actor;
end $$;

create or replace function public.notify_on_signup()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  perform public.notify_admins('signup', new.id);
  return new;
end $$;

drop trigger if exists profiles_notify_signup on public.profiles;
create trigger profiles_notify_signup
  after insert on public.profiles
  for each row execute function public.notify_on_signup();

--  Only the moment of asking counts. Editing the note afterwards, or an
--  admin approving, must not ring the bell again.
create or replace function public.notify_on_membership_request()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if new.applied_at is not null and old.applied_at is null then
    perform public.notify_admins('membership_request', new.id);
  end if;
  return new;
end $$;

drop trigger if exists profiles_notify_request on public.profiles;
create trigger profiles_notify_request
  after update on public.profiles
  for each row execute function public.notify_on_membership_request();

-- ── the new columns are readable like the rest of the row ───
--  `email` stays out; see profile-email-private.sql, which this must not undo.
grant select (id, name, handle, profile_image, role, title, bio, joined_at,
              membership_note, applied_at)
  on public.profiles to anon;
grant select on public.profiles to authenticated;
