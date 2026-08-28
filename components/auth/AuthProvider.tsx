"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { members } from "@/lib/data/members";
import type { Role } from "@/lib/types";

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  image: string | null;
  handle: string;
  role: Role;
}

type Mode = "supabase" | "demo";

interface AuthValue {
  user: SessionUser | null;
  loading: boolean;
  mode: Mode;
  /** role === "admin" — may manage roles and edit anyone's article. */
  isAdmin: boolean;
  /** admin or member — may write and publish in the Studio. */
  canPublish: boolean;
  signInWithGoogle: () => Promise<{ error?: string }>;
  signInAsDemoMember: (memberId: string) => void;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthValue | null>(null);
const DEMO_KEY = "noted:demo-user";

/** What a new profile starts with, so no field on a member page is empty. */
const DEFAULT_TITLE = "UX/UI Designer";
const defaultBio = (name: string) => `안녕하세요, 저는 ${name}입니다. 잘 부탁드립니다.`;

type AuthUser = { id: string; email?: string; user_metadata?: Record<string, unknown> };
type SupabaseClient = NonNullable<ReturnType<typeof getSupabaseBrowserClient>>;

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const mode: Mode = supabase ? "supabase" : "demo";
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    if (!supabase) {
      // Demo mode: identity lives in localStorage so the write flows stay usable
      // before Supabase is connected.
      try {
        const raw = window.localStorage.getItem(DEMO_KEY);
        // eslint-disable-next-line react-hooks/set-state-in-effect -- browser storage is only readable after hydration
        if (raw && active) setUser(JSON.parse(raw) as SessionUser);
      } catch {
        /* ignore */
      }
      setLoading(false);
      return;
    }

    const sync = async (authUser: AuthUser | undefined | null) => {
      const next = await resolveUser(supabase, authUser);
      if (active) setUser(next);
    };

    supabase.auth
      .getSession()
      .then(async (result: { data: { session: { user?: AuthUser } | null } }) => {
        await sync(result.data.session?.user);
        if (active) setLoading(false);
      });

    const { data: sub } = supabase.auth.onAuthStateChange(
      (_event: string, session: { user?: AuthUser } | null) => {
        void sync(session?.user);
      },
    );

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, [supabase]);

  const signInWithGoogle = useCallback(async () => {
    if (!supabase) return { error: "Supabase가 아직 연결되지 않았습니다." };
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    return error ? { error: error.message } : {};
  }, [supabase]);

  const signInAsDemoMember = useCallback((memberId: string) => {
    const m = members.find((x) => x.id === memberId) ?? members[0];
    const next: SessionUser = {
      id: m.id,
      name: m.name,
      email: m.email,
      image: m.profileImage,
      handle: m.handle,
      role: m.role,
    };
    setUser(next);
    try {
      window.localStorage.setItem(DEMO_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }, []);

  const signOut = useCallback(async () => {
    if (supabase) await supabase.auth.signOut();
    try {
      window.localStorage.removeItem(DEMO_KEY);
    } catch {
      /* ignore */
    }
    setUser(null);
  }, [supabase]);

  const value = useMemo(
    () => ({
      user,
      loading,
      mode,
      isAdmin: user?.role === "admin",
      canPublish: user?.role === "admin" || user?.role === "member",
      signInWithGoogle,
      signInAsDemoMember,
      signOut,
    }),
    [user, loading, mode, signInWithGoogle, signInAsDemoMember, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/** The session only carries what Google told us. Role, handle and the edited
 *  name live in `profiles`, so read the row and let it win. */
async function resolveUser(
  supabase: SupabaseClient,
  authUser: AuthUser | undefined | null,
): Promise<SessionUser | null> {
  const fallback = fromAuthUser(authUser);
  if (!fallback) return null;

  const { data } = await supabase
    .from("profiles")
    .select("id, name, handle, email, profile_image, role, title, bio")
    .eq("id", fallback.id)
    .maybeSingle();

  // On the very first sign-in the row may not have committed yet. The session
  // is still valid — treat the person as a guest until the next load.
  if (!data) return fallback;

  const row = data as {
    name: string;
    handle: string;
    email: string;
    profile_image: string | null;
    role: string;
    title: string | null;
    bio: string | null;
  };
  // Whatever a fresh profile is missing, fill in once. Google hands us a
  // picture; the title and bio just need to not be blank, since a member page
  // with three empty fields reads as broken. Only ever fills, never replaces:
  // a profile with any of this already set is left alone.
  const seed: Record<string, string> = {};
  if (!row.profile_image && fallback.image) seed.profile_image = fallback.image;
  if (!row.title?.trim() && !row.bio?.trim()) {
    seed.title = DEFAULT_TITLE;
    seed.bio = defaultBio(row.name || fallback.name);
  }
  if (Object.keys(seed).length) {
    void supabase.from("profiles").update(seed).eq("id", fallback.id);
  }

  return {
    id: fallback.id,
    name: row.name || fallback.name,
    email: row.email || fallback.email,
    image: row.profile_image ?? fallback.image,
    handle: row.handle || fallback.handle,
    role: (row.role as Role) ?? "guest",
  };
}

function fromAuthUser(u: AuthUser | undefined | null): SessionUser | null {
  if (!u || typeof u !== "object") return null;
  const meta = u.user_metadata ?? {};
  const name =
    (meta.full_name as string) ||
    (meta.name as string) ||
    u.email?.split("@")[0] ||
    "Member";
  return {
    id: u.id,
    name,
    email: u.email ?? "",
    image: (meta.avatar_url as string) ?? null,
    handle: (meta.handle as string) ?? name.toLowerCase(),
    role: "guest",
  };
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
