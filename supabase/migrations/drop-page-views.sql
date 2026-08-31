-- ─────────────────────────────────────────────────────────────
--  Reading figures moved to Vercel Analytics.
--  Run once in the Supabase SQL editor.
-- ─────────────────────────────────────────────────────────────
--
--  Counting visits ourselves meant a row per page opened, a policy letting
--  anyone add one, and a dashboard to keep true. Vercel does the same job
--  without cookies and filters bots out, which the hand-rolled version never
--  did. Nothing else reads this table.

drop table if exists public.page_views;
