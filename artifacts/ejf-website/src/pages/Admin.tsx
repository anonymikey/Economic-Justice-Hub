import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useLocation } from "wouter";
import { adminQueries, DBEvent, DBProgram, DBPublication, DBContact, DBDonation, DBNewsletter, DBUser } from "@/lib/adminQueries";

/* ─── helpers ─── */
function fmt(dt: string) {
  if (!dt) return "—";
  return new Date(dt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}
function Badge({ label, color }: { label: string; color: string }) {
  return <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold ${color}`}>{label}</span>;
}
function Spinner() {
  return <div className="flex justify-center py-12"><div className="w-8 h-8 border-4 border-[#0e1f3d]/20 border-t-[#0e1f3d] rounded-full animate-spin" /></div>;
}
function EmptyState({ msg }: { msg: string }) {
  return <div className="text-center py-12 text-gray-400 text-sm">{msg}</div>;
}

/* ─── MODAL ─── */
function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="font-bold text-[#0e1f3d] text-base">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl font-bold leading-none">×</button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

/* ─── INPUT HELPERS ─── */
const labelCls = "block text-xs font-bold text-[#0e1f3d] mb-1 uppercase tracking-wide";
const inputCls = "w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0e1f3d]/20 focus:border-[#0e1f3d]";
const textareaCls = `${inputCls} resize-none`;

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

  const load = async () => { setLoading(true); const { data } = await adminQueries.contacts.list(); setRows(data ?? []); setLoading(false); };
  useEffect(() => { load(); }, []);

  const del = async (id: string) => { if (!confirm("Delete this submission?")) return; await adminQueries.contacts.delete(id); load(); };

  return (
    <div>
      <p className="text-sm text-gray-500 mb-4">Messages submitted through the Contact page.</p>
      {loading ? <Spinner /> : rows.length === 0 ? <EmptyState msg="No contact submissions yet." /> : (
        <div className="space-y-2">
          {rows.map(r => (
            <div key={r.id} className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
              <button onClick={() => setExpanded(expanded === r.id ? null : r.id)} className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-[#0e1f3d]/10 flex items-center justify-center text-[#0e1f3d] font-bold text-xs flex-shrink-0">{r.name?.[0]?.toUpperCase() ?? "?"}</div>
                  <div className="min-w-0">
                    <p className="font-semibold text-[#0e1f3d] text-sm truncate">{r.name} <span className="text-gray-400 font-normal">— {r.email}</span></p>
                    <p className="text-xs text-gray-400 truncate">{r.subject}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0 ml-3">
                  <span className="text-xs text-gray-400">{fmt(r.submitted_at)}</span>
                  <svg className={`w-4 h-4 text-gray-400 transition-transform ${expanded === r.id ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </div>
              </button>
              {expanded === r.id && (
                <div className="px-4 pb-4 border-t border-gray-50">
                  <p className="text-gray-700 text-sm leading-relaxed mt-3 whitespace-pre-wrap">{r.message}</p>
                  <div className="flex items-center justify-between mt-3">
                    <a href={`mailto:${r.email}?subject=Re: ${encodeURIComponent(r.subject)}`} className="text-[#0e1f3d] hover:underline text-xs font-bold">Reply via Email →</a>
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
  const { user: currentUser } = useAuth();

  const load = async () => { setLoading(true); const { data } = await adminQueries.users.list(); setRows((data as DBUser[]) ?? []); setLoading(false); };
  useEffect(() => { load(); }, []);

  const toggle = async (r: DBUser) => {
    if (r.email === currentUser?.email) { alert("You cannot remove your own admin access."); return; }
    await adminQueries.users.toggleAdmin(r.id, !r.is_admin); load();
  };

  return (
    <div>
      <p className="text-sm text-gray-500 mb-4">All registered users. Toggle admin access to grant or revoke admin panel access.</p>
      {loading ? <Spinner /> : rows.length === 0 ? <EmptyState msg="No users registered yet." /> : (
        <div className="overflow-x-auto rounded-xl border border-gray-100">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-[#0e1f3d] text-xs uppercase tracking-wide">
              <tr><th className="text-left px-4 py-3">User</th><th className="text-left px-4 py-3">Organization</th><th className="text-left px-4 py-3">Joined</th><th className="text-left px-4 py-3">Role</th><th className="px-4 py-3" /></tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {rows.map(r => (
                <tr key={r.id} className="hover:bg-gray-50/50">
                  <td className="px-4 py-3"><p className="font-medium text-[#0e1f3d]">{r.full_name || "—"}</p><p className="text-xs text-gray-400">{r.email}</p></td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{r.organization || "—"}</td>
                  <td className="px-4 py-3 text-gray-400 text-xs">{fmt(r.created_at)}</td>
                  <td className="px-4 py-3">{r.is_admin ? <Badge label="Admin" color="bg-[#d4a017]/10 text-[#d4a017]" /> : <Badge label="Member" color="bg-gray-100 text-gray-600" />}</td>
                  <td className="px-4 py-3 text-right"><button onClick={() => toggle(r)} className="text-[#0e1f3d] hover:underline text-xs font-bold">{r.is_admin ? "Remove Admin" : "Make Admin"}</button></td>
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
type Tab = "events" | "programs" | "publications" | "contacts" | "donations" | "newsletter" | "users";

const TABS: { key: Tab; label: string; emoji: string }[] = [
  { key: "events", label: "Events", emoji: "📅" },
  { key: "programs", label: "Programs", emoji: "🌱" },
  { key: "publications", label: "Publications", emoji: "📄" },
  { key: "contacts", label: "Contact Messages", emoji: "📬" },
  { key: "donations", label: "Donations", emoji: "💰" },
  { key: "newsletter", label: "Newsletter", emoji: "📧" },
  { key: "users", label: "Users", emoji: "👥" },
];

export default function Admin() {
  const { user, loading } = useAuth();
  const [, navigate] = useLocation();
  const [tab, setTab] = useState<Tab>("events");

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-[#0e1f3d]/20 border-t-[#0e1f3d] rounded-full animate-spin" />
    </div>
  );

  if (!user) { navigate("/login"); return null; }

  if (!user.isAdmin) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-10 max-w-md w-full text-center">
        <div className="text-5xl mb-4">🔒</div>
        <h2 className="text-xl font-bold text-[#0e1f3d] mb-2">Admin Access Only</h2>
        <p className="text-gray-500 text-sm mb-6">Your account does not have admin privileges. Contact the EJF team to request access.</p>
        <button onClick={() => navigate("/")} className="bg-[#0e1f3d] text-white font-semibold px-6 py-2.5 rounded-xl text-sm hover:bg-[#1a3a6e] transition-colors">Back to Home</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#0e1f3d] text-white px-6 py-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <img src="/logo.jpeg" alt="EJF" className="w-8 h-8 rounded-lg object-cover" />
          <div>
            <h1 className="font-bold text-base leading-tight">EJF Admin Panel</h1>
            <p className="text-white/50 text-xs">Economic Justice Forum</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-white/60 text-xs hidden sm:block">Signed in as <span className="text-[#d4a017] font-bold">{user.email}</span></span>
          <button onClick={() => navigate("/")} className="border border-white/20 hover:border-white/40 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors">← View Site</button>
        </div>
      </div>

      <div className="flex min-h-[calc(100vh-64px)]">
        {/* Sidebar */}
        <aside className="w-52 bg-white border-r border-gray-100 flex-shrink-0 hidden md:block">
          <nav className="p-3 space-y-0.5 sticky top-0">
            {TABS.map(t => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  tab === t.key ? "bg-[#0e1f3d] text-white shadow-sm" : "text-gray-600 hover:bg-gray-50 hover:text-[#0e1f3d]"
                }`}
              >
                <span>{t.emoji}</span> {t.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Mobile tab bar */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-40 flex overflow-x-auto">
          {TABS.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)} className={`flex-shrink-0 flex flex-col items-center gap-0.5 px-3 py-2 text-[10px] font-semibold transition-colors ${tab === t.key ? "text-[#0e1f3d] border-t-2 border-[#0e1f3d]" : "text-gray-400"}`}>
              <span className="text-base">{t.emoji}</span>{t.label.split(" ")[0]}
            </button>
          ))}
        </div>

        {/* Main content */}
        <main className="flex-1 p-6 pb-24 md:pb-6 overflow-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-[#0e1f3d] mb-1">{TABS.find(t => t.key === tab)?.emoji} {TABS.find(t => t.key === tab)?.label}</h2>
            <div className="w-10 h-0.5 bg-[#d4a017] mb-5" />
            {tab === "events" && <EventsTab />}
            {tab === "programs" && <ProgramsTab />}
            {tab === "publications" && <PublicationsTab />}
            {tab === "contacts" && <ContactsTab />}
            {tab === "donations" && <DonationsTab />}
            {tab === "newsletter" && <NewsletterTab />}
            {tab === "users" && <UsersTab />}
          </div>
        </main>
      </div>
    </div>
  );
}
