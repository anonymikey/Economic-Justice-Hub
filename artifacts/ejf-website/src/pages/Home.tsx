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

const EJF_AI_RESPONSES: { patterns: RegExp; answer: string }[] = [
  {
    patterns: /\b(hi|hello|hey|good morning|good afternoon|good evening|howdy)\b/i,
    answer: "Hello and welcome to the Economic Justice Forum! 👋 I'm your EJF AI Assistant. I can help you learn about our mission, programmes, membership, events, research, donations, volunteer opportunities, and more. What would you like to know?",
  },
  {
    patterns: /\b(what is ejf|about ejf|tell me about ejf|who is ejf|what does ejf do|ejf overview)\b/i,
    answer: "The Economic Justice Forum (EJF) is Kenya's people-centred platform for Economic, Climate, Social, and Digital Justice. Founded to bridge grassroots realities and international advocacy, EJF empowers citizens — especially marginalised communities in Taita Taveta and across Kenya — to claim their rights, participate in governance, and shape equitable policy.\n\nOur four pillars are:\n• 💰 Economic Justice — fair wages, land rights, and poverty reduction\n• 🌍 Climate Justice — environmental rights and climate adaptation\n• ⚖️ Social Justice — gender equity, youth inclusion, and human dignity\n• 💻 Digital Justice — internet access, data rights, and digital literacy\n\nWe run community dialogues, research programmes, policy advocacy, and emergency relief initiatives across Kenya.",
  },
  {
    patterns: /\b(member|register|join|sign up|registration|become a member|how to join)\b/i,
    answer: "Joining EJF is open to individuals, community groups, organisations, and institutions who share our commitment to justice and equity. Here's how:\n\n1. 📋 Click the 'Register with Us' button on this page (or visit our registration portal)\n2. 📝 Fill in your personal details and select your membership type (Individual / Organisation / Partner)\n3. ✅ Submit — our team will review and confirm your registration within 48 hours\n4. 🤝 You'll receive a welcome pack, access to our resource library, and invitations to events\n\nMembership is free for community members. Institutional memberships may have a small solidarity contribution. Need help? Email membership@economicjusticeforum.org",
  },
  {
    patterns: /\b(benefit|benefits|why join|advantage|perks|what do i get)\b/i,
    answer: "EJF membership comes with a rich set of benefits:\n\n🏛️ Governance & Voice\n• Participate in policy forums and community dialogues\n• Vote and be voted into EJF leadership positions\n• Influence EJF's advocacy agenda at county and national level\n\n📚 Knowledge & Resources\n• Free access to all EJF research publications and policy briefs\n• Invitations to workshops, trainings, and capacity-building events\n• Access to our legal aid and rights-education programmes\n\n🌐 Network & Solidarity\n• Connect with justice champions across Kenya and Africa\n• Collaborate with NGOs, academics, and government partners\n• Be part of a growing movement of 10,000+ advocates\n\n🆘 Support\n• Priority access to EJF's emergency relief and food security initiatives\n• Mental health and social support referrals",
  },
  {
    patterns: /\b(volunteer|volunteering|contribute|help out|how to help|give my time)\b/i,
    answer: "EJF thrives on the energy and skills of our volunteers! Here's how you can contribute:\n\n🔬 Research & Documentation — Help conduct community surveys, write reports, and document impact stories\n📣 Community Organising — Lead dialogues, mobilise communities, and facilitate grassroots meetings\n💻 Digital & Communications — Manage social media, create content, or build digital literacy in communities\n⚖️ Legal & Policy — Support legal aid clinics or contribute to policy analysis\n🚑 Emergency Relief — Join our food distribution and humanitarian response teams\n🎓 Education & Training — Facilitate workshops on economic rights, digital skills, and civic literacy\n\nTo apply as a volunteer, email volunteers@economicjusticeforum.org with your name, skills, and availability.",
  },
  {
    patterns: /\b(donate|donation|contribute money|fund|support ejf|financially|contribution)\b/i,
    answer: "Your financial support helps EJF run life-changing programmes for thousands of Kenyans. Donations go directly towards:\n\n🍱 Food Security — emergency food packages for vulnerable families\n📚 Education — school supplies and scholarship support\n🌱 Climate Justice — tree planting, clean energy, and climate adaptation\n🏛️ Advocacy — policy research, legal support, and government engagement\n\nHow to donate:\n• 📱 M-Pesa: Use our paybill or send via the Donate button on this site\n• 🌐 Online: Secure card donations on our website\n• 🏦 Bank transfer: Contact us for our official account details\n\nAll donations are acknowledged and you receive an impact report. Email donate@economicjusticeforum.org to learn more.",
  },
  {
    patterns: /\b(programme|programs|initiatives|activities|projects|what do you do)\b/i,
    answer: "EJF runs a wide range of impactful programmes:\n\n🌾 Food Security & Emergency Relief\nDistributing food packages and essentials to drought-affected families, especially in Taita Taveta.\n\n🏫 Education Equity\nProviding school supplies, sanitary products, and bursary support to learners from low-income families.\n\n🌍 Climate & Environmental Justice\nTree planting campaigns, clean energy advocacy, and community climate adaptation training.\n\n📱 Digital Justice\nFree digital literacy workshops, affordable internet access advocacy, and combating digital exclusion.\n\n⚖️ Legal Aid & Rights Education\nPro-bono legal support for marginalised individuals and civic education on economic rights.\n\n🤝 Community Dialogues\nFacilitating direct conversations between communities and government institutions on economic policy.",
  },
  {
    patterns: /\b(climate|environment|green|environmental justice|carbon)\b/i,
    answer: "Climate Justice is one of EJF's four core pillars. We believe that the communities who contribute least to climate change are often hit hardest by its effects.\n\nOur Climate Justice work includes:\n🌳 Tree planting and reforestation drives across Taita Taveta\n☀️ Advocacy for affordable clean energy and solar access in rural areas\n🚜 Supporting smallholder farmers adapting to drought and erratic rainfall\n📢 Amplifying community voices in national and international climate negotiations\n🔬 Conducting climate vulnerability assessments in marginalised counties\n\nWe partner with national and international environmental organisations to drive policy change. Join our climate action network by emailing climate@economicjusticeforum.org",
  },
  {
    patterns: /\b(digital|technology|internet|tech|digital justice|online rights|data)\b/i,
    answer: "Digital Justice is the right of every person to access, use, and shape digital technology. EJF fights to ensure no one is left offline.\n\nOur Digital Justice programmes:\n💻 Free digital literacy training for youth, women, and elderly citizens\n📶 Advocacy for affordable broadband in rural and underserved areas\n🔒 Educating communities on data privacy and online safety\n📱 Training on mobile money, e-government services, and online business\n🏛️ Engaging policymakers to close Kenya's digital divide\n\nWe've trained over 2,000 community members in digital skills across Taita Taveta. To participate or partner, contact digital@economicjusticeforum.org",
  },
  {
    patterns: /\b(social justice|gender|women|youth|equality|discrimination|human rights)\b/i,
    answer: "Social Justice sits at the heart of EJF's work. We champion the dignity, rights, and full participation of every person — regardless of gender, age, ethnicity, or economic status.\n\nOur Social Justice focus areas:\n👩 Gender Equity — combating gender-based violence, championing women's economic rights, and supporting women in leadership\n🧑 Youth Empowerment — mentorship, skills training, and civic engagement for young people aged 15–35\n🧓 Elderly Rights — ensuring older citizens are not left behind in economic and social development\n🏳️ Anti-Discrimination — fighting ethnic marginalisation and promoting inclusive development\n♿ Disability Inclusion — advocating for accessible services and equal opportunities for PWDs\n\nContact us at social@economicjusticeforum.org to get involved.",
  },
  {
    patterns: /\b(location|where|address|office|based|headquarter|kenya|taita|nairobi)\b/i,
    answer: "EJF is headquartered in Kenya and operates primarily in:\n\n📍 Taita Taveta County — our founding and primary base of operations\n📍 Nairobi — for national advocacy, government engagement, and partnerships\n📍 Mombasa & Coast Region — community outreach and coastal justice programmes\n\nWe also have affiliate networks and partners across East Africa and internationally.\n\n🏢 Physical Office: Wundanyi, Taita Taveta County, Kenya\n📧 Email: info@economicjusticeforum.org\n📞 Phone: +254 741 357 830\n🌐 Website: economicjusticeforum.org",
  },
  {
    patterns: /\b(contact|reach|email|phone|call|get in touch|speak to)\b/i,
    answer: "You can reach EJF through multiple channels:\n\n📧 General Enquiries: info@economicjusticeforum.org\n📧 Membership: membership@economicjusticeforum.org\n📧 Donations: donate@economicjusticeforum.org\n📧 Partnerships: partners@economicjusticeforum.org\n📧 Media: media@economicjusticeforum.org\n\n📞 Phone / WhatsApp: +254 741 357 830\n\n🌐 Website: economicjusticeforum.org\n📍 Office: Wundanyi, Taita Taveta County, Kenya\n\nOur team typically responds within 24–48 business hours. For urgent matters, WhatsApp is the fastest way to reach us.",
  },
  {
    patterns: /\b(partner|partnership|organisation|ngo|collaborate|mou|work together)\b/i,
    answer: "EJF actively partners with civil society organisations, government bodies, academic institutions, media houses, and international development organisations.\n\nTypes of partnerships we offer:\n🤝 Programme Partnerships — co-implement community programmes and research\n📣 Advocacy Alliances — join joint campaigns on economic and climate justice\n💰 Funding Partnerships — co-apply for grants or sponsor specific initiatives\n📚 Knowledge Exchange — share research, data, and best practices\n🏛️ Government Engagement — collaborate on policy development and public consultations\n\nTo explore a partnership, send us a brief introduction and your proposed area of collaboration:\n📧 partners@economicjusticeforum.org\n\nWe sign formal MoUs for structured partnerships.",
  },
  {
    patterns: /\b(event|events|upcoming|calendar|workshop|training|conference|forum|summit)\b/i,
    answer: "EJF regularly organises a wide range of events:\n\n📅 Community Dialogues — monthly grassroots forums in Taita Taveta and partner counties\n🎓 Workshops & Training — capacity building on economic rights, digital skills, and climate adaptation\n🏛️ Policy Forums — quarterly meetings with government and civil society leaders\n📣 Advocacy Campaigns — marches, petitions, and public awareness drives\n🍱 Relief Drives — food and essential goods distribution events\n🌳 Environmental Days — tree planting and clean-up campaigns\n\nTo see upcoming events:\n• Visit the Events page on our website\n• Follow us on social media for live updates\n• Subscribe to our newsletter for event invitations\n• Email events@economicjusticeforum.org to be added to our events list",
  },
  {
    patterns: /\b(research|publication|report|study|paper|data|findings|document)\b/i,
    answer: "EJF produces high-quality research to drive evidence-based advocacy and policy change:\n\n📄 Annual Impact Reports — documenting our yearly achievements and community outcomes\n📊 Policy Briefs — concise analysis of economic, climate, and social justice issues for policymakers\n🔬 Community Research — ground-level surveys and case studies from Taita Taveta and beyond\n📈 Data Dashboards — visual tools showing economic inequality, climate vulnerability, and digital access gaps\n📚 Educational Materials — easy-to-read guides on rights, policies, and civic participation\n\nAll EJF publications are free to access. Download them from:\n• Publications section on our website\n• Contact research@economicjusticeforum.org for specific reports\n• Members get early access to new research",
  },
  {
    patterns: /\b(fee|cost|price|free|paid|how much|subscription|dues)\b/i,
    answer: "EJF membership is free and open to all individuals committed to economic justice. We believe that no one should be excluded from the movement due to financial barriers.\n\nHere's our fee structure:\n👤 Individual Membership — FREE\n👨‍👩‍👧 Community Group Membership — FREE\n🏢 Organisational Membership — Small solidarity contribution (contact us for details)\n🌐 International/Institutional Partnership — Negotiated contribution\n\nAll members, regardless of contribution level, receive the same core benefits. Donations are always welcome but never required to participate. Contact membership@economicjusticeforum.org for more details.",
  },
  {
    patterns: /\b(help|what can you do|how can you help|topics|options|menu|assist)\b/i,
    answer: "I'm your EJF AI Assistant and I can help you with a wide range of topics! Here's what I can tell you about:\n\n🏛️ About EJF — our mission, vision, history, and pillars\n👤 Membership — how to join, registration steps, and requirements\n⭐ Benefits — what you get as an EJF member\n🙋 Volunteering — how to contribute your time and skills\n💰 Donations — how to support EJF financially\n📋 Programmes — our climate, digital, social, and economic initiatives\n📅 Events — upcoming forums, workshops, and community activities\n📚 Research — our publications and reports\n🤝 Partnerships — how organisations can collaborate with EJF\n📞 Contact — how to reach our team\n📍 Location — where we're based\n\nJust ask me anything and I'll do my best to give you a thorough answer!",
  },
];

