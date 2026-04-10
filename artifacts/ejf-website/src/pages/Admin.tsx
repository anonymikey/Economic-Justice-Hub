import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useLocation } from "wouter";
import { adminQueries, DBEvent, DBProgram, DBPublication, DBContact, DBDonation, DBNewsletter, DBUser } from "@/lib/adminQueries";
import "./admin.css";

/* ─── helpers ─── */
function fmt(dt: string) {
  if (!dt) return "—";
  return new Date(dt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}
function Badge({ label, color }: { label: string; color: string }) {
  return <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide ${color}`}>{label}</span>;
}
function Spinner() {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3">
      <div className="relative w-10 h-10">
        <div className="absolute inset-0 rounded-full border-4 border-[#0e1f3d]/10" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#d4a017] animate-spin" />
      </div>
      <p className="text-xs text-gray-400 tracking-widest uppercase">Loading</p>
    </div>
  );
}
function EmptyState({ msg }: { msg: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3">
      <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center text-2xl">📭</div>
      <p className="text-sm text-gray-400">{msg}</p>
    </div>
  );
}

/* ─── MODAL ─── */
function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backdropFilter: "blur(4px)", backgroundColor: "rgba(14,31,61,0.6)" }}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-scale-in">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="font-bold text-[#0e1f3d] text-base">{title}</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors text-lg font-bold leading-none">×</button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

/* ─── INPUT HELPERS ─── */
const labelCls = "block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-widest";
const inputCls = "w-full border border-gray-200 bg-gray-50 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0e1f3d]/20 focus:border-[#0e1f3d] focus:bg-white transition-all";
const textareaCls = `${inputCls} resize-none`;

/* ─── ADMIN LOADING SCREEN ─── */
const BOOT_STEPS = [
  { icon: "🔐", label: "Authenticating identity" },
  { icon: "🛡️", label: "Verifying admin privileges" },
  { icon: "📡", label: "Establishing secure session" },
  { icon: "⚙️", label: "Loading dashboard modules" },
  { icon: "✅", label: "Access granted" },
];

function AdminLoadingScreen({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    BOOT_STEPS.forEach((_, i) => {
      setTimeout(() => setStep(i + 1), i * 620 + 300);
    });
    setTimeout(() => { setDone(true); setTimeout(onDone, 600); }, BOOT_STEPS.length * 620 + 500);
  }, []);

  const progress = Math.round((step / BOOT_STEPS.length) * 100);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-500"
      style={{ background: "radial-gradient(ellipse at 30% 20%, #112244 0%, #0a1628 60%, #060e1a 100%)", opacity: done ? 0 : 1 }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 animate-spin-slow"
          style={{ background: "conic-gradient(from 0deg, transparent 270deg, #d4a017 360deg)", filter: "blur(40px)" }} />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-5 animate-spin-slow"
          style={{ background: "conic-gradient(from 180deg, transparent 270deg, #4a90d9 360deg)", filter: "blur(30px)", animationDirection: "reverse" }} />
        {[...Array(18)].map((_, i) => (
          <div key={i} className="absolute rounded-full bg-white"
            style={{ width: Math.random() * 2 + 1 + "px", height: Math.random() * 2 + 1 + "px", top: Math.random() * 100 + "%", left: Math.random() * 100 + "%", opacity: Math.random() * 0.4 + 0.1 }} />
        ))}
      </div>

      <div className="relative w-full max-w-sm px-6 animate-fade-up">
        <div className="flex flex-col items-center mb-10">
          <div className="relative mb-5">
            <div className="absolute inset-0 rounded-2xl animate-glow" />
            <div className="relative w-20 h-20 bg-gradient-to-br from-[#d4a017] to-[#b8880f] rounded-2xl flex items-center justify-center shadow-2xl animate-float">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
          </div>
          <h1 className="text-white font-bold text-2xl tracking-tight">EJF Admin Console</h1>
          <p className="text-white/40 text-xs mt-1 tracking-widest uppercase">Economic Justice Forum</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm mb-5">
          <div className="space-y-3 mb-5">
            {BOOT_STEPS.map((s, i) => {
              const isActive = step === i + 1;
              const isDone = step > i + 1 || (step === BOOT_STEPS.length && i < BOOT_STEPS.length);
              const isPending = step <= i;
              return (
                <div key={i} className={`flex items-center gap-3 transition-all duration-300 ${isPending ? "opacity-25" : "opacity-100"}`}
                  style={{ animation: step === i + 1 ? "fadeUp 0.4s ease forwards" : undefined }}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs flex-shrink-0 transition-all duration-300 ${
                    isDone ? "bg-emerald-500 text-white step-check" : isActive ? "bg-[#d4a017] text-white animate-pulse" : "bg-white/10 text-white/30"
                  }`}>
                    {isDone ? (
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : isActive ? (
                      <div className="w-2 h-2 rounded-full bg-white animate-ping" />
                    ) : (
                      <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
                    )}
                  </div>
                  <span className={`text-sm font-medium transition-colors duration-300 ${isDone ? "text-emerald-400" : isActive ? "text-white" : "text-white/30"}`}>
                    {s.label}
                  </span>
                  {isActive && <div className="ml-auto"><div className="w-4 h-4 border-2 border-[#d4a017]/30 border-t-[#d4a017] rounded-full animate-spin" /></div>}
                </div>
              );
            })}
          </div>

          <div className="mt-4">
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-white/30 tracking-wider uppercase">Progress</span>
              <span className="text-[#d4a017] font-mono font-bold">{progress}%</span>
            </div>
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%`, background: "linear-gradient(90deg, #d4a017, #f0c040)" }}
              />
            </div>
          </div>
        </div>

        <p className="text-center text-white/20 text-xs tracking-widest">SECURE ADMIN AREA</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   EVENTS TAB
══════════════════════════════════════════ */
function EventsTab() {
  const [rows, setRows] = useState<DBEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<null | "add" | DBEvent>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const blank: Omit<DBEvent, "id" | "created_at"> = {
    title: "", description: "", date: "", date_iso: "", location: "", time: "", category: "Environmental",
    emoji: "", featured: false, published: true,
  };
  const [form, setForm] = useState(blank);

  const load = async () => {
    setLoading(true);
    const { data } = await adminQueries.events.list();
    setRows(data ?? []);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const openAdd = () => { setForm(blank); setError(""); setModal("add"); };
  const openEdit = (r: DBEvent) => { setForm({ title: r.title, description: r.description, date: r.date, date_iso: r.date_iso, location: r.location, time: r.time, category: r.category, emoji: r.emoji, featured: r.featured, published: r.published }); setError(""); setModal(r); };

  const save = async () => {
    if (!form.title.trim() || !form.date.trim()) { setError("Title and date are required."); return; }
    setSaving(true); setError("");
    if (modal === "add") {
      const { error } = await adminQueries.events.insert(form);
      if (error) { setError(error.message); setSaving(false); return; }
    } else if (modal && typeof modal === "object") {
      const { error } = await adminQueries.events.update(modal.id, form);
      if (error) { setError(error.message); setSaving(false); return; }
    }
    setSaving(false); setModal(null); load();
  };

  const del = async (id: string) => {
    if (!confirm("Delete this event?")) return;
    await adminQueries.events.delete(id);
    load();
  };

  const categories = ["Environmental", "Digital", "Economic", "Community"];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500">Events added here will appear on the public Events page.</p>
        <button onClick={openAdd} className="bg-[#0e1f3d] hover:bg-[#1a3a6e] text-white font-bold text-sm px-5 py-2 rounded-xl transition-colors">+ Add Event</button>
      </div>

      {loading ? <Spinner /> : rows.length === 0 ? <EmptyState msg="No events yet. Add your first event." /> : (
        <div className="overflow-x-auto rounded-xl border border-gray-100">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-[#0e1f3d] text-xs uppercase tracking-wide">
              <tr>
                <th className="text-left px-4 py-3">Title</th>
                <th className="text-left px-4 py-3">Date</th>
                <th className="text-left px-4 py-3">Category</th>
                <th className="text-left px-4 py-3">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {rows.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3 font-medium text-[#0e1f3d] max-w-[220px] truncate">{r.title}</td>
                  <td className="px-4 py-3 text-gray-500">{r.date}</td>
                  <td className="px-4 py-3"><Badge label={r.category} color="bg-blue-50 text-blue-700" /></td>
                  <td className="px-4 py-3">
                    {r.published ? <Badge label="Published" color="bg-green-50 text-green-700" /> : <Badge label="Draft" color="bg-gray-100 text-gray-500" />}
                    {r.featured && <Badge label="Featured" color="bg-[#d4a017]/10 text-[#d4a017] ml-1" />}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => openEdit(r)} className="text-[#0e1f3d] hover:underline text-xs font-bold mr-3">Edit</button>
                    <button onClick={() => del(r.id)} className="text-red-500 hover:underline text-xs font-bold">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modal !== null && (
        <Modal title={modal === "add" ? "Add Event" : "Edit Event"} onClose={() => setModal(null)}>
          <div className="space-y-4">
            {error && <p className="text-red-500 text-xs bg-red-50 rounded-lg px-3 py-2">{error}</p>}
            <div><label className={labelCls}>Title *</label><input className={inputCls} value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Event title" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className={labelCls}>Display Date *</label><input className={inputCls} value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} placeholder="March 15, 2025" /></div>
              <div><label className={labelCls}>Date ISO (for sorting)</label><input type="date" className={inputCls} value={form.date_iso} onChange={e => setForm(f => ({ ...f, date_iso: e.target.value }))} /></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className={labelCls}>Location</label><input className={inputCls} value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} placeholder="Nairobi" /></div>
              <div><label className={labelCls}>Time</label><input className={inputCls} value={form.time} onChange={e => setForm(f => ({ ...f, time: e.target.value }))} placeholder="9:00 AM – 4:00 PM" /></div>
            </div>
            <div>
              <label className={labelCls}>Category</label>
              <select className={inputCls} value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                {categories.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div><label className={labelCls}>Description</label><textarea className={textareaCls} rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Event description..." /></div>
            <div><label className={labelCls}>Emoji / Icon</label><input className={inputCls} value={form.emoji} onChange={e => setForm(f => ({ ...f, emoji: e.target.value }))} placeholder="🌿 (optional emoji for this event)" /></div>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <input type="checkbox" checked={form.published} onChange={e => setForm(f => ({ ...f, published: e.target.checked }))} className="w-4 h-4 accent-[#0e1f3d]" />
                Published (visible on site)
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <input type="checkbox" checked={form.featured} onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))} className="w-4 h-4 accent-[#d4a017]" />
                Featured event
              </label>
            </div>
            <button onClick={save} disabled={saving} className="w-full bg-[#0e1f3d] hover:bg-[#1a3a6e] disabled:bg-gray-300 text-white font-bold py-2.5 rounded-xl text-sm transition-colors">
              {saving ? "Saving…" : "Save Event"}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════
   PROGRAMS TAB
══════════════════════════════════════════ */
function ProgramsTab() {
  const [rows, setRows] = useState<DBProgram[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<null | "add" | DBProgram>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const blank: Omit<DBProgram, "id" | "created_at" | "updated_at"> = { title: "", description: "", category: "Environmental", icon: "", published: true };
  const [form, setForm] = useState(blank);

  const load = async () => { setLoading(true); const { data } = await adminQueries.programs.list(); setRows(data ?? []); setLoading(false); };
  useEffect(() => { load(); }, []);

  const openAdd = () => { setForm(blank); setError(""); setModal("add"); };
  const openEdit = (r: DBProgram) => { setForm({ title: r.title, description: r.description, category: r.category, icon: r.icon, published: r.published }); setError(""); setModal(r); };

  const save = async () => {
    if (!form.title.trim()) { setError("Title is required."); return; }
    setSaving(true); setError("");
    if (modal === "add") {
      const { error } = await adminQueries.programs.insert(form);
      if (error) { setError(error.message); setSaving(false); return; }
    } else if (modal && typeof modal === "object") {
      const { error } = await adminQueries.programs.update(modal.id, form);
      if (error) { setError(error.message); setSaving(false); return; }
    }
    setSaving(false); setModal(null); load();
  };

  const del = async (id: string) => { if (!confirm("Delete this program?")) return; await adminQueries.programs.delete(id); load(); };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500">Active programs appear in a featured section on the Programs page.</p>
        <button onClick={openAdd} className="bg-[#0e1f3d] hover:bg-[#1a3a6e] text-white font-bold text-sm px-5 py-2 rounded-xl transition-colors">+ Add Program</button>
      </div>
      {loading ? <Spinner /> : rows.length === 0 ? <EmptyState msg="No programs yet." /> : (
        <div className="overflow-x-auto rounded-xl border border-gray-100">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-[#0e1f3d] text-xs uppercase tracking-wide">
              <tr><th className="text-left px-4 py-3">Title</th><th className="text-left px-4 py-3">Category</th><th className="text-left px-4 py-3">Status</th><th className="text-left px-4 py-3">Added</th><th className="px-4 py-3" /></tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {rows.map(r => (
                <tr key={r.id} className="hover:bg-gray-50/50">
                  <td className="px-4 py-3 font-medium text-[#0e1f3d] max-w-[200px] truncate">{r.title}</td>
                  <td className="px-4 py-3"><Badge label={r.category} color="bg-emerald-50 text-emerald-700" /></td>
                  <td className="px-4 py-3">{r.published ? <Badge label="Published" color="bg-green-50 text-green-700" /> : <Badge label="Draft" color="bg-gray-100 text-gray-500" />}</td>
                  <td className="px-4 py-3 text-gray-400 text-xs">{fmt(r.created_at)}</td>
                  <td className="px-4 py-3 text-right"><button onClick={() => openEdit(r)} className="text-[#0e1f3d] hover:underline text-xs font-bold mr-3">Edit</button><button onClick={() => del(r.id)} className="text-red-500 hover:underline text-xs font-bold">Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {modal !== null && (
        <Modal title={modal === "add" ? "Add Program" : "Edit Program"} onClose={() => setModal(null)}>
          <div className="space-y-4">
            {error && <p className="text-red-500 text-xs bg-red-50 rounded-lg px-3 py-2">{error}</p>}
            <div><label className={labelCls}>Title *</label><input className={inputCls} value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Program title" /></div>
            <div><label className={labelCls}>Category</label>
              <select className={inputCls} value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                {["Environmental", "Economic", "Digital", "Social", "Youth", "Women"].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div><label className={labelCls}>Description</label><textarea className={textareaCls} rows={4} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Program description..." /></div>
            <div><label className={labelCls}>Icon / Emoji</label><input className={inputCls} value={form.icon} onChange={e => setForm(f => ({ ...f, icon: e.target.value }))} placeholder="🌱 (emoji or icon identifier)" /></div>
            <div>
              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer mt-2">
                <input type="checkbox" checked={form.published} onChange={e => setForm(f => ({ ...f, published: e.target.checked }))} className="w-4 h-4 accent-[#0e1f3d]" />
                Published (visible on public site)
              </label>
            </div>
            <button onClick={save} disabled={saving} className="w-full bg-[#0e1f3d] hover:bg-[#1a3a6e] disabled:bg-gray-300 text-white font-bold py-2.5 rounded-xl text-sm transition-colors">{saving ? "Saving…" : "Save Program"}</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════
   PUBLICATIONS TAB
══════════════════════════════════════════ */
function PublicationsTab() {
  const [rows, setRows] = useState<DBPublication[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<null | "add" | DBPublication>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const blank: Omit<DBPublication, "id" | "created_at" | "updated_at"> = { title: "", subtitle: "", description: "", tags: "", pdf_url: "", cover_image: "", published_at: "", featured: false, published: true };
  const [form, setForm] = useState(blank);

  const load = async () => { setLoading(true); const { data } = await adminQueries.publications.list(); setRows(data ?? []); setLoading(false); };
  useEffect(() => { load(); }, []);

  const openAdd = () => { setForm(blank); setError(""); setModal("add"); };
  const openEdit = (r: DBPublication) => { setForm({ title: r.title, subtitle: r.subtitle, description: r.description, tags: r.tags, pdf_url: r.pdf_url, cover_image: r.cover_image, published_at: r.published_at, featured: r.featured, published: r.published }); setError(""); setModal(r); };

  const save = async () => {
    if (!form.title.trim()) { setError("Title is required."); return; }
    setSaving(true); setError("");
    if (modal === "add") { const { error } = await adminQueries.publications.insert(form); if (error) { setError(error.message); setSaving(false); return; } }
    else if (modal && typeof modal === "object") { const { error } = await adminQueries.publications.update(modal.id, form); if (error) { setError(error.message); setSaving(false); return; } }
    setSaving(false); setModal(null); load();
  };
  const del = async (id: string) => { if (!confirm("Delete this publication?")) return; await adminQueries.publications.delete(id); load(); };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500">Published items appear in the Research &amp; Publications page.</p>
        <button onClick={openAdd} className="bg-[#0e1f3d] hover:bg-[#1a3a6e] text-white font-bold text-sm px-5 py-2 rounded-xl transition-colors">+ Add Publication</button>
      </div>
      {loading ? <Spinner /> : rows.length === 0 ? <EmptyState msg="No publications yet." /> : (
        <div className="overflow-x-auto rounded-xl border border-gray-100">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-[#0e1f3d] text-xs uppercase tracking-wide">
              <tr><th className="text-left px-4 py-3">Title</th><th className="text-left px-4 py-3">Tags</th><th className="text-left px-4 py-3">Status</th><th className="px-4 py-3" /></tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {rows.map(r => (
                <tr key={r.id} className="hover:bg-gray-50/50">
                  <td className="px-4 py-3 font-medium text-[#0e1f3d] max-w-[200px] truncate">{r.title}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs max-w-[150px] truncate">{r.tags}</td>
                  <td className="px-4 py-3">{r.published ? <Badge label="Published" color="bg-green-50 text-green-700" /> : <Badge label="Draft" color="bg-gray-100 text-gray-500" />}{r.featured && <Badge label="Featured" color="bg-[#d4a017]/10 text-[#d4a017] ml-1" />}</td>
                  <td className="px-4 py-3 text-right"><button onClick={() => openEdit(r)} className="text-[#0e1f3d] hover:underline text-xs font-bold mr-3">Edit</button><button onClick={() => del(r.id)} className="text-red-500 hover:underline text-xs font-bold">Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {modal !== null && (
        <Modal title={modal === "add" ? "Add Publication" : "Edit Publication"} onClose={() => setModal(null)}>
          <div className="space-y-4">
            {error && <p className="text-red-500 text-xs bg-red-50 rounded-lg px-3 py-2">{error}</p>}
            <div><label className={labelCls}>Title *</label><input className={inputCls} value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Publication title" /></div>
            <div><label className={labelCls}>Subtitle</label><input className={inputCls} value={form.subtitle} onChange={e => setForm(f => ({ ...f, subtitle: e.target.value }))} placeholder="Click to view or download" /></div>
            <div><label className={labelCls}>Description</label><textarea className={textareaCls} rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Brief description..." /></div>
            <div><label className={labelCls}>Tags</label><input className={inputCls} value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} placeholder="e.g. Research, Climate, Policy (comma-separated)" /></div>
            <div><label className={labelCls}>Cover Image URL</label><input className={inputCls} value={form.cover_image} onChange={e => setForm(f => ({ ...f, cover_image: e.target.value }))} placeholder="https://..." /></div>
            <div><label className={labelCls}>PDF / Download URL</label><input className={inputCls} value={form.pdf_url} onChange={e => setForm(f => ({ ...f, pdf_url: e.target.value }))} placeholder="https://... or /file.pdf" /></div>
            <div><label className={labelCls}>Published Date</label><input type="date" className={inputCls} value={form.published_at ? form.published_at.slice(0, 10) : ""} onChange={e => setForm(f => ({ ...f, published_at: e.target.value }))} /></div>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 text-sm cursor-pointer"><input type="checkbox" checked={form.published} onChange={e => setForm(f => ({ ...f, published: e.target.checked }))} className="w-4 h-4 accent-[#0e1f3d]" />Published</label>
              <label className="flex items-center gap-2 text-sm cursor-pointer"><input type="checkbox" checked={form.featured} onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))} className="w-4 h-4 accent-[#d4a017]" />Featured</label>
            </div>
            <button onClick={save} disabled={saving} className="w-full bg-[#0e1f3d] hover:bg-[#1a3a6e] disabled:bg-gray-300 text-white font-bold py-2.5 rounded-xl text-sm transition-colors">{saving ? "Saving…" : "Save Publication"}</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════
   CONTACT SUBMISSIONS
══════════════════════════════════════════ */
function ContactsTab() {
  const [rows, setRows] = useState<DBContact[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [rlsError, setRlsError] = useState(false);

  const load = async () => {
    setLoading(true);
    setRlsError(false);
    let { data, error } = await adminQueries.contacts.list();
    if (error) {
      const fb = await adminQueries.contacts.listFallback();
      data = fb.data;
      error = fb.error;
    }
    if (error && (error.code === "42501" || error.message?.toLowerCase().includes("policy") || error.message?.toLowerCase().includes("permission"))) {
      setRlsError(true);
    }
    setRows(data ?? []);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const del = async (id: string) => { if (!confirm("Delete this submission?")) return; await adminQueries.contacts.delete(id); load(); };

  return (
    <div>
      <p className="text-sm text-gray-500 mb-4">Messages submitted through the Contact page.</p>

      {rlsError && (
        <div className="mb-4 bg-amber-50 border border-amber-200 rounded-2xl p-5">
          <p className="font-bold text-amber-800 text-sm mb-2">Permission issue — run this SQL in Supabase to fix it:</p>
          <pre className="bg-white border border-amber-100 rounded-xl p-3 text-xs text-gray-700 overflow-x-auto whitespace-pre-wrap">{`CREATE POLICY "Admin reads contact_submissions"
  ON public.contact_submissions FOR SELECT
  TO authenticated USING (true);

