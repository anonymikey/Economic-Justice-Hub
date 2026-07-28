import { Link } from "wouter";

import imgHero   from "@assets/hero_1775860211048.jpeg";
import imgComDia from "@assets/comm_dia_1775860211044.jpeg";
import imgComEv  from "@assets/com_event_1775860211043.jpeg";
import imgEme    from "@assets/eme_1775860211046.jpeg";
import imgFood   from "@assets/food_ev_1775860211047.jpeg";
import imgYouth  from "@assets/youth_ev_1775860211030.jpeg";

// ─── DATA ─────────────────────────────────────────────────────────────────────
const CATEGORIES = [
  {
    id: "research", icon: "🔬", label: "Research & Publications",
    accent: "#C9A24A", bg: "bg-[#C9A24A]/5", border: "border-[#C9A24A]/20",
    items: [
      { title: "EJF Kenya Climate Financing Analysis", date: "Nov 2025", tag: "Climate Finance", img: imgComEv },
      { title: "Critical Mineral Catalogue 2025", date: "Oct 2025", tag: "Natural Capital", img: imgEme },
      { title: "Taita Taveta Carbon & Biodiversity Opportunities", date: "Sep 2025", tag: "Conservation", img: imgComDia },
    ],
  },
  {
    id: "policy", icon: "🏛️", label: "Policy Insights",
    accent: "#60a5fa", bg: "bg-blue-50", border: "border-blue-100",
    items: [
      { title: "Fiscal Decentralization and Community Equity", date: "Aug 2025", tag: "Fiscal Justice", img: imgComDia },
      { title: "Community Land Rights and Investment Frameworks", date: "Jul 2025", tag: "Governance", img: imgFood },
      { title: "Legislative Analysis: Taita Taveta County Mining Bill", date: "Jun 2025", tag: "Policy", img: imgHero },
    ],
  },
  {
    id: "perspectives", icon: "✍️", label: "Perspectives",
    accent: "#34d399", bg: "bg-emerald-50", border: "border-emerald-100",
    items: [
      { title: "Natural Wealth and the Future of Governance", date: "Dec 2025", tag: "Opinion", img: imgComEv },
      { title: "Why Economic Justice Must Lead Climate Finance", date: "Nov 2025", tag: "Perspective", img: imgYouth },
      { title: "Digital Justice and the Promise of the Blue Economy", date: "Oct 2025", tag: "Innovation", img: imgEme },
    ],
  },
  {
    id: "news", icon: "📢", label: "News & Announcements",
    accent: "#f472b6", bg: "bg-pink-50", border: "border-pink-100",
    items: [
      { title: "EJF Launches BlueGREEN Digital Justice Hub", date: "Jan 2026", tag: "Historical Initiative", img: imgComDia },
      { title: "EJF Partners with East African Policy Network", date: "Dec 2025", tag: "Partnership", img: imgFood },
      { title: "New Research Programme on Mineral Governance", date: "Nov 2025", tag: "Programme", img: imgHero },
    ],
  },
  {
    id: "events", icon: "🗓️", label: "Events & Dialogues",
    accent: "#a78bfa", bg: "bg-violet-50", border: "border-violet-100",
    items: [
      { title: "Community Dialogue: Natural Wealth and Benefit Sharing — Taita Taveta", date: "Feb 2026", tag: "Dialogue", img: imgYouth },
      { title: "EJF Annual Policy Forum 2026", date: "Mar 2026", tag: "Forum", img: imgComEv },
      { title: "Webinar: Fiscal Justice and Public Accountability", date: "Jan 2026", tag: "Webinar", img: imgEme },
    ],
  },
];

const TIMELINE = [
  { location: "Taita Taveta", icon: "⛏️", desc: "Mining communities seeking equitable benefit sharing and transparent governance of mineral wealth." },
  { location: "Mombasa", icon: "🌊", desc: "Coastal entrepreneurs exploring the blue economy and digital opportunities along Kenya's Indian Ocean coast." },
  { location: "Nairobi", icon: "🏙️", desc: "Policy advocates and researchers connecting grassroots realities to national governance reform." },
  { location: "Kivu, DRC", icon: "💎", desc: "Families living alongside cobalt mines navigating the tension between resource wealth and community wellbeing." },
  { location: "Amazon", icon: "🌿", desc: "Indigenous communities defending Natural Capital and asserting their rights to equitable benefit sharing." },
  { location: "Cabo Delgado", icon: "🔥", desc: "Communities caught between natural resource discovery, conflict and the urgent need for Economic Justice." },
];

const QUOTES = [
  "Knowledge should not remain on bookshelves.",
  "It should influence policy.",
  "Strengthen institutions.",
  "Improve investment.",
  "Empower communities.",
  "Inspire innovation.",
  "And create lasting public value.",
];

