import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "wouter";
import { adminQueries, DBPublication } from "@/lib/adminQueries";

import imgHero   from "@assets/hero_1775860211048.jpeg";
import imgComEv  from "@assets/com_event_1775860211043.jpeg";
import imgTm     from "@assets/tm_1775860211028.jpeg";

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function useInView(threshold = 0.12) {
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

// ─── DATA ─────────────────────────────────────────────────────────────────────
interface Pub {
  title: string; subtitle?: string; bg?: string;
  pdf?: string; docx?: boolean; hasCover?: boolean;
  tags?: string[]; description?: string; date?: string;
  hasExecutiveSummary?: boolean; wide?: boolean;
}

const featuredPubs: Pub[] = [
  { title: "EJF Progress Report", subtitle: "Click to view or download", bg: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80", pdf: undefined, wide: false },
  { title: "Critical Mineral Catalogue 2025", subtitle: "Click to view or download", bg: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80", pdf: "/Critical_Mineral_Catalogue_2025.pdf", wide: false },
  { title: "Community Digital Justice Lab Concept", subtitle: "Click to view or download", bg: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80", docx: true, wide: false },
  { title: "TAITA-TAVETA COUNTY MINING BILL", subtitle: "Click to view or download", bg: "https://images.unsplash.com/photo-1569098635748-17e7a92ca4f5?auto=format&fit=crop&w=800&q=80", pdf: "/Taita_Taveta_County_Mining_Bill.pdf", wide: false },
  { title: "Taita Taveta Carbon & Biodiversity Opportunities", subtitle: "Click below to download", bg: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80", docx: true, wide: true },
  { title: "EJF Kenya Climate Financing Analysis", subtitle: "Click below to download", bg: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=80", pdf: "/EJF_Kenya_Climate_Financing_Analysis.pdf", wide: true },
  { title: "Kenya's Carbon Markets Injustice", subtitle: "Click to view the briefing or download the PDF", bg: "https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?auto=format&fit=crop&w=800&q=80", pdf: undefined, wide: false },
  { title: "Usipoziba Ufa, Utajenga Ukuta — Index", subtitle: "Community narratives and resources — click to download", bg: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80", pdf: undefined, wide: false },
];

const detailedPubs: Pub[] = [
  { title: "EJF Kenya Climate Financing Analysis Report", tags: ["Climate Finance", "Kenya", "Policy Analysis"], description: "Comprehensive analysis of climate finance flows, governance mechanisms, and community access to adaptation funds in Kenya. This report examines the current state of climate financing, identifies challenges, and provides actionable recommendations for improving access and effectiveness.", date: "November 2025", pdf: "/EJF_Kenya_Climate_Financing_Analysis.pdf", hasExecutiveSummary: false },
  { title: "Digital Inclusion in Coastal Communities", tags: ["Digital Access", "Coastal Region", "Technology"], description: "Research on digital access, literacy, and technology adoption patterns in coastal counties, with recommendations for bridging the digital divide.", date: "June 2025", pdf: undefined, hasExecutiveSummary: true },
];

const policyBriefs = [
  { title: "Fiscal Decentralization and Equity", issue: "August 2025", desc: "Analysis of revenue sharing formulas and their impact on equitable development across counties." },
  { title: "Youth Entrepreneurship in Green Economy", issue: "October 2025", desc: "Policy recommendations for supporting youth-led green enterprises and climate-smart businesses." },
  { title: "Community Land Rights and Investment", issue: "November 2025", desc: "Balancing investment opportunities with protection of community land rights in resource-rich areas." },
];

const AREAS_OF_RESEARCH = [
  { icon: "🌿", title: "Natural Wealth & Natural Capital", desc: "Examining the governance, conservation and sustainable use of Natural Capital to advance equitable prosperity." },
  { icon: "⚖️", title: "Economic Justice", desc: "Analysing how natural resource opportunities and benefits can be made accessible, fair and lasting for communities." },
  { icon: "📊", title: "Public Finance & Fiscal Justice", desc: "Investigating fiscal systems, public budgets and revenue governance to advance accountability and equity." },
  { icon: "🏛️", title: "Governance & Public Policy", desc: "Strengthening institutions, leadership and policy frameworks that serve the public good." },
  { icon: "🌍", title: "Climate, Nature & Resilience", desc: "Exploring climate adaptation, nature finance and conservation strategies for resilient communities." },
  { icon: "💡", title: "Digital Innovation", desc: "Harnessing technology and innovation to expand access, transparency and equitable opportunity." },
];

const KNOWLEDGE_PRODUCTS = [
  { icon: "📄", label: "Research Reports" },
  { icon: "📋", label: "Policy Papers" },
  { icon: "📝", label: "Policy Briefs" },
  { icon: "💬", label: "Discussion Papers" },
  { icon: "🔬", label: "Working Papers" },
  { icon: "⚖️", label: "Legislative Analysis" },
  { icon: "🏛️", label: "Institutional Briefs" },
  { icon: "🗺️", label: "Strategic Frameworks" },
  { icon: "✍️", label: "Opinion & Insight Articles" },
];

// ─── FEATURED CARD ────────────────────────────────────────────────────────────
function FeaturedCard({ pub }: { pub: Pub }) {
  const canDownload = !!pub.pdf;
  const noFile = !pub.pdf && !pub.docx;
  const handleClick = () => { if (canDownload && pub.pdf) window.open(pub.pdf, "_blank"); else soon(); };
  return (
    <div className="relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer h-52" onClick={handleClick}>
      <img src={pub.bg} alt={pub.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#08152F]/90 via-[#08152F]/50 to-transparent" />
      {noFile && <div className="absolute top-3 right-3 bg-[#C9A24A] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Coming soon</div>}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="text-white font-bold text-sm leading-tight mb-1">{pub.title}</h3>
        <p className="text-white/60 text-xs mb-3">{pub.subtitle}</p>
        <div className="flex gap-2">
          <button onClick={e => { e.stopPropagation(); handleClick(); }} className="bg-[#C9A24A] hover:bg-[#b08a35] text-white text-xs font-semibold px-4 py-1.5 rounded-lg transition-all hover:scale-105">Download</button>
          <button onClick={e => { e.stopPropagation(); handleClick(); }} className="bg-[#08152F] hover:bg-[#0e2247] border border-white/30 text-white text-xs font-semibold px-4 py-1.5 rounded-lg transition-all">View</button>
        </div>
      </div>
    </div>
  );
}

function FeaturedWideCard({ pub }: { pub: Pub }) {
  const canDownload = !!pub.pdf;
  const isDocx = pub.docx;
  const handleClick = () => { if (canDownload && pub.pdf) window.open(pub.pdf, "_blank"); else soon(); };
  return (
    <div className="relative rounded-2xl overflow-hidden shadow-lg group h-52">
      <img src={pub.bg} alt={pub.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#08152F]/85 via-[#08152F]/60 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-center p-6">
        {isDocx && <div className="inline-flex mb-2"><span className="bg-amber-500/20 border border-amber-400/40 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">DOCX</span></div>}
        <h3 className="text-white font-bold text-base md:text-lg leading-tight mb-1 max-w-md">{pub.title}</h3>
        <p className="text-white/60 text-xs mb-4">{pub.subtitle}</p>
        <div className="flex gap-3">
          <button onClick={handleClick} className="flex items-center gap-1.5 bg-[#08152F] hover:bg-[#0e2247] border border-white/30 text-white text-xs font-semibold px-5 py-2 rounded-lg transition-all">
            ⬇️ {isDocx ? "Download DOCX" : "Download"}
          </button>
          <button onClick={handleClick} className="flex items-center gap-1.5 bg-[#08152F] hover:bg-[#0e2247] border border-white/30 text-white text-xs font-semibold px-5 py-2 rounded-lg transition-all">
            👁 View
          </button>
        </div>
      </div>
    </div>
  );
}

function DetailedPubCard({ pub, delay = 0 }: { pub: Pub; delay?: number }) {
  const [summaryOpen, setSummaryOpen] = useState(false);
  const { ref, inView } = useInView();
  const canDownload = !!pub.pdf;
  const handleDownload = () => { canDownload && pub.pdf ? window.open(pub.pdf, "_blank") : soon(); };
  const handleSummary = () => { canDownload && pub.pdf ? setSummaryOpen(!summaryOpen) : soon(); };
  return (
    <div ref={ref}
      className={`bg-white rounded-2xl border-l-4 border-[#C9A24A] shadow-md overflow-hidden transition-all duration-500 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      style={{ transitionDelay: `${delay}ms` }}>
      <div className="p-6">
        <div className="w-12 h-12 bg-[#08152F] rounded-xl flex items-center justify-center mb-4 shadow">
          <span className="text-white text-xs font-bold">PDF</span>
        </div>
        <h3 className="font-bold text-[#08152F] text-base leading-snug mb-3">{pub.title}</h3>
        {pub.tags && <div className="flex flex-wrap gap-2 mb-3">{pub.tags.map(t => <span key={t} className="border border-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">{t}</span>)}</div>}
        <p className="text-gray-500 text-sm leading-relaxed mb-4">{pub.description}</p>
        <div className="text-sm mb-4"><span className="font-bold text-[#08152F]">Publication Date: </span><span className="text-gray-600">{pub.date}</span></div>
        <div className="flex flex-wrap gap-2">
          <button onClick={handleDownload} className="flex items-center gap-1.5 bg-[#08152F] hover:bg-[#0e2247] text-white font-semibold text-xs px-4 py-2.5 rounded-lg transition-all">⬇️ Download Full Report</button>
          <button onClick={handleSummary} className="flex items-center gap-1.5 bg-[#C9A24A] hover:bg-[#b08a35] text-white font-semibold text-xs px-4 py-2.5 rounded-lg transition-all">📋 Executive Summary {summaryOpen ? "▲" : "▼"}</button>
        </div>
      </div>
      {summaryOpen && canDownload && pub.pdf && (
        <div className="border-t border-gray-100 bg-gray-50 p-5">
          <p className="text-xs text-gray-500 mb-2">Preview the full report in your browser:</p>
          <iframe src={pub.pdf} className="w-full rounded-lg border border-gray-200" style={{ height: "400px" }} title={pub.title} />
        </div>
      )}
    </div>
  );
}

// ─── LIVE PUBLICATIONS ────────────────────────────────────────────────────────
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
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-2xl font-bold text-[#08152F]">Latest Publications</h2>
          <span className="text-xs text-[#C9A24A] font-bold bg-[#C9A24A]/10 px-2 py-0.5 rounded-full">● Live</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {pubs.map(pub => (
            <div key={pub.id} className="group bg-gray-50 border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              {pub.cover_image
                ? <div className="h-36 overflow-hidden"><img src={pub.cover_image} alt={pub.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /></div>
                : <div className="h-20 bg-gradient-to-br from-[#08152F] to-[#1a3a6e] flex items-center justify-center"><span className="text-3xl">📄</span></div>
              }
              <div className="p-4">
                {pub.tags && <div className="flex flex-wrap gap-1 mb-2">{pub.tags.split(",").slice(0, 2).map(tag => <span key={tag.trim()} className="text-xs bg-[#C9A24A]/10 text-[#C9A24A] font-bold px-2 py-0.5 rounded-full">{tag.trim()}</span>)}</div>}
                <h3 className="font-bold text-[#08152F] text-sm mb-1 leading-snug group-hover:text-[#C9A24A] transition-colors">{pub.title}</h3>
                {pub.subtitle && <p className="text-gray-400 text-xs mb-3">{pub.subtitle}</p>}
                {pub.description && <p className="text-gray-500 text-xs leading-relaxed mb-3 line-clamp-2">{pub.description}</p>}
                {pub.pdf_url
                  ? <a href={pub.pdf_url} target="_blank" rel="noopener noreferrer" className="inline-block bg-[#08152F] hover:bg-[#0e2247] text-white font-bold text-xs px-4 py-2 rounded-lg transition-colors">Download →</a>
                  : <span className="inline-block text-gray-400 text-xs italic">File coming soon</span>
                }
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function ResearchHero() {
  return (
    <section className="relative h-[68vh] min-h-[480px] flex items-center overflow-hidden">
      <img src={imgHero} alt="Research and knowledge"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ animation: "rKB 14s ease-in-out infinite alternate" }} />
      <div className="absolute inset-0 bg-gradient-to-r from-[#08152F]/97 via-[#08152F]/80 to-[#08152F]/40" />
      <div className="relative z-10 px-4 max-w-7xl mx-auto w-full" style={{ animation: "rFadeUp 0.9s ease both" }}>
        <span className="inline-block text-[#C9A24A] text-xs font-bold tracking-[0.25em] uppercase mb-5">Research &amp; Knowledge</span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6 max-w-2xl">
          Generating Ideas.<br />Informing Policy.<br />Inspiring Action.
        </h1>
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px w-16 bg-[#C9A24A]/60" />
          <div className="w-2 h-2 rounded-full bg-[#C9A24A]" />
        </div>
        <p className="text-white/65 text-base leading-relaxed max-w-xl mb-8">
          Knowledge • Evidence • Research
        </p>
        <div className="flex flex-wrap gap-4">
          <a href="#publications" className="inline-flex items-center gap-2 bg-[#C9A24A] hover:bg-[#b08a35] text-white font-bold px-7 py-3.5 rounded-xl transition-all text-sm shadow-xl">View Publications →</a>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold px-7 py-3.5 rounded-xl transition-all text-sm backdrop-blur-sm">Research Partnerships</Link>
        </div>
      </div>
      <style>{`
        @keyframes rKB { from { transform: scale(1.06); } to { transform: scale(1.0); } }
        @keyframes rFadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </section>
  );
}

// ─── RESEARCH PHILOSOPHY ──────────────────────────────────────────────────────
function ResearchPhilosophy() {
  return (
    <section className="bg-[#08152F] py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <span className="inline-block text-[#C9A24A] text-xs font-bold tracking-widest uppercase mb-4">Our Approach</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-6">Research Philosophy</h2>
            <p className="text-white/70 text-base leading-relaxed mb-4">
              EJF research begins with the communities who live alongside Natural Wealth and the institutions that govern it. We combine rigorous analysis with lived experience to generate ideas that are grounded in reality.
            </p>
            <p className="text-white/70 text-base leading-relaxed mb-6">
              Our research is designed not to sit on shelves but to influence policy, strengthen institutions, improve investment and empower communities to claim the benefits of the Natural Wealth around them.
            </p>
            <div className="grid grid-cols-3 gap-4">
              {[["🔬", "Evidence-Based"], ["🤝", "Community-Led"], ["📣", "Policy-Focused"]].map(([icon, label]) => (
                <div key={label} className="text-center bg-white/5 border border-white/10 rounded-2xl p-4">
                  <div className="text-2xl mb-2">{icon}</div>
                  <p className="text-white/70 text-xs font-semibold">{label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
              <img src={imgComEv} alt="Research fieldwork and community engagement"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="absolute -top-5 -right-5 bg-[#C9A24A] text-white rounded-2xl px-6 py-4 shadow-xl">
              <p className="font-bold text-sm leading-snug">Ideas that advance Economic Justice</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── AREAS OF RESEARCH ────────────────────────────────────────────────────────
function AreasOfResearch() {
  const { ref, inView } = useInView();
  return (
    <section className="bg-[#F7F8FA] py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block text-[#C9A24A] text-xs font-bold tracking-widest uppercase mb-3">What We Study</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#08152F] mb-3">Areas of Research</h2>
          <p className="text-[#08152F]/55 max-w-xl mx-auto text-base">Six integrated research areas through which EJF generates knowledge that advances Economic Justice.</p>
        </div>
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {AREAS_OF_RESEARCH.map((area, i) => (
            <div key={area.title}
              className={`group bg-white rounded-3xl border border-gray-100 p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="w-12 h-12 rounded-2xl bg-[#08152F] group-hover:bg-[#C9A24A] flex items-center justify-center text-xl mb-5 transition-colors duration-300">{area.icon}</div>
              <h3 className="font-extrabold text-[#08152F] text-base leading-snug mb-3">{area.title}</h3>
              <div className="h-0.5 w-8 bg-[#C9A24A] rounded mb-4" />
              <p className="text-[#08152F]/60 text-sm leading-relaxed">{area.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── KNOWLEDGE PRODUCTS ───────────────────────────────────────────────────────
function KnowledgeProducts() {
  const { ref, inView } = useInView();
  return (
    <section id="publications" className="bg-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
          <div>
            <span className="inline-block text-[#C9A24A] text-xs font-bold tracking-widest uppercase mb-4">What We Produce</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#08152F] leading-tight mb-6">Knowledge Products</h2>
            <p className="text-[#08152F]/70 text-base leading-relaxed mb-8">
              EJF produces a range of knowledge products designed to inform policy, strengthen institutions and expand public understanding of Economic Justice.
            </p>
            <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {KNOWLEDGE_PRODUCTS.map((kp, i) => (
                <div key={kp.label}
                  className={`group flex items-center gap-3 bg-[#F7F8FA] border border-gray-100 rounded-2xl p-4 hover:bg-white hover:border-[#C9A24A]/30 hover:shadow-md hover:-translate-y-1 transition-all duration-300 ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
                  style={{ transitionDelay: `${i * 60}ms` }}>
                  <div className="w-10 h-10 rounded-xl bg-[#08152F] group-hover:bg-[#C9A24A] flex items-center justify-center text-lg flex-shrink-0 transition-colors">{kp.icon}</div>
                  <span className="text-[#08152F] font-semibold text-sm">{kp.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {featuredPubs.filter(p => !p.wide).map(pub => <FeaturedCard key={pub.title} pub={pub} />)}
            </div>
            <div className="space-y-4">
              {featuredPubs.filter(p => p.wide).map(pub => <FeaturedWideCard key={pub.title} pub={pub} />)}
            </div>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
          {detailedPubs.map((pub, i) => <DetailedPubCard key={pub.title} pub={pub} delay={i * 100} />)}
        </div>

        <div className="mt-14">
          <h3 className="text-xl font-extrabold text-[#08152F] mb-6">Policy Briefs</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {policyBriefs.map((brief, i) => (
              <div key={brief.title} className="group bg-[#F7F8FA] rounded-3xl border-l-4 border-[#C9A24A] p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <h4 className="font-bold text-[#08152F] text-sm leading-snug mb-2">{brief.title}</h4>
                <p className="text-xs text-[#C9A24A] font-semibold mb-2">Issue: {brief.issue}</p>
                <p className="text-xs text-[#08152F]/60 leading-relaxed mb-4">{brief.desc}</p>
                <button onClick={soon} className="flex items-center gap-1.5 border border-[#C9A24A] text-[#C9A24A] hover:bg-[#C9A24A] hover:text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-all">🕐 Coming Soon</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── KNOWLEDGE THROUGH PARTNERSHIP ────────────────────────────────────────────
function KnowledgePartnership() {
  return (
    <section className="bg-[#F7F8FA] py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-3xl overflow-hidden shadow-xl aspect-[3/4]">
              <img src={imgComEv} alt="Research partnership"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="rounded-3xl overflow-hidden shadow-xl aspect-[3/4] mt-8">
              <img src={imgTm} alt="Knowledge partnership at work"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          </div>
          <div>
            <span className="inline-block text-[#C9A24A] text-xs font-bold tracking-widest uppercase mb-4">Collaborative Knowledge</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#08152F] leading-tight mb-6">Knowledge Through Partnership</h2>
            <p className="text-[#08152F]/70 text-base leading-relaxed mb-5">
              EJF's research is strongest when it is co-created. We partner with academic institutions, research networks, civil society organisations, governments and communities to ensure our knowledge is rigorous, grounded and globally relevant.
            </p>
            <div className="space-y-3 mb-8">
              {["University Research Departments", "Policy Think Tanks", "Community Organisations", "International Research Networks"].map(p => (
                <div key={p} className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A24A] flex-shrink-0" />
                  <span className="text-[#08152F] font-semibold text-sm">{p}</span>
                </div>
              ))}
            </div>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-[#08152F] hover:bg-[#0e2247] text-white font-bold px-7 py-3.5 rounded-xl transition-all text-sm shadow-md">
              Research Collaboration →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── KNOWLEDGE TO IMPACT CTA ──────────────────────────────────────────────────
function KnowledgeToImpact() {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      <div className="absolute inset-0">
        <img src={imgHero} alt="Knowledge to impact" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#08152F]/97 via-[#08152F]/90 to-[#08152F]/80" />
      </div>
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <span className="inline-block text-[#C9A24A] text-xs font-bold tracking-[0.25em] uppercase mb-5">Our Commitment</span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-6">From Knowledge to Impact</h2>
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px flex-1 max-w-[60px] bg-[#C9A24A]/50" />
          <p className="text-[#C9A24A] font-bold text-lg tracking-widest">Ideas • Evidence • Partnerships • Action</p>
          <div className="h-px flex-1 max-w-[60px] bg-[#C9A24A]/50" />
        </div>
        <p className="text-white/65 text-base leading-relaxed mb-10 max-w-xl mx-auto">
          EJF is committed to ensuring that knowledge does not remain on bookshelves. Every research output is designed to influence policy, strengthen institutions and create lasting public value through Economic Justice.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-[#C9A24A] hover:bg-[#b08a35] text-white font-bold px-9 py-4 rounded-xl transition-all text-sm shadow-xl shadow-[#C9A24A]/25">Partner With Us →</Link>
          <Link href="/philosophy" className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold px-9 py-4 rounded-xl transition-all text-sm backdrop-blur-sm">Our Philosophy</Link>
        </div>
      </div>
    </section>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function Research() {
  return (
    <>
      <ResearchHero />
      <LivePublications />
      <ResearchPhilosophy />
      <AreasOfResearch />
      <KnowledgeProducts />
      <KnowledgePartnership />
      <KnowledgeToImpact />
    </>
  );
}
