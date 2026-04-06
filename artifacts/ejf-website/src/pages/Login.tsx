import { useState, FormEvent } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const { login, user } = useAuth();
  const [, navigate] = useLocation();
  const [tab, setTab] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [focused, setFocused] = useState<string | null>(null);

  // If already logged in, bounce to profile
  if (user) { navigate("/profile"); return null; }

  const inputClass = (f: string) =>
    `w-full px-4 py-3 rounded-xl border text-sm text-gray-800 bg-white outline-none transition-all duration-200 ${
      focused === f ? "border-[#d4a017] ring-2 ring-[#d4a017]/20 shadow-sm" : "border-gray-200 hover:border-gray-300"
    }`;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result.ok) navigate("/profile");
    else setError(result.error ?? "Login failed. Please try again.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0e1f3d] via-[#1a3a6e] to-[#0e1f3d] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Decorative bg */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#d4a017]/10 rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-56 h-56 bg-blue-500/10 rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <Link href="/">
            <img src="/logo.jpeg" alt="EJF" className="w-16 h-16 rounded-xl object-cover shadow-lg mb-3 cursor-pointer hover:scale-105 transition-transform" />
          </Link>
          <h1 className="text-white font-bold text-xl">Economic Justice Forum</h1>
          <p className="text-[#d4a017] text-xs font-semibold tracking-widest uppercase mt-0.5">Equity · Justice · Prosperity</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Tab switcher */}
          <div className="flex border-b border-gray-100">
            {(["login", "register"] as const).map((t) => (
              <button
                key={t}
                onClick={() => { setTab(t); setError(""); }}
                className={`flex-1 py-4 text-sm font-bold transition-all ${
                  tab === t
                    ? "text-[#0e1f3d] border-b-2 border-[#d4a017] bg-white"
                    : "text-gray-400 hover:text-gray-600 bg-gray-50"
                }`}
              >
                {t === "login" ? "Sign In" : "Create Account"}
              </button>
            ))}
          </div>

          <div className="p-7">
            {tab === "login" ? (
              <>
                <h2 className="text-xl font-bold text-[#0e1f3d] mb-1">Welcome back</h2>
                <p className="text-gray-400 text-xs mb-6">Sign in to your EJF account</p>

                {error && (
                  <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl px-4 py-3 mb-4">
                    <span>⚠️</span> {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#0e1f3d] mb-1.5 uppercase tracking-wider">Email Address</label>
                    <input
                      type="email" required placeholder="your@email.com"
                      value={email} onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                      className={inputClass("email")}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#0e1f3d] mb-1.5 uppercase tracking-wider">Password</label>
                    <div className="relative">
                      <input
                        type={showPass ? "text" : "password"} required placeholder="••••••••" minLength={6}
                        value={password} onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setFocused("pass")} onBlur={() => setFocused(null)}
                        className={`${inputClass("pass")} pr-12`}
                      />
                      <button type="button" onClick={() => setShowPass((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-lg">
                        {showPass ? "🙈" : "👁"}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit" disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-[#0e1f3d] hover:bg-[#1a3a6e] disabled:bg-gray-300 text-white font-bold text-sm py-3.5 rounded-xl transition-all hover:scale-[1.02] shadow-md mt-2"
                  >
                    {loading ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Signing in…</> : "Sign In →"}
                  </button>
                </form>

                <div className="mt-5 text-center">
                  <p className="text-xs text-gray-400">
                    Don't have an account?{" "}
                    <button onClick={() => { setTab("register"); setError(""); }} className="text-[#d4a017] font-bold hover:underline">Create one free</button>
                  </p>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold text-[#0e1f3d] mb-1">Join EJF</h2>
                <p className="text-gray-400 text-xs mb-6">Create your free account in seconds</p>

                {error && (
                  <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl px-4 py-3 mb-4">
                    <span>⚠️</span> {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#0e1f3d] mb-1.5 uppercase tracking-wider">Full Name</label>
                    <input
                      type="text" required placeholder="Your full name"
                      value={name} onChange={(e) => setName(e.target.value)}
                      onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
                      className={inputClass("name")}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#0e1f3d] mb-1.5 uppercase tracking-wider">Email Address</label>
                    <input
                      type="email" required placeholder="your@email.com"
                      value={email} onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                      className={inputClass("email")}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#0e1f3d] mb-1.5 uppercase tracking-wider">Password</label>
                    <div className="relative">
                      <input
                        type={showPass ? "text" : "password"} required placeholder="Min. 6 characters" minLength={6}
                        value={password} onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setFocused("pass")} onBlur={() => setFocused(null)}
                        className={`${inputClass("pass")} pr-12`}
                      />
                      <button type="button" onClick={() => setShowPass((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-lg">
                        {showPass ? "🙈" : "👁"}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit" disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-[#d4a017] hover:bg-[#b8891a] disabled:bg-gray-300 text-white font-bold text-sm py-3.5 rounded-xl transition-all hover:scale-[1.02] shadow-md mt-2"
                  >
                    {loading ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Creating…</> : "Create Account →"}
                  </button>
                </form>

                <div className="mt-5 text-center">
                  <p className="text-xs text-gray-400">
                    Already have an account?{" "}
                    <button onClick={() => { setTab("login"); setError(""); }} className="text-[#d4a017] font-bold hover:underline">Sign in</button>
                  </p>
                </div>
              </>
            )}

            {/* Footer note */}
            <p className="text-center text-xs text-gray-300 mt-6 pt-4 border-t border-gray-100">
              By continuing, you agree to EJF's terms and privacy policy.
            </p>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link href="/" className="text-white/50 hover:text-white text-xs transition-colors">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
