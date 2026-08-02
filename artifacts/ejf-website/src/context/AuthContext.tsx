import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/lib/supabase";
import type { User, Session } from "@supabase/supabase-js";

export interface EJFUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  organization: string;
  joinedAt: string;
  avatar: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: EJFUser | null;
  session: Session | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  register: (name: string, email: string, password: string, captchaToken?: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<EJFUser>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

async function fetchIsAdmin(): Promise<boolean> {
  try {
    const timeout = new Promise<boolean>((resolve) => setTimeout(() => resolve(false), 6000));
    const query = (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      const usersRes = user
        ? await supabase.from("users").select("is_admin").eq("id", user.id).maybeSingle()
        : null;
      return usersRes?.data?.is_admin === true;
    })().catch(() => false);
    return await Promise.race([query, timeout]);
  } catch {
    return false;
  }
}

async function supabaseUserToEJF(supabaseUser: User): Promise<EJFUser> {
  const meta = supabaseUser.user_metadata ?? {};
  const name = meta.full_name ?? meta.name ?? supabaseUser.email?.split("@")[0] ?? "Member";
  const isAdmin = await fetchIsAdmin();
  return {
    id: supabaseUser.id,
    name,
    email: supabaseUser.email ?? "",
    phone: meta.phone ?? "",
    organization: meta.organization ?? "",
    joinedAt: supabaseUser.created_at,
    avatar: getInitials(name),
    isAdmin,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<EJFUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) return;
    const timeoutMs = Number(import.meta.env.VITE_SESSION_TIMEOUT_MS ?? 30 * 60 * 1000);
    const storageKey = "ejf:last-activity";
    const markActivity = () => sessionStorage.setItem(storageKey, String(Date.now()));
    const checkTimeout = () => {
      const lastActivity = Number(sessionStorage.getItem(storageKey) ?? Date.now());
      if (Date.now() - lastActivity > timeoutMs) {
        sessionStorage.removeItem(storageKey);
        void supabase.auth.signOut();
      }
    };
    markActivity();
    const events = ["click", "keydown", "pointerdown", "touchstart"];
    events.forEach((event) => window.addEventListener(event, markActivity, { passive: true }));
    const interval = window.setInterval(checkTimeout, 60_000);
    return () => {
      events.forEach((event) => window.removeEventListener(event, markActivity));
      window.clearInterval(interval);
    };
  }, [session]);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ? await supabaseUserToEJF(session.user) : null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setUser(session?.user ? await supabaseUserToEJF(session.user) : null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<{ ok: boolean; error?: string }> => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  };

  const register = async (name: string, email: string, password: string, captchaToken?: string): Promise<{ ok: boolean; error?: string }> => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
        ...(captchaToken ? { captchaToken } : {}),
      },
    });
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  const updateProfile = async (data: Partial<EJFUser>) => {
    const updates: Record<string, string> = {};
    if (data.name) updates.full_name = data.name;
    if (data.phone !== undefined) updates.phone = data.phone;
    if (data.organization !== undefined) updates.organization = data.organization;

    if (Object.keys(updates).length > 0) {
      await supabase.auth.updateUser({ data: updates });
    }

    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...data };
      if (data.name) updated.avatar = getInitials(data.name);
      return updated;
    });
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
