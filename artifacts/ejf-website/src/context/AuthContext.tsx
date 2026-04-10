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
  register: (name: string, email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<EJFUser>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

const DESIGNATED_ADMINS: string[] = (import.meta.env.VITE_ADMIN_EMAILS ?? "")
  .split(",")
  .map((e: string) => e.trim().toLowerCase())
  .filter(Boolean);

async function fetchIsAdmin(email: string): Promise<boolean> {
  const normalizedEmail = email.trim().toLowerCase();
  if (DESIGNATED_ADMINS.includes(normalizedEmail)) return true;
  try {
    const timeout = new Promise<boolean>((resolve) => setTimeout(() => resolve(false), 6000));
    const query = Promise.all([
      supabase.from("users").select("is_admin").eq("email", email).maybeSingle(),
      supabase.from("pre_approved_admins").select("email").eq("email", normalizedEmail).maybeSingle(),
    ]).then(([usersRes, preApprovedRes]) =>
      usersRes.data?.is_admin === true || preApprovedRes.data !== null
    ).catch(() => false);
    return await Promise.race([query, timeout]);
  } catch {
    return false;
  }
}

async function supabaseUserToEJF(supabaseUser: User): Promise<EJFUser> {
  const meta = supabaseUser.user_metadata ?? {};
  const name = meta.full_name ?? meta.name ?? supabaseUser.email?.split("@")[0] ?? "Member";
  const isAdmin = await fetchIsAdmin(supabaseUser.email ?? "");
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

  const register = async (name: string, email: string, password: string): Promise<{ ok: boolean; error?: string }> => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
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