function getAIResponse(msg: string): string {
  const lower = msg.toLowerCase().trim();
  for (const entry of EJF_AI_RESPONSES) {
    if (entry.patterns.test(lower)) return entry.answer;
  }
  return `Thank you for your question about "${msg}"! EJF is always happy to assist.\n\nFor specific enquiries not covered here, please reach out directly:\n\n📧 info@economicjusticeforum.org\n📞 +254 741 357 830\n🌐 economicjusticeforum.org\n\nYou can also try asking me about: membership, volunteering, programmes, events, climate justice, digital justice, donations, or partnerships — and I'll give you a detailed answer!`;
}

function AIChatSection() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hello! 👋 I'm the EJF AI Assistant. I can give you detailed information about our mission, programmes, membership, events, research, and more. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState("");
  const [interacting, setInteracting] = useState(false);
  const [focused, setFocused] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);
  const interactTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const quickReplies = ["What is EJF?", "Membership Benefits", "Volunteer", "Programmes", "Donate", "Contact Us"];

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
    <section className="bg-gray-50 py-14 px-4">
      <style>{`
        @keyframes ejfRainbow {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .ejf-rainbow-wrap {
          background: linear-gradient(270deg,
            #3b82f6, #6366f1, #8b5cf6, #a855f7,
            #ec4899, #ef4444, #f97316, #eab308,
            #22c55e, #06b6d4, #3b82f6
          );
          background-size: 400% 400%;
          animation: ejfRainbow 6s ease infinite;
          border-radius: 20px;
          padding: 2px;
          transition: padding 0.4s ease, box-shadow 0.4s ease, animation-duration 0.4s;
          box-shadow: 0 0 0px 0px rgba(139,92,246,0);
        }
        .ejf-rainbow-wrap.active {
          animation-duration: 1.8s;
          padding: 3px;
          box-shadow: 0 0 28px 4px rgba(139,92,246,0.22), 0 0 60px 8px rgba(236,72,153,0.12);
        }
        .ejf-inner {
          background: white;
          border-radius: 18px;
          overflow: hidden;
        }
        .ejf-msg-pre {
          white-space: pre-wrap;
          font-family: inherit;
          font-size: inherit;
          line-height: 1.65;
          margin: 0;
        }
      `}</style>

      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-[#0e1f3d] mb-2">Join EJF — AI Assisted Registration</h2>
        <p className="text-gray-500 text-sm mb-6 max-w-2xl">
          Our AI assistant gives detailed answers about EJF's mission, programmes, membership, volunteering, events, research, and more. Ask anything.
        </p>

        <div className={`ejf-rainbow-wrap ${isActive ? "active" : ""}`}>
          <div className="ejf-inner p-5 md:p-7">

            {/* Messages */}
            <div className="min-h-[220px] max-h-[360px] overflow-y-auto mb-5 space-y-4 pr-1">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} items-start gap-2.5`}>
                  {m.role === "assistant" && (
                    <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-base"
                      style={{ background: "linear-gradient(135deg,#0e1f3d,#1a3a6e)" }}>
                      🤖
                    </div>
                  )}
                  <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                    m.role === "assistant"
                      ? "bg-[#0e1f3d] text-white rounded-tl-sm"
                      : "bg-gray-100 text-gray-800 rounded-tr-sm"
                  }`}>
                    {m.role === "assistant" && (
                      <span className="font-bold text-[#d4a017] block mb-1 text-xs tracking-wide">EJF ASSISTANT</span>
                    )}
                    <pre className="ejf-msg-pre">{m.text}</pre>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input row */}
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                placeholder="Ask about EJF, membership, programmes, events..."
                value={input}
                onChange={(e) => { setInput(e.target.value); triggerInteracting(); }}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-[#8b5cf6]/40 transition-all"
              />
              <button
                onClick={() => handleSend()}
                className="bg-[#0e1f3d] hover:bg-[#1a3a6e] text-white font-bold px-5 py-3 rounded-xl text-sm transition-colors shadow-sm"
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
                  className="border border-gray-200 text-gray-600 hover:border-[#8b5cf6] hover:text-[#8b5cf6] hover:bg-[#8b5cf6]/5 text-xs px-3 py-1.5 rounded-full transition-all"
                >
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
