-- ─────────────────────────────────────────────────────────────
--  A member's address is not part of the public roster.
--  Run once in the Supabase SQL editor. Safe to re-run.
-- ─────────────────────────────────────────────────────────────
--
--  `profiles` is readable by anyone — that is what lets a signed-out visitor
--  see who wrote an article. But the row carries `email`, and the publishable
--  key that reads it ships inside the site's own JavaScript. Anyone could ask
--  the API for every member's address, and three of them were being printed
--  into the HTML of every page that names an author.
--
--  Row-level security cannot help: the row is genuinely public, only one of
--  its columns is not. Column privileges are the tool for that.

-- Clear whatever anon holds, table-wide grants included — a table-level
-- SELECT would keep `email` in reach no matter what the columns say.
revoke select on public.profiles from anon;

-- Then hand back every column except the address.
grant select (id, name, handle, profile_image, role, title, bio, joined_at)
  on public.profiles to anon;

-- Members keep the whole row: the admin screen and the bug report list both
-- need to tell people apart by address.
grant select on public.profiles to authenticated;
