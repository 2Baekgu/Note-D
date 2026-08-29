import { getSupabaseBrowserClient } from "@/lib/supabase/client";

/** Writes on the discussion. Each returns an error string rather than
 *  throwing, because every one of them is attached to a button that has
 *  already moved the thread optimistically and needs to put it back. */

type Result = { ok: boolean; error?: string; id?: string };

export async function postComment(
  articleId: string,
  authorId: string,
  content: string,
  parentId: string | null,
): Promise<Result> {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return { ok: true }; // demo mode keeps it on screen only

  const { data, error } = await supabase
    .from("comments")
    .insert({ article_id: articleId, author_id: authorId, content, parent_id: parentId })
    .select("id")
    .maybeSingle();

  if (error) return { ok: false, error: error.message };
  return { ok: true, id: (data as { id: string } | null)?.id };
}

export async function editComment(id: string, content: string): Promise<Result> {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return { ok: true };
  const { error } = await supabase
    .from("comments")
    .update({ content, updated_at: new Date().toISOString() })
    .eq("id", id);
  return error ? { ok: false, error: error.message } : { ok: true };
}

export async function removeComment(id: string): Promise<Result> {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return { ok: true };
  const { error } = await supabase.from("comments").delete().eq("id", id);
  return error ? { ok: false, error: error.message } : { ok: true };
}

/** Adding and taking back are the same gesture, so this is a toggle. */
export async function toggleReaction(
  commentId: string,
  userId: string,
  emoji: string,
  had: boolean,
): Promise<Result> {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return { ok: true };

  const { error } = had
    ? await supabase
        .from("comment_reactions")
        .delete()
        .eq("comment_id", commentId)
        .eq("user_id", userId)
        .eq("emoji", emoji)
    : await supabase
        .from("comment_reactions")
        .insert({ comment_id: commentId, user_id: userId, emoji });

  return error ? { ok: false, error: error.message } : { ok: true };
}

export async function markNotificationsRead(ids: string[]): Promise<void> {
  const supabase = getSupabaseBrowserClient();
  if (!supabase || !ids.length) return;
  await supabase
    .from("notifications")
    .update({ read_at: new Date().toISOString() })
    .in("id", ids);
}
