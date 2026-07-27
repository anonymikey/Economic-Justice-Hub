import { Link } from "wouter";

import imgHero   from "@assets/hero_1775860211048.jpeg";
import imgComDia from "@assets/comm_dia_1775860211044.jpeg";
import imgComEv  from "@assets/com_event_1775860211043.jpeg";
import imgTm     from "@assets/tm_1775860211028.jpeg";
import imgFood   from "@assets/food_ev_1775860211047.jpeg";

// ─── HERO ────────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative h-[72vh] min-h-[500px] flex items-center justify-center overflow-hidden">
      <img src={imgHero} alt="Economic Justice philosophy"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ animation: "philKB 14s ease-in-out infinite alternate" }} />
      <div className="absolute inset-0 bg-gradient-to-b from-[#08152F]/85 via-[#08152F]/70 to-[#08152F]/92" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        style={{ animation: "philFadeUp 0.9s ease both" }}>
        <span className="inline-block text-[#C9A24A] text-xs font-bold tracking-[0.25em] uppercase mb-5">
          Economic Justice Forum
        </span>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white leading-tight mb-6 tracking-tight">
          OUR PHILOSOPHY
        </h1>
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-16 bg-[#C9A24A]/60" />
          <div className="w-2 h-2 rounded-full bg-[#C9A24A]" />
          <div className="h-px w-16 bg-[#C9A24A]/60" />
        </div>
        <p className="text-white/75 text-base sm:text-xl leading-relaxed max-w-2xl mx-auto">
          People • Economic Systems • Human Dignity → Economic Justice.
        </p>
        <div className="mt-10 flex flex-col items-center gap-2 text-white/40 text-xs">
          <span>Scroll to explore</span>
          <div className="w-px h-8 bg-white/20" style={{ animation: "philPulse 2s ease-in-out infinite" }} />
        </div>
      </div>

      <style>{`
        @keyframes philKB { from { transform: scale(1.06); } to { transform: scale(1.0); } }
        @keyframes philFadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes philPulse { 0%,100% { opacity: 0.2; } 50% { opacity: 0.7; } }
      `}</style>
    </section>
  );
}

