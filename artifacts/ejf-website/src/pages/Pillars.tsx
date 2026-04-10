import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────
   INTERSECTION OBSERVER HOOK (scroll-in anim)
───────────────────────────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const pillars = [
  {
    number: "01",
    icon: "⚖️",
    title: "Economic, Fiscal & Debt Justice",
    color: "from-amber-900 to-[#0e1f3d]",
    accent: "#d4a017",
    quote: "Fair economies are built when communities have power over the resources they steward.",
    focusAreas: [
      {
        label: "Equitable Revenue & Fiscal Allocation",
        bold: true,
        children: [
          "Increasing county government share of national revenue from 15% to at least 35%.",
          "Mandatory, structured public participation in county budgeting and expenditure tracking.",
          "Equitable natural resource revenue-sharing between national and county governments and host communities.",
        ],
      },
      { label: "Transparent public debt management, responsible borrowing, and debt-for-development swaps.", bold: true },
      { label: "Progressive taxation reform to reduce inequality, eliminate illicit financial flows, and ensure multinationals pay fair taxes in Kenya." },
      { label: "Grassroots economic empowerment — microfinance, cooperative finance, and community-owned enterprises for women, youth, and marginalized groups." },
      { label: "Living wages, social protection floors, and universal basic services (healthcare, education, water, energy)." },
      { label: "Community benefit agreements for mega infrastructure projects (ports, roads, dams, pipelines) to guarantee local employment and economic inclusion." },
    ],
  },
  {
    number: "02",
    icon: "🌍",
    title: "Climate & Resource Justice",
    color: "from-emerald-900 to-[#0e1f3d]",
    accent: "#10b981",
    quote: "True climate justice ensures those protecting the planet are the first to benefit.",
    focusAreas: [
      {
        label: "Natural Resources Benefit-Sharing Legislation",
        bold: true,
        children: [
          "Minerals & Extractives (gold, titanium, gemstones, rare earths)",
          "Marine & Coastal Resources (fisheries, ports, blue economy assets)",
          "Water Resources (rivers, lakes, underground aquifers)",
          "Renewable Energy (wind, solar, natural gas)",
          "Wildlife & Conservation Areas (national parks, forests, biodiversity zones)",
        ],
      },
      { label: "Sustainable mining, renewable energy & conservation economies creating climate-resilient jobs." },
      { label: "Strengthening climate resilience in arid, semi-arid, and coastal regions.", bold: true },
      {
        label: "Debt-for-Climate Swaps: converting debt repayments into investments in:",
        bold: true,
        children: [
          "Reforestation, renewable energy, and sustainable livelihoods in counties like Taita-Taveta and Marsabit.",
          "Climate-smart agriculture, carbon farming & circular economy enterprises led by youth & women.",
          "Ecosystem restoration, clean water, & biodiversity protection.",
        ],
      },
      { label: "Direct climate finance flows to counties and community organizations." },
      { label: "People's Climate Dividend ensuring communities protecting natural resources receive guaranteed benefits." },
    ],
  },
  {
    number: "03",
    icon: "🗳️",
    title: "Democracy, Digital Justice, Leadership & Devolution",
    color: "from-blue-900 to-[#0e1f3d]",
    accent: "#3b82f6",
    quote: "Democracy works when every voice is heard and every vote truly counts.",
    focusAreas: [
      { label: "Promoting simple, verifiable electronic voting systems for transparent elections." },
      { label: "Restructuring devolution to ensure lean, efficient, and development-focused county governments." },
      { label: "Expanding digital justice — bridging the digital divide, ensuring fair access to digital opportunities, and protecting citizens' rights in the digital age." },
      { label: "Advocating for equitable and ethical Artificial Intelligence (AI) that serves humanity, protects the planet, and promotes equity, accountability, and sustainability." },
      { label: "Establishing a Leadership Academy for civic education, youth empowerment, and women's leadership." },
      { label: "Advancing e-governance tools and civic tech innovations to enhance participation and transparency." },
    ],
  },
  {
    number: "04",
    icon: "🌐",
    title: "Global Advocacy & Governance Reforms",
    color: "from-purple-900 to-[#0e1f3d]",
    accent: "#a855f7",
    quote: "Africa's voice must be heard where global decisions are made.",
    focusAreas: [
      { label: "A UN Framework/Convention on Natural Resource Benefit-Sharing." },
      { label: "Reforms of international financial institutions (IMF, World Bank, WTO) to make global finance transparent, fair, and sustainable." },
      { label: "A UN Framework on Debt and Tax Justice to prevent exploitation and ensure responsible lending and borrowing." },
      { label: "UN Security Council reforms — granting Africa permanent seats with veto powers and ensuring grassroots communities have a voice in global decision-making." },
    ],
  },
];

