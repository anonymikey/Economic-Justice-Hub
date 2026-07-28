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
    <section className="relative w-full overflow-hidden ejf-grain" style={{ height: "clamp(560px, 88vh, 820px)" }}>

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
         background: "linear-gradient(to top, rgba(5,14,34,0.98) 0%, rgba(8,21,47,0.68) 43%, rgba(8,21,47,0.22) 100%)",
      }} />
      <div className="absolute inset-0 z-10" style={{
         background: "linear-gradient(105deg, rgba(5,14,34,0.82) 0%, rgba(8,21,47,0.42) 42%, transparent 76%)",
      }} />
       <div className="absolute inset-0 z-10 opacity-70" style={{
         background: "radial-gradient(circle at 72% 22%, rgba(201,162,74,0.18), transparent 22rem)",
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
           Economic Justice for All.
        </h1>

        <p key={`sub-${current}`}
          className="text-sm md:text-base text-white/65 mb-7 max-w-xl leading-relaxed"
          style={{ animation: "heroSlideUp 0.7s 0.45s cubic-bezier(0.4,0,0.2,1) both" }}>
          Transforming Economic Systems for People to Achieve Economic Justice.
        </p>

        <div className="flex flex-col sm:flex-row gap-3"
          style={{ animation: "heroSlideUp 0.7s 0.6s cubic-bezier(0.4,0,0.2,1) both" }}>
          <Link href="/research"
             className="ejf-shimmer inline-flex items-center justify-center gap-2 bg-[#C9A24A] hover:bg-[#b08a35] text-white font-bold px-8 py-3.5 rounded-xl transition-all text-sm shadow-lg shadow-[#C9A24A]/30 hover:-translate-y-0.5">
            Explore Our Work →
          </Link>
          {user ? (
            <a href="https://ejf-members-registration.mgx.world" target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-sm text-white font-bold px-8 py-3.5 rounded-xl transition-all text-sm hover:-translate-y-0.5">
              📋 Register with Us
            </a>
          ) : (
            <Link href="/contact"
               className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-sm text-white font-bold px-8 py-3.5 rounded-xl transition-all text-sm hover:-translate-y-0.5">
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

// ─── WHAT WE BELIEVE ─────────────────────────────────────────────────────────
function PromiseSection() {
  return (
    <section className="bg-white py-20 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          <div style={{ animation: "fadeInLeft 0.8s ease both" }}>
            <span className="inline-block text-[#C9A24A] text-xs font-bold tracking-widest uppercase mb-4 border-b border-[#C9A24A]/30 pb-1">
              What We Believe
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#08152F] leading-tight mb-6">
              Ideas Shape Institutions. Institutions Shape Economic Systems. Economic Systems Shape People's Lives.
            </h2>
            <p className="text-[#08152F] font-semibold text-base leading-relaxed mb-2">
              The Economic Justice Forum affirms that human dignity is the foundation of Economic Justice.
            </p>
            <p className="text-[#C9A24A] font-medium text-sm tracking-wide leading-relaxed mb-4">
              Every person possesses inherent worth, and every economy derives its legitimacy from its ability to respect, protect and advance that dignity.
            </p>
            <p className="text-[#08152F]/70 text-base leading-relaxed mb-4">
              The Economic Justice Forum recognises economic rights as fundamental human rights. We affirm that every person should have the opportunity to participate in economic life, create value, pursue enterprise, innovate, work with dignity, own productive assets and share fairly in the benefits of economic progress.
            </p>
            <p className="text-[#08152F]/70 text-base leading-relaxed mb-4">
              These rights form an essential foundation for people to achieve Economic Justice.
            </p>
            <blockquote className="border-l-4 border-[#C9A24A] pl-5 py-2 my-6">
              <p className="text-[#08152F] font-semibold text-lg italic leading-snug">
                "People are the purpose of every economy."
              </p>
            </blockquote>
            <p className="text-[#08152F]/70 text-base leading-relaxed mb-4">
              The Economic Justice Forum is guided by the enduring principles of Equity, Justice and Prosperity.
            </p>
            <p className="text-[#08152F]/70 text-base leading-relaxed mb-6">
              We understand Economic Justice as the condition in which people are able to realise their economic potential, exercise their economic rights and participate fully in economic systems that uphold human dignity, expand opportunity and create equitable and sustainable prosperity.
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

// ─── EJF INSTITUTIONAL PHILOSOPHY ────────────────────────────────────────────
function EJFIdeaSection() {
  const points = [
    "Human dignity is the foundation of Economic Justice.",
    "Economic rights are fundamental human rights.",
    "People are the purpose of every economy.",
    "Institutions shape economic outcomes.",
    "Economic systems are the means through which Economic Justice is advanced.",
    "Opportunity is the pathway through which people realise their economic potential.",
    "Transformation strengthens institutions and economic systems.",
    "Economic Justice is the purpose of our work and the outcome we advance.",
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
              Our Philosophy
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-4">
              The Economic Justice Forum
            </h2>
            <p className="text-white/70 text-base leading-relaxed mb-2">
              At the Economic Justice Forum, human dignity is the foundation of our understanding of Economic Justice.
            </p>
            <p className="text-white/70 text-base leading-relaxed mb-6">
              We recognise economic rights as fundamental human rights and people as the purpose of every economy.
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
              These beliefs provide the philosophical foundation for our doctrine, analytical approaches, partnerships and contribution to advancing Economic Justice for All.
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
              Economic Justice for All.
            </h3>
            <div className="h-0.5 w-12 bg-[#C9A24A] rounded mb-4" />
            <p className="text-white/55 text-sm leading-relaxed">
              People are the purpose of every economy, and every person should have the opportunity to participate in, contribute to and benefit from economic progress.
            </p>
          </div>

          <div className="relative bg-white/5 border border-white/10 rounded-3xl p-10 overflow-hidden group hover:bg-white/8 transition-colors">
            <div className="absolute top-6 right-6 w-14 h-14 rounded-2xl bg-[#C9A24A]/10 flex items-center justify-center text-2xl">
              ⚖️
            </div>
            <span className="inline-block text-[#C9A24A] text-xs font-bold tracking-widest uppercase mb-4">Our Mission</span>
            <h3 className="text-xl font-bold text-white leading-snug mb-4">
              Transforming Economic Systems for People to Achieve Economic Justice.
            </h3>
            <div className="h-0.5 w-12 bg-[#C9A24A] rounded mb-4" />
            <p className="text-white/55 text-sm leading-relaxed">
              We work with governments, communities, civil society, academia, the private sector and development partners to transform economic systems that expand opportunity, strengthen institutions and deliver equitable and sustainable prosperity.
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
       desc: "Equity expands opportunity, enabling every person to participate meaningfully in economic life.",
    },
    {
      icon: "🏛️",
      title: "Justice",
      color: "from-blue-400/15 to-blue-400/5",
      border: "border-blue-400/25",
      accent: "#60a5fa",
       desc: "Justice protects rights, promotes accountability, strengthens institutions and ensures fairness throughout economic systems.",
    },
    {
      icon: "🌱",
      title: "Prosperity",
      color: "from-emerald-400/15 to-emerald-400/5",
      border: "border-emerald-400/25",
      accent: "#34d399",
       desc: "Prosperity is the shared outcome of economies that create lasting value for people, communities, nations and future generations.",
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

// ─── HQ PRIORITY AREAS ────────────────────────────────────────────────────────
function PlatformsSection() {
  const platforms = [
    {
      icon: "🌿",
      name: "Natural Wealth & Climate Justice",
      tagline: "Priority Area",
      desc: "Advancing equitable governance of natural wealth, climate resilience, biodiversity conservation, blue economy and sustainable development to ensure communities benefit fairly from the resources that sustain their lives.",
      href: "/research",
    },
    {
      icon: "💰",
      name: "Public Finance & Economic Governance",
      tagline: "Priority Area",
      desc: "Promoting transparent, accountable and participatory public finance systems that strengthen service delivery, improve resource allocation and enhance economic accountability.",
      href: "/research",
    },
    {
      icon: "🏛️",
      name: "Democracy, Governance & Institutional Development",
      tagline: "Priority Area",
      desc: "Supporting stronger public institutions, citizen participation, policy reform and accountable governance to build resilient and responsive economic systems.",
      href: "/research",
    },
    {
      icon: "🔬",
      name: "Research, Innovation & Digital Transformation",
      tagline: "Priority Area",
      desc: "Generating evidence, advancing innovative solutions and leveraging digital technologies to improve decision-making, expand opportunity and accelerate inclusive development.",
      href: "/research",
    },
    {
      icon: "💼",
      name: "Economic Empowerment",
      tagline: "Priority Area",
      desc: "Creating pathways for youth, women and communities to participate meaningfully in economic development through entrepreneurship, skills development, enterprise support and access to emerging opportunities.",
      href: "/research",
    },
  ];

  return (
    <section className="bg-[#F4F6F9] py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block text-[#C9A24A] text-xs font-bold tracking-widest uppercase mb-3">
            Our Priority Areas
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#08152F] mb-3">Our Priority Areas</h2>
          <p className="text-[#08152F]/55 max-w-2xl mx-auto text-base">
            Five priority areas through which EJF transforms economic systems for people to achieve Economic Justice.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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

// ─── STRATEGIC PARTNERS ──────────────────────────────────────────────────────
function PartnersSection() {
  const partners = [
    ["Skill Addis", "Addis Ababa, Ethiopia"],
    ["Initiative for Responsible Mining Assurance (IRMA)", "Washington, D.C., United States"],
    ["Our Ocean Centres Kenya", "Nairobi, Kenya"],
    ["Open Forest Protocol (OFP)", "Lausanne, Switzerland"],
    ["NatureGrid", "Lausanne, Switzerland"],
    ["Women in Mining Africa (WiM-Africa)", "Freetown, Sierra Leone"],
  ];

  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block text-[#C9A24A] text-xs font-bold tracking-widest uppercase mb-3">
            Collaboration
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#08152F] mb-3">Strategic Partners</h2>
          <p className="text-[#08152F]/55 max-w-2xl mx-auto text-base">
            EJF works with a growing network of strategic partners committed to advancing Economic Justice, strengthening economic systems, promoting responsible Natural Wealth governance, and expanding equitable prosperity.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {partners.map(([name, location]) => (
            <div key={name} className="group bg-[#F4F6F9] rounded-3xl border border-gray-100 p-7 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-[#08152F] flex items-center justify-center text-[#C9A24A] text-xl mb-5 group-hover:bg-[#C9A24A] group-hover:text-white transition-colors">
                🤝
              </div>
              <h3 className="font-extrabold text-[#08152F] text-base leading-snug mb-2">{name}</h3>
              <p className="text-[#08152F]/55 text-sm leading-relaxed">{location}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── LET'S BUILD ECONOMIC JUSTICE TOGETHER CTA ──────────────────────────────
function CTASection() {
  return (
    <section className="relative py-28 px-4 overflow-hidden">
      <div className="absolute inset-0">
        <img src={img7} alt="Let's build Economic Justice together"
          className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#08152F]/97 via-[#08152F]/88 to-[#08152F]/75" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <span className="inline-block text-[#C9A24A] text-xs font-bold tracking-widest uppercase mb-5">
          Partnership
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-6">
          Let's Build Economic Justice Together
        </h2>
        <p className="text-white/65 text-base leading-relaxed mb-4 max-w-2xl mx-auto">
          Economic Justice is more than an aspiration—it is the foundation of peaceful societies, resilient economies and shared prosperity.
        </p>
        <p className="text-white/65 text-base leading-relaxed mb-4 max-w-2xl mx-auto">
          Whether you are shaping public policy, investing in innovation, advancing research, empowering communities or strengthening institutions, your partnership can help transform economic systems that work for people.
        </p>
        <p className="text-white/50 text-sm leading-relaxed mb-4 max-w-2xl mx-auto">
          Together, we can build a future where every person has the opportunity to participate in, contribute to and benefit from economic progress.
        </p>
        <p className="text-[#C9A24A] font-semibold text-sm tracking-wide mb-10 max-w-2xl mx-auto">
          Economic Justice Forum (EJF)
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
    answer: "Hello and welcome to the Economic Justice Forum! 👋 I'm your EJF AI Assistant. I can help you learn about our mission, priority areas, strategic partners, membership, events, research, donations, volunteer opportunities, and more. What would you like to know?",
  },
  {
    patterns: /\b(what is ejf|about ejf|tell me about ejf|who is ejf|what does ejf do|ejf overview)\b/i,
    answer: "The Economic Justice Forum (EJF) is a registered non-governmental organization in Kenya advancing Economic Justice for All by transforming economic systems for people to achieve Economic Justice.\n\nEJF brings together governments, communities, businesses, academia and development partners to strengthen institutions, improve economic systems and expand opportunities for equitable and sustainable prosperity.\n\nOur Vision: Economic Justice for All.\nOur Mission: Transforming Economic Systems for People to Achieve Economic Justice.",
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
    answer: "EJF works across five official priority areas:\n\n🌿 Natural Wealth & Climate Justice — Advancing equitable governance of natural wealth, climate resilience, biodiversity conservation, blue economy and sustainable development to ensure communities benefit fairly from the resources that sustain their lives.\n\n💰 Public Finance & Economic Governance — Promoting transparent, accountable and participatory public finance systems that strengthen service delivery, improve resource allocation and enhance economic accountability.\n\n🏛️ Democracy, Governance & Institutional Development — Supporting stronger public institutions, citizen participation, policy reform and accountable governance to build resilient and responsive economic systems.\n\n🔬 Research, Innovation & Digital Transformation — Generating evidence, advancing innovative solutions and leveraging digital technologies to improve decision-making, expand opportunity and accelerate inclusive development.\n\n💼 Economic Empowerment — Creating pathways for youth, women and communities to participate meaningfully in economic development through entrepreneurship, skills development, enterprise support and access to emerging opportunities.",
  },
  {
    patterns: /\b(climate|environment|green|environmental justice|carbon|natural wealth|resource)\b/i,
    answer: "Natural Capital and Climate Justice are at the core of EJF's work. We believe communities who protect natural wealth must be the first to benefit.\n\nOur work includes:\n🌳 Equitable benefit-sharing frameworks for resource-rich communities\n☀️ Advocacy for clean energy and conservation economies\n🚜 Climate resilience for arid, semi-arid, and coastal regions\n📢 Amplifying community voices in global climate negotiations\n💧 Advancing Direct Climate Finance to counties and communities",
  },
  {
    patterns: /\b(digital|technology|internet|tech|digital justice|online rights|data|ai|artificial intelligence)\b/i,
    answer: "Research, Innovation & Digital Transformation is one of EJF's five priority areas. We generate evidence, advance innovative solutions and leverage digital technologies to improve decision-making, expand opportunity and accelerate inclusive development.",
  },
  {
    patterns: /\b(vision|mission|purpose|goal|objective)\b/i,
    answer: "EJF's Vision:\n'Economic Justice for All.'\n\nEJF's Mission:\n'Transforming Economic Systems for People to Achieve Economic Justice.'\n\nOur guiding principles are Equity • Justice • Prosperity — the three principles that shape our understanding of Economic Justice and define the future we are committed to building together.",
  },
  {
    patterns: /\b(location|where|address|office|based|headquarter|kenya|taita|nairobi)\b/i,
    answer: "EJF is headquartered in Kenya:\n\n📍 Head Office: Mwatate, Taita Taveta County, Kenya\n\n📧 info@economicjusticeforum.org\n📞 +254 741 357 830\n🌐 economicjusticeforum.org",
  },
  {
    patterns: /\b(contact|reach|email|phone|call|get in touch|speak to)\b/i,
    answer: "Reach EJF through:\n\n📧 General: info@economicjusticeforum.org\n📧 Membership: membership@economicjusticeforum.org\n📧 Partnerships: partners@economicjusticeforum.org\n📧 Media: media@economicjusticeforum.org\n\n📞 WhatsApp: +254 741 357 830\n🌐 economicjusticeforum.org\n\nWe respond within 24–48 business hours.",
  },
  {
    patterns: /\b(strategic partner|strategic partners|who are your partners|partner network)\b/i,
    answer: "EJF works with a growing network of strategic partners committed to advancing Economic Justice, strengthening economic systems, promoting responsible Natural Wealth governance, and expanding equitable prosperity.\n\nOur strategic partners include:\n• Skill Addis — Addis Ababa, Ethiopia\n• Initiative for Responsible Mining Assurance (IRMA) — Washington, D.C., United States\n• Our Ocean Centres Kenya — Nairobi, Kenya\n• Open Forest Protocol (OFP) — Lausanne, Switzerland\n• NatureGrid — Lausanne, Switzerland\n• Women in Mining Africa (WiM-Africa) — Freetown, Sierra Leone",
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
    answer: "I'm your EJF AI Assistant. I can help with:\n\n🏛️ About EJF — mission, vision and philosophy\n🌿 Priority Areas — the five areas of EJF's work\n🤝 Strategic Partners — EJF's growing partner network\n👤 Membership — how to join and registration\n⭐ Benefits — what you gain as a member\n🙋 Volunteering — how to contribute your skills\n💰 Donations — how to support EJF\n📅 Events — upcoming forums and workshops\n📚 Research — our publications and reports\n📞 Contact — how to reach our team\n\nJust ask — I'm here to help!",
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
    { role: "assistant", text: "Hello! 👋 I'm the EJF AI Assistant. I can give you detailed information about our mission, priority areas, strategic partners, membership, events, research, and more. What would you like to know?" },
  ]);
  const [input, setInput] = useState("");
  const [interacting, setInteracting] = useState(false);
  const [focused, setFocused] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);
  const interactTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const quickReplies = ["What is EJF?", "Our Vision", "Priority Areas", "Strategic Partners", "Donate", "Contact Us"];

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
            Our AI assistant provides detailed answers about EJF's mission, priority areas, strategic partners, membership, volunteering, events, and more.
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
      <PartnersSection />
      <CTASection />
      <AIChatSection />
    </>
  );
}
