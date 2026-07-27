import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "wouter";
import { useAuth } from "@/context/AuthContext";

import img1 from "@assets/tm_1775860211028.jpeg";
import img2 from "@assets/youth_ev_1775860211030.jpeg";
import img3 from "@assets/com_event_1775860211043.jpeg";
import img4 from "@assets/comm_dia_1775860211044.jpeg";
import img5 from "@assets/eme_1775860211046.jpeg";
import img6 from "@assets/food_ev_1775860211047.jpeg";
import img7 from "@assets/hero_1775860211048.jpeg";

const HERO_SLIDES = [
  { src: img7, caption: "Natural Wealth", sub: "Communities as rightful partners in shaping a just future" },
  { src: img3, caption: "Community Dialogue", sub: "Grassroots conversations driving equitable governance" },
  { src: img5, caption: "Education & Equity", sub: "Expanding opportunity through knowledge and human dignity" },
  { src: img6, caption: "Food Security", sub: "Ensuring natural wealth sustains every family" },
  { src: img1, caption: "Amplifying Voices", sub: "EJF advocates speaking truth to power" },
  { src: img4, caption: "People-Centred Governance", sub: "Accountable leadership that serves people and planet" },
  { src: img2, caption: "Youth Engagement", sub: "The next generation of Economic Justice champions" },
];

const SLIDE_DURATION = 5500;