const coreValues = [
  "Equity & Social Justice",
  "Transparency & Integrity",
  "Inclusion",
  "Sustainability",
  "Collaboration",
  "Digital Fairness",
];

const guidingPrinciples = [
  {
    icon: "👥",
    title: "People-Centered Approach",
    desc: "Placing communities at the center of our work, ensuring their voices, needs, and aspirations drive our interventions and solutions.",
  },
  {
    icon: "🔬",
    title: "Evidence-Based Advocacy",
    desc: "Grounding our work in rigorous research, data analysis, and contextual understanding to develop effective, targeted solutions.",
  },
  {
    icon: "🤝",
    title: "Partnership & Collaboration",
    desc: "Working with diverse stakeholders including government, civil society, private sector, and communities to leverage collective expertise and resources.",
  },
  {
    icon: "📍",
    title: "Local Context Sensitivity",
    desc: "Adapting approaches to specific regional needs, cultural contexts, and local realities while maintaining our core principles.",
  },
  {
    icon: "🌱",
    title: "Long-Term Sustainability",
    desc: "Building lasting solutions, not quick fixes, that create enduring positive change for current and future generations.",
  },
  {
    icon: "💡",
    title: "Innovation & Adaptation",
    desc: "Embracing creative approaches and adapting to changing contexts while remaining true to our mission and values.",
  },
];

const integrated = [
  { icon: "⚖️", title: "Economic Justice", desc: "Fair distribution of resources and opportunities" },
  { icon: "🏛️", title: "Governance Justice", desc: "Accountable and participatory institutions" },
  { icon: "🌏", title: "Social & Climate Justice", desc: "Inclusive and sustainable communities" },
];

