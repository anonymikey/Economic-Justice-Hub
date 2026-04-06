import { useState, useEffect, useRef } from "react";

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
    date: "March 15, 2025",
    dateISO: "2025-03-15",
    title: "Community Benefit-Sharing Forum — Taita Taveta",
    location: "Taita Taveta County",
    time: "9:00 AM – 4:00 PM",
    desc: "Join community representatives, county officials, and civil society organizations to discuss equitable benefit-sharing models for natural resource revenues.",
    category: "Economic",
    color: "from-blue-900 to-blue-700",
    emoji: "⚖️",
    featured: true,
  },
  {
    date: "April 5, 2025",
    dateISO: "2025-04-05",
    title: "Youth Climate Action Summit",
    location: "Mombasa County",
    time: "8:00 AM – 5:00 PM",
    desc: "Bringing together young climate champions from coastal counties to share experiences, build skills, and develop collective action plans for climate justice.",
    category: "Environmental",
    color: "from-emerald-900 to-emerald-700",
    emoji: "🌿",
  },
  {
    date: "May 20-21, 2025",
    dateISO: "2025-05-20",
    title: "Digital Inclusion Workshop Series",
    location: "Kilifi & Kwale Counties",
    time: "10:00 AM – 2:00 PM Daily",
    desc: "Practical digital literacy training for community members, focusing on basic computer skills, internet usage, and online safety.",
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
  const count = useCountdown("2025-03-15");
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

          {/* Countdown to next event */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <p className="text-[#d4a017] text-xs font-bold uppercase tracking-widest mb-1">Next Event Countdown</p>
            <h3 className="text-white font-bold text-base mb-1">Community Benefit-Sharing Forum</h3>
            <p className="text-white/50 text-xs mb-5">📍 Taita Taveta County · March 15, 2025</p>
            <div className="flex items-center gap-3 mb-5">
              <CountUnit val={count.days} label="Days" />
              <span className="text-white/40 text-2xl font-light">:</span>
              <CountUnit val={count.hours} label="Hours" />
              <span className="text-white/40 text-2xl font-light">:</span>
              <CountUnit val={count.minutes} label="Mins" />
              <span className="text-white/40 text-2xl font-light">:</span>
              <CountUnit val={count.seconds} label="Secs" />
            </div>
            <button onClick={soon} className="w-full bg-[#d4a017] hover:bg-[#b8891a] text-white font-bold text-sm py-2.5 rounded-xl transition-all hover:scale-105">
              Register to Attend
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
function UpcomingEvents() {
  const [filter, setFilter] = useState<Category>("All");
  const { ref, inView } = useInView();
  const shown = filter === "All" ? upcomingEvents : upcomingEvents.filter((e) => e.category === filter);

  return (
    <section id="upcoming" className="bg-gray-50 py-14 px-4">
      <div className="max-w-5xl mx-auto">
        <div ref={ref} className={`mb-8 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <h2 className="text-2xl md:text-3xl font-bold text-[#0e1f3d] mb-1">Upcoming Events</h2>
          <div className="w-12 h-0.5 bg-[#d4a017] mt-2 mb-6" />
          <FilterBar active={filter} setActive={setFilter} />
        </div>

        {shown.length > 0 ? (
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
   LATEST EVENTS GALLERY — TTNP
───────────────────────────────────────────── */
function LatestEventsGallery() {
  const { ref, inView } = useInView();
  const [lightbox, setLightbox] = useState<string | null>(null);

  const placeholders = [
    { id: 1, label: "Tree Planting" },
    { id: 2, label: "Community Action" },
    { id: 3, label: "Team Effort" },
    { id: 4, label: "Youth Participants" },
    { id: 5, label: "Group Photo" },
    { id: 6, label: "Celebration" },
  ];

  return (
    <section className="bg-white py-14 px-4">
      <div className="max-w-5xl mx-auto">
        <div ref={ref} className={`mb-6 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <h2 className="text-2xl md:text-3xl font-bold text-[#0e1f3d] mb-1">Latest Events</h2>
          <p className="text-gray-500 text-sm mb-3">Latest photos and videos from our most recent events. Click any thumbnail to view.</p>
          <div className="w-12 h-0.5 bg-[#d4a017] mb-6" />
        </div>

        {/* TTNP Announcement Banner */}
        <div className={`bg-gradient-to-r from-[#0e1f3d] to-[#1a3a6e] rounded-2xl p-6 mb-7 text-center transition-all duration-700 delay-100 ${inView ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
          <p className="text-[#d4a017] font-black text-xl md:text-2xl uppercase tracking-wide leading-relaxed">
            This is Our Latest Event Which Happened<br />at TTNP — Gallery Below
          </p>
          <div className="flex justify-center gap-1.5 mt-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 bg-[#d4a017] rounded-full animate-bounce" style={{ animationDelay: `${i * 0.1}s` }} />
            ))}
          </div>
        </div>

        {/* Horizontal scrollable photo strip */}
        <div className={`transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
            {placeholders.map((p, i) => (
              <div
                key={p.id}
                onClick={() => setLightbox(p.label)}
                className="flex-shrink-0 snap-start w-44 h-32 bg-gradient-to-br from-green-900 to-green-700 rounded-xl relative cursor-pointer overflow-hidden group border-2 border-transparent hover:border-[#d4a017] transition-all hover:scale-105"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="text-center"><div className="text-2xl">🖼️</div><p>{p.label}</p></div>
                </div>
                <div className="absolute bottom-2 left-2 bg-black/50 text-white text-[10px] px-2 py-0.5 rounded-full">
                  Photo {p.id}
                </div>
                <div className="absolute top-2 right-2 text-white/40 text-lg">🌳</div>
              </div>
            ))}
            {/* "More photos coming" placeholder */}
            <div className="flex-shrink-0 snap-start w-44 h-32 bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-gray-400">
              <div className="text-2xl mb-1">📷</div>
              <p className="text-xs font-semibold text-center px-2">More photos<br />coming soon</p>
            </div>
          </div>
        </div>

        {/* Lightbox */}
        {lightbox && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
            <div className="bg-white rounded-2xl p-8 text-center max-w-sm w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <div className="text-5xl mb-3">🌳</div>
              <h3 className="font-bold text-[#0e1f3d] text-lg mb-2">{lightbox}</h3>
              <p className="text-gray-500 text-sm mb-5">Full event photos will be uploaded soon. Stay tuned!</p>
              <button onClick={() => setLightbox(null)} className="bg-[#0e1f3d] text-white font-bold px-6 py-2.5 rounded-xl text-sm">Close</button>
            </div>
          </div>
        )}
      </div>
    </section>
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
      <UpcomingEvents />
      <LatestEventsGallery />
      <PastEventsGallery />
      <RecentHighlights />
      <HostEvent />
      <HelpfulResources />
    </>
  );
}