// ─── HERO ─────────────────────────────────────────────────────────────────────
function InsightsHero() {
  return (
    <section className="relative h-[65vh] min-h-[460px] flex items-center justify-center overflow-hidden">
      <img src={imgHero} alt="Insights hero"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ animation: "insKB 14s ease-in-out infinite alternate" }} />
      <div className="absolute inset-0 bg-gradient-to-b from-[#08152F]/85 via-[#08152F]/70 to-[#08152F]/92" />
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto" style={{ animation: "insFadeUp 0.9s ease both" }}>
        <span className="inline-block text-[#C9A24A] text-xs font-bold tracking-[0.25em] uppercase mb-5">Ideas in Motion</span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6">
          Ideas That Shape<br />Better Decisions
        </h1>
        <div className="flex items-center justify-center gap-3 mb-5">
          <div className="h-px w-16 bg-[#C9A24A]/60" />
          <div className="w-2 h-2 rounded-full bg-[#C9A24A]" />
          <div className="h-px w-16 bg-[#C9A24A]/60" />
        </div>
        <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
          Research, perspectives and conversations advancing Economic Justice around the world.
        </p>
      </div>
      <style>{`
        @keyframes insKB { from { transform: scale(1.06); } to { transform: scale(1.0); } }
        @keyframes insFadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </section>
  );
}

// ─── CONTENT CATEGORIES ───────────────────────────────────────────────────────
function ContentCategories() {
  return (
    <section className="bg-[#F7F8FA] py-20 px-4">
      <div className="max-w-7xl mx-auto space-y-16">
        {CATEGORIES.map((cat, ci) => (
          <div key={cat.id}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: cat.accent + "20", border: `1px solid ${cat.accent}40` }}>{cat.icon}</div>
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#08152F]">{cat.label}</h2>
                <div className="h-0.5 w-12 rounded mt-1" style={{ background: cat.accent }} />
              </div>
            </div>
            <div className={`grid grid-cols-1 ${ci % 2 === 0 ? "sm:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-3"} gap-5`}>
              {cat.items.map((item, i) => (
                <div key={item.title}
                  className={`group bg-white rounded-3xl overflow-hidden border ${cat.border} shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col cursor-pointer ${i === 0 && ci % 2 === 1 ? "sm:col-span-1" : ""}`}
                  onClick={() => alert("To be updated Soon")}>
                  <div className="aspect-[16/9] overflow-hidden">
                    <img src={item.img} alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[10px] font-bold tracking-widest uppercase px-2 py-1 rounded-lg" style={{ background: cat.accent + "18", color: cat.accent }}>{item.tag}</span>
                      <span className="text-[#08152F]/35 text-xs">{item.date}</span>
                    </div>
                    <h3 className="font-extrabold text-[#08152F] text-sm leading-snug flex-1 group-hover:text-[#C9A24A] transition-colors">{item.title}</h3>
                    <div className="mt-4 flex items-center gap-1 text-[#C9A24A] text-xs font-bold group-hover:gap-3 transition-all">Read more <span>→</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── TIMELINE ─────────────────────────────────────────────────────────────────
function TimelineSection() {
  return (
    <section className="bg-[#08152F] py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block text-[#C9A24A] text-xs font-bold tracking-widest uppercase mb-3">Our Reach</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">From Local Realities to Global Conversations</h2>
          <p className="text-white/50 max-w-xl mx-auto text-base">EJF draws on insights from communities around the world where Natural Wealth and Economic Justice intersect.</p>
        </div>
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#C9A24A] via-[#C9A24A]/50 to-transparent" />
          <div className="space-y-6 pl-16">
            {TIMELINE.map((item, i) => (
              <div key={item.location}
                className="relative group bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 hover:border-[#C9A24A]/30 transition-all duration-300"
                style={{ animation: `insFadeUp 0.5s ease ${i * 0.1}s both` }}>
                <div className="absolute -left-10 w-8 h-8 rounded-full bg-[#08152F] border-2 border-[#C9A24A] flex items-center justify-center text-sm group-hover:scale-110 transition-transform">{item.icon}</div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[#C9A24A] font-bold text-sm">{item.location}</span>
                  <div className="h-px flex-1 bg-white/10" />
                </div>
                <p className="text-white/65 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── QUOTE SECTION ────────────────────────────────────────────────────────────
function QuoteSection() {
  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <div className="mb-8">
          <div className="text-[#C9A24A] text-6xl font-serif leading-none">"</div>
        </div>
        <div className="space-y-3 mb-10">
          {QUOTES.map((line, i) => (
            <p key={i} className={`leading-relaxed ${i === 0 ? "text-[#08152F] font-bold text-xl sm:text-2xl" : "text-[#08152F]/70 text-base sm:text-lg"}`}>
              {line}
            </p>
          ))}
        </div>
        <div className="h-0.5 w-16 bg-[#C9A24A] mx-auto" />
      </div>
    </section>
  );
}

// ─── JOIN THE CONVERSATION ────────────────────────────────────────────────────
function JoinSection() {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      <div className="absolute inset-0">
        <img src={imgComDia} alt="Join the conversation" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#08152F]/97 via-[#08152F]/90 to-[#08152F]/80" />
      </div>
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <span className="inline-block text-[#C9A24A] text-xs font-bold tracking-[0.25em] uppercase mb-5">Be Part of the Conversation</span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-6">Join the Conversation</h2>
        <p className="text-white/65 text-base leading-relaxed mb-10 max-w-xl mx-auto">
          EJF's insights are shaped by the communities, governments, researchers and partners who share our commitment to Economic Justice. Add your voice to the conversation.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/research" className="inline-flex items-center justify-center gap-2 bg-[#C9A24A] hover:bg-[#b08a35] text-white font-bold px-9 py-4 rounded-xl transition-all text-sm shadow-xl shadow-[#C9A24A]/25">Read Publications →</Link>
          <Link href="/events" className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold px-9 py-4 rounded-xl transition-all text-sm backdrop-blur-sm">Upcoming Events</Link>
          <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold px-9 py-4 rounded-xl transition-all text-sm backdrop-blur-sm">Partner With Us</Link>
        </div>
      </div>
    </section>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function Insights() {
  return (
    <>
      <InsightsHero />
      <ContentCategories />
      <TimelineSection />
      <QuoteSection />
      <JoinSection />
    </>
  );
}