// ─── INTRODUCTION ─────────────────────────────────────────────────────────────
function IntroSection() {
  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
              <img src={imgComDia} alt="Community dialogue"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="absolute -bottom-5 -right-5 bg-[#08152F] text-white rounded-2xl px-6 py-4 shadow-xl max-w-[220px]">
              <p className="text-[#C9A24A] text-[10px] font-bold tracking-widest uppercase mb-1">Our Foundation</p>
              <p className="font-bold text-sm leading-snug">The worldview that defines everything we do</p>
            </div>
          </div>

          <div>
            <span className="inline-block text-[#C9A24A] text-xs font-bold tracking-widest uppercase mb-4 border-b border-[#C9A24A]/30 pb-1">
              What We Believe
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#08152F] leading-tight mb-6">
              Ideas Shape Institutions. Institutions Shape Economic Systems. Economic Systems Shape People's Lives.
            </h2>
            <div className="space-y-4">
              {[
                "The Economic Justice Forum affirms that human dignity is the foundation of Economic Justice. Every person possesses inherent worth, and every economy derives its legitimacy from its ability to respect, protect and advance that dignity.",
                "We recognise economic rights as fundamental human rights. The opportunity to participate in economic life, pursue enterprise, create value, innovate, work with dignity, own productive assets and benefit fairly from economic progress is essential to the full enjoyment of human rights.",
                "We are guided by the enduring principles of Equity • Justice • Prosperity. These principles shape our understanding of Economic Justice and define every idea, institution and partnership we build.",
                "We understand Economic Justice as the condition in which people are able to realise their economic potential, exercise their economic rights and participate fully in economic systems that uphold human dignity, expand opportunity and create equitable and sustainable prosperity.",
              ].map((line, i) => (
                <p key={i} className={`text-base leading-relaxed ${i === 0 ? "text-[#08152F] font-bold text-lg" : "text-[#08152F]/80 font-medium"}`}>
                  {line}
                </p>
              ))}
              <div className="h-px bg-[#C9A24A]/20 my-4" />
              <p className="text-[#08152F]/70 text-base leading-relaxed">
                People are the purpose of every economy. Institutions, markets, policies and investments derive their significance from their contribution to people's ability to achieve Economic Justice. We therefore evaluate economic systems by the opportunities they create, the rights they protect, the dignity they uphold and the prosperity they enable people to achieve.
              </p>
              <p className="text-[#08152F] font-semibold text-base">
                Economic Justice is achieved by transforming economic systems — not treating their symptoms.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CORE PHILOSOPHY CARDS ────────────────────────────────────────────────────
const PHIL_CARDS = [
  {
    icon: "🏅",
    title: "Human Dignity",
    accent: "#C9A24A",
    paras: [
      "Human dignity is the foundation of Economic Justice.",
      "Every economy, institution and public policy derives its legitimacy from its ability to respect, protect and advance the dignity of every person.",
    ],
  },
  {
    icon: "📜",
    title: "Economic Rights",
    accent: "#C9A24A",
    paras: [
      "Economic rights are fundamental human rights.",
      "They enable people to participate in economic life, pursue opportunity, create value, innovate, work with dignity, own productive assets and benefit fairly from economic progress.",
    ],
  },
  {
    icon: "👥",
    title: "People",
    accent: "#60a5fa",
    paras: [
      "People are the purpose of every economy.",
      "Economic systems exist to expand people's opportunities, strengthen their capabilities, protect their rights and enable them to achieve Economic Justice.",
    ],
  },
  {
    icon: "🚪",
    title: "Opportunity",
    accent: "#34d399",
    paras: [
      "Opportunity is the pathway through which people realise their economic potential.",
      "Inclusive access to education, knowledge, finance, enterprise, technology, productive assets and decent work strengthens people's capacity to participate fully in economic life.",
    ],
  },
  {
    icon: "🏛️",
    title: "Institutions",
    accent: "#f472b6",
    paras: [
      "Institutions are the architects of economic systems.",
      "Their quality determines how rights are protected, opportunities are created, public value is generated and prosperity is shared. Strong institutions are essential to advancing Economic Justice.",
    ],
  },
  {
    icon: "⚙️",
    title: "Economic Systems",
    accent: "#a78bfa",
    paras: [
      "Economic systems are the means through which Economic Justice is advanced.",
      "Governance, markets, public finance, enterprise, innovation and regulation collectively shape the conditions under which people pursue opportunity and achieve prosperity.",
    ],
  },
  {
    icon: "🌿",
    title: "Natural Wealth",
    accent: "#C9A24A",
    paras: [
      "Natural wealth is a strategic public asset that should expand opportunity, strengthen resilience and generate shared prosperity.",
      "Its governance should enable people and communities to achieve Economic Justice while safeguarding opportunities for future generations.",
    ],
  },
  {
    icon: "💡",
    title: "Innovation",
    accent: "#34d399",
    paras: [
      "Innovation is a driver of institutional renewal and economic transformation.",
      "Science, technology, entrepreneurship and human creativity strengthen economic systems, improve productivity and expand opportunities for people.",
    ],
  },
  {
    icon: "🌍",
    title: "Shared Prosperity",
    accent: "#C9A24A",
    paras: [
      "Shared prosperity is the outcome of economic systems that uphold human dignity, protect economic rights, expand opportunity and generate public value.",
      "Prosperity is strengthened when more people are able to participate in and benefit from economic progress.",
    ],
  },
  {
    icon: "🔄",
    title: "Transformation",
    accent: "#60a5fa",
    paras: [
      "Transformation is the continuous process of strengthening institutions and economic systems so that more people are able to achieve Economic Justice.",
      "Sustainable transformation requires ideas, leadership, collaboration and institutions capable of responding to changing economic realities.",
    ],
  },
  {
    icon: "⚖️",
    title: "Economic Justice",
    accent: "#C9A24A",
    paras: [
      "Economic Justice is the condition in which people are able to realise their economic potential, exercise their economic rights and participate fully in economic systems that uphold human dignity, expand opportunity and create equitable, sustainable and shared prosperity.",
      "It is the purpose of our work, the outcome we advance and the standard by which we evaluate economic systems.",
    ],
  },
];

function CorePhilosophySection() {
  return (
    <section className="bg-[#F7F8FA] py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block text-[#C9A24A] text-xs font-bold tracking-widest uppercase mb-3">The Economic Justice Doctrine™</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#08152F] mb-3">Core Philosophy</h2>
          <p className="text-[#08152F]/55 max-w-2xl mx-auto text-base">
            Eleven interconnected principles that define how EJF understands, interprets and advances Economic Justice.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PHIL_CARDS.map((card) => (
            <div key={card.title}
              className="group bg-white rounded-3xl border border-gray-100 p-7 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col">
              <div className="w-12 h-12 rounded-2xl bg-[#08152F] group-hover:bg-[#C9A24A] flex items-center justify-center text-xl mb-5 transition-colors duration-300 flex-shrink-0">
                {card.icon}
              </div>
              <h3 className="font-extrabold text-[#08152F] text-base leading-snug mb-3">{card.title}</h3>
              <div className="h-0.5 w-8 rounded mb-4 flex-shrink-0" style={{ background: card.accent }} />
              <div className="space-y-2 flex-1">
                {card.paras.map((p, i) => (
                  <p key={i} className="text-[#08152F]/60 text-xs leading-relaxed">{p}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── OUR WAY OF THINKING ──────────────────────────────────────────────────────
const FLOW_STEPS = [
  { icon: "🔍", label: "Discover" },
  { icon: "💭", label: "Reimagine" },
  { icon: "✏️", label: "Design" },
  { icon: "🚀", label: "Implement" },
  { icon: "📊", label: "Learn" },
  { icon: "✨", label: "Transform" },
];

function WayOfThinkingSection() {
  return (
    <section className="bg-[#08152F] py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block text-[#C9A24A] text-xs font-bold tracking-widest uppercase mb-3">The iMagine Model™</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">Our Way of Thinking</h2>
          <p className="text-white/50 max-w-xl mx-auto text-base">
            A disciplined progression from understanding to lasting transformation.
          </p>
        </div>

        <div className="flex flex-col items-center gap-0 mb-14">
          {FLOW_STEPS.map((step, i) => (
            <div key={step.label} className="flex flex-col items-center w-full max-w-sm">
              <div className="flex items-center gap-4 w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 hover:bg-white/10 hover:border-[#C9A24A]/30 transition-all duration-300 group">
                <div className="w-10 h-10 rounded-xl bg-[#C9A24A]/10 border border-[#C9A24A]/30 flex items-center justify-center text-lg flex-shrink-0 group-hover:bg-[#C9A24A]/20 transition-colors">
                  {step.icon}
                </div>
                <span className="text-white font-semibold text-sm leading-snug">{step.label}</span>
                {i === 0 && (
                  <span className="ml-auto text-[#C9A24A] text-[10px] font-bold tracking-widest uppercase px-2 py-1 bg-[#C9A24A]/10 rounded-lg">Start</span>
                )}
                {i === FLOW_STEPS.length - 1 && (
                  <span className="ml-auto text-emerald-400 text-[10px] font-bold tracking-widest uppercase px-2 py-1 bg-emerald-400/10 rounded-lg">Goal</span>
                )}
              </div>
              {i < FLOW_STEPS.length - 1 && (
                <div className="flex flex-col items-center py-2 gap-0.5">
                  <div className="w-px h-3 bg-[#C9A24A]/30" />
                  <div className="text-[#C9A24A]/60 text-xs">↓</div>
                  <div className="w-px h-3 bg-[#C9A24A]/30" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="border border-[#C9A24A]/30 bg-[#C9A24A]/5 rounded-2xl p-8 text-center max-w-2xl mx-auto">
          <div className="h-0.5 w-16 bg-[#C9A24A] mx-auto mb-5" />
          <p className="text-white/75 text-base leading-relaxed">
            The iMagine Model™ and iMagine Framework™ connect the Forum's philosophy, doctrine and analytical perspectives with practical implementation, ensuring that ideas are translated into measurable and lasting outcomes.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── IMAGERY BREAK ────────────────────────────────────────────────────────────
function ImagerySection() {
  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block text-[#C9A24A] text-xs font-bold tracking-widest uppercase mb-4 border-b border-[#C9A24A]/30 pb-1">
              The Natural Wealth Lens™
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#08152F] leading-tight mb-6">
              Seeing Economic Justice Through Natural Wealth
            </h2>
            <p className="text-[#08152F]/70 text-base leading-relaxed mb-5">
              The Natural Wealth Lens™ is EJF's distinctive analytical perspective for understanding how natural wealth influences people's ability to achieve Economic Justice.
            </p>
            <p className="text-[#08152F]/70 text-base leading-relaxed mb-5">
              Forests, wildlife, oceans, fisheries, agriculture, minerals, water, biodiversity, energy and land are more than natural assets. They are forms of natural wealth that shape livelihoods, economies and the future of societies. Natural wealth acquires its greatest value when it expands opportunities for people, strengthens communities and contributes to equitable and sustainable prosperity.
            </p>
            <p className="text-[#08152F]/70 text-base leading-relaxed mb-5">
              The true measure of natural wealth is not the quantity of resources a country possesses, but the opportunities those resources create for people. Where natural wealth fails to improve people's lives, the challenge often lies not in the resource itself, but in the institutions, policies and economic systems that govern it.
            </p>
            <p className="text-[#08152F] font-semibold text-base">
              Natural wealth governance should enable people and communities to achieve Economic Justice while safeguarding opportunities for future generations.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-3xl overflow-hidden shadow-xl aspect-square">
              <img src={imgComEv} alt="Community and natural wealth"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="rounded-3xl overflow-hidden shadow-xl aspect-square mt-8">
              <img src={imgTm} alt="EJF team at work"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="rounded-3xl overflow-hidden shadow-xl aspect-square -mt-8">
              <img src={imgFood} alt="Natural wealth sustaining communities"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="rounded-3xl overflow-hidden shadow-xl aspect-square">
              <img src={imgComDia} alt="Dialogue and governance"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── INSTITUTIONAL DECLARATION ────────────────────────────────────────────────
function DeclarationSection() {
  return (
    <section className="relative py-28 px-4 overflow-hidden">
      <div className="absolute inset-0">
        <img src={imgHero} alt="EJF declaration background"
          className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#08152F]/97 via-[#08152F]/92 to-[#08152F]/85" />
      </div>
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <span className="inline-block text-[#C9A24A] text-xs font-bold tracking-[0.25em] uppercase mb-8">
          Our Institutional Declaration
        </span>

        <div className="space-y-8 mb-12">
          <p className="text-white text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight">
            People are the purpose of every economy.
          </p>

          <div className="flex items-center justify-center gap-4">
            <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-[#C9A24A]/50" />
            <div className="w-2 h-2 rounded-full bg-[#C9A24A]" />
            <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-[#C9A24A]/50" />
          </div>

          <p className="text-white/70 text-lg sm:text-xl leading-relaxed">
            Economic Justice is achieved by transforming economic systems — not treating their symptoms.
          </p>

          <div className="flex items-center justify-center gap-4">
            <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-[#C9A24A]/50" />
            <div className="w-2 h-2 rounded-full bg-[#C9A24A]" />
            <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-[#C9A24A]/50" />
          </div>

          <p className="text-[#C9A24A] font-bold text-xl sm:text-2xl tracking-widest">
            Equity &bull; Justice &bull; Prosperity
          </p>
        </div>

        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="h-px w-24 bg-[#C9A24A]/40" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#C9A24A]" />
          <div className="h-px w-24 bg-[#C9A24A]/40" />
        </div>

        <Link href="/research"
          className="inline-flex items-center gap-2 bg-[#C9A24A] hover:bg-[#b08a35] text-white font-bold px-10 py-4 rounded-xl transition-all text-sm shadow-xl shadow-[#C9A24A]/25">
          Explore Research &amp; Knowledge →
        </Link>
      </div>
    </section>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function Philosophy() {
  return (
    <>
      <HeroSection />
      <IntroSection />
      <CorePhilosophySection />
      <WayOfThinkingSection />
      <ImagerySection />
      <DeclarationSection />
    </>
  );
}