// ─── HERO ────────────────────────────────────────────────────────────────────
function HeroSection() {
  const { user } = useAuth();
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback((index: number) => {
    if (transitioning) return;
    setPrev(current);
    setTransitioning(true);
    setCurrent(index);
    setTimeout(() => { setPrev(null); setTransitioning(false); }, 900);
  }, [current, transitioning]);

  const next = useCallback(() => { goTo((current + 1) % HERO_SLIDES.length); }, [current, goTo]);

  useEffect(() => {
    timerRef.current = setTimeout(next, SLIDE_DURATION);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [next]);

  const slide = HERO_SLIDES[current];

  return (
    <section className="relative w-full overflow-hidden" style={{ height: "clamp(560px, 88vh, 820px)" }}>

      {HERO_SLIDES.map((s, i) => {
        const isActive = i === current;
        const isPrev = i === prev;
        if (!isActive && !isPrev) return null;
        return (
          <div key={s.src} className="absolute inset-0" style={{
            zIndex: isPrev ? 1 : 2,
            animation: isActive
              ? "heroFadeIn 0.9s cubic-bezier(0.4,0,0.2,1) forwards"
              : "heroFadeOut 0.9s cubic-bezier(0.4,0,0.2,1) forwards",
          }}>
            <div className="absolute inset-0" style={{
              backgroundImage: `url(${s.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              animation: isActive ? "heroKenBurns 7s ease-out forwards" : "none",
              willChange: "transform",
            }} />
          </div>
        );
      })}

      <div className="absolute inset-0 z-10" style={{
        background: "linear-gradient(to top, rgba(8,21,47,0.95) 0%, rgba(8,21,47,0.62) 45%, rgba(8,21,47,0.28) 100%)",
      }} />
      <div className="absolute inset-0 z-10" style={{
        background: "linear-gradient(to right, rgba(8,21,47,0.55) 0%, transparent 65%)",
      }} />

      <div className="absolute inset-0 z-20 flex flex-col justify-end pb-20 md:pb-28 px-6 md:px-16 max-w-6xl">

        <div key={`badge-${current}`} className="mb-4"
          style={{ animation: "heroSlideUp 0.7s 0.2s cubic-bezier(0.4,0,0.2,1) both" }}>
          <span className="inline-flex items-center gap-2 bg-[#C9A24A]/20 border border-[#C9A24A]/40 backdrop-blur-sm text-[#e8c97a] text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A24A] animate-pulse" />
            {slide.caption}
          </span>
        </div>

        <h1 key={`h1-${current}`}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4 max-w-4xl"
          style={{ animation: "heroSlideUp 0.7s 0.35s cubic-bezier(0.4,0,0.2,1) both", textShadow: "0 2px 32px rgba(0,0,0,0.5)" }}>
          A Just World Where Natural Wealth Creates Equitable and Sustainable Prosperity
        </h1>

        <p key={`sub-${current}`}
          className="text-sm md:text-base text-white/65 mb-7 max-w-xl leading-relaxed"
          style={{ animation: "heroSlideUp 0.7s 0.45s cubic-bezier(0.4,0,0.2,1) both" }}>
          Advancing Economic Justice by Strengthening the Relationship Between People and Natural Capital.
        </p>

        <div className="flex flex-col sm:flex-row gap-3"
          style={{ animation: "heroSlideUp 0.7s 0.6s cubic-bezier(0.4,0,0.2,1) both" }}>
          <Link href="/research"
            className="inline-flex items-center justify-center gap-2 bg-[#C9A24A] hover:bg-[#b08a35] text-white font-bold px-8 py-3.5 rounded-xl transition-all text-sm shadow-lg shadow-[#C9A24A]/30">
            Explore Our Work →
          </Link>
          {user ? (
            <a href="https://ejf-members-registration.mgx.world" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-sm text-white font-bold px-8 py-3.5 rounded-xl transition-all text-sm">
              📋 Register with Us
            </a>
          ) : (
            <Link href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-sm text-white font-bold px-8 py-3.5 rounded-xl transition-all text-sm">
              Partner With Us
            </Link>
          )}
        </div>

        {user && (
          <p className="text-white/40 text-xs mt-3">
            Welcome back, <span className="text-[#C9A24A] font-semibold">{user.name}</span>! Complete your official EJF registration.
          </p>
        )}
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
        {HERO_SLIDES.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} aria-label={`Go to slide ${i + 1}`}
            className="transition-all duration-500" style={{
              height: 6, borderRadius: 3,
              background: i === current ? "#C9A24A" : "rgba(255,255,255,0.35)",
              width: i === current ? 28 : 8,
            }} />
        ))}
      </div>

      <button onClick={() => goTo((current - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/30 hover:bg-black/60 border border-white/20 backdrop-blur-sm text-white flex items-center justify-center transition-all"
        aria-label="Previous slide">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
      </button>
      <button onClick={() => goTo((current + 1) % HERO_SLIDES.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/30 hover:bg-black/60 border border-white/20 backdrop-blur-sm text-white flex items-center justify-center transition-all"
        aria-label="Next slide">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
      </button>

      <div className="absolute top-5 right-5 z-30 bg-black/30 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1 text-white text-xs font-bold tabular-nums">
        {String(current + 1).padStart(2, "0")} / {String(HERO_SLIDES.length).padStart(2, "0")}
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-30 h-0.5 bg-white/10">
        <div key={`progress-${current}`} className="h-full bg-[#C9A24A]"
          style={{ animation: `heroProgress ${SLIDE_DURATION}ms linear forwards` }} />
      </div>

      <style>{`
        @keyframes heroFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes heroFadeOut { from { opacity: 1; } to { opacity: 0; } }
        @keyframes heroKenBurns { from { transform: scale(1.06) translateX(0px); } to { transform: scale(1.0) translateX(-8px); } }
        @keyframes heroSlideUp { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes heroProgress { from { width: 0%; } to { width: 100%; } }
      `}</style>
    </section>
  );
}

// ─── THE PROMISE OF NATURAL WEALTH ───────────────────────────────────────────
function PromiseSection() {
  return (
    <section className="bg-white py-20 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          <div style={{ animation: "fadeInLeft 0.8s ease both" }}>
            <span className="inline-block text-[#C9A24A] text-xs font-bold tracking-widest uppercase mb-4 border-b border-[#C9A24A]/30 pb-1">
              Our Foundation
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#08152F] leading-tight mb-6">
              The Promise of Natural Wealth
            </h2>
            <p className="text-[#08152F] font-semibold text-base leading-relaxed mb-2">
              Every generation inherits Natural Wealth.
            </p>
            <p className="text-[#C9A24A] font-medium text-sm tracking-wide leading-relaxed mb-4">
              Forests. Wildlife. Rivers. Oceans. Minerals. Rangelands. Mountains. Biodiversity.
            </p>
            <p className="text-[#08152F]/70 text-base leading-relaxed mb-4">
              For generations, Natural Wealth has sustained life, shaped cultures, supported economies and inspired human progress. Yet its greatest promise has never been the wealth it contains, but the future it makes possible.
            </p>
            <p className="text-[#08152F]/70 text-base leading-relaxed mb-4">
              That future depends on one defining question:
            </p>
            <blockquote className="border-l-4 border-[#C9A24A] pl-5 py-2 my-6">
              <p className="text-[#08152F] font-semibold text-lg italic leading-snug">
                "How can Natural Wealth fulfil its highest purpose?"
              </p>
            </blockquote>
            <p className="text-[#08152F]/70 text-base leading-relaxed mb-4">
              At the Economic Justice Forum (EJF), we believe the answer is Economic Justice.
            </p>
            <p className="text-[#08152F]/70 text-base leading-relaxed mb-6">
              When the opportunities and benefits generated by Natural Wealth advance Human Dignity, enable the full enjoyment of Human Rights, promote Equity, strengthen Justice and create Equitable and Sustainable Prosperity, Natural Wealth fulfils its highest purpose.
            </p>
          </div>

          <div className="relative" style={{ animation: "fadeInRight 0.8s ease both" }}>
            <div className="rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
              <img src={img4} alt="Community dialogue on natural wealth governance"
                className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-5 -left-5 bg-[#C9A24A] text-white rounded-2xl px-6 py-4 shadow-xl max-w-[240px]">
              <p className="font-bold text-sm leading-snug">Host communities as rightful partners in shaping the future</p>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes fadeInLeft { from { opacity: 0; transform: translateX(-28px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes fadeInRight { from { opacity: 0; transform: translateX(28px); } to { opacity: 1; transform: translateX(0); } }
      `}</style>
    </section>
  );
}

// ─── THE EJF IDEA ────────────────────────────────────────────────────────────
function EJFIdeaSection() {
  const points = [
    "It should expand opportunity.",
    "It should uphold Human Dignity.",
    "It should enable the full enjoyment of Human Rights.",
    "It should strengthen Equity and Justice.",
    "It should create Equitable and Sustainable Prosperity.",
    "And it should inspire the long-term conservation of Natural Capital.",
  ];

  return (
    <section className="bg-[#F4F6F9] py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl min-h-[480px]">
          <img src={img5} alt="EJF community engagement"
            className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#08152F]/95 via-[#08152F]/80 to-transparent" />

          <div className="relative z-10 p-10 md:p-16 max-w-2xl">
            <span className="inline-block text-[#C9A24A] text-xs font-bold tracking-widest uppercase mb-4">
              Our Founding Idea
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-4">
              The EJF Idea
            </h2>
            <p className="text-white/70 text-base leading-relaxed mb-2">
              We believe the future of people and the future of Natural Capital are inseparable.
            </p>
            <p className="text-white/70 text-base leading-relaxed mb-6">
              Natural Wealth should do more than generate economic value.
            </p>
            <ul className="space-y-3 mb-8">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-3 text-white/85 text-sm">
                  <span className="mt-1 w-4 h-4 rounded-full bg-[#C9A24A]/30 border border-[#C9A24A] flex items-center justify-center flex-shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C9A24A]" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
            <p className="text-white/50 text-sm italic">
              This is the idea upon which the Economic Justice Forum was founded.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── VISION & MISSION ────────────────────────────────────────────────────────
function VisionMissionSection() {
  return (
    <section className="bg-[#08152F] py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block text-[#C9A24A] text-xs font-bold tracking-widest uppercase mb-3">
            Who We Are
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Vision &amp; Mission</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <div className="relative bg-white/5 border border-white/10 rounded-3xl p-10 overflow-hidden group hover:bg-white/8 transition-colors">
            <div className="absolute top-6 right-6 w-14 h-14 rounded-2xl bg-[#C9A24A]/10 flex items-center justify-center text-2xl">
              🌍
            </div>
            <span className="inline-block text-[#C9A24A] text-xs font-bold tracking-widest uppercase mb-4">Our Vision</span>
            <h3 className="text-xl font-bold text-white leading-snug mb-4">
              A Just World Where Natural Wealth Creates Equitable and Sustainable Prosperity
            </h3>
            <div className="h-0.5 w-12 bg-[#C9A24A] rounded mb-4" />
            <p className="text-white/55 text-sm leading-relaxed">
              We envision a world in which the natural wealth of every land enriches the lives of every person — especially those who steward and depend upon it most.
            </p>
          </div>

          <div className="relative bg-white/5 border border-white/10 rounded-3xl p-10 overflow-hidden group hover:bg-white/8 transition-colors">
            <div className="absolute top-6 right-6 w-14 h-14 rounded-2xl bg-[#C9A24A]/10 flex items-center justify-center text-2xl">
              ⚖️
            </div>
            <span className="inline-block text-[#C9A24A] text-xs font-bold tracking-widest uppercase mb-4">Our Mission</span>
            <h3 className="text-xl font-bold text-white leading-snug mb-4">
              Strengthening the Relationship Between People and Natural Capital Through Economic Justice
            </h3>
            <div className="h-0.5 w-12 bg-[#C9A24A] rounded mb-4" />
            <p className="text-white/55 text-sm leading-relaxed">
              We build knowledge, partnerships and advocacy platforms that advance equitable governance of natural resources for present and future generations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── EQUITY • JUSTICE • PROSPERITY ───────────────────────────────────────────
function ValuesSection() {
  const values = [
    {
      icon: "⚖️",
      title: "Equity",
      color: "from-[#C9A24A]/20 to-[#C9A24A]/5",
      border: "border-[#C9A24A]/30",
      accent: "#C9A24A",
      desc: "Ensures that opportunities and the benefits generated by Natural Wealth are accessible and shared fairly — so that those who live with and protect natural resources are never excluded from their rewards.",
    },
    {
      icon: "🏛️",
      title: "Justice",
      color: "from-blue-400/15 to-blue-400/5",
      border: "border-blue-400/25",
      accent: "#60a5fa",
      desc: "Strengthens the institutions, leadership and accountability needed to transform opportunity into lasting public value — ensuring governments, enterprises and communities meet their obligations.",
    },
    {
      icon: "🌱",
      title: "Prosperity",
      color: "from-emerald-400/15 to-emerald-400/5",
      border: "border-emerald-400/25",
      accent: "#34d399",
      desc: "Realised when Natural Wealth improves lives, expands opportunities and secures a better future for present and future generations — without depleting the capital that sustains them.",
    },
  ];

  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block text-[#C9A24A] text-xs font-bold tracking-widest uppercase mb-3">
            Our Guiding Principles
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#08152F] mb-3">
            Equity &bull; Justice &bull; Prosperity
          </h2>
          <p className="text-[#08152F]/55 max-w-2xl mx-auto text-base">
            These are more than our values. They are the principles that shape how we understand Economic Justice.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {values.map((v) => (
            <div key={v.title}
              className={`group relative rounded-3xl border ${v.border} bg-gradient-to-b ${v.color} p-8 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300`}>
              <div className="w-14 h-14 rounded-2xl bg-white shadow-md flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                {v.icon}
              </div>
              <h3 className="text-xl font-extrabold text-[#08152F] mb-3">{v.title}</h3>
              <div className="h-0.5 w-10 rounded mb-4" style={{ background: v.accent }} />
              <p className="text-[#08152F]/65 text-sm leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-[#08152F]/70 font-semibold text-base">
          Together, they define the future we are committed to building.
        </p>
      </div>
    </section>
  );
}

// ─── STRATEGIC PLATFORMS ─────────────────────────────────────────────────────
function PlatformsSection() {
  const platforms = [
    {
      icon: "🦁",
      name: "Tsavo LifeBank™",
      tagline: "Natural Capital Governance",
      desc: "Unlocking the full potential of Natural Wealth through equitable benefit sharing, biodiversity conservation and climate and nature finance.",
      href: "/research",
    },
    {
      icon: "💻",
      name: "BlueGREEN Digital Justice Hub™",
      tagline: "Technology & Innovation",
      desc: "Harnessing technology, artificial intelligence and innovation to strengthen Natural Capital Governance and create equitable digital opportunities.",
      href: "/research",
    },
    {
      icon: "📊",
      name: "IMPACT360™ Budget Power Lab™",
      tagline: "Fiscal Justice",
      desc: "Transforming public finance into public value through Fiscal Justice, citizen leadership and accountable governance at every level.",
      href: "/research",
    },
    {
      icon: "⚖️",
      name: "Policy, Law & Advocacy Lab™",
      tagline: "Evidence & Institutions",
      desc: "Generating evidence, influencing policy and strengthening institutions to advance Economic Justice locally, nationally and globally.",
      href: "/research",
    },
  ];

  return (
    <section className="bg-[#F4F6F9] py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block text-[#C9A24A] text-xs font-bold tracking-widest uppercase mb-3">
            How We Work
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#08152F] mb-3">Our Strategic Platforms</h2>
          <p className="text-[#08152F]/55 max-w-2xl mx-auto text-base">
            Four integrated platforms through which EJF delivers knowledge, advocacy and partnerships that advance Economic Justice.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {platforms.map((p) => (
            <Link key={p.name} href={p.href}
              className="group bg-white rounded-3xl border border-gray-100 p-7 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col">
              <div className="w-12 h-12 rounded-2xl bg-[#08152F] flex items-center justify-center text-xl mb-5 group-hover:bg-[#C9A24A] transition-colors">
                {p.icon}
              </div>
              <span className="text-[#C9A24A] text-[10px] font-bold tracking-widest uppercase mb-2">{p.tagline}</span>
              <h3 className="font-extrabold text-[#08152F] text-sm leading-snug mb-3">{p.name}</h3>
              <p className="text-[#08152F]/55 text-sm leading-relaxed flex-1">{p.desc}</p>
              <div className="mt-5 flex items-center gap-1 text-[#C9A24A] text-xs font-bold group-hover:gap-3 transition-all">
                Learn more <span>→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SHAPE THE FUTURE CTA ────────────────────────────────────────────────────
function CTASection() {
  return (
    <section className="relative py-28 px-4 overflow-hidden">
      <div className="absolute inset-0">
        <img src={img7} alt="Shape the future with us"
          className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#08152F]/97 via-[#08152F]/88 to-[#08152F]/75" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <span className="inline-block text-[#C9A24A] text-xs font-bold tracking-widest uppercase mb-5">
          Join the Movement
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-6">
          Shape the Future<br className="hidden sm:block" /> With Us
        </h2>
        <p className="text-white/65 text-base leading-relaxed mb-4 max-w-2xl mx-auto">
          The future of Natural Wealth cannot be shaped by one institution alone. It requires governments, host communities, indigenous peoples, the private sector, civil society, academia, development partners and international institutions working together around a shared vision.
        </p>
        <p className="text-white/65 text-base leading-relaxed mb-4 max-w-2xl mx-auto">
          The Economic Justice Forum exists to build those partnerships, generate new ideas and advance practical solutions that unlock the full promise of Natural Wealth.
        </p>
        <p className="text-white/50 text-sm leading-relaxed mb-4 max-w-2xl mx-auto">
          Together, we can build a world where Natural Wealth fulfils its highest purpose — advancing Human Dignity, enabling the full enjoyment of Human Rights, promoting Equity, strengthening Justice, creating equitable and sustainable Prosperity and inspiring the long-term conservation of Natural Capital for present and future generations.
        </p>
        <p className="text-[#C9A24A] font-semibold text-sm tracking-wide mb-10 max-w-2xl mx-auto">
          Welcome to the Digital Headquarters of the Economic Justice Forum.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-[#C9A24A] hover:bg-[#b08a35] text-white font-bold px-9 py-4 rounded-xl transition-all text-sm shadow-xl shadow-[#C9A24A]/25">
            Partner With Us →
          </Link>
          <Link href="/philosophy"
            className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-sm text-white font-bold px-9 py-4 rounded-xl transition-all text-sm">
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── AI CHAT ─────────────────────────────────────────────────────────────────
const EJF_AI_RESPONSES: { patterns: RegExp; answer: string }[] = [
  {
    patterns: /\b(hi|hello|hey|good morning|good afternoon|good evening|howdy)\b/i,
    answer: "Hello and welcome to the Economic Justice Forum! 👋 I'm your EJF AI Assistant. I can help you learn about our mission, programmes, membership, events, research, donations, volunteer opportunities, and more. What would you like to know?",
  },
  {
    patterns: /\b(what is ejf|about ejf|tell me about ejf|who is ejf|what does ejf do|ejf overview)\b/i,
    answer: "The Economic Justice Forum (EJF) is the people's platform for Economic, Climate, Social, and Digital Justice. We exist to strengthen the relationship between people and Natural Capital through Economic Justice.\n\nOur four strategic platforms are:\n• 🦁 Tsavo LifeBank™ — Natural Capital Governance & benefit sharing\n• 💻 BlueGREEN Digital Justice Hub™ — Technology & digital inclusion\n• 📊 IMPACT360™ Budget Power Lab™ — Fiscal Justice & accountability\n• ⚖️ Policy, Law & Advocacy Lab™ — Evidence & institutional reform\n\nWe run community dialogues, research programmes, policy advocacy, and emergency relief initiatives across Kenya.",
  },
  {
    patterns: /\b(member|register|join|sign up|registration|become a member|how to join)\b/i,
    answer: "Joining EJF is open to individuals, community groups, organisations, and institutions who share our commitment to justice and equity. Here's how:\n\n1. 📋 Click the 'Partner With Us' or 'Register' button\n2. 📝 Fill in your details and select your membership type\n3. ✅ Submit — our team reviews within 48 hours\n4. 🤝 Receive a welcome pack and invitations to events\n\nMembership is free for community members. Email membership@economicjusticeforum.org for details.",
  },
  {
    patterns: /\b(benefit|benefits|why join|advantage|perks|what do i get)\b/i,
    answer: "EJF membership benefits include:\n\n🏛️ Governance & Voice\n• Participate in policy forums and community dialogues\n• Influence EJF's advocacy agenda\n\n📚 Knowledge & Resources\n• Free access to all EJF research and policy briefs\n• Invitations to workshops and capacity-building events\n\n🌐 Network & Solidarity\n• Connect with justice champions across Kenya and Africa\n• Be part of a growing movement of advocates\n\n🆘 Support\n• Priority access to EJF's emergency relief initiatives",
  },
  {
    patterns: /\b(volunteer|volunteering|contribute|help out|how to help|give my time)\b/i,
    answer: "EJF thrives on the energy and skills of our volunteers:\n\n🔬 Research & Documentation\n📣 Community Organising\n💻 Digital & Communications\n⚖️ Legal & Policy Support\n🚑 Emergency Relief\n🎓 Education & Training\n\nEmail volunteers@economicjusticeforum.org with your name, skills, and availability.",
  },
  {
    patterns: /\b(donate|donation|contribute money|fund|support ejf|financially|contribution)\b/i,
    answer: "Your support helps EJF run life-changing programmes:\n\n🍱 Food Security — emergency food for vulnerable families\n📚 Education — school supplies and scholarship support\n🌱 Climate Justice — tree planting and climate adaptation\n🏛️ Advocacy — policy research and legal support\n\nHow to donate:\n• 📱 M-Pesa: Paybill on our site\n• 🌐 Online: Secure card donations\n• 📧 donate@economicjusticeforum.org",
  },
  {
    patterns: /\b(programme|programs|initiatives|activities|projects|platform|what do you do)\b/i,
    answer: "EJF delivers through four strategic platforms:\n\n🦁 Tsavo LifeBank™ — equitable benefit sharing, Natural Capital Governance, biodiversity conservation\n💻 BlueGREEN Digital Justice Hub™ — AI, technology, digital inclusion\n📊 IMPACT360™ Budget Power Lab™ — fiscal justice, citizen-led budgeting\n⚖️ Policy, Law & Advocacy Lab™ — evidence generation, policy reform\n\nVisit our Pillars and Programs pages to explore these in detail.",
  },
  {
    patterns: /\b(climate|environment|green|environmental justice|carbon|natural wealth|resource)\b/i,
    answer: "Natural Capital and Climate Justice are at the core of EJF's work. We believe communities who protect natural wealth must be the first to benefit.\n\nOur work includes:\n🌳 Equitable benefit-sharing frameworks for resource-rich communities\n☀️ Advocacy for clean energy and conservation economies\n🚜 Climate resilience for arid, semi-arid, and coastal regions\n📢 Amplifying community voices in global climate negotiations\n💧 Advancing Direct Climate Finance to counties and communities",
  },
  {
    patterns: /\b(digital|technology|internet|tech|digital justice|online rights|data|ai|artificial intelligence)\b/i,
    answer: "Through our BlueGREEN Digital Justice Hub™, EJF fights to ensure no one is left offline or excluded from digital opportunity.\n\nOur Digital Justice programmes:\n💻 Free digital literacy training for youth, women, and communities\n📶 Advocacy for affordable broadband in rural areas\n🤖 Ethical AI governance that serves humanity and promotes equity\n🔒 Data privacy and online rights education\n📱 E-government services and mobile economy training",
  },
  {
    patterns: /\b(vision|mission|purpose|goal|objective)\b/i,
    answer: "EJF's Vision:\n'A Just World Where Natural Wealth Creates Equitable and Sustainable Prosperity'\n\nEJF's Mission:\n'Strengthening the Relationship Between People and Natural Capital Through Economic Justice'\n\nOur guiding principles are Equity • Justice • Prosperity — the three principles that shape how we understand Economic Justice and define the future we are committed to building together.",
  },
  {
    patterns: /\b(location|where|address|office|based|headquarter|kenya|taita|nairobi)\b/i,
    answer: "EJF is headquartered in Kenya:\n\n📍 Taita Taveta County — our founding base\n📍 Nairobi — national advocacy and partnerships\n📍 Mombasa & Coast — community outreach\n\n🏢 Office: Wundanyi, Taita Taveta County, Kenya\n📧 info@economicjusticeforum.org\n📞 +254 741 357 830\n🌐 economicjusticeforum.org",
  },
  {
    patterns: /\b(contact|reach|email|phone|call|get in touch|speak to)\b/i,
    answer: "Reach EJF through:\n\n📧 General: info@economicjusticeforum.org\n📧 Membership: membership@economicjusticeforum.org\n📧 Partnerships: partners@economicjusticeforum.org\n📧 Media: media@economicjusticeforum.org\n\n📞 WhatsApp: +254 741 357 830\n🌐 economicjusticeforum.org\n\nWe respond within 24–48 business hours.",
  },
  {
    patterns: /\b(partner|partnership|collaborate|mou|work together)\b/i,
    answer: "EJF actively partners with civil society, governments, academia, media, and international development organisations.\n\nPartnership types:\n🤝 Programme Partnerships — co-implement community programmes\n📣 Advocacy Alliances — joint campaigns on economic and climate justice\n💰 Funding Partnerships — co-apply for grants or sponsor initiatives\n📚 Knowledge Exchange — share research and best practices\n🏛️ Government Engagement — policy development collaboration\n\nEmail: partners@economicjusticeforum.org",
  },
  {
    patterns: /\b(event|events|upcoming|calendar|workshop|training|conference|forum|summit)\b/i,
    answer: "EJF regularly organises:\n\n📅 Community Dialogues — monthly grassroots forums\n🎓 Workshops & Training — economic rights, digital skills, climate adaptation\n🏛️ Policy Forums — quarterly government and civil society meetings\n🌳 Environmental Days — tree planting and conservation drives\n\nVisit the Events page or email events@economicjusticeforum.org to join our mailing list.",
  },
  {
    patterns: /\b(research|publication|report|study|paper|data|findings|document)\b/i,
    answer: "EJF produces high-quality research for evidence-based advocacy:\n\n📄 Annual Impact Reports\n📊 Policy Briefs on economic, climate, and social justice\n🔬 Community Research from Taita Taveta and beyond\n📚 Educational Materials on rights and civic participation\n\nAll publications are free. Visit the Research page or email research@economicjusticeforum.org.",
  },
  {
    patterns: /\b(help|what can you do|how can you help|topics|options|menu|assist)\b/i,
    answer: "I'm your EJF AI Assistant. I can help with:\n\n🏛️ About EJF — mission, vision, and strategic platforms\n👤 Membership — how to join and registration\n⭐ Benefits — what you gain as a member\n🙋 Volunteering — how to contribute your skills\n💰 Donations — how to support EJF\n📋 Programmes — our four strategic platforms\n📅 Events — upcoming forums and workshops\n📚 Research — our publications and reports\n🤝 Partnerships — how to collaborate with EJF\n📞 Contact — how to reach our team\n\nJust ask — I'm here to help!",
  },
];

function getAIResponse(msg: string): string {
  const lower = msg.toLowerCase().trim();
  for (const entry of EJF_AI_RESPONSES) {
    if (entry.patterns.test(lower)) return entry.answer;
  }
  return `Thank you for your question about "${msg}"! For specific enquiries, please reach out directly:\n\n📧 info@economicjusticeforum.org\n📞 +254 741 357 830\n\nYou can also ask me about: membership, volunteering, programmes, events, climate justice, digital justice, donations, or partnerships.`;
}

function AIChatSection() {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hello! 👋 I'm the EJF AI Assistant. I can give you detailed information about our mission, strategic platforms, membership, events, research, and more. What would you like to know?" },
  ]);
  const [input, setInput] = useState("");
  const [interacting, setInteracting] = useState(false);
  const [focused, setFocused] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);
  const interactTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const quickReplies = ["What is EJF?", "Our Vision", "Strategic Platforms", "Partner With Us", "Donate", "Contact Us"];

  const triggerInteracting = () => {
    setInteracting(true);
    if (interactTimerRef.current) clearTimeout(interactTimerRef.current);
    interactTimerRef.current = setTimeout(() => setInteracting(false), 4000);
  };

  const handleSend = (text?: string) => {
    const msg = text || input.trim();
    if (!msg) return;
    triggerInteracting();
    setMessages((prev) => [...prev, { role: "user", text: msg }]);
    setInput("");
    setTimeout(() => {
      const response = getAIResponse(msg);
      setMessages((prev) => [...prev, { role: "assistant", text: response }]);
    }, 700);
  };

  useEffect(() => {
    if (isFirstRender.current) { isFirstRender.current = false; return; }
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const isActive = interacting || focused;

  return (
    <section className="bg-[#08152F] py-20 px-4">
      <style>{`
        @keyframes ejfRainbow {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .ejf-rainbow-wrap {
          background: linear-gradient(270deg, #C9A24A, #e8c97a, #b08a35, #C9A24A, #f0d89a);
          background-size: 400% 400%;
          animation: ejfRainbow 6s ease infinite;
          border-radius: 24px;
          padding: 2px;
          transition: padding 0.4s ease, box-shadow 0.4s ease, animation-duration 0.4s;
        }
        .ejf-rainbow-wrap.active {
          animation-duration: 2s;
          padding: 3px;
          box-shadow: 0 0 32px 4px rgba(201,162,74,0.25);
        }
        .ejf-inner { background: #ffffff; border-radius: 22px; overflow: hidden; }
        .ejf-msg-pre { white-space: pre-wrap; font-family: inherit; font-size: inherit; line-height: 1.65; margin: 0; }
      `}</style>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block text-[#C9A24A] text-xs font-bold tracking-widest uppercase mb-3">AI Assistant</span>
          <h2 className="text-3xl font-extrabold text-white mb-2">Ask EJF Anything</h2>
          <p className="text-white/50 text-sm max-w-xl mx-auto">
            Our AI assistant provides detailed answers about EJF's mission, platforms, membership, volunteering, events, and more.
          </p>
        </div>

        <div className={`ejf-rainbow-wrap ${isActive ? "active" : ""}`}>
          <div className="ejf-inner p-6 md:p-8">
            <div className="min-h-[220px] max-h-[360px] overflow-y-auto mb-5 space-y-4 pr-1">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} items-start gap-2.5`}>
                  {m.role === "assistant" && (
                    <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-base"
                      style={{ background: "linear-gradient(135deg,#08152F,#1a3a6e)" }}>
                      🤖
                    </div>
                  )}
                  <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                    m.role === "assistant" ? "bg-[#08152F] text-white rounded-tl-sm" : "bg-gray-100 text-gray-800 rounded-tr-sm"
                  }`}>
                    {m.role === "assistant" && (
                      <span className="font-bold text-[#C9A24A] block mb-1 text-xs tracking-wide">EJF ASSISTANT</span>
                    )}
                    <pre className="ejf-msg-pre">{m.text}</pre>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="flex gap-2 mb-3">
              <input
                type="text"
                placeholder="Ask about EJF, membership, platforms, partnerships..."
                value={input}
                onChange={(e) => { setInput(e.target.value); triggerInteracting(); }}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-[#C9A24A]/40 transition-all"
              />
              <button onClick={() => handleSend()}
                className="bg-[#08152F] hover:bg-[#0e2247] text-white font-bold px-5 py-3 rounded-xl text-sm transition-colors shadow-sm">
                Send
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {quickReplies.map((qr) => (
                <button key={qr} onClick={() => handleSend(qr)}
                  className="border border-gray-200 text-gray-600 hover:border-[#C9A24A] hover:text-[#C9A24A] hover:bg-[#C9A24A]/5 text-xs px-3 py-1.5 rounded-full transition-all">
                  {qr}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── MAIN EXPORT ─────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      <HeroSection />
      <PromiseSection />
      <EJFIdeaSection />
      <VisionMissionSection />
      <ValuesSection />
      <PlatformsSection />
      <CTASection />
      <AIChatSection />
    </>
  );
}
