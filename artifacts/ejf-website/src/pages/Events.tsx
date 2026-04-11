import React, { useState, useEffect, useRef, useCallback } from "react";
import { adminQueries, DBEvent } from "@/lib/adminQueries";

import ttnp1 from "@assets/latest1_18.50.56_551de1ff_1775865776636.jpg";
import ttnp2 from "@assets/latest2_2025-11-20_at_18.51.03_39cb7bbc_1775865776635.jpg";
import ttnp3 from "@assets/latest3_1775865776636.jpg";
import ttnp4 from "@assets/latest4_1775865776634.jpg";
import ttnp5 from "@assets/latest5_1775865776634.jpg";
import ttnp6 from "@assets/latest6_1775865776635.jpg";
import ttnp7 from "@assets/latest7_1775865776633.jpg";
import ttnp8 from "@assets/latest8_1775865776633.jpg";
import ttnp9 from "@assets/latest9_1775865776632.jpg";

import imp1  from "@assets/WhatsApp_Image_2026-04-08_at_17.24.05_(1)_1775866427134.jpeg";
import imp2  from "@assets/WhatsApp_Image_2026-04-08_at_17.23.54_1775866427135.jpeg";
import imp3  from "@assets/WhatsApp_Image_2026-04-08_at_17.23.53_(2)_1775866427136.jpeg";
import imp4  from "@assets/WhatsApp_Image_2026-04-08_at_17.23.53_1775866427137.jpeg";
import imp5  from "@assets/WhatsApp_Image_2026-04-08_at_17.23.52_1775866427138.jpeg";
import imp6  from "@assets/WhatsApp_Image_2026-04-08_at_17.23.47_1775866427139.jpeg";
import imp7  from "@assets/WhatsApp_Image_2026-04-08_at_17.23.46_1775866427139.jpeg";
import imp8  from "@assets/WhatsApp_Image_2026-04-08_at_17.21.24_1775866427140.jpeg";
import imp9  from "@assets/WhatsApp_Image_2026-04-08_at_17.21.08_1775866427140.jpeg";
import imp10 from "@assets/WhatsApp_Image_2026-04-08_at_17.20.48_1775866427141.jpeg";
import imp11 from "@assets/WhatsApp_Image_2026-04-08_at_17.24.02_1775866427142.jpeg";
import imp12 from "@assets/WhatsApp_Image_2026-04-08_at_17.24.03_1775866427142.jpeg";
import imp13 from "@assets/WhatsApp_Image_2026-04-08_at_17.24.05_1775866427143.jpeg";
import imp14 from "@assets/WhatsApp_Image_2026-04-08_at_17.24.09_(1)_1775866427143.jpeg";
import imp15 from "@assets/WhatsApp_Image_2026-04-08_at_17.24.09_1775866427144.jpeg";
import imp16 from "@assets/WhatsApp_Image_2026-04-08_at_17.24.11_1775866427144.jpeg";
import imp17 from "@assets/WhatsApp_Image_2026-04-08_at_17.24.12_1775866427145.jpeg";

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const soon = () => alert("To be updated Soon");

/* ─────────────────────────────────────────────
   COUNTDOWN HOOK
───────────────────────────────────────────── */
function useCountdown(targetDate: string) {
  const calc = () => {
    const diff = new Date(targetDate).getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const t = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(t);
  }, [targetDate]);
  return time;
}

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
type Category = "All" | "Environmental" | "Digital" | "Economic" | "Community";

interface Event {
  date: string;
  dateISO: string;
  title: string;
  location: string;
  time: string;
  desc: string;
  category: Category;
  color: string;
  emoji: string;
  featured?: boolean;
}

