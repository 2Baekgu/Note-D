"use client";

import Link from "next/link";
import { useAuth } from "@/components/auth/AuthProvider";

/** A way back to the editor from the article itself. Only the author sees it,
 *  and an admin, which is the same pair the row policy lets write. */
export function AuthorTools({
  articleId,
  authorId,
}: {
  articleId: string;
  authorId: string;
}) {
  const { user, isAdmin, canPublish } = useAuth();
  const mine = Boolean(user && user.id === authorId && canPublish);
  if (!mine && !isAdmin) return null;

  return (
    <Link href={`/studio/${articleId}`} className="chip chip-outline chip-sm">
      편집
    </Link>
  );
}
