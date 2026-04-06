import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────
   INTERSECTION OBSERVER HOOK
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

/* ─────────────────────────────────────────────
   ANIMATED COUNTER
───────────────────────────────────────────── */
function AnimatedCount({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView(0.5);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 20);
    return () => clearInterval(timer);
  }, [inView, target]);
  return (
    <div ref={ref} className="text-4xl md:text-5xl font-bold text-[#0e1f3d]">
      {count.toLocaleString()}{suffix}
    </div>
  );
}

/* ─────────────────────────────────────────────
   STAT CARD
───────────────────────────────────────────── */
function StatCard({ value, label, suffix }: { value: number; label: string; suffix?: string }) {
  return (
    <div className="text-center py-6">
      <AnimatedCount target={value} suffix={suffix} />
      <div className="text-gray-500 text-sm mt-1">{label}</div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   COMPONENT CARD (for Program Activities)
───────────────────────────────────────────── */
function ComponentCard({ title, desc, delay = 0 }: { title: string; desc: string; delay?: number }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={`bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="h-1 bg-gradient-to-r from-[#d4a017] to-[#f5c842]" />
      <div className="p-5">
        <h4 className="font-bold text-[#0e1f3d] text-sm mb-2">{title}</h4>
        <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SECTION WRAPPER
───────────────────────────────────────────── */
function ProgramSection({ children, bg = "bg-white" }: { children: React.ReactNode; bg?: string }) {
  return <section className={`${bg} py-14 px-4`}>{children}</section>;
}

/* ─────────────────────────────────────────────
   HERO
───────────────────────────────────────────── */
function ProgramsHero() {
  return (
    <section
      className="relative min-h-[380px] flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: "url(https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1600&q=80)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-[#0e1f3d]/82" />
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#d4a017] to-transparent" />
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-[#d4a017]/20 border border-[#d4a017]/40 text-[#d4a017] text-xs font-semibold px-4 py-1.5 rounded-full mb-5 uppercase tracking-widest">
          EJF Impact
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-5 leading-tight">
          Our Programs &amp; Projects
        </h1>
        <p className="text-white/75 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
          EJF implements targeted programs that address our strategic pillars through community-centered approaches, research-driven advocacy, and multi-stakeholder partnerships.
        </p>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   PROGRAM 1 — TREES
───────────────────────────────────────────── */
function TreeChampionsAnnouncement() {
  const [open, setOpen] = useState(false);
  const tags = ["#TreePlanting", "#YouthLeadership", "#TreeChampions", "#ClimateJustice", "#EconomicJustice", "#COP30", "#SustainableFuture"];

  return (
    <div className="mt-8 rounded-2xl overflow-hidden border-2 border-[#d4a017] shadow-lg">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between bg-gradient-to-r from-[#d4a017] to-[#f5c842] px-6 py-4 text-left group"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">🌳</span>
          <div>
            <div className="font-bold text-[#0e1f3d] text-base leading-tight">
              Tree Champions: Planting Justice, Growing Resilience!
            </div>
            <div className="text-[#0e1f3d]/70 text-xs mt-0.5">Re-launch Announcement — January Initiative</div>
          </div>
        </div>
        <svg
          className={`w-5 h-5 text-[#0e1f3d] transition-transform duration-300 flex-shrink-0 ${open ? "rotate-180" : ""}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div
        className="bg-white overflow-hidden transition-all duration-500 ease-in-out"
        style={{ maxHeight: open ? "900px" : "0px" }}
      >
        <div className="p-6 md:p-8 space-y-4 text-sm leading-relaxed text-gray-700">
          <p>
            The Economic Justice Forum (EJF) is thrilled to announce the <strong className="text-[#0e1f3d]">re-launch of our Tree Champions program</strong> across primary schools, secondary schools, and universities in Taita Taveta, Mombasa, Kwale, and along the Indian Ocean this coming January!
          </p>
          <p>
            This bold initiative empowers youth and communities to plant, nurture, and protect trees, creating a generation of climate justice leaders. Each tree is adopted and nurtured by a student, who, once the tree thrives, becomes a <strong className="text-[#0e1f3d]">Tree Champion</strong>, committed to environmental stewardship and community-centered natural resource justice. 🌳💚
          </p>

          <div className="bg-[#f0faf4] rounded-xl border border-emerald-100 p-5">
            <h4 className="font-bold text-[#0e1f3d] mb-3 flex items-center gap-2">🌱 Our Vision &amp; Impact</h4>
            <p className="mb-3">Our target is <strong className="text-emerald-700">1,000,000 trees</strong>, including high-value fruit trees, shade trees, and timber species, generating both environmental and economic benefits:</p>
            <ul className="space-y-2">
              <li className="flex gap-2"><span>🌱</span><span><strong>Climate justice:</strong> carbon sequestration, biodiversity restoration, and ecosystem resilience</span></li>
              <li className="flex gap-2"><span>💰</span><span><strong>Economic justice:</strong> fruit, timber, and sustainable livelihoods for frontline communities</span></li>
              <li className="flex gap-2"><span>✊</span><span><strong>Youth leadership:</strong> building champions who advocate for local, national, and UN-level benefit-sharing frameworks</span></li>
            </ul>
          </div>

          <p>
            This program connects local climate action to global agendas, including <strong className="text-[#0e1f3d]">#COP30 outcomes</strong>, post-COP30 climate finance initiatives, and international climate justice frameworks, ensuring frontline communities benefit while contributing to global climate targets.
          </p>

          <div className="bg-[#fff8e7] rounded-xl border border-[#d4a017]/30 p-5">
            <h4 className="font-bold text-[#0e1f3d] mb-3">🤝 How You Can Support</h4>
            <p className="mb-3">We call on friends, partners, organizations, and individuals who believe in youth-led climate action to support us with:</p>
            <div className="flex flex-wrap gap-2">
              {["🌱 Seedlings", "🚚 Transport", "📦 Logistical support"].map((item) => (
                <span key={item} className="bg-[#d4a017]/15 text-[#0e1f3d] font-semibold text-sm px-4 py-2 rounded-full border border-[#d4a017]/30">{item}</span>
              ))}
            </div>
          </div>

          <p className="font-medium text-[#0e1f3d]">
            Together, we can plant, nurture, and mentor the next generation of climate justice champions, growing a greener, just, and resilient Taita Taveta, Mombasa, Kwale, and Indian Ocean communities — inspiring change globally! 🌍
          </p>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[#0e1f3d] font-semibold text-xs">🌍 www.economicjusticeforum.org</span>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {tags.map((t) => (
              <span key={t} className="text-[#d4a017] text-xs font-semibold bg-[#d4a017]/10 px-3 py-1 rounded-full">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function OurTreesProgram() {
  const { ref, inView } = useInView();
  return (
    <ProgramSection bg="bg-white">
      <div className="max-w-5xl mx-auto">
        <div ref={ref} className={`flex items-center gap-3 mb-6 transition-all duration-700 ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"}`}>
          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-xl">🌳</div>
          <div>
            <div className="text-xs text-emerald-600 font-bold uppercase tracking-wider">Program 1</div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#0e1f3d]">Our Trees, Our Future</h2>
          </div>
        </div>

        {/* Hero image */}
        <div className="rounded-2xl overflow-hidden shadow-xl mb-6">
          <img
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&q=80"
            alt="Tree seedlings nursery"
            className="w-full h-64 md:h-80 object-cover"
          />
        </div>

        <div className="mb-6">
          <p className="text-gray-500 italic text-sm mb-2">Growing Leaders, Growing Trees</p>
          <p className="text-gray-700 leading-relaxed text-sm">
            Our Trees, Our Future links environmental conservation with youth leadership and civic empowerment. Through partnerships with schools, public benefit organizations, and business partners, students adopt and grow trees while learning about environmental stewardship, leadership, and civic responsibility.
          </p>
        </div>

        <h3 className="font-bold text-[#0e1f3d] text-lg mb-4">Program Components</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <ComponentCard title="Tree Adoption & Growing" desc="Students adopt tree seedlings and commit to nurturing them to maturity, learning practical conservation skills." delay={0} />
          <ComponentCard title="Leadership Training" desc="Comprehensive training in environmental leadership, climate action, and community engagement." delay={80} />
          <ComponentCard title="Community Engagement" desc="Extending conservation efforts beyond schools to involve entire communities in environmental protection." delay={160} />
        </div>

        {/* Impact stats */}
        <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 mb-6">
          <h3 className="font-bold text-[#0e1f3d] text-lg mb-4">Impact Highlights</h3>
          <div className="grid grid-cols-3 divide-x divide-gray-200 mb-6">
            <StatCard value={20000} label="Trees Grown" suffix="," />
            <StatCard value={20000} label="Tree Champions Inducted" suffix="," />
            <StatCard value={30} label="Schools Engaged" />
          </div>
          <ul className="space-y-2 text-sm text-gray-700">
            {[
              { bold: "20,000 Trees Grown", rest: " – Each tree represents a Tree Champion committed to environmental conservation." },
              { bold: "20,000 Tree Champions Inducted", rest: " – Youth trained in leadership, climate action, and sustainability." },
              { bold: "100,000 People Reached", rest: " – Through civic engagement forums, local & coastal FM radio, and social media campaigns." },
              { bold: "30 Schools Engaged", rest: " – Across Mwatate and neighboring counties, creating a network of environmental champions." },
            ].map((item, i) => (
              <li key={i} className="flex gap-2.5">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                <span><strong className="text-[#0e1f3d]">{item.bold}</strong>{item.rest}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <span className="text-sm font-bold text-[#0e1f3d]">Supported By: </span>
            <span className="text-sm text-gray-600"><strong>Wildlife Works</strong> (main supporter - donated seedlings) and other conservation partners committed to youth environmental education.</span>
          </div>
        </div>

        {/* Tree Champions Announcement Dropdown */}
        <TreeChampionsAnnouncement />
      </div>
    </ProgramSection>
  );
}

/* ─────────────────────────────────────────────
   PROGRAM 2 — CIVIC ENGAGEMENT
───────────────────────────────────────────── */
function CivicEngagementProgram() {
  const { ref, inView } = useInView();
  const focusAreas = ["Economic & Fiscal Justice", "Climate Justice", "Public Participation", "Research-Driven Advocacy"];
  return (
    <ProgramSection bg="bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div ref={ref} className={`flex items-center gap-3 mb-6 transition-all duration-700 ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"}`}>
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-xl">🗳️</div>
          <div>
            <div className="text-xs text-blue-600 font-bold uppercase tracking-wider">Program 2</div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#0e1f3d]">Civic Engagement on Economic &amp; Climate Justice</h2>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
          <p className="text-gray-700 text-sm leading-relaxed mb-6">
            This project strengthens public participation, community voice, and civic leadership in economic, fiscal, and climate justice. It empowers citizens to influence policies, monitor public spending, and demand accountability in natural resource management and climate finance.
          </p>

          <h3 className="font-bold text-[#0e1f3d] mb-3">Key Focus Areas</h3>
          <div className="flex flex-wrap gap-2 mb-6">
            {focusAreas.map((area) => (
              <span key={area} className="bg-[#d4a017] hover:bg-[#b8891a] text-white text-sm font-semibold px-4 py-2.5 rounded-lg cursor-default transition-colors shadow-sm">{area}</span>
            ))}
          </div>

          <h3 className="font-bold text-[#0e1f3d] mb-4">Program Activities</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <ComponentCard title="Civic Education Forums" desc="Community dialogues on economic rights, climate justice, and participatory governance." />
            <ComponentCard title="Policy Monitoring" desc="Training citizens to monitor public spending and policy implementation in natural resource management." delay={80} />
            <ComponentCard title="Media Engagement" desc="Using radio, social media, and community media to amplify citizen voices and advocacy messages." delay={160} />
          </div>

          <div className="bg-gray-50 rounded-xl border border-gray-100 p-5">
            <h3 className="font-bold text-[#0e1f3d] mb-4">Impact</h3>
            <div className="grid grid-cols-3 divide-x divide-gray-200 mb-5">
              <StatCard value={100} label="Civic Dialogues Conducted" suffix="+" />
              <StatCard value={100000} label="Citizens Reached" suffix="+" />
              <StatCard value={15} label="Community Networks Strengthened" />
            </div>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex gap-2.5"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" /><span>100+ civic dialogues and policy forums conducted across target counties</span></li>
              <li className="flex gap-2.5"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" /><span><strong className="text-[#0e1f3d]">Over 100,000 citizens reached and engaged</strong> through civic education, advocacy, radio and social media outreach</span></li>
              <li className="flex gap-2.5"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" /><span>Strengthened citizen networks demanding transparency and accountability in resource management</span></li>
              <li className="flex gap-2.5"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" /><span>Enhanced community capacity to engage with county and national governments on development priorities</span></li>
            </ul>
          </div>
        </div>
      </div>
    </ProgramSection>
  );
}

/* ─────────────────────────────────────────────
   PROGRAM 3 — DIGITAL JUSTICE
───────────────────────────────────────────── */
function DigitalJusticeProgram() {
  const { ref, inView } = useInView();
  return (
    <ProgramSection bg="bg-white">
      <div className="max-w-5xl mx-auto">
        <div ref={ref} className={`flex items-center gap-3 mb-6 transition-all duration-700 ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"}`}>
          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-xl">💻</div>
          <div>
            <div className="text-xs text-purple-600 font-bold uppercase tracking-wider">Program 3</div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#0e1f3d]">Digital Justice &amp; Inclusion Program</h2>
          </div>
        </div>

        <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 md:p-8">
          <p className="text-gray-700 text-sm leading-relaxed mb-6">
            Bridging the digital divide by promoting equitable access to digital technologies, digital literacy, and ethical technology governance, particularly for marginalized and rural communities.
          </p>
          <h3 className="font-bold text-[#0e1f3d] mb-4">Program Components</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ComponentCard title="Digital Literacy Training" desc="Basic digital skills training for youth, women, and elders in underserved communities." />
            <ComponentCard title="Community Digital Hubs" desc="Establishing community access points with internet connectivity and digital resources." delay={80} />
            <ComponentCard title="Digital Rights Advocacy" desc="Promoting policies that protect digital rights and ensure equitable technology access." delay={160} />
          </div>
        </div>
      </div>
    </ProgramSection>
  );
}

/* ─────────────────────────────────────────────
   PROGRAM 4 — WOMEN'S EMPOWERMENT
───────────────────────────────────────────── */
function WomensEmpowermentProgram() {
  const { ref, inView } = useInView();
  return (
    <ProgramSection bg="bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div ref={ref} className={`flex items-center gap-3 mb-6 transition-all duration-700 ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"}`}>
          <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-xl">👩‍💼</div>
          <div>
            <div className="text-xs text-pink-600 font-bold uppercase tracking-wider">Program 4</div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#0e1f3d]">Women's Economic Empowerment Program</h2>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm">
          <p className="text-gray-700 text-sm leading-relaxed mb-6">
            Promoting women's participation in economic decision-making, entrepreneurship, and leadership through targeted capacity building, access to resources, and policy advocacy.
          </p>
          <h3 className="font-bold text-[#0e1f3d] mb-4">Key Initiatives</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ComponentCard title="Women's Entrepreneurship Support" desc="Business skills training, mentorship, and access to seed funding for women-led enterprises." />
            <ComponentCard title="Leadership Development" desc="Capacity building for women's participation in community leadership and decision-making." delay={80} />
            <ComponentCard title="Policy Advocacy" desc="Advocating for gender-responsive policies in economic planning and resource allocation." delay={160} />
          </div>
        </div>
      </div>
    </ProgramSection>
  );
}

/* ─────────────────────────────────────────────
   PDF DOWNLOAD
───────────────────────────────────────────── */
function PdfSection() {
  const [viewing, setViewing] = useState(false);
  return (
    <ProgramSection bg="bg-[#0e1f3d]">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* PDF card */}
          <div className="w-full md:w-72 flex-shrink-0">
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <div
                className="h-48 flex flex-col items-center justify-center"
                style={{
                  backgroundImage: "url(https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-[#0e1f3d]/70 rounded-t-2xl" style={{ position: "relative" }}>
                  <div className="flex flex-col items-center justify-center h-full gap-2 p-6">
                    <div className="w-12 h-12 bg-[#d4a017] rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">📄</div>
                    <div className="text-white font-bold text-center text-base">EJF Programs Summarized</div>
                    <div className="text-white/60 text-xs text-center">A concise summary of EJF's programs and key impact highlights. Download or view it inline.</div>
                  </div>
                </div>
              </div>
              <div className="bg-[#1a3a6e] p-4 flex flex-col gap-2">
                <a
                  href="/EJF_Programs_Summarized.pdf"
                  download
                  className="flex items-center justify-center gap-2 bg-[#d4a017] hover:bg-[#b8891a] text-white font-semibold py-2.5 px-4 rounded-lg transition-all text-sm hover:scale-105"
                >
                  <span>⬇️</span> Download PDF
                </a>
                <button
                  onClick={() => setViewing(!viewing)}
                  className="flex items-center justify-center gap-2 bg-[#0e1f3d] hover:bg-[#2a4a7a] border border-white/20 text-white font-semibold py-2.5 px-4 rounded-lg transition-all text-sm"
                >
                  <span>{viewing ? "✕" : "👁"}</span> {viewing ? "Close" : "View"}
                </button>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="flex-1 text-white">
            <div className="w-10 h-0.5 bg-[#d4a017] mb-4" />
            <h2 className="text-2xl font-bold mb-3">Programs Summary Brief</h2>
            <p className="text-white/70 text-sm leading-relaxed mb-4">
              Download our complete programs brief to explore EJF's four key programs in depth — including objectives, key activities, and expected impact across Kenya and globally.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {["Economic, Fiscal & Debt Justice", "Climate & Resource Justice", "Democracy & Digital Justice", "Global Governance Reform"].map((p) => (
                <div key={p} className="flex gap-2 items-start">
                  <span className="text-[#d4a017] mt-0.5 flex-shrink-0">▸</span>
                  <span className="text-white/80 text-sm">{p}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Inline PDF viewer */}
        {viewing && (
          <div className="mt-6 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <iframe
              src="/EJF_Programs_Summarized.pdf"
              className="w-full"
              style={{ height: "600px" }}
              title="EJF Programs Summarized"
            />
          </div>
        )}
      </div>
    </ProgramSection>
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
      title: "Publications",
      desc: "Download our latest research papers, policy briefs, and annual reports.",
      links: ["Annual Report 2025", "Climate Justice Policy", "Economic Equity Study", "Digital Inclusion Paper"],
      color: "text-blue-600",
    },
    {
      emoji: "🎥",
      title: "Media Resources",
      desc: "Access photos, videos, and media kits for press and partners.",
      links: ["Photo Gallery", "Video Library", "Press Releases", "Media Kit"],
      color: "text-purple-600",
    },
    {
      emoji: "📊",
      title: "Data & Research",
      desc: "Explore our data visualizations and research findings.",
      links: ["Impact Dashboard", "Research Database", "Case Studies", "Statistics"],
      color: "text-emerald-600",
    },
  ];

  return (
    <ProgramSection bg="bg-white">
      <div className="max-w-5xl mx-auto">
        <div ref={ref} className={`text-center mb-10 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <h2 className="text-2xl md:text-3xl font-bold text-[#0e1f3d] mb-3">Helpful Resources</h2>
          <p className="text-gray-500 text-sm max-w-lg mx-auto leading-relaxed">
            Access our latest publications, research papers, and educational materials to learn more about economic justice.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {resources.map((r, i) => (
            <div
              key={r.title}
              className={`bg-gray-50 rounded-2xl border border-gray-100 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="text-4xl mb-3 text-center">{r.emoji}</div>
              <h3 className={`font-bold text-center text-sm mb-2 ${r.color}`}>{r.title}</h3>
              <p className="text-gray-500 text-xs text-center mb-4 leading-relaxed">{r.desc}</p>
              <div className="space-y-1">
                {r.links.map((l) => (
                  <div key={l} className="text-center text-xs text-[#0e1f3d] hover:text-[#d4a017] cursor-pointer transition-colors py-0.5">{l}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </ProgramSection>
  );
}

/* ─────────────────────────────────────────────
   CTA
───────────────────────────────────────────── */
function ProgramsCta() {
  return (
    <section className="bg-gradient-to-r from-[#0e1f3d] to-[#1a3a6e] py-14 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Partner With Us</h2>
        <p className="text-white/70 text-sm mb-8 leading-relaxed">
          Whether you are a donor, partner organization, or community member, there are many ways to support our programs and advance justice together.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/donate" className="bg-[#d4a017] hover:bg-[#b8891a] text-white font-semibold px-8 py-3 rounded-lg transition-all hover:scale-105 shadow-lg">
            Donate Now
          </a>
          <a href="/contact" className="border border-white/30 hover:border-white text-white font-semibold px-8 py-3 rounded-lg transition-all hover:bg-white/10">
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────── */
export default function Programs() {
  return (
    <>
      <ProgramsHero />
      <OurTreesProgram />
      <CivicEngagementProgram />
      <DigitalJusticeProgram />
      <WomensEmpowermentProgram />
      <PdfSection />
      <HelpfulResources />
      <ProgramsCta />
    </>
  );
}