const upcomingEvents: Event[] = [
  {
    date: "Coming Soon — 2026",
    dateISO: "2026-12-31",
    title: "Community Benefit-Sharing Forum — Taita Taveta",
    location: "Taita Taveta County",
    time: "To Be Announced",
    desc: "Join community representatives, county officials, and civil society organizations to discuss equitable benefit-sharing models for natural resource revenues. Date and full details will be announced soon — subscribe to stay updated.",
    category: "Economic",
    color: "from-blue-900 to-blue-700",
    emoji: "⚖️",
    featured: true,
  },
  {
    date: "Coming Soon — 2026",
    dateISO: "2026-12-31",
    title: "Youth Climate Action Summit",
    location: "Mombasa County",
    time: "To Be Announced",
    desc: "Bringing together young climate champions from coastal counties to share experiences, build skills, and develop collective action plans for climate justice. Details coming soon.",
    category: "Environmental",
    color: "from-emerald-900 to-emerald-700",
    emoji: "🌿",
  },
  {
    date: "Coming Soon — 2026",
    dateISO: "2026-12-31",
    title: "Digital Inclusion Workshop Series",
    location: "Kilifi & Kwale Counties",
    time: "To Be Announced",
    desc: "Practical digital literacy training for community members, focusing on basic computer skills, internet usage, and online safety. Full schedule and registration details to be announced.",
    category: "Digital",
    color: "from-violet-900 to-violet-700",
    emoji: "💻",
  },
];

const recentHighlights = [
  {
    title: "National Economic Justice Convention 2025",
    date: "November 2025",
    location: "Nairobi",
    desc: "Brought together over 200 participants from civil society, government, academia, and communities to discuss strategies for achieving economic justice in Kenya.",
    emoji: "🏛️",
    bg: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Coastal Climate Resilience Forum",
    date: "August 2025",
    location: "Mombasa",
    desc: "Community leaders and climate experts developed action plans for building climate resilience in coastal communities affected by sea-level rise and extreme weather.",
    emoji: "🌊",
    bg: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Digital Rights Advocacy Training",
    date: "June 2025",
    location: "Taita Taveta",
    desc: "Equipped youth and community advocates with skills to promote digital rights and advocate for equitable technology access in marginalized communities.",
    emoji: "📱",
    bg: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
  },
];

const hostTypes = [
  {
    emoji: "🗣️",
    title: "Community Dialogues",
    desc: "Interactive forums on economic justice, climate action, or digital inclusion tailored to your community's specific context and needs.",
    color: "border-blue-400",
  },
  {
    emoji: "🎓",
    title: "Training Workshops",
    desc: "Capacity building sessions on leadership, advocacy, environmental conservation, or digital literacy for your organization or community group.",
    color: "border-[#d4a017]",
  },
  {
    emoji: "📜",
    title: "Policy Forums",
    desc: "Multi-stakeholder dialogues bringing together community representatives, government officials, and experts to discuss specific policy issues.",
    color: "border-emerald-400",
  },
];

