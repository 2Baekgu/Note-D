import type { Comment } from "@/lib/types";

/** Discussions start empty — members add them by signing in and commenting.
 *  Once Supabase is connected these live in the `comments` table. */
export const sampleComments: Comment[] = [];
