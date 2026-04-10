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
  { src: img7, caption: "Empowering Communities", sub: "Students celebrating access to learning resources" },
  { src: img3, caption: "Community Dialogue", sub: "Grassroots conversations driving real change" },
  { src: img5, caption: "Education & Equity", sub: "Delivering essential support to schools in need" },
  { src: img6, caption: "Food Security", sub: "Ensuring no family goes hungry in our communities" },
  { src: img1, caption: "Amplifying Voices", sub: "EJF advocates speaking truth to power" },
  { src: img4, caption: "People-Centred Governance", sub: "Community dialogues shaping inclusive policy" },
  { src: img2, caption: "Youth Engagement", sub: "Mobilising the next generation of justice champions" },
];

const SLIDE_DURATION = 5500;

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
    setTimeout(() => {
      setPrev(null);
      setTransitioning(false);
    }, 900);
  }, [current, transitioning]);

  const next = useCallback(() => {
    goTo((current + 1) % HERO_SLIDES.length);
  }, [current, goTo]);

  useEffect(() => {
    timerRef.current = setTimeout(next, SLIDE_DURATION);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [next]);

  const slide = HERO_SLIDES[current];

  return (
    <section className="relative w-full overflow-hidden" style={{ height: "clamp(540px, 85vh, 780px)" }}>

      {/* ── SLIDE IMAGES ── */}
      {HERO_SLIDES.map((s, i) => {
        const isActive = i === current;
        const isPrev = i === prev;
        if (!isActive && !isPrev) return null;
        return (
          <div
            key={s.src}
            className="absolute inset-0"
            style={{
              zIndex: isPrev ? 1 : 2,
              animation: isActive
                ? "heroFadeIn 0.9s cubic-bezier(0.4,0,0.2,1) forwards"
                : "heroFadeOut 0.9s cubic-bezier(0.4,0,0.2,1) forwards",
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${s.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                animation: isActive ? "heroKenBurns 7s ease-out forwards" : "none",
                willChange: "transform",
              }}
            />
          </div>
        );
      })}

      {/* ── LAYERED OVERLAYS ── */}
      <div className="absolute inset-0 z-10" style={{
        background: "linear-gradient(to top, rgba(8,16,32,0.92) 0%, rgba(10,22,40,0.60) 45%, rgba(8,16,32,0.30) 100%)",
      }} />
      <div className="absolute inset-0 z-10" style={{
        background: "linear-gradient(to right, rgba(8,16,32,0.5) 0%, transparent 60%)",
      }} />

      {/* ── CONTENT ── */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end pb-20 md:pb-24 px-6 md:px-16 max-w-5xl">

        {/* Caption badge */}
        <div
          key={`badge-${current}`}
          className="mb-3"
          style={{ animation: "heroSlideUp 0.7s 0.2s cubic-bezier(0.4,0,0.2,1) both" }}
        >
          <span className="inline-flex items-center gap-2 bg-[#d4a017]/20 border border-[#d4a017]/40 backdrop-blur-sm text-[#f0c040] text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4a017] animate-pulse" />
            {slide.caption}
          </span>
        </div>

        <h1
          key={`h1-${current}`}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-3"
          style={{ animation: "heroSlideUp 0.7s 0.35s cubic-bezier(0.4,0,0.2,1) both", textShadow: "0 2px 24px rgba(0,0,0,0.5)" }}
        >
          Equity.<br className="sm:hidden" /> Justice.<br className="sm:hidden" /> Prosperity.
        </h1>

        <p
          key={`sub-${current}`}
          className="text-sm md:text-base text-white/70 mb-2 max-w-lg leading-relaxed"
          style={{ animation: "heroSlideUp 0.7s 0.45s cubic-bezier(0.4,0,0.2,1) both" }}
        >
          {slide.sub}
        </p>

        <p
          className="text-white/50 text-xs md:text-sm mb-7 max-w-lg"
          style={{ animation: "heroSlideUp 0.7s 0.5s cubic-bezier(0.4,0,0.2,1) both" }}
        >
          People's Platform for Economic, Climate, Social &amp; Digital Justice
        </p>

        <div
          className="flex flex-col sm:flex-row gap-3"
          style={{ animation: "heroSlideUp 0.7s 0.6s cubic-bezier(0.4,0,0.2,1) both" }}
        >
          <Link href="/about"
            className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-sm text-white font-bold px-7 py-3.5 rounded-xl transition-all text-sm">
            Learn More
          </Link>
          {user ? (
            <a href="https://ejf-members-registration.mgx.world" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#d4a017] hover:bg-[#b8880f] text-white font-bold px-7 py-3.5 rounded-xl transition-all text-sm shadow-lg shadow-[#d4a017]/30">
              📋 Register with Us
            </a>
          ) : (
            <Link href="/login"
              className="inline-flex items-center justify-center gap-2 bg-[#d4a017] hover:bg-[#b8880f] text-white font-bold px-7 py-3.5 rounded-xl transition-all text-sm shadow-lg shadow-[#d4a017]/30">
              Join the Movement →
            </Link>
          )}
        </div>

        {user && (
          <p className="text-white/40 text-xs mt-3">
            Welcome back, <span className="text-[#d4a017] font-semibold">{user.name}</span>! Complete your official EJF registration.
          </p>
        )}
      </div>

      {/* ── SLIDE DOTS ── */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="transition-all duration-500"
            style={{
              height: 6,
              borderRadius: 3,
              background: i === current ? "#d4a017" : "rgba(255,255,255,0.35)",
              width: i === current ? 28 : 8,
            }}
          />
        ))}
      </div>

      {/* ── ARROW CONTROLS ── */}
      <button
        onClick={() => goTo((current - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/30 hover:bg-black/60 border border-white/20 backdrop-blur-sm text-white flex items-center justify-center transition-all"
        aria-label="Previous slide"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
      </button>
      <button
        onClick={() => goTo((current + 1) % HERO_SLIDES.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/30 hover:bg-black/60 border border-white/20 backdrop-blur-sm text-white flex items-center justify-center transition-all"
        aria-label="Next slide"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
      </button>

      {/* ── SLIDE COUNTER ── */}
      <div className="absolute top-5 right-5 z-30 bg-black/30 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1 text-white text-xs font-bold tabular-nums">
        {String(current + 1).padStart(2, "0")} / {String(HERO_SLIDES.length).padStart(2, "0")}
      </div>

      {/* ── PROGRESS BAR ── */}
      <div className="absolute bottom-0 left-0 right-0 z-30 h-0.5 bg-white/10">
        <div
          key={`progress-${current}`}
          className="h-full bg-[#d4a017]"
          style={{ animation: `heroProgress ${SLIDE_DURATION}ms linear forwards` }}
        />
      </div>

      {/* ── KEYFRAME STYLES ── */}
      <style>{`
        @keyframes heroFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes heroFadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        @keyframes heroKenBurns {
          from { transform: scale(1.06) translateX(0px); }
          to { transform: scale(1.0) translateX(-8px); }
        }
        @keyframes heroSlideUp {
          from { opacity: 0; transform: translateY(22px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroProgress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-2xl font-bold text-[#0e1f3d] mb-4">About Us</h2>
          <p className="text-gray-700 mb-3 leading-relaxed">
            The Economic Justice Forum (EJF) is the people's platform for Economic, Climate, Social, and Digital Justice. We champion equitable development, participatory governance, and sustainable prosperity for all.
          </p>
          <p className="text-gray-700 mb-6 leading-relaxed">
            EJF bridges grassroots realities and international advocacy, empowering citizens to claim their economic, environmental, and digital rights.
          </p>
          <a
            href="/about"
            className="inline-block bg-[#0e1f3d] hover:bg-[#1a2f5e] text-white font-semibold px-6 py-2.5 rounded transition-colors text-sm"
          >
            Read Our Full Story
          </a>
        </div>
      </div>
    </section>
  );
}

function PillarsSection() {
  const pillars = [
    {
      number: 1,
      title: "Economic, Fiscal & Debt Justice",
      content: `EJF promotes fair taxation, debt transparency, and citizen-led budgeting to ensure that public finance serves people, not power. We advocate for:`,
      bullets: [
        "Debt cancellation campaigns and social audits of public borrowing and spending.",
        "Progressive tax reforms that reduce inequality and fund quality social services.",
        "40% equitable allocation of the national budget to county governments.",
        "65% of county budgets dedicated to development rather than administration.",
        "Participatory budgeting and citizen scorecards for accountability in all public funds.",
      ],
    },
    {
      number: 2,
      title: "Climate & Resource Justice",
      content: `We champion equitable and sustainable management of Kenya's natural and environmental wealth, ensuring communities benefit fairly from their resources. EJF works to:`,
      bullets: [
        "Secure fair benefit-sharing frameworks for resource-rich counties and communities, covering extractives, marine, water, wind, natural gas, national parks, and ports.",
        "Promote sustainable mining, renewable energy, and conservation economies that create local, climate-resilient jobs.",
        "Strengthen climate resilience in arid, semi-arid, and coastal regions.",
        "Integrate climate action with equity, accountability, and financial fairness through initiatives like Debt-for-Climate Swaps.",
        "Advocate for Direct Climate Finance flows to counties and community organizations.",
        "Establish a People's Climate Dividend, ensuring communities protecting natural resources receive guaranteed benefits.",
        "Advocate globally for a UN Framework/Convention on Natural Resource Benefit-Sharing to advance peace, equity, and poverty eradication.",
      ],
      italic: "True climate justice ensures that those who protect the planet are the first to benefit from its preservation.",
    },
    {
      number: 3,
      title: "Democracy, Digital Justice, Leadership & Devolution",
      content: `EJF strengthens democracy, ethical leadership, digital inclusion, and devolution as pillars of accountable governance and people-centered development. Our work includes:`,
      bullets: [
        "Promoting simple, verifiable electronic voting systems for transparent elections.",
        "Restructuring devolution to ensure lean, efficient, and development-focused county governments.",
        "Expanding digital justice — bridging the digital divide, ensuring fair access to digital opportunities, and protecting citizens' rights in the digital age.",
        "Advocating for equitable and ethical Artificial Intelligence (AI) that serves humanity, protects the planet, and promotes equity, accountability, and tech innovations to enhance participation and transparency.",
      ],
    },
  ];

  const globalAdvocacy = {
    number: 4,
    title: "Global Advocacy & Governance Reform",
    content: `EJF connects local realities to global justice movements to reshape international systems in favor of people and planet. We advocate for:`,
    bullets: [
      "A UN Framework/Convention on Natural Resource Benefit-Sharing.",
      "Reforms of international financial institutions (IMF, World Bank, WTO) to make global finance transparent, fair, and sustainable.",
      "A UN Framework on Debt and Tax Justice to prevent exploitation and ensure responsible lending and borrowing.",
      "UN Security Council reforms — granting Africa permanent seats with veto powers and ensuring grassroots communities have a voice in global decision-making.",
    ],
  };

  return (
    <section className="bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-[#0e1f3d] mb-2">Our Strategic Pillars</h2>
        <p className="text-gray-600 mb-8">
          The foundation of our mission rests on four key pillars that guide our work towards comprehensive justice and equality.
        </p>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <h3 className="text-xl font-bold text-[#0e1f3d] mb-6">Our Core Pillars</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {pillars.map((pillar) => (
              <div
                key={pillar.number}
                className="bg-amber-50 border border-amber-100 rounded-lg p-5"
              >
                <div className="flex items-start gap-2 mb-3">
                  <span className="bg-blue-500 text-white text-xs font-bold w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                    {pillar.number}
                  </span>
                  <h4 className="font-bold text-[#0e1f3d] text-sm leading-snug">{pillar.title}</h4>
                </div>
                <p className="text-gray-700 text-sm mb-3 leading-relaxed">{pillar.content}</p>
                <ul className="space-y-1.5">
                  {pillar.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-sm text-gray-700">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-500 flex-shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                {pillar.italic && (
                  <p className="text-sm text-amber-700 italic mt-3">
                    ⚡ {pillar.italic}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Global Advocacy */}
          <div className="bg-amber-50 border border-amber-100 rounded-lg p-5 mb-6">
            <div className="flex items-start gap-2 mb-3">
              <span className="bg-blue-500 text-white text-xs font-bold w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                {globalAdvocacy.number}
              </span>
              <h4 className="font-bold text-[#0e1f3d] text-sm">{globalAdvocacy.title}</h4>
            </div>
            <p className="text-gray-700 text-sm mb-3 leading-relaxed">{globalAdvocacy.content}</p>
            <ul className="space-y-1.5">
              {globalAdvocacy.bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-1.5 text-sm text-gray-700">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-500 flex-shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center">
            <a
              href="/pillars"
              className="inline-block bg-[#0e1f3d] hover:bg-[#1a2f5e] text-white font-semibold px-8 py-2.5 rounded transition-colors text-sm"
            >
              Explore All Pillars
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function CoreValuesSection() {
  const values = [
    "Equity & Social Justice",
    "Transparency & Integrity",
    "Inclusion",
    "Sustainability",
    "Collaboration",
    "Digital Fairness",
  ];

  return (
    <section className="bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-[#0e1f3d] mb-4">Our Core Values</h2>
        <div className="flex flex-wrap gap-3">
          {values.map((v) => (
            <span
              key={v}
              className="border border-gray-300 text-[#0e1f3d] text-sm font-medium px-4 py-2 rounded-full bg-white hover:bg-gray-50 transition-colors cursor-default"
            >
              {v}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedProjectsSection() {
  const projects = [
    {
      title: "Our Trees, Our Future",
      desc: "Growing Leaders, Growing Trees — a flagship initiative linking environmental conservation, youth leadership and civic empowerment.",
      btnLabel: "Read more",
      href: "/programs",
      bg: "from-green-900/80 to-green-700/60",
      imgUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80",
    },
    {
      title: "Civic Engagement on Economic & Climate Justice",
      desc: "Empowering citizens to influence policy, monitor public spending, and demand accountability in natural resource management and climate finance.",
      btnLabel: "Read more",
      href: "/pillars",
      bg: "from-slate-900/80 to-slate-700/60",
      imgUrl: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=80",
    },
    {
      title: "Research & Policy Advocacy",
      desc: "Developing evidence-based policy recommendations for equitable resource distribution and benefit-sharing frameworks.",
      btnLabel: "Explore Research",
      href: "/research",
      bg: "from-blue-900/80 to-blue-700/60",
      imgUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
    },
  ];

  return (
    <section className="bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-[#0e1f3d] mb-6">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {projects.map((p) => (
            <Link
              key={p.title}
              href={p.href}
              className="relative rounded-xl overflow-hidden h-72 group cursor-pointer block"
              style={{
                backgroundImage: `url(${p.imgUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className={`absolute inset-0 bg-gradient-to-t ${p.bg} group-hover:opacity-90 transition-opacity`} />
              <div className="absolute inset-0 p-5 flex flex-col justify-between">
                <h3 className="text-white font-bold text-base leading-snug">{p.title}</h3>
                <div>
                  <p className="text-white/80 text-sm mb-4 leading-relaxed">{p.desc}</p>
                  <span className="inline-block bg-[#d4a017] group-hover:bg-[#b8891a] text-white font-semibold text-sm px-4 py-2 rounded transition-colors">
                    {p.btnLabel}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function ImpactSection() {
  const stats = [
    { value: "20,000", label: "Trees grown" },
    { value: "20,000", label: "Tree Champions inducted" },
    { value: "100,000", label: "People reached through civic engagement" },
  ];

  return (
    <section className="bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-2xl font-bold text-[#0e1f3d] mb-6">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-amber-50/60 rounded-lg overflow-hidden">
                <div className="p-6 text-center">
                  <div className="text-3xl font-bold text-[#0e1f3d] mb-1">{s.value}</div>
                </div>
                <div className="bg-amber-100/60 px-4 py-3 text-center">
                  <p className="text-gray-700 text-sm">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function GeographicFocusSection() {
  const regions = [
    {
      emoji: "🌊",
      title: "Coastal Regions",
      desc: "Focus on marine resources and coastal community rights",
      color: "text-blue-500",
    },
    {
      emoji: "🌵",
      title: "Arid & Semi-Arid",
      desc: "Climate resilience and resource management",
      color: "text-green-500",
    },
    {
      emoji: "🏙️",
      title: "Urban Centers",
      desc: "Digital inclusion and economic opportunities",
      color: "text-blue-600",
    },
  ];

  return (
    <section className="bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-2xl font-bold text-[#0e1f3d] mb-3">Geographic Focus</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            EJF operates across coastal counties (Taita Taveta, Kilifi, Kwale, Lamu, Mombasa), arid and semi-arid regions (Turkana, Isiolo, Samburu), resource-rich counties (Kajiado, Laikipia, Nyandarua), and urban hubs (Nairobi and Mombasa).
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {regions.map((r) => (
              <div key={r.title} className="bg-gray-50 rounded-lg p-5 text-center border border-gray-100">
                <div className="text-4xl mb-3">{r.emoji}</div>
                <h3 className={`font-bold text-sm mb-2 ${r.color}`}>{r.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AIChatSection() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hello! I'm here to help you learn about EJF and guide you through registration. What would you like to know or how can I assist you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  const quickReplies = ["What is EJF?", "Become a Member", "Membership Benefits", "Volunteer Opportunities"];

  const handleSend = (text?: string) => {
    const msg = text || input.trim();
    if (!msg) return;

    setMessages((prev) => [...prev, { role: "user", text: msg }]);
    setInput("");

    setTimeout(() => {
      let response = "Thank you for your interest in EJF! We'll be happy to assist you. Please contact us at economicjusticeforum.org or call +254 741 357 830 for more information.";

      if (msg.toLowerCase().includes("what is ejf") || msg.toLowerCase() === "what is ejf?") {
        response = "The Economic Justice Forum (EJF) is the people's platform for Economic, Climate, Social, and Digital Justice in Kenya. We champion equitable development, participatory governance, and sustainable prosperity for all.";
      } else if (msg.toLowerCase().includes("member") || msg.toLowerCase().includes("register")) {
        response = "To become a member, you can register on our website or type 'register' to start the process. Membership is open to individuals, organizations, and community groups committed to economic justice.";
      } else if (msg.toLowerCase().includes("benefit")) {
        response = "EJF membership benefits include: access to research and publications, participation in advocacy campaigns, networking with justice champions, training opportunities, and a voice in policy decisions.";
      } else if (msg.toLowerCase().includes("volunteer")) {
        response = "EJF welcomes volunteers! You can contribute your skills in research, community organizing, digital communications, legal advocacy, and more. Contact us to learn about current volunteer opportunities.";
      }

      setMessages((prev) => [...prev, { role: "assistant", text: response }]);
    }, 800);
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <section className="bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-[#0e1f3d] mb-2">Join EJF - AI Assisted Registration</h2>
        <p className="text-gray-600 mb-6">
          Our AI assistant can help you register as a member, volunteer, or partner. Get instant answers to your questions about EJF and complete your registration smoothly.
        </p>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          {/* Chat messages */}
          <div className="min-h-[200px] max-h-[300px] overflow-y-auto mb-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} items-start gap-2`}>
                {m.role === "assistant" && (
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0 text-sm">🤖</div>
                )}
                <div
                  className={`max-w-[80%] rounded-xl px-4 py-3 text-sm leading-relaxed ${
                    m.role === "assistant"
                      ? "bg-[#0e1f3d] text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {m.role === "assistant" && <span className="font-bold text-[#d4a017]">EJF Assistant: </span>}
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              placeholder="Ask about EJF or type 'register' to become a member..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 border border-gray-300 rounded px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0e1f3d]/30"
            />
            <button
              onClick={() => handleSend()}
              className="bg-[#0e1f3d] hover:bg-[#1a2f5e] text-white font-semibold px-5 py-2.5 rounded text-sm transition-colors"
            >
              Send
            </button>
          </div>

          {/* Quick replies */}
          <div className="flex flex-wrap gap-2">
            {quickReplies.map((qr) => (
              <button
                key={qr}
                onClick={() => handleSend(qr)}
                className="border border-gray-300 text-gray-700 hover:border-[#0e1f3d] hover:text-[#0e1f3d] text-xs px-3 py-1.5 rounded-full transition-colors"
              >
                {qr}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ResourcesSection() {
  const resources = [
    {
      emoji: "📚",
      title: "Publications",
      desc: "Download our latest research papers, policy briefs, and annual reports.",
      items: ["Annual Report 2025", "Climate Justice Policy", "Economic Equity Study", "Digital Inclusion Paper"],
    },
    {
      emoji: "🎥",
      title: "Media Resources",
      desc: "Access photos, videos, and media kits for press and partners.",
      items: ["Photo Gallery", "Video Library", "Press Releases", "Media Kit"],
    },
    {
      emoji: "📊",
      title: "Data & Research",
      desc: "Explore our data visualizations and research findings.",
      items: ["Impact Dashboard", "Research Database", "Case Studies", "Statistics"],
    },
  ];

  return (
    <section className="bg-white py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-[#0e1f3d] mb-2">Helpful Resources</h2>
        <p className="text-gray-600 mb-8 max-w-xl mx-auto">
          Access our latest publications, research papers, and educational materials to learn more about economic justice.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {resources.map((r) => (
            <div
              key={r.title}
              className="bg-gray-50 border-t-4 border-[#d4a017] rounded-lg p-6 text-left"
            >
              <div className="text-4xl mb-4 text-center">{r.emoji}</div>
              <h3 className="font-bold text-[#0e1f3d] text-base mb-2 text-center">{r.title}</h3>
              <p className="text-gray-600 text-sm mb-4 text-center leading-relaxed">{r.desc}</p>
              <ul className="space-y-1.5">
                {r.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="text-[#d4a017] font-bold">&#9658;</span>
                    <a href="#" className="hover:text-[#0e1f3d] hover:underline">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <PillarsSection />
      <CoreValuesSection />
      <FeaturedProjectsSection />
      <ImpactSection />
      <GeographicFocusSection />
      <AIChatSection />
      <ResourcesSection />
    </>
  );
}