/* ─────────────────────────────────────────────
   COUNTDOWN UNIT
───────────────────────────────────────────── */
function CountUnit({ val, label }: { val: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-14 h-14 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center text-2xl font-bold text-white tabular-nums">
        {String(val).padStart(2, "0")}
      </div>
      <span className="text-white/50 text-[10px] mt-1 uppercase tracking-widest">{label}</span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   HERO
───────────────────────────────────────────── */
function EventsHero() {
  return (
    <section className="relative bg-gradient-to-br from-[#0e1f3d] via-[#1a3a6e] to-[#0e1f3d] overflow-hidden py-20 px-4">
      {/* Decorative circles */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#d4a017]/5 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none" />
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

      <div className="relative max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#d4a017]/20 border border-[#d4a017]/40 text-[#d4a017] text-xs font-semibold px-4 py-1.5 rounded-full mb-5 uppercase tracking-widest">
              📅 Connect · Learn · Act
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-5 leading-tight">
              Events &amp;<br />Engagements
            </h1>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              Join us at our upcoming events, forums, and community engagements. EJF events bring together diverse stakeholders to discuss, learn, and collaborate on issues of economic, climate, social, and digital justice.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#upcoming" className="bg-[#d4a017] hover:bg-[#b8891a] text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-all hover:scale-105">
                View Upcoming →
              </a>
              <button onClick={soon} className="border border-white/30 hover:border-white/60 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-all">
                Subscribe to Updates
              </button>
            </div>
          </div>

          {/* Coming Soon — 2026 Events */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#d4a017]/20 border border-[#d4a017]/40 flex items-center justify-center text-3xl mb-4">
              🗓️
            </div>
            <p className="text-[#d4a017] text-xs font-bold uppercase tracking-widest mb-2">2026 Events</p>
            <h3 className="text-white font-bold text-lg mb-2">Upcoming Events Coming Soon</h3>
            <p className="text-white/55 text-xs leading-relaxed mb-5">
              Our 2026 events calendar is being finalised. Details for upcoming forums, summits, and community engagements will be announced shortly.
            </p>
            <div className="flex gap-2 mb-5">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-2 h-2 bg-[#d4a017]/60 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
              ))}
            </div>
            <button onClick={soon} className="w-full bg-[#d4a017] hover:bg-[#b8891a] text-white font-bold text-sm py-2.5 rounded-xl transition-all hover:scale-105">
              Subscribe for Announcements
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   FILTER BAR
───────────────────────────────────────────── */
function FilterBar({ active, setActive }: { active: Category; setActive: (c: Category) => void }) {
  const cats: Category[] = ["All", "Environmental", "Digital", "Economic", "Community"];
  const icons: Record<Category, string> = {
    All: "🌐", Environmental: "🌿", Digital: "💻", Economic: "⚖️", Community: "👥",
  };
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {cats.map((c) => (
        <button
          key={c}
          onClick={() => setActive(c)}
          className={`flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-full border transition-all ${
            active === c
              ? "bg-[#0e1f3d] text-white border-[#0e1f3d] shadow-md scale-105"
              : "bg-white text-gray-600 border-gray-200 hover:border-[#0e1f3d] hover:text-[#0e1f3d]"
          }`}
        >
          <span>{icons[c]}</span> {c}
        </button>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   EVENT CARD
───────────────────────────────────────────── */
function EventCard({ evt, idx }: { evt: Event; idx: number }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={`group bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-500 hover:-translate-y-1 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${idx * 100}ms` }}
    >
      {/* Top gradient stripe */}
      <div className={`h-2 bg-gradient-to-r ${evt.color}`} />

      <div className="p-6">
        {/* Date badge */}
        <div className="inline-flex items-center gap-1.5 bg-[#0e1f3d] text-white text-xs font-bold px-3 py-1.5 rounded-full mb-4">
          📅 {evt.date}
        </div>

        {/* Category pill */}
        <span className="float-right text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full font-medium">
          {evt.emoji} {evt.category}
        </span>

        <h3 className="text-[#0e1f3d] font-bold text-base leading-snug mb-3 clear-both group-hover:text-[#d4a017] transition-colors">
          {evt.title}
        </h3>

        <div className="space-y-1 mb-3">
          <p className="text-xs text-gray-600"><span className="font-bold text-[#0e1f3d]">📍 Location:</span> {evt.location}</p>
          <p className="text-xs text-gray-600"><span className="font-bold text-[#0e1f3d]">🕐 Time:</span> {evt.time}</p>
        </div>

        <p className="text-gray-500 text-xs leading-relaxed mb-5">{evt.desc}</p>

        <div className="flex gap-2">
          <button
            onClick={soon}
            className="flex-1 bg-[#0e1f3d] hover:bg-[#1a3a6e] text-white font-bold text-xs py-2.5 rounded-xl transition-all hover:scale-105"
          >
            Register to Attend
          </button>
          <button
            onClick={soon}
            className="flex-1 bg-[#d4a017] hover:bg-[#b8891a] text-white font-bold text-xs py-2.5 rounded-xl transition-all hover:scale-105"
          >
            Download Agenda
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   UPCOMING EVENTS
───────────────────────────────────────────── */
function dbEventToEvent(e: DBEvent): Event {
  const categoryMap: Record<string, string> = {
    Environmental: "from-emerald-900 to-emerald-700",
    Digital: "from-violet-900 to-violet-700",
    Economic: "from-blue-900 to-blue-700",
    Community: "from-orange-900 to-orange-700",
  };
  const emojiMap: Record<string, string> = { Environmental: "🌿", Digital: "💻", Economic: "⚖️", Community: "👥" };
  const cat = (e.category as Category) || "Community";
  return {
    date: e.date,
    dateISO: e.date_iso,
    title: e.title,
    location: e.location || "",
    time: e.time || "",
    desc: e.description || "",
    category: cat,
    color: categoryMap[cat] ?? "from-slate-900 to-slate-700",
    emoji: emojiMap[cat] ?? "📅",
    featured: e.featured,
  };
}

function UpcomingEvents() {
  const [filter, setFilter] = useState<Category>("All");
  const { ref, inView } = useInView();
  const [liveEvents, setLiveEvents] = useState<Event[]>([]);
  const [loadingLive, setLoadingLive] = useState(true);

  const fetchLive = useCallback(async () => {
    setLoadingLive(true);
    const { data } = await adminQueries.events.listPublished();
    if (data && data.length > 0) {
      setLiveEvents(data.map(dbEventToEvent));
    } else {
      setLiveEvents([]);
    }
    setLoadingLive(false);
  }, []);

  useEffect(() => { fetchLive(); }, [fetchLive]);

  const source = liveEvents.length > 0 ? liveEvents : upcomingEvents;
  const shown = filter === "All" ? source : source.filter((e) => e.category === filter);

  return (
    <section id="upcoming" className="bg-gray-50 py-14 px-4">
      <div className="max-w-5xl mx-auto">
        <div ref={ref} className={`mb-8 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <h2 className="text-2xl md:text-3xl font-bold text-[#0e1f3d] mb-1">Upcoming Events</h2>
          {liveEvents.length > 0 && (
            <p className="text-xs text-[#d4a017] font-semibold mb-1">● Live — updated by EJF team</p>
          )}
          <div className="w-12 h-0.5 bg-[#d4a017] mt-2 mb-6" />
          <FilterBar active={filter} setActive={setFilter} />
        </div>

        {loadingLive ? (
          <div className="flex justify-center py-12"><div className="w-8 h-8 border-4 border-[#0e1f3d]/20 border-t-[#0e1f3d] rounded-full animate-spin" /></div>
        ) : shown.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {shown.map((evt, i) => <EventCard key={evt.title} evt={evt} idx={i} />)}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-5xl mb-3">🔍</div>
            <p className="text-gray-500 font-semibold">No events in this category right now.</p>
            <button onClick={() => setFilter("All")} className="mt-3 text-[#d4a017] text-sm font-bold hover:underline">Clear filter</button>
          </div>
        )}

        {/* Newsletter CTA */}
        <div className="mt-10 bg-gradient-to-r from-[#0e1f3d] to-[#1a3a6e] rounded-2xl p-7 text-center shadow-lg">
          <p className="text-white font-bold text-base mb-1">Want to stay updated on all our events?</p>
          <p className="text-white/60 text-xs mb-4">Subscribe and never miss an EJF event or engagement.</p>
          <button
            onClick={soon}
            className="bg-[#d4a017] hover:bg-[#b8891a] text-white font-bold text-sm px-6 py-2.5 rounded-xl transition-all hover:scale-105"
          >
            Subscribe to Our Newsletter
          </button>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   SHARED PHOTO SCROLL GALLERY
───────────────────────────────────────────── */
type GalleryPhoto = { src: string; caption: string };

interface GalleryProps {
  id: string;
  photos: GalleryPhoto[];
  banner: React.ReactNode;
  eventLabel: string;
  bgClass?: string;
  speed?: number;
}

function PhotoScrollGallery({ id, photos, banner, eventLabel, bgClass = "bg-white", speed = 55 }: GalleryProps) {
  const { ref, inView } = useInView();
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);

  const total = photos.length;
  const open  = (idx: number) => setLightboxIdx(idx % total);
  const close = () => setLightboxIdx(null);
  const prev  = () => setLightboxIdx((i) => i === null ? 0 : (i - 1 + total) % total);
  const next  = () => setLightboxIdx((i) => i === null ? 0 : (i + 1) % total);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (lightboxIdx === null) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIdx]);

  const CARD_W  = 280;
  const GAP     = 14;
  const TOTAL_W = total * (CARD_W + GAP);
  const doubled = [...photos, ...photos];
  const animName = `scroll_${id}`;

  return (
    <section className={`${bgClass} py-14 px-4 overflow-hidden`}>
      <style>{`
        @keyframes ${animName} { 0% { transform: translateX(0); } 100% { transform: translateX(-${TOTAL_W}px); } }
        .strip-${id} { animation: ${animName} ${speed}s linear infinite; }
        .strip-${id}.paused { animation-play-state: paused; }
        @keyframes lbFade { from { opacity:0; transform:scale(0.97); } to { opacity:1; transform:scale(1); } }
      `}</style>

      <div className="max-w-6xl mx-auto">
        <div ref={ref} className={`mb-6 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          {banner}
        </div>

        {/* Strip */}
        <div className={`transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div
            className="relative overflow-hidden"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={() => setPaused(true)}
            onTouchEnd={() => setPaused(false)}
          >
            <div className="absolute left-0 top-0 bottom-0 w-14 bg-gradient-to-r from-white/80 to-transparent z-10 pointer-events-none" style={{ background: `linear-gradient(to right, var(--tw-gradient-from, white), transparent)` }} />
            <div className="absolute right-0 top-0 bottom-0 w-14 bg-gradient-to-l from-white/80 to-transparent z-10 pointer-events-none" />

            <div
              className={`strip-${id} flex${paused ? " paused" : ""}`}
              style={{ width: `${TOTAL_W * 2}px`, gap: GAP }}
            >
              {doubled.map((photo, i) => (
                <div
                  key={i}
                  onClick={() => open(i)}
                  className="flex-shrink-0 relative cursor-zoom-in group rounded-2xl overflow-hidden shadow-md hover:shadow-xl border-2 border-transparent hover:border-[#d4a017] transition-all duration-300"
                  style={{ width: CARD_W, height: 210 }}
                >
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                    <p className="text-white text-xs font-semibold leading-tight">{photo.caption}</p>
                    <p className="text-white/55 text-[10px] mt-0.5">Click to expand</p>
                  </div>
                  <div className="absolute top-2 right-2 w-7 h-7 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 px-2">
            <p className="text-gray-400 text-xs">{total} photos · Hover to pause · Click to expand</p>
            <div className="flex gap-1">
              {photos.map((_, i) => <div key={i} className="w-1.5 h-1.5 bg-[#d4a017]/40 rounded-full" />)}
            </div>
          </div>
        </div>
      </div>

      {/* LIGHTBOX */}
      {lightboxIdx !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 backdrop-blur-sm" onClick={close}>
          <button onClick={close} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center text-xl transition-colors z-10" aria-label="Close">×</button>
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs font-bold px-4 py-1.5 rounded-full border border-white/10 z-10">
            {lightboxIdx + 1} / {total}
          </div>
          <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-3 md:left-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white flex items-center justify-center transition-all z-10" aria-label="Previous">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <div className="relative max-w-[95vw] max-h-[88vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <img
              key={lightboxIdx}
              src={photos[lightboxIdx].src}
              alt={photos[lightboxIdx].caption}
              className="max-h-[80vh] max-w-[90vw] object-contain rounded-xl shadow-2xl"
              style={{ animation: "lbFade 0.25s ease-out" }}
            />
            <div className="mt-3 bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl px-5 py-2.5 text-center">
              <p className="text-white font-semibold text-sm">{photos[lightboxIdx].caption}</p>
              <p className="text-white/40 text-xs mt-0.5">{eventLabel}</p>
            </div>
          </div>
          <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-3 md:right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white flex items-center justify-center transition-all z-10" aria-label="Next">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      )}
    </section>
  );
}

/* ─────────────────────────────────────────────
   IMPACT360 GALLERY — 2026 (LATEST)
───────────────────────────────────────────── */
const IMPACT360_PHOTOS: GalleryPhoto[] = [
  { src: imp3,  caption: "IMPACT360 participants group photo" },
  { src: imp4,  caption: "Fellows attending the Budget Power Lab session" },
  { src: imp5,  caption: "Facilitator presenting to youth fellows" },
  { src: imp12, caption: "Speaker addressing Budget Power Lab participants" },
  { src: imp17, caption: "Presenter at the IMPACT360 podium" },
  { src: imp11, caption: "Interactive group session — IMPACT360" },
  { src: imp2,  caption: "Expert speaker engaging youth fellows" },
  { src: imp16, caption: "Facilitator leading a session at The Avid Hotel" },
  { src: imp15, caption: "Speaker presenting at the Budget Power Lab" },
  { src: imp6,  caption: "EJF team in solidarity at the IMPACT360 banner" },
  { src: imp1,  caption: "Participants posing at the IMPACT360 banner" },
  { src: imp13, caption: "Delegates at the Budget Power Lab launch" },
  { src: imp8,  caption: "Youth fellows at the IMPACT360 Budget Power Lab" },
  { src: imp9,  caption: "IMPACT360 participants at the event venue" },
  { src: imp14, caption: "EJF leadership and ActionAid partners" },
  { src: imp7,  caption: "Celebration — cake cutting at IMPACT360" },
  { src: imp10, caption: "Fellows sharing a meal at the IMPACT360 launch" },
];

function Impact360Gallery() {
  return (
    <PhotoScrollGallery
      id="impact360"
      photos={IMPACT360_PHOTOS}
      eventLabel="IMPACT360 Budget Power Lab · EJF & ActionAid Kenya · April 2026"
      bgClass="bg-white"
      speed={90}
      banner={
        <div>
          <div className="inline-flex items-center gap-2 bg-[#d4a017]/10 border border-[#d4a017]/30 text-[#d4a017] text-[10px] font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-widest">
            ⭐ Latest Event — April 2026
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#0e1f3d] mb-1">IMPACT360 — Budget Power Lab Launch</h2>
          <p className="text-gray-500 text-sm mb-4">EJF partnered with ActionAid Kenya to launch the IMPACT360 Budget Power Lab — empowering youth as Legislative Budget Fellows to claim Budget Power to the Youth.</p>
          <div className="w-12 h-0.5 bg-[#d4a017] mb-5" />
          <div className="bg-gradient-to-r from-[#0e1f3d] to-[#1a3a6e] rounded-2xl p-5 text-center">
            <p className="text-[#d4a017] font-black text-lg md:text-xl uppercase tracking-wide leading-snug">
              IMPACT360 Budget Power Lab<br className="hidden sm:block" /> — Youth Legislative Budget Fellows
            </p>
            <p className="text-white/50 text-xs mt-2 uppercase tracking-widest">EJF × ActionAid Kenya · April 8, 2026 · The Avid Hotel</p>
            <div className="flex justify-center gap-2 mt-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-2 h-2 bg-[#d4a017] rounded-full animate-bounce" style={{ animationDelay: `${i * 0.12}s` }} />
              ))}
            </div>
          </div>
        </div>
      }
    />
  );
}

/* ─────────────────────────────────────────────
   TTNP GALLERY — 2025
───────────────────────────────────────────── */
const TTNP_PHOTOS: GalleryPhoto[] = [
  { src: ttnp1, caption: "EJF members united at TTNP" },
  { src: ttnp2, caption: "Tree planting in action" },
  { src: ttnp3, caption: "EJF team at Taita Taveta National Park" },
  { src: ttnp4, caption: "Hands in the soil — climate action" },
  { src: ttnp5, caption: "Youth-led reforestation" },
  { src: ttnp6, caption: "Community tree planting drive" },
  { src: ttnp7, caption: "Unity at TTNP" },
  { src: ttnp8, caption: "EJF solidarity" },
  { src: ttnp9, caption: "Building a greener future" },
];

function LatestEventsGallery() {
  return (
    <PhotoScrollGallery
      id="ttnp"
      photos={TTNP_PHOTOS}
      eventLabel="Taita Taveta National Park · EJF 2025 Event"
      bgClass="bg-gray-50"
      speed={90}
      banner={
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#0e1f3d] mb-1">TTNP Community Event — 2025</h2>
          <p className="text-gray-500 text-sm mb-4">Photos from our 2025 tree-planting and community action event at Taita Taveta National Park. Click any image to view full size.</p>
          <div className="w-12 h-0.5 bg-[#d4a017] mb-5" />
          <div className="bg-gradient-to-r from-[#0e1f3d] to-[#1a3a6e] rounded-2xl p-5 text-center">
            <p className="text-[#d4a017] font-black text-lg md:text-xl uppercase tracking-wide leading-snug">
              EJF at Taita Taveta National Park<br className="hidden sm:block" /> — Community Action &amp; Tree Planting
            </p>
            <p className="text-white/50 text-xs mt-2 uppercase tracking-widest">Taita Taveta National Park · 2025</p>
            <div className="flex justify-center gap-2 mt-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-2 h-2 bg-[#d4a017] rounded-full animate-bounce" style={{ animationDelay: `${i * 0.12}s` }} />
              ))}
            </div>
          </div>
        </div>
      }
    />
  );
}

/* ─────────────────────────────────────────────
   PAST EVENTS GALLERY (Circular)
───────────────────────────────────────────── */
function PastEventsGallery() {
  const { ref, inView } = useInView();
  const circles = [
    { emoji: "🤝", label: "Community Meeting", delay: 0 },
    { emoji: "🌱", label: "Tree Planting", delay: 80 },
    { emoji: "🎤", label: "Forum Talk", delay: 160 },
    { emoji: "🧑‍🏫", label: "Training Session", delay: 240 },
    { emoji: "👩‍👩‍👧", label: "Women's Group", delay: 320 },
    { emoji: "🌊", label: "Coastal Forum", delay: 400 },
  ];

  return (
    <section className="bg-gray-50 py-14 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-bold text-[#0e1f3d] mb-1">Past Events Gallery</h2>
          <p className="text-gray-500 text-sm mb-6">Take a look at some of our recent events, forums, and community engagements across Kenya.</p>

          <div ref={ref} className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {circles.map((c) => (
              <div
                key={c.label}
                onClick={soon}
                className={`flex flex-col items-center cursor-pointer group transition-all duration-500 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                style={{ transitionDelay: `${c.delay}ms` }}
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-[#0e1f3d] to-[#1a3a6e] flex items-center justify-center text-2xl md:text-3xl border-4 border-white shadow-md group-hover:border-[#d4a017] group-hover:scale-110 transition-all">
                  {c.emoji}
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center font-medium group-hover:text-[#d4a017] transition-colors">{c.label}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-gray-400 mt-5 italic">Click any photo to view · More photos being uploaded</p>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   RECENT HIGHLIGHTS
───────────────────────────────────────────── */
function RecentHighlights() {
  const { ref, inView } = useInView();
  return (
    <section className="bg-white py-14 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-bold text-[#0e1f3d] mb-6">Recent Event Highlights</h2>
          <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {recentHighlights.map((h, i) => (
              <div
                key={h.title}
                className={`group relative rounded-2xl overflow-hidden shadow cursor-pointer hover:shadow-lg transition-all duration-500 hover:-translate-y-1 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <img src={h.bg} alt={h.title} className="w-full h-36 object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 h-36 bg-gradient-to-b from-transparent to-black/60" />
                <div className="absolute top-3 right-3 text-2xl">{h.emoji}</div>
                <div className="border-t-4 border-[#d4a017] p-4 bg-white">
                  <h3 className="font-bold text-[#0e1f3d] text-sm leading-snug mb-1 group-hover:text-[#d4a017] transition-colors">{h.title}</h3>
                  <p className="text-xs text-gray-500 mb-2">
                    <span className="font-bold">Date:</span> {h.date} &nbsp;|&nbsp;
                    <span className="font-bold">Location:</span> {h.location}
                  </p>
                  <p className="text-xs text-gray-600 leading-relaxed">{h.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   HOST AN EVENT
───────────────────────────────────────────── */
function HostEvent() {
  const { ref, inView } = useInView();
  return (
    <section className="bg-gray-50 py-14 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-bold text-[#0e1f3d] mb-2">Host an EJF Event</h2>
          <p className="text-gray-500 text-sm mb-6">
            Interested in hosting an EJF event in your community or organization? We collaborate with communities, schools, and organizations to bring our programs and expertise to diverse audiences.
          </p>
          <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-7">
            {hostTypes.map((h, i) => (
              <div
                key={h.title}
                className={`rounded-xl border-l-4 ${h.color} bg-gray-50 p-5 hover:shadow-md hover:-translate-y-1 transition-all duration-300 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="text-3xl mb-3">{h.emoji}</div>
                <h3 className="font-bold text-[#0e1f3d] text-sm mb-2">{h.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{h.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <button
              onClick={soon}
              className="bg-[#0e1f3d] hover:bg-[#1a3a6e] text-white font-bold text-sm px-7 py-3 rounded-xl transition-all hover:scale-105 shadow-lg"
            >
              Request an Event in Your Community
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   HELPFUL RESOURCES
───────────────────────────────────────────── */
function HelpfulResources() {
  const { ref, inView } = useInView();
  const resources = [
    {
      emoji: "📚",
      color: "text-blue-600",
      title: "Publications",
      desc: "Download our latest research papers, policy briefs, and annual reports.",
      links: ["Annual Report 2025", "Climate Justice Policy", "Economic Equity Study", "Digital Inclusion Paper"],
    },
    {
      emoji: "🎥",
      color: "text-purple-600",
      title: "Media Resources",
      desc: "Access photos, videos, and media kits for press and partners.",
      links: ["Photo Gallery", "Video Library", "Press Releases", "Media Kit"],
    },
    {
      emoji: "📊",
      color: "text-emerald-600",
      title: "Data & Research",
      desc: "Explore our data visualizations and research findings.",
      links: ["Impact Dashboard", "Research Database", "Case Studies", "Statistics"],
    },
  ];
  return (
    <section className="bg-white py-14 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0e1f3d] mb-2">Helpful Resources</h2>
          <p className="text-gray-500 text-sm max-w-md mx-auto">Access our latest publications, research papers, and educational materials.</p>
        </div>
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {resources.map((r, i) => (
            <div
              key={r.title}
              className={`bg-gray-50 rounded-2xl border-l-4 border-[#d4a017] p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="text-4xl mb-3">{r.emoji}</div>
              <h3 className={`font-bold text-sm mb-2 ${r.color}`}>{r.title}</h3>
              <p className="text-gray-500 text-xs mb-4 leading-relaxed">{r.desc}</p>
              <div className="space-y-1.5">
                {r.links.map((l) => (
                  <button key={l} onClick={soon} className="block w-full text-left text-xs text-[#0e1f3d] hover:text-[#d4a017] py-0.5 transition-colors">
                    → {l}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────── */
export default function Events() {
  return (
    <>
      <EventsHero />
      <Impact360Gallery />
      <LatestEventsGallery />
      <UpcomingEvents />
      <PastEventsGallery />
      <RecentHighlights />
      <HostEvent />
      <HelpfulResources />
    </>
  );
}