/* ─────────────────────────────────────────────
   HERO
───────────────────────────────────────────── */
function PillarsHero() {
  return (
    <section
      className="relative min-h-[420px] flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: "url(https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1600&q=80)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-[#0e1f3d]/80" />
      {/* Animated accent lines */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#d4a017] to-transparent" />
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-[#d4a017]/20 border border-[#d4a017]/40 text-[#d4a017] text-xs font-semibold px-4 py-1.5 rounded-full mb-5 uppercase tracking-widest">
          Our Framework
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-5 leading-tight">
          Strategic Pillars, Core Values &amp;<br className="hidden md:block" /> Guiding Principles
        </h1>
        <p className="text-white/75 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          EJF's work is organized around four strategic pillars that guide our advocacy, programs, and partnerships toward achieving economic, climate, social, and digital justice.
        </p>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   PILLAR TABS + ACCORDION
───────────────────────────────────────────── */
function PillarFocusItem({ item }: { item: (typeof pillars)[0]["focusAreas"][0] }) {
  return (
    <li className="mb-3">
      <div className="flex gap-2.5">
        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#d4a017] flex-shrink-0" />
        <span className={`text-sm leading-relaxed text-gray-700 ${item.bold ? "font-semibold text-[#0e1f3d]" : ""}`}>
          {item.label}
        </span>
      </div>
      {item.children && (
        <ul className="mt-2 ml-5 space-y-1.5">
          {item.children.map((c) => (
            <li key={c} className="flex gap-2.5">
              <span className="mt-1.5 w-1 h-1 rounded-sm bg-[#0e1f3d]/40 flex-shrink-0" />
              <span className="text-sm text-gray-600 leading-relaxed">{c}</span>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

function StrategicPillars() {
  const [active, setActive] = useState(0);
  const { ref, inView } = useInView();

  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div ref={ref} className={`text-center mb-12 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-2xl md:text-3xl font-bold text-[#0e1f3d] mb-3">Our Strategic Pillars</h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
            The foundation of our mission rests on four key pillars that guide our work towards achieving comprehensive justice and equality.
          </p>
        </div>

        {/* Tab nav */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          {pillars.map((p, i) => (
            <button
              key={p.number}
              onClick={() => setActive(i)}
              className={`flex-1 text-left px-5 py-4 rounded-xl border-2 transition-all duration-300 ${
                active === i
                  ? "border-[#d4a017] bg-[#0e1f3d] text-white shadow-lg scale-[1.02]"
                  : "border-gray-200 bg-white text-[#0e1f3d] hover:border-[#d4a017]/50 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{p.icon}</span>
                <div>
                  <div className={`text-xs font-bold mb-0.5 ${active === i ? "text-[#d4a017]" : "text-gray-400"}`}>
                    PILLAR {p.number}
                  </div>
                  <div className="font-semibold text-sm leading-snug">{p.title}</div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Active pillar content */}
        {pillars.map((p, i) => (
          <div
            key={p.number}
            className={`transition-all duration-500 ${active === i ? "block" : "hidden"}`}
          >
            <div className={`rounded-2xl bg-gradient-to-br ${p.color} p-6 md:p-8 mb-6 shadow-xl`}>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl">{p.icon}</span>
                <div>
                  <div className="text-white/50 text-xs font-bold uppercase tracking-wider">Pillar {p.number}</div>
                  <h3 className="text-white font-bold text-xl leading-tight">{p.title}</h3>
                </div>
              </div>
              <div className="h-0.5 bg-white/10 my-4" />
              <blockquote className="text-white/70 italic text-sm flex gap-2 items-start">
                <span className="text-[#d4a017] text-xl leading-none">"</span>
                {p.quote}
              </blockquote>
            </div>

            <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 md:p-8">
              <div className="flex items-center gap-2 mb-5">
                <span className="w-5 h-0.5 bg-[#d4a017]" />
                <span className="text-xs font-bold text-[#d4a017] uppercase tracking-wider">Focus Areas</span>
              </div>
              <ul className="space-y-1">
                {p.focusAreas.map((item, j) => (
                  <PillarFocusItem key={j} item={item} />
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   CORE VALUES
───────────────────────────────────────────── */
function CoreValuesSection() {
  const { ref, inView } = useInView();
  return (
    <section className="bg-[#0e1f3d] py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div ref={ref} className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Core Values</h2>
          <div className="w-12 h-0.5 bg-[#d4a017] mb-8" />
          <div className="flex flex-wrap gap-3">
            {coreValues.map((v, i) => (
              <span
                key={v}
                className="border border-white/20 hover:border-[#d4a017] hover:bg-[#d4a017] text-white text-sm font-medium px-5 py-2.5 rounded-full transition-all duration-300 cursor-default"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                {v}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   GUIDING PRINCIPLES
───────────────────────────────────────────── */
function GuidingPrinciples() {
  const { ref, inView } = useInView();
  return (
    <section className="bg-gray-50 py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div ref={ref} className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-2xl md:text-3xl font-bold text-[#0e1f3d] mb-3">Guiding Principles</h2>
          <div className="w-12 h-0.5 bg-[#d4a017] mb-10" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {guidingPrinciples.map((g, i) => (
              <div
                key={g.title}
                className={`bg-white rounded-xl border border-gray-100 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 80}ms`, transitionProperty: "opacity, transform, box-shadow" }}
              >
                <div className="h-0.5 bg-gradient-to-r from-[#d4a017] to-transparent mb-5 w-16 group-hover:w-full transition-all duration-500" />
                <div className="text-2xl mb-3">{g.icon}</div>
                <h3 className="font-bold text-[#0e1f3d] text-sm mb-2 leading-snug">{g.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{g.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   INTEGRATED APPROACH
───────────────────────────────────────────── */
function IntegratedApproach() {
  const { ref, inView } = useInView();
  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div ref={ref} className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="bg-gray-50 rounded-2xl border border-gray-100 p-8">
            <h2 className="text-2xl font-bold text-[#0e1f3d] mb-3">Integrated Approach</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-8 max-w-2xl">
              Our four pillars are interconnected and mutually reinforcing. We believe that sustainable change requires addressing economic, fiscal, climate, governance, and social issues simultaneously through an integrated approach that recognizes their complex interrelationships.
            </p>
            {/* Connecting visual */}
            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Connector line on desktop */}
              <div className="hidden md:block absolute top-1/2 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-[#d4a017]/30 via-[#d4a017] to-[#d4a017]/30 -translate-y-1/2 z-0" />
              {integrated.map((item, i) => (
                <div
                  key={item.title}
                  className={`relative z-10 bg-white rounded-xl border-2 border-gray-100 hover:border-[#d4a017]/50 p-6 text-center shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 ${inView ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
                  style={{ transitionDelay: `${i * 120}ms` }}
                >
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <h3 className="font-bold text-[#0e1f3d] text-sm mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   CTA BANNER
───────────────────────────────────────────── */
function CtaBanner() {
  return (
    <section className="bg-gradient-to-r from-[#0e1f3d] to-[#1a3a6e] py-14 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Join the Movement for Justice</h2>
        <p className="text-white/70 text-sm mb-8 leading-relaxed">
          Together, we can build a Kenya — and a world — where every community enjoys dignity, equity, and lasting prosperity.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/programs"
            className="bg-[#d4a017] hover:bg-[#b8891a] text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Explore Programs
          </a>
          <a
            href="/contact"
            className="border border-white/30 hover:border-white text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:bg-white/10"
          >
            Get Involved
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────── */
export default function Pillars() {
  return (
    <>
      <PillarsHero />
      <StrategicPillars />
      <CoreValuesSection />
      <GuidingPrinciples />
      <IntegratedApproach />
      <CtaBanner />
    </>
  );
}
