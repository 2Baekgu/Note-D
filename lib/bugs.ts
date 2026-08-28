import type { BugReport } from "@/lib/types";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

const LOCAL_KEY = "noted:bug-reports";

/* Reports written before Supabase is connected stay in this browser, the same
   way local drafts do. The admin screen says so rather than pretending. */

export function loadLocalReports(): BugReport[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(LOCAL_KEY);
    return raw ? (JSON.parse(raw) as BugReport[]) : [];
  } catch {
    return [];
  }
}

function writeLocal(list: BugReport[]) {
  try {
    window.localStorage.setItem(LOCAL_KEY, JSON.stringify(list));
  } catch {
    /* storage unavailable — nothing else to do */
  }
}

export interface Reporter {
  id: string;
  name: string;
  email: string;
}

/** Files a report. The row policy lets anyone signed in insert their own,
 *  guests included — a guest is the likeliest person to hit something broken. */
export async function submitBugReport(
  content: string,
  reporter: Reporter,
): Promise<{ ok: boolean; error?: string }> {
  const supabase = getSupabaseBrowserClient();

  if (!supabase) {
    const list = loadLocalReports();
    list.unshift({
      id: `local-${Date.now().toString(36)}`,
      reporterId: reporter.id,
      reporterName: reporter.name,
      reporterEmail: reporter.email,
      content,
      status: "open",
      createdAt: new Date().toISOString(),
    });
    writeLocal(list);
    return { ok: true };
  }

  const { error } = await supabase
    .from("bug_reports")
    .insert({ reporter_id: reporter.id, content });

  return error ? { ok: false, error: error.message } : { ok: true };
}

export async function setReportStatus(
  id: string,
  status: BugReport["status"],
): Promise<{ ok: boolean; error?: string }> {
  const supabase = getSupabaseBrowserClient();
  if (!supabase || id.startsWith("local-")) {
    writeLocal(loadLocalReports().map((r) => (r.id === id ? { ...r, status } : r)));
    return { ok: true };
  }
  const { error } = await supabase.from("bug_reports").update({ status }).eq("id", id);
  return error ? { ok: false, error: error.message } : { ok: true };
}

export async function deleteBugReport(id: string): Promise<{ ok: boolean; error?: string }> {
  const supabase = getSupabaseBrowserClient();
  if (!supabase || id.startsWith("local-")) {
    writeLocal(loadLocalReports().filter((r) => r.id !== id));
    return { ok: true };
  }
  const { error } = await supabase.from("bug_reports").delete().eq("id", id);
  return error ? { ok: false, error: error.message } : { ok: true };
}
