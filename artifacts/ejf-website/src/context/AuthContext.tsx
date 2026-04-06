import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface EJFUser {
  name: string;
  email: string;
  phone: string;
  organization: string;
  joinedAt: string;
  avatar: string;
}

interface AuthContextType {
  user: EJFUser | null;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (data: Partial<EJFUser>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const STORAGE_KEY = "ejf_user";

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<EJFUser | null>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    else localStorage.removeItem(STORAGE_KEY);
  }, [user]);

  const login = async (email: string, _password: string): Promise<{ ok: boolean; error?: string }> => {
    await new Promise((r) => setTimeout(r, 900));
    if (!email.includes("@")) return { ok: false, error: "Please enter a valid email address." };
    if (_password.length < 6) return { ok: false, error: "Password must be at least 6 characters." };
    const name = email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    const newUser: EJFUser = {
      name,
      email,
      phone: "",
      organization: "",
      joinedAt: new Date().toISOString(),
      avatar: getInitials(name),
    };
    setUser(newUser);
    return { ok: true };
  };

  const register = async (name: string, email: string, password: string): Promise<{ ok: boolean; error?: string }> => {
    await new Promise((r) => setTimeout(r, 900));
    if (!name.trim()) return { ok: false, error: "Please enter your full name." };
    if (!email.includes("@")) return { ok: false, error: "Please enter a valid email address." };
    if (password.length < 6) return { ok: false, error: "Password must be at least 6 characters." };
    const newUser: EJFUser = {
      name: name.trim(),
      email,
      phone: "",
      organization: "",
      joinedAt: new Date().toISOString(),
      avatar: getInitials(name.trim()),
    };
    setUser(newUser);
    return { ok: true };
  };

  const logout = () => setUser(null);

  const updateProfile = (data: Partial<EJFUser>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...data };
      if (data.name) updated.avatar = getInitials(data.name);
      return updated;
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
