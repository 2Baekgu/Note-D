import { getSupabaseBrowserClient } from "@/lib/supabase/client";

/** Asking to write, and taking the question back.
 *
 *  Neither of these grants anything: `role` is guarded by a trigger, so a
 *  guest writing to their own row can say "I would like to" and no more. */

type Result = { ok: boolean; error?: string };

export async function applyForMembership(userId: string, note: string): Promise<Result> {
  const body = note.trim();
  if (body.length < 10) return { ok: false, error: "조금만 더 적어주세요." };

  const supabase = getSupabaseBrowserClient();
  if (!supabase) return { ok: true };

  const { error } = await supabase
    .from("profiles")
    .update({ membership_note: body, applied_at: new Date().toISOString() })
    .eq("id", userId);

  return error ? { ok: false, error: error.message } : { ok: true };
}

/** Changing your mind before anyone has answered. The note stays, so the
 *  next attempt starts from what you already wrote. */
export async function cancelMembershipRequest(userId: string): Promise<Result> {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return { ok: true };

  const { error } = await supabase
    .from("profiles")
    .update({ applied_at: null })
    .eq("id", userId);

  return error ? { ok: false, error: error.message } : { ok: true };
}

/** Turning a guest down. The note is kept — they may ask again, and an admin
 *  who declined once should be able to see what they said. */
export async function declineMembership(userId: string): Promise<Result> {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return { ok: true };

  const { error } = await supabase
    .from("profiles")
    .update({ applied_at: null })
    .eq("id", userId);

  return error ? { ok: false, error: error.message } : { ok: true };
}