CREATE POLICY "Admin deletes contact_submissions"
  ON public.contact_submissions FOR DELETE
  TO authenticated USING (true);`}</pre>
        </div>
      )}

      {!rlsError && rows.length === 0 && !loading && (
        <div className="mb-4 bg-blue-50 border border-blue-100 rounded-2xl p-5">
          <p className="font-bold text-blue-800 text-sm mb-2">No messages yet — or RLS may be blocking access. Run this SQL in Supabase to ensure admins can read all messages:</p>
          <pre className="bg-white border border-blue-100 rounded-xl p-3 text-xs text-gray-700 overflow-x-auto whitespace-pre-wrap">{`CREATE POLICY "Admin reads contact_submissions"
  ON public.contact_submissions FOR SELECT
  TO authenticated USING (true);

CREATE POLICY "Admin deletes contact_submissions"
  ON public.contact_submissions FOR DELETE
  TO authenticated USING (true);`}</pre>
        </div>
      )}

      {loading ? <Spinner /> : rows.length === 0 ? null : (
        <div className="space-y-2">
          {rows.map(r => (
            <div key={r.id} className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
              <button onClick={() => setExpanded(expanded === r.id ? null : r.id)} className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-[#0e1f3d]/10 flex items-center justify-center text-[#0e1f3d] font-bold text-xs flex-shrink-0">{(r.name || r.email)?.[0]?.toUpperCase() ?? "?"}</div>
                  <div className="min-w-0">
                    <p className="font-semibold text-[#0e1f3d] text-sm truncate">{r.name || "(no name)"} <span className="text-gray-400 font-normal text-xs">— {r.email}</span></p>
                    <p className="text-xs text-gray-400 truncate">{r.subject}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0 ml-3">
                  <span className="text-xs text-gray-400">{fmt(r.submitted_at || (r as Record<string, string>).created_at)}</span>
                  <svg className={`w-4 h-4 text-gray-400 transition-transform ${expanded === r.id ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </div>
              </button>
              {expanded === r.id && (
                <div className="px-4 pb-4 border-t border-gray-50">
                  <p className="text-gray-700 text-sm leading-relaxed mt-3 whitespace-pre-wrap">{r.message}</p>
                  <div className="flex items-center justify-between mt-3">
                    <a href={`mailto:${r.email}?subject=Re: ${encodeURIComponent(r.subject || "")}`} className="text-[#0e1f3d] hover:underline text-xs font-bold">Reply via Email →</a>
                    <button onClick={() => del(r.id)} className="text-red-400 hover:underline text-xs">Delete</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════
   DONATIONS
══════════════════════════════════════════ */
function DonationsTab() {
  const [rows, setRows] = useState<DBDonation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { (async () => { setLoading(true); const { data } = await adminQueries.donations.list(); setRows(data ?? []); setLoading(false); })(); }, []);

  const total = rows.reduce((s, r) => s + (Number(r.amount_kes) || 0), 0);

  return (
    <div>
      <div className="flex items-center gap-4 mb-4">
        <div className="bg-[#0e1f3d] text-white px-5 py-3 rounded-xl">
          <p className="text-xs text-white/60 uppercase tracking-wide">Total Donated</p>
          <p className="font-bold text-lg">KES {total.toLocaleString()}</p>
        </div>
        <div className="bg-[#d4a017]/10 text-[#d4a017] px-5 py-3 rounded-xl">
          <p className="text-xs uppercase tracking-wide">Total Donors</p>
          <p className="font-bold text-lg">{rows.length}</p>
        </div>
      </div>
      {loading ? <Spinner /> : rows.length === 0 ? <EmptyState msg="No donations recorded yet." /> : (
        <div className="overflow-x-auto rounded-xl border border-gray-100">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-[#0e1f3d] text-xs uppercase tracking-wide">
              <tr><th className="text-left px-4 py-3">Donor</th><th className="text-left px-4 py-3">Amount (KES)</th><th className="text-left px-4 py-3">Method</th><th className="text-left px-4 py-3">Reference</th><th className="text-left px-4 py-3">Date</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {rows.map(r => (
                <tr key={r.id} className="hover:bg-gray-50/50">
                  <td className="px-4 py-3"><p className="font-medium text-[#0e1f3d]">{r.donor_name}</p><p className="text-xs text-gray-400">{r.donor_email}</p></td>
                  <td className="px-4 py-3 font-bold text-[#0e1f3d]">{Number(r.amount_kes).toLocaleString()}</td>
                  <td className="px-4 py-3"><Badge label={r.payment_method || "—"} color="bg-blue-50 text-blue-700" /></td>
                  <td className="px-4 py-3 text-gray-500 text-xs font-mono">{r.reference || "—"}</td>
                  <td className="px-4 py-3 text-gray-400 text-xs">{fmt(r.donated_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════
   NEWSLETTER
══════════════════════════════════════════ */
function NewsletterTab() {
  const [rows, setRows] = useState<DBNewsletter[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => { setLoading(true); const { data } = await adminQueries.newsletter.list(); setRows(data ?? []); setLoading(false); };
  useEffect(() => { load(); }, []);

  const toggle = async (r: DBNewsletter) => { await adminQueries.newsletter.toggleActive(r.id, !r.active); load(); };
  const del = async (id: string) => { if (!confirm("Remove this subscriber?")) return; await adminQueries.newsletter.delete(id); load(); };

  const active = rows.filter(r => r.active).length;

  return (
    <div>
      <div className="flex items-center gap-4 mb-4">
        <div className="bg-[#0e1f3d] text-white px-5 py-3 rounded-xl"><p className="text-xs text-white/60 uppercase tracking-wide">Total Subscribers</p><p className="font-bold text-lg">{rows.length}</p></div>
        <div className="bg-green-50 text-green-700 px-5 py-3 rounded-xl"><p className="text-xs uppercase tracking-wide">Active</p><p className="font-bold text-lg">{active}</p></div>
      </div>
      {loading ? <Spinner /> : rows.length === 0 ? <EmptyState msg="No newsletter subscribers yet." /> : (
        <div className="overflow-x-auto rounded-xl border border-gray-100">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-[#0e1f3d] text-xs uppercase tracking-wide">
              <tr><th className="text-left px-4 py-3">Email</th><th className="text-left px-4 py-3">Name</th><th className="text-left px-4 py-3">Subscribed</th><th className="text-left px-4 py-3">Status</th><th className="px-4 py-3" /></tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {rows.map(r => (
                <tr key={r.id} className="hover:bg-gray-50/50">
                  <td className="px-4 py-3 text-[#0e1f3d] font-medium">{r.email}</td>
                  <td className="px-4 py-3 text-gray-500">{r.name || "—"}</td>
                  <td className="px-4 py-3 text-gray-400 text-xs">{fmt(r.subscribed_at)}</td>
                  <td className="px-4 py-3">{r.active ? <Badge label="Active" color="bg-green-50 text-green-700" /> : <Badge label="Unsubscribed" color="bg-gray-100 text-gray-500" />}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => toggle(r)} className="text-[#0e1f3d] hover:underline text-xs font-bold mr-3">{r.active ? "Deactivate" : "Activate"}</button>
                    <button onClick={() => del(r.id)} className="text-red-500 hover:underline text-xs font-bold">Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════
   USERS TAB
══════════════════════════════════════════ */
function UsersTab() {
  const [rows, setRows] = useState<DBUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [subscribedEmails, setSubscribedEmails] = useState<Set<string>>(new Set());
  const [subscribing, setSubscribing] = useState<string | null>(null);
  const [toast, setToast] = useState("");
  const { user: currentUser } = useAuth();

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  const load = async () => {
    setLoading(true);
    const [usersRes, nlRes] = await Promise.all([
      adminQueries.users.list(),
      adminQueries.newsletter.listEmails(),
    ]);
    setRows((usersRes.data as DBUser[]) ?? []);
    const emails = new Set<string>((nlRes.data ?? []).map((r: { email: string }) => r.email.toLowerCase()));
    setSubscribedEmails(emails);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const toggleAdmin = async (r: DBUser) => {
    if (r.email === currentUser?.email) { alert("You cannot remove your own admin access."); return; }
    await adminQueries.users.toggleAdmin(r.id, !r.is_admin);
    showToast(r.is_admin ? `${r.email} removed from admin.` : `${r.email} is now an admin.`);
    load();
  };

  const subscribeToNewsletter = async (r: DBUser) => {
    setSubscribing(r.email);
    const { error } = await adminQueries.newsletter.subscribe(r.email, r.full_name || "");
    if (error) {
      showToast(`Error: ${error.message}`);
    } else {
      showToast(`${r.email} subscribed to newsletter.`);
      setSubscribedEmails(prev => new Set([...prev, r.email.toLowerCase()]));
    }
    setSubscribing(null);
  };

  return (
    <div className="relative">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0e1f3d] text-white text-sm font-medium px-5 py-3 rounded-2xl shadow-2xl animate-fade-up">
          {toast}
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500">All registered users. Manage admin access or add to newsletter.</p>
        <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">{rows.length} users</span>
      </div>

      {loading ? <Spinner /> : rows.length === 0 ? <EmptyState msg="No users registered yet." /> : (
        <div className="overflow-x-auto rounded-xl border border-gray-100 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead style={{ background: "#f8f9fc" }}>
              <tr className="text-xs uppercase tracking-widest text-gray-400 border-b border-gray-100">
                <th className="text-left px-4 py-3">User</th>
                <th className="text-left px-4 py-3">Joined</th>
                <th className="text-left px-4 py-3">Role</th>
                <th className="text-left px-4 py-3">Newsletter</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {rows.map(r => {
                const isSubscribed = subscribedEmails.has(r.email.toLowerCase());
                return (
                  <tr key={r.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0e1f3d] to-[#1a3a6e] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                          {(r.full_name || r.email)?.[0]?.toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-[#0e1f3d] text-sm truncate">{r.full_name || <span className="text-gray-400 font-normal italic">No name</span>}</p>
                          <p className="text-xs text-gray-400 truncate">{r.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-xs whitespace-nowrap">{fmt(r.created_at)}</td>
                    <td className="px-4 py-3">
                      {r.is_admin
                        ? <Badge label="Admin" color="bg-[#d4a017]/10 text-[#d4a017]" />
                        : <Badge label="Member" color="bg-gray-100 text-gray-500" />}
                    </td>
                    <td className="px-4 py-3">
                      {isSubscribed
                        ? <Badge label="Subscribed" color="bg-emerald-50 text-emerald-600" />
                        : <button
                            onClick={() => subscribeToNewsletter(r)}
                            disabled={subscribing === r.email}
                            className="text-xs font-semibold text-[#0e1f3d] border border-[#0e1f3d]/20 hover:border-[#0e1f3d] hover:bg-[#0e1f3d] hover:text-white px-3 py-1 rounded-lg transition-all disabled:opacity-40"
                          >
                            {subscribing === r.email ? "Adding…" : "+ Subscribe"}
                          </button>
                      }
                    </td>
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <button
                        onClick={() => toggleAdmin(r)}
                        className={`text-xs font-semibold px-3 py-1 rounded-lg transition-all ${
                          r.is_admin
                            ? "text-red-500 border border-red-200 hover:bg-red-50"
                            : "text-[#0e1f3d] border border-[#0e1f3d]/20 hover:bg-[#0e1f3d] hover:text-white"
                        }`}
                      >
                        {r.is_admin ? "Revoke Admin" : "Make Admin"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════
   ADMIN ACCESS TAB
══════════════════════════════════════════ */
interface PreApprovedAdmin { id: string; email: string; added_at: string; }

function AdminAccessTab() {
  const [rows, setRows] = useState<PreApprovedAdmin[]>([]);
  const [loading, setLoading] = useState(true);
  const [newEmail, setNewEmail] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const load = async () => {
    setLoading(true);
    const { data, error: err } = await adminQueries.preApprovedAdmins.list();
    if (err) {
      if (err.message.includes("does not exist") || err.code === "42P01") {
        setError("setup-needed");
      }
    } else {
      setRows((data as PreApprovedAdmin[]) ?? []);
    }
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = newEmail.trim().toLowerCase();
    if (!email || !email.includes("@")) { setError("Enter a valid email address."); return; }
    setSaving(true); setError(""); setSuccess("");
    const { error: err } = await adminQueries.preApprovedAdmins.add(email);
    if (err) {
      setError(err.message.includes("duplicate") ? "This email is already in the admin list." : err.message);
    } else {
      setNewEmail("");
      setSuccess(`${email} has been added as admin.`);
      load();
    }
    setSaving(false);
  };

  const remove = async (email: string) => {
    if (!confirm(`Remove admin access for ${email}?`)) return;
    await adminQueries.preApprovedAdmins.remove(email);
    setSuccess(`${email} removed from admin list.`);
    load();
  };

  if (error === "setup-needed") {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
        <h3 className="font-bold text-amber-800 mb-2">One-time setup required</h3>
        <p className="text-amber-700 text-sm mb-4">Run the following SQL in your Supabase SQL editor to enable admin email management:</p>
        <pre className="bg-white border border-amber-200 rounded-xl p-4 text-xs text-gray-800 overflow-x-auto whitespace-pre-wrap">{`CREATE TABLE IF NOT EXISTS public.pre_approved_admins (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text UNIQUE NOT NULL,
  added_at timestamptz DEFAULT now()
);
ALTER TABLE public.pre_approved_admins ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all for authenticated users"
  ON public.pre_approved_admins FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);`}</pre>
        <button onClick={load} className="mt-4 bg-amber-600 hover:bg-amber-700 text-white text-sm font-bold px-4 py-2 rounded-xl transition-colors">Check again after running SQL</button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-gray-500 mb-4">
          Add email addresses here to grant admin panel access. When someone with a pre-approved email signs in, they will automatically have admin privileges.
        </p>

        <form onSubmit={add} className="flex gap-2 mb-4">
          <input
            type="email"
            value={newEmail}
            onChange={e => { setNewEmail(e.target.value); setError(""); setSuccess(""); }}
            placeholder="Enter email address to grant admin access"
            className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0e1f3d]/20 focus:border-[#0e1f3d]"
          />
          <button
            type="submit"
            disabled={saving || !newEmail.trim()}
            className="bg-[#0e1f3d] hover:bg-[#1a3a6e] disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors whitespace-nowrap"
          >
            {saving ? "Adding…" : "+ Add Admin"}
          </button>
        </form>

        {typeof error === "string" && error && error !== "setup-needed" && (
          <p className="text-red-600 text-xs bg-red-50 border border-red-100 px-3 py-2 rounded-xl mb-3">{error}</p>
        )}
        {success && (
          <p className="text-green-700 text-xs bg-green-50 border border-green-100 px-3 py-2 rounded-xl mb-3">{success}</p>
        )}
      </div>

      {loading ? <Spinner /> : rows.length === 0 ? (
        <EmptyState msg="No pre-approved admin emails yet. Add one above." />
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-100">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-[#0e1f3d] text-xs uppercase tracking-wide">
              <tr>
                <th className="text-left px-4 py-3">Email</th>
                <th className="text-left px-4 py-3">Added</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {rows.map(r => (
                <tr key={r.id} className="hover:bg-gray-50/50">
                  <td className="px-4 py-3 font-medium text-[#0e1f3d]">{r.email}</td>
                  <td className="px-4 py-3 text-gray-400 text-xs">{fmt(r.added_at)}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => remove(r.email)} className="text-red-500 hover:underline text-xs font-bold">Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN ADMIN PAGE
══════════════════════════════════════════ */
type Tab = "events" | "programs" | "publications" | "contacts" | "donations" | "newsletter" | "users" | "admin-access";

const TABS: { key: Tab; label: string; emoji: string }[] = [
  { key: "events", label: "Events", emoji: "📅" },
  { key: "programs", label: "Programs", emoji: "🌱" },
  { key: "publications", label: "Publications", emoji: "📄" },
  { key: "contacts", label: "Contact Messages", emoji: "📬" },
  { key: "donations", label: "Donations", emoji: "💰" },
  { key: "newsletter", label: "Newsletter", emoji: "📧" },
  { key: "users", label: "Users", emoji: "👥" },
  { key: "admin-access", label: "Admin Access", emoji: "🔑" },
];

export default function Admin() {
  const { user, loading } = useAuth();
  const [, navigate] = useLocation();
  const [tab, setTab] = useState<Tab>("events");
  const [panelReady, setPanelReady] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "radial-gradient(ellipse at 30% 20%, #112244 0%, #0a1628 60%, #060e1a 100%)" }}>
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-2 border-white/10" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#d4a017] animate-spin" />
        </div>
        <p className="text-white/30 text-xs tracking-widest uppercase">Loading</p>
      </div>
    </div>
  );

  if (!user) { navigate("/login"); return null; }

  if (!user.isAdmin) return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "radial-gradient(ellipse at 30% 20%, #112244 0%, #0a1628 60%, #060e1a 100%)" }}>
      <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-3xl p-10 max-w-md w-full text-center animate-fade-up">
        <div className="w-16 h-16 bg-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-5">
          <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-white mb-2">Access Denied</h2>
        <p className="text-white/40 text-sm mb-8">Your account does not have admin privileges. Contact the EJF team to request access.</p>
        <button onClick={() => navigate("/")} className="bg-[#d4a017] hover:bg-[#b8880f] text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors">Back to Home</button>
      </div>
    </div>
  );

  if (!panelReady) return <AdminLoadingScreen onDone={() => setPanelReady(true)} />;

  const currentTab = TABS.find(t => t.key === tab);

  return (
    <div className="min-h-screen flex" style={{ background: "#f0f2f7" }}>
      {/* ── SIDEBAR ── */}
      <aside className={`fixed inset-y-0 left-0 z-40 flex flex-col transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        style={{ width: 240, background: "linear-gradient(180deg, #0a1628 0%, #0e1f3d 100%)", borderRight: "1px solid rgba(255,255,255,0.06)" }}>

        <div className="flex items-center gap-3 px-5 py-5 border-b" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
          <div className="w-9 h-9 bg-gradient-to-br from-[#d4a017] to-[#b8880f] rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <p className="text-white font-bold text-sm leading-tight">EJF Admin</p>
            <p className="text-white/30 text-[10px] leading-tight tracking-wide">Control Center</p>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="ml-auto md:hidden text-white/40 hover:text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {TABS.map(t => (
            <button
              key={t.key}
              onClick={() => { setTab(t.key); setSidebarOpen(false); }}
              className={`admin-sidebar-item w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                tab === t.key
                  ? "active bg-white/10 text-white"
                  : "text-white/40 hover:bg-white/5 hover:text-white/70"
              }`}
            >
              <span className="text-base w-5 text-center flex-shrink-0">{t.emoji}</span>
              <span>{t.label}</span>
              {tab === t.key && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#d4a017]" />}
            </button>
          ))}
        </nav>

        <div className="px-4 py-4 border-t" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-7 h-7 rounded-full bg-[#d4a017] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {user.email?.slice(0, 1).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-white text-xs font-semibold truncate">{user.name || "Admin"}</p>
              <p className="text-white/30 text-[10px] truncate">{user.email}</p>
            </div>
          </div>
          <button
            onClick={() => navigate("/")}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5 text-xs font-medium transition-all"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            View Public Site
          </button>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 z-30 bg-black/50 md:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* ── MAIN ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="bg-white border-b border-gray-200/80 px-6 py-3.5 flex items-center gap-4 sticky top-0 z-20 shadow-sm">
          <button onClick={() => setSidebarOpen(true)} className="md:hidden p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>

          <div className="flex items-center gap-2 min-w-0">
            <span className="text-lg">{currentTab?.emoji}</span>
            <div>
              <h1 className="text-sm font-bold text-[#0e1f3d] leading-tight">{currentTab?.label}</h1>
              <p className="text-[10px] text-gray-400 leading-tight">Economic Justice Forum</p>
            </div>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-full px-3 py-1">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-emerald-700 text-xs font-semibold">Live</span>
            </div>
            <div className="hidden md:flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-full px-3 py-1.5">
              <div className="w-6 h-6 rounded-full bg-[#d4a017] flex items-center justify-center text-white text-[10px] font-bold">
                {user.email?.slice(0, 1).toUpperCase()}
              </div>
              <span className="text-gray-600 text-xs font-medium max-w-[140px] truncate">{user.email}</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-5 md:p-7 pb-24 md:pb-7 overflow-auto">
          <div className="max-w-5xl mx-auto tab-content-enter" key={tab}>
            {tab === "events" && <EventsTab />}
            {tab === "programs" && <ProgramsTab />}
            {tab === "publications" && <PublicationsTab />}
            {tab === "contacts" && <ContactsTab />}
            {tab === "donations" && <DonationsTab />}
            {tab === "newsletter" && <NewsletterTab />}
            {tab === "users" && <UsersTab />}
            {tab === "admin-access" && <AdminAccessTab />}
          </div>
        </main>

        {/* Mobile bottom bar */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-20 flex overflow-x-auto shadow-lg">
          {TABS.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`flex-shrink-0 flex flex-col items-center gap-0.5 px-3 py-2.5 min-w-[60px] text-[9px] font-bold tracking-wide uppercase transition-colors ${
                tab === t.key ? "text-[#0e1f3d] border-t-2 border-[#d4a017]" : "text-gray-300 border-t-2 border-transparent"
              }`}>
              <span className="text-lg">{t.emoji}</span>
              {t.label.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
