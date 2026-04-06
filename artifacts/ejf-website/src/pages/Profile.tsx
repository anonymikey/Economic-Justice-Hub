import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/context/AuthContext";

export default function Profile() {
  const { user, logout, updateProfile } = useAuth();
  const [, navigate] = useLocation();

  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({ name: user?.name ?? "", email: user?.email ?? "", phone: user?.phone ?? "", organization: user?.organization ?? "" });
  const [focused, setFocused] = useState<string | null>(null);

  if (!user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-6xl mb-4">🔐</div>
          <h2 className="text-2xl font-bold text-[#0e1f3d] mb-2">You're not logged in</h2>
          <p className="text-gray-500 text-sm mb-6">Sign in to view your profile and manage your account.</p>
          <Link href="/login" className="inline-block bg-[#0e1f3d] hover:bg-[#1a3a6e] text-white font-bold px-6 py-3 rounded-xl transition-all hover:scale-105">
            Sign In →
          </Link>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    updateProfile(form);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const inputClass = (f: string) =>
    `w-full px-4 py-3 rounded-xl border text-sm text-gray-800 bg-white outline-none transition-all duration-200 ${
      focused === f ? "border-[#d4a017] ring-2 ring-[#d4a017]/20 shadow-sm" : "border-gray-200 hover:border-gray-300"
    } ${editing ? "" : "bg-gray-50 cursor-default"}`;

  const joinedDate = new Date(user.joinedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Profile hero banner */}
      <div className="bg-gradient-to-br from-[#0e1f3d] via-[#1a3a6e] to-[#0e1f3d] pt-12 pb-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center sm:items-end gap-5">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#d4a017] to-amber-700 flex items-center justify-center text-3xl font-bold text-white shadow-xl border-4 border-white/20">
              {user.avatar}
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-400 rounded-full border-2 border-white" title="Online" />
          </div>
          <div className="text-center sm:text-left">
            <h1 className="text-2xl md:text-3xl font-bold text-white">{user.name}</h1>
            <p className="text-white/60 text-sm mt-1">{user.email}</p>
            <div className="flex flex-wrap gap-2 mt-2 justify-center sm:justify-start">
              <span className="bg-[#d4a017]/20 border border-[#d4a017]/40 text-[#d4a017] text-xs font-semibold px-3 py-1 rounded-full">EJF Member</span>
              <span className="bg-white/10 text-white/70 text-xs px-3 py-1 rounded-full">Joined {joinedDate}</span>
            </div>
          </div>
          {/* Logout button top-right */}
          <button
            onClick={handleLogout}
            className="sm:ml-auto flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 border border-red-400/30 text-red-300 hover:text-red-200 font-semibold text-sm px-4 py-2.5 rounded-xl transition-all"
          >
            🚪 Sign Out
          </button>
        </div>
      </div>

      {/* Main content pulled up over the banner */}
      <div className="max-w-3xl mx-auto px-4 -mt-14 pb-16 space-y-5">

        {/* Success toast */}
        {saved && (
          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-semibold px-5 py-3 rounded-2xl shadow animate-bounce">
            ✅ Profile updated successfully!
          </div>
        )}

        {/* Account info card */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="font-bold text-[#0e1f3d] text-base">Account Information</h2>
            {!editing ? (
              <button
                onClick={() => { setForm({ name: user.name, email: user.email, phone: user.phone, organization: user.organization }); setEditing(true); }}
                className="flex items-center gap-1.5 text-xs font-bold text-[#d4a017] hover:text-[#b8891a] border border-[#d4a017]/40 hover:border-[#d4a017] px-3 py-1.5 rounded-lg transition-all"
              >
                ✏️ Edit Profile
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => setEditing(false)}
                  className="text-xs font-bold text-gray-400 hover:text-gray-600 px-3 py-1.5 rounded-lg border border-gray-200 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="text-xs font-bold bg-[#0e1f3d] hover:bg-[#1a3a6e] text-white px-4 py-1.5 rounded-lg transition-all hover:scale-105"
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>

          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Name */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Full Name</label>
              <input
                type="text" value={form.name} readOnly={!editing}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                onFocus={() => editing && setFocused("name")} onBlur={() => setFocused(null)}
                className={inputClass("name")}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Email Address</label>
              <input
                type="email" value={form.email} readOnly={!editing}
                onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                onFocus={() => editing && setFocused("email")} onBlur={() => setFocused(null)}
                className={inputClass("email")}
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Phone Number</label>
              <input
                type="tel" value={form.phone} placeholder={editing ? "+254 700 000 000" : "Not set"} readOnly={!editing}
                onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                onFocus={() => editing && setFocused("phone")} onBlur={() => setFocused(null)}
                className={inputClass("phone")}
              />
            </div>

            {/* Organization */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Organization</label>
              <input
                type="text" value={form.organization} placeholder={editing ? "Your organization" : "Not set"} readOnly={!editing}
                onChange={(e) => setForm((p) => ({ ...p, organization: e.target.value }))}
                onFocus={() => editing && setFocused("org")} onBlur={() => setFocused(null)}
                className={inputClass("org")}
              />
            </div>

            {/* Member since */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Member Since</label>
              <input type="text" value={joinedDate} readOnly className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-500 bg-gray-50 cursor-default" />
            </div>

            {/* Role */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Account Role</label>
              <input type="text" value="EJF Community Member" readOnly className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-500 bg-gray-50 cursor-default" />
            </div>
          </div>
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { emoji: "📅", label: "View Events", desc: "Browse upcoming EJF events", href: "/events" },
            { emoji: "📚", label: "Research", desc: "Access publications & reports", href: "/research" },
            { emoji: "📞", label: "Contact Us", desc: "Reach out to the EJF team", href: "/contact" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 bg-white rounded-2xl border border-gray-100 shadow-sm p-4 hover:shadow-md hover:-translate-y-0.5 hover:border-[#d4a017]/40 transition-all group"
            >
              <div className="w-10 h-10 bg-[#0e1f3d] group-hover:bg-[#d4a017] rounded-xl flex items-center justify-center text-lg flex-shrink-0 transition-colors">{item.emoji}</div>
              <div>
                <p className="text-sm font-bold text-[#0e1f3d]">{item.label}</p>
                <p className="text-xs text-gray-400">{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Danger zone */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-bold text-[#0e1f3d] text-sm mb-1">Account Actions</h3>
          <p className="text-gray-400 text-xs mb-4">Manage your session and account settings.</p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 font-bold text-sm px-5 py-2.5 rounded-xl transition-all hover:scale-105"
            >
              🚪 Sign Out
            </button>
            <button
              onClick={() => alert("To be updated Soon")}
              className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-500 font-semibold text-sm px-5 py-2.5 rounded-xl transition-all"
            >
              🔑 Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
