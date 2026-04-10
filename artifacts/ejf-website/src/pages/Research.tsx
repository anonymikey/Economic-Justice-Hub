import { useState, useEffect, useRef, useCallback } from "react";
import { adminQueries, DBPublication } from "@/lib/adminQueries";

/* ─────────────────────────────────────────────
   TYPES & HELPERS
───────────────────────────────────────────── */
function useInView(threshold = 0.12) {
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

const soon = () => alert("To be updated Soon");

/* ─────────────────────────────────────────────
   PUBLICATIONS DATA
───────────────────────────────────────────── */
interface Pub {
  title: string;
  subtitle?: string;
  bg?: string;
  pdf?: string;          // null = alert
  docx?: boolean;        // DOCX → alert
  hasCover?: boolean;
  tags?: string[];
  description?: string;
  date?: string;
  hasExecutiveSummary?: boolean;
  wide?: boolean;
}

const featuredPubs: Pub[] = [
  {
    title: "EJF Progress Report",
    subtitle: "Click to view or download",
    bg: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80",
    pdf: undefined,
    wide: false,
  },
  {
    title: "Critical Mineral Catalogue 2025",
    subtitle: "Click to view or download",
    bg: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
    pdf: "/Critical_Mineral_Catalogue_2025.pdf",
    wide: false,
  },
  {
    title: "Community Digital Justice Lab Concept",
    subtitle: "Click to view or download",
    bg: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80",
    docx: true,
    wide: false,
  },
  {
    title: "TAITA-TAVETA COUNTY MINING BILL",
    subtitle: "Click to view or download",
    bg: "https://images.unsplash.com/photo-1569098635748-17e7a92ca4f5?auto=format&fit=crop&w=800&q=80",
    pdf: "/Taita_Taveta_County_Mining_Bill.pdf",
    wide: false,
  },
  {
    title: "Taita Taveta Carbon & Biodiversity Opportunities",
    subtitle: "Click below to download",
    bg: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80",
    docx: true,
    wide: true,
  },
  {
    title: "EJF Kenya Climate Financing Analysis",
    subtitle: "Click below to download",
    bg: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=80",
    pdf: "/EJF_Kenya_Climate_Financing_Analysis.pdf",
    wide: true,
  },
  {
    title: "Kenya's Carbon Markets Injustice",
    subtitle: "Click to view the briefing or download the PDF",
    bg: "https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?auto=format&fit=crop&w=800&q=80",
    pdf: undefined,
    wide: false,
  },
  {
    title: "Usipoziba Ufa, Utajenga Ukuta — Index",
    subtitle: "Community narratives and resources — click to download",
    bg: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
    pdf: undefined,
    wide: false,
  },
];

const detailedPubs: Pub[] = [
  {
    title: "EJF Kenya Climate Financing Analysis Report",
    tags: ["Climate Finance", "Kenya", "Policy Analysis"],
    description: "Comprehensive analysis of climate finance flows, governance mechanisms, and community access to adaptation funds in Kenya. This report examines the current state of climate financing, identifies challenges, and provides actionable recommendations for improving access and effectiveness.",
    date: "November 2025",
    pdf: "/EJF_Kenya_Climate_Financing_Analysis.pdf",
    hasExecutiveSummary: false,
  },
  {
    title: "Digital Inclusion in Coastal Communities",
    tags: ["Digital Access", "Coastal Region", "Technology"],
    description: "Research on digital access, literacy, and technology adoption patterns in coastal counties, with recommendations for bridging the digital divide.",
    date: "June 2025",
    pdf: undefined,
    hasExecutiveSummary: true,
  },
];

const policyBriefs = [
  {
    title: "Fiscal Decentralization and Equity",
    issue: "August 2025",
    desc: "Analysis of revenue sharing formulas and their impact on equitable development across counties.",
  },
  {
    title: "Youth Entrepreneurship in Green Economy",
    issue: "October 2025",
    desc: "Policy recommendations for supporting youth-led green enterprises and climate-smart businesses.",
  },
  {
    title: "Community Land Rights and Investment",
    issue: "November 2025",
    desc: "Balancing investment opportunities with protection of community land rights in resource-rich areas.",
  },
];

const researchAreas = [
  {
    color: "border-[#d4a017]",
    accent: "bg-[#d4a017]",
    title: "Economic Justice Research",
    desc: "Examining patterns of resource distribution, fiscal policies, and economic opportunities to identify barriers to equity and propose inclusive alternatives.",
    points: ["Natural resource revenue sharing", "Tax justice and domestic resource mobilization", "Debt sustainability and management", "Inclusive economic growth models"],
  },
  {
    color: "border-[#d4a017]",
    accent: "bg-[#d4a017]",
    title: "Climate Justice Research",
    desc: "Investigating climate impacts, adaptation strategies, and climate finance governance to ensure vulnerable communities benefit from climate action.",
    points: ["Climate vulnerability assessments", "Adaptation finance tracking", "Community-based adaptation strategies", "Climate policy implementation"],
  },
  {
    color: "border-[#d4a017]",
    accent: "bg-[#d4a017]",
    title: "Social & Digital Justice Research",
    desc: "Analyzing social inclusion, digital access, and technology governance to promote equitable participation in social, economic, and digital spheres.",
    points: ["Digital divide mapping", "Social protection systems", "Technology ethics and governance", "Inclusive service delivery"],
  },
];

/* ─────────────────────────────────────────────
   FEATURED PUB CARD (background image style)
───────────────────────────────────────────── */
function FeaturedCard({ pub }: { pub: Pub }) {
  const canDownload = !!pub.pdf;
  const noFile = !pub.pdf && !pub.docx;

  const handleDownload = () => {
    if (canDownload && pub.pdf) window.open(pub.pdf, "_blank");
    else soon();
  };

  const handleView = () => {
    if (canDownload && pub.pdf) window.open(pub.pdf, "_blank");
    else soon();
  };

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer h-52">
      {/* BG */}
      <img src={pub.bg} alt={pub.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0e1f3d]/90 via-[#0e1f3d]/50 to-transparent" />

      {/* Badge if no file */}
      {noFile && (
        <div className="absolute top-3 right-3 bg-[#d4a017] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Coming soon</div>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="text-white font-bold text-sm leading-tight mb-1">{pub.title}</h3>
        <p className="text-white/60 text-xs mb-3">{pub.subtitle}</p>
        <div className="flex gap-2">
          <button
            onClick={handleDownload}
            className="bg-[#d4a017] hover:bg-[#b8891a] text-white text-xs font-semibold px-4 py-1.5 rounded-lg transition-all hover:scale-105"
          >
            Download
          </button>
          <button
            onClick={handleView}
            className="bg-[#0e1f3d] hover:bg-[#1a3a6e] border border-white/30 text-white text-xs font-semibold px-4 py-1.5 rounded-lg transition-all"
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   FEATURED PUB WIDE CARD
───────────────────────────────────────────── */
function FeaturedWideCard({ pub }: { pub: Pub }) {
  const canDownload = !!pub.pdf;
  const isDocx = pub.docx;

  const handleDownload = () => {
    if (canDownload && pub.pdf) window.open(pub.pdf, "_blank");
    else soon();
  };

  const handleView = () => {
    if (canDownload && pub.pdf) window.open(pub.pdf, "_blank");
    else soon();
  };

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-lg group h-52">
      <img src={pub.bg} alt={pub.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0e1f3d]/85 via-[#0e1f3d]/60 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-center p-6">
        {isDocx && (
          <div className="inline-flex mb-2">
            <span className="bg-amber-500/20 border border-amber-400/40 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">DOCX</span>
          </div>
        )}
        <h3 className="text-white font-bold text-base md:text-lg leading-tight mb-1 max-w-md">{pub.title}</h3>
        <p className="text-white/60 text-xs mb-4">{pub.subtitle}</p>
        <div className="flex gap-3">
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 bg-[#0e1f3d] hover:bg-[#1a3a6e] border border-white/30 text-white text-xs font-semibold px-5 py-2 rounded-lg transition-all"
          >
            ⬇️ {isDocx ? "Download DOCX" : "Download"}
          </button>
          <button
            onClick={handleView}
            className="flex items-center gap-1.5 bg-[#0e1f3d] hover:bg-[#1a3a6e] border border-white/30 text-white text-xs font-semibold px-5 py-2 rounded-lg transition-all"
          >
            👁 View
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   DETAILED PUB CARD (PDF icon style)
───────────────────────────────────────────── */
function DetailedPubCard({ pub, delay = 0 }: { pub: Pub; delay?: number }) {
  const [summaryOpen, setSummaryOpen] = useState(false);
  const { ref, inView } = useInView();
  const canDownload = !!pub.pdf;

  const handleDownload = () => { canDownload && pub.pdf ? window.open(pub.pdf, "_blank") : soon(); };
  const handleSummary = () => { canDownload && pub.pdf ? setSummaryOpen(!summaryOpen) : soon(); };

  return (
    <div
      ref={ref}
      className={`bg-white rounded-2xl border-l-4 border-[#d4a017] shadow-md overflow-hidden transition-all duration-500 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="p-6">
        {/* PDF Icon */}
        <div className="w-12 h-12 bg-[#0e1f3d] rounded-xl flex items-center justify-center mb-4 shadow">
          <span className="text-white text-xs font-bold">PDF</span>
        </div>

        <h3 className="font-bold text-[#0e1f3d] text-base leading-snug mb-3">{pub.title}</h3>

        {/* Tags */}
        {pub.tags && (
          <div className="flex flex-wrap gap-2 mb-3">
            {pub.tags.map((t) => (
              <span key={t} className="border border-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">{t}</span>
            ))}
          </div>
        )}

        <p className="text-gray-500 text-sm leading-relaxed mb-4">{pub.description}</p>

        <div className="text-sm mb-4">
          <span className="font-bold text-[#0e1f3d]">Publication Date: </span>
          <span className="text-gray-600">{pub.date}</span>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 bg-[#0e1f3d] hover:bg-[#1a3a6e] text-white font-semibold text-xs px-4 py-2.5 rounded-lg transition-all"
          >
            ⬇️ Download Full Report
          </button>
          <button
            onClick={handleSummary}
            className="flex items-center gap-1.5 bg-[#d4a017] hover:bg-[#b8891a] text-white font-semibold text-xs px-4 py-2.5 rounded-lg transition-all"
          >
            📋 Executive Summary {summaryOpen ? "▲" : "▼"}
          </button>
        </div>
      </div>

      {/* Summary panel */}
      {summaryOpen && canDownload && pub.pdf && (
        <div className="border-t border-gray-100 bg-gray-50 p-5">
          <p className="text-xs text-gray-500 mb-2">Preview the full report in your browser:</p>
          <iframe src={pub.pdf} className="w-full rounded-lg border border-gray-200" style={{ height: "400px" }} title={pub.title} />
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   HERO
───────────────────────────────────────────── */
function ResearchHero() {
  return (
    <section className="bg-gradient-to-br from-[#0e1f3d] to-[#1a3a6e] py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#d4a017]/20 border border-[#d4a017]/40 text-[#d4a017] text-xs font-semibold px-4 py-1.5 rounded-full mb-5 uppercase tracking-widest">
              Evidence-Based Advocacy
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-5 leading-tight">
              Research &amp; Publications
            </h1>
            <p className="text-white/70 text-sm leading-relaxed">
              Explore EJF's evidence-based research, policy briefs, case studies, and publications that inform our advocacy and contribute to public discourse on economic, climate, social, and digital justice. Our research combines rigorous analysis with community perspectives to develop practical solutions and policy recommendations.
            </p>
          </div>
          <div className="hidden md:flex justify-center">
            <div className="relative">
              <div className="w-64 h-64 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                <div className="text-8xl">📚</div>
              </div>
              {/* Orbit dots */}
              {["🔬", "📊", "🌍", "⚖️", "💡"].map((icon, i) => (
                <div
                  key={i}
                  className="absolute w-12 h-12 bg-white/10 border border-white/20 rounded-full flex items-center justify-center text-lg"
                  style={{
                    top: `${50 + 45 * Math.sin((i / 5) * Math.PI * 2)}%`,
                    left: `${50 + 45 * Math.cos((i / 5) * Math.PI * 2)}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  {icon}
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
   FEATURED PUBLICATIONS
───────────────────────────────────────────── */
function FeaturedPublications() {
  const { ref, inView } = useInView();
  const grid = featuredPubs.filter((p) => !p.wide);
  const wides = featuredPubs.filter((p) => p.wide);

  return (
    <section className="bg-white py-14 px-4">
      <div className="max-w-5xl mx-auto">
        <div ref={ref} className={`mb-8 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <h2 className="text-2xl md:text-3xl font-bold text-[#0e1f3d] mb-1">Featured Publications</h2>
          <div className="w-12 h-0.5 bg-[#d4a017] mt-2" />
        </div>

        {/* 2-col grid for standard cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          {grid.map((pub) => (
            <FeaturedCard key={pub.title} pub={pub} />
          ))}
        </div>

        {/* Full-width wide cards */}
        <div className="flex flex-col gap-4">
          {wides.map((pub) => (
            <FeaturedWideCard key={pub.title} pub={pub} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   DETAILED PUBLICATIONS
───────────────────────────────────────────── */
function DetailedPublications() {
  return (
    <section className="bg-gray-50 py-14 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {detailedPubs.map((pub, i) => (
            <DetailedPubCard key={pub.title} pub={pub} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   POLICY BRIEFS
───────────────────────────────────────────── */
function PolicyBriefs() {
  const { ref, inView } = useInView();
  return (
    <section className="bg-white py-14 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-bold text-[#0e1f3d] mb-6">Policy Briefs</h2>
          <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {policyBriefs.map((brief, i) => (
              <div
                key={brief.title}
                className={`rounded-xl border-l-4 border-[#d4a017] bg-gray-50 p-5 hover:shadow-md hover:-translate-y-1 transition-all duration-300 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <h3 className="font-bold text-[#0e1f3d] text-sm leading-snug mb-2">{brief.title}</h3>
                <p className="text-xs text-gray-500 mb-1">
                  <span className="font-semibold text-[#0e1f3d]">Issue:</span> {brief.issue}
                </p>
                <p className="text-xs text-gray-600 leading-relaxed mb-4">{brief.desc}</p>
                <button
                  onClick={soon}
                  className="flex items-center gap-1.5 border border-[#d4a017] text-[#d4a017] hover:bg-[#d4a017] hover:text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-all"
                >
                  <span>🕐</span> Coming Soon
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   RESEARCH AREAS
───────────────────────────────────────────── */
function ResearchAreas() {
  const { ref, inView } = useInView();
  return (
    <section className="bg-gray-50 py-14 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-bold text-[#0e1f3d] mb-6">Research Areas</h2>
          <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {researchAreas.map((area, i) => (
              <div
                key={area.title}
                className={`rounded-xl border-l-4 border-[#d4a017] bg-gray-50 p-5 hover:shadow-md transition-all duration-300 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <h3 className="font-bold text-[#0e1f3d] text-sm mb-2">{area.title}</h3>
                <p className="text-gray-600 text-xs leading-relaxed mb-3">{area.desc}</p>
                <ul className="space-y-1.5">
                  {area.points.map((pt) => (
                    <li key={pt} className="flex gap-2 text-xs text-gray-700">
                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#d4a017] flex-shrink-0" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   METHODOLOGY
───────────────────────────────────────────── */
function Methodology() {
  const { ref, inView } = useInView();
  const methods = [
    { emoji: "📊", title: "Data Collection", desc: "Surveys, interviews, focus groups, and secondary data analysis" },
    { emoji: "👥", title: "Community Participation", desc: "Engaging communities as co-researchers and validators" },
    { emoji: "🔍", title: "Rigorous Analysis", desc: "Applying appropriate analytical frameworks and peer review" },
  ];
  return (
    <section className="bg-white py-14 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-bold text-[#0e1f3d] mb-2">Research Methodology</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-7">
            EJF employs mixed-methods approaches that combine quantitative data analysis with qualitative insights from communities. Our research process includes:
          </p>
          <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-7">
            {methods.map((m, i) => (
              <div
                key={m.title}
                className={`bg-gray-50 rounded-xl border border-gray-100 p-5 text-center hover:shadow-md hover:-translate-y-1 transition-all duration-300 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="text-4xl mb-3">{m.emoji}</div>
                <h3 className="font-bold text-[#0e1f3d] text-sm mb-2">{m.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
            <h3 className="font-bold text-[#0e1f3d] text-sm mb-2">Ethical Standards</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              All EJF research adheres to strict ethical standards including informed consent, confidentiality, respect for participants, and commitment to doing no harm. Our research protocols are reviewed and approved through internal ethical review processes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   PARTNERSHIPS
───────────────────────────────────────────── */
function ResearchPartnerships() {
  const { ref, inView } = useInView();
  const partners = ["University Research Departments", "Policy Think Tanks", "Community Organizations", "International Research Networks"];
  return (
    <section className="bg-gray-50 py-14 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-bold text-[#0e1f3d] mb-2">Research Partnerships</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-5">
            EJF collaborates with academic institutions, research organizations, and community-based organizations to enhance the quality, reach, and impact of our research. Current partners include:
          </p>
          <div ref={ref} className="flex flex-wrap gap-3 mb-7">
            {partners.map((p, i) => (
              <span
                key={p}
                className={`bg-[#d4a017] hover:bg-[#b8891a] text-white text-sm font-semibold px-5 py-2.5 rounded-lg cursor-default transition-all ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {p}
              </span>
            ))}
          </div>

          <div className="border-t border-gray-100 pt-6">
            <h3 className="font-bold text-[#0e1f3d] text-sm mb-2">Call for Research Collaboration</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              We welcome partnerships with researchers, academic institutions, and organizations interested in collaborative research on economic, climate, social, and digital justice issues.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#0e1f3d] hover:bg-[#1a3a6e] text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-all hover:scale-105"
            >
              Contact Us for Collaboration
            </a>
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
          <p className="text-gray-500 text-sm max-w-md mx-auto leading-relaxed">
            Access our latest publications, research papers, and educational materials to learn more about economic justice.
          </p>
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
   LIVE PUBLICATIONS (from Admin Panel)
───────────────────────────────────────────── */
function LivePublications() {
  const [pubs, setPubs] = useState<DBPublication[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPubs = useCallback(async () => {
    setLoading(true);
    const { data } = await adminQueries.publications.listPublished();
    setPubs(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchPubs(); }, [fetchPubs]);

  if (loading || pubs.length === 0) return null;

  return (
    <section className="bg-white py-12 px-4 border-b border-gray-100">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-[#0e1f3d]">Latest Publications</h2>
              <span className="text-xs text-[#d4a017] font-bold bg-[#d4a017]/10 px-2 py-0.5 rounded-full">● Live</span>
            </div>
            <div className="w-10 h-0.5 bg-[#d4a017] mt-2" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {pubs.map((pub) => (
            <div
              key={pub.id}
              className="group bg-gray-50 border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              {pub.cover_image ? (
                <div className="h-36 overflow-hidden bg-[#0e1f3d]/5">
                  <img src={pub.cover_image} alt={pub.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              ) : (
                <div className="h-20 bg-gradient-to-br from-[#0e1f3d] to-[#1a3a6e] flex items-center justify-center">
                  <span className="text-3xl">📄</span>
                </div>
              )}
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  {pub.tags && pub.tags.split(",").slice(0, 2).map((tag) => (
                    <span key={tag.trim()} className="text-xs bg-[#d4a017]/10 text-[#d4a017] font-bold px-2 py-0.5 rounded-full">{tag.trim()}</span>
                  ))}
                </div>
                <h3 className="font-bold text-[#0e1f3d] text-sm mb-1 leading-snug group-hover:text-[#d4a017] transition-colors">{pub.title}</h3>
                {pub.subtitle && <p className="text-gray-400 text-xs mb-3">{pub.subtitle}</p>}
                {pub.description && <p className="text-gray-500 text-xs leading-relaxed mb-3 line-clamp-2">{pub.description}</p>}
                {pub.pdf_url ? (
                  <a href={pub.pdf_url} target="_blank" rel="noopener noreferrer" className="inline-block bg-[#0e1f3d] hover:bg-[#1a3a6e] text-white font-bold text-xs px-4 py-2 rounded-lg transition-colors">
                    Download →
                  </a>
                ) : (
                  <span className="inline-block text-gray-400 text-xs italic">File coming soon</span>
                )}
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
export default function Research() {
  return (
    <>
      <ResearchHero />
      <LivePublications />
      <FeaturedPublications />
      <DetailedPublications />
      <PolicyBriefs />
      <ResearchAreas />
      <Methodology />
      <ResearchPartnerships />
      <HelpfulResources />
    </>
  );
}
