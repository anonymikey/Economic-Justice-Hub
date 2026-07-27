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
      <img src={imgHero} alt="Natural wealth philosophy"
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
          Natural Wealth fulfils its highest purpose through Economic Justice.
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
              <img src={imgComDia} alt="Natural wealth and communities"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="absolute -bottom-5 -right-5 bg-[#08152F] text-white rounded-2xl px-6 py-4 shadow-xl max-w-[220px]">
              <p className="text-[#C9A24A] text-[10px] font-bold tracking-widest uppercase mb-1">Our Foundation</p>
              <p className="font-bold text-sm leading-snug">The idea that shapes everything we do</p>
            </div>
          </div>

          <div>
            <span className="inline-block text-[#C9A24A] text-xs font-bold tracking-widest uppercase mb-4 border-b border-[#C9A24A]/30 pb-1">
              Introduction
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#08152F] leading-tight mb-6">
              The Idea That Shapes Everything
            </h2>
            <div className="space-y-4">
              {[
                "Natural Wealth fulfils its highest purpose through Economic Justice.",
                "This is the philosophy upon which the Economic Justice Forum was founded.",
                "It shapes how we understand development.",
                "It guides how we approach governance.",
                "It informs our research.",
                "It inspires our partnerships.",
                "And it defines the future we seek to build.",
              ].map((line, i) => (
                <p key={i} className={`text-base leading-relaxed ${i === 0 ? "text-[#08152F] font-bold text-lg" : i >= 1 && i <= 6 ? "text-[#08152F]/80 font-medium" : "text-[#08152F]/70"}`}>
                  {line}
                </p>
              ))}
              <div className="h-px bg-[#C9A24A]/20 my-4" />
              <p className="text-[#08152F]/70 text-base leading-relaxed">
                Natural Wealth has always sustained life, shaped civilizations and created opportunity. Its highest purpose, however, is realised only when it improves people's lives while safeguarding the Natural Capital upon which present and future generations depend.
              </p>
              <p className="text-[#08152F] font-semibold text-base">
                Economic Justice is the pathway through which this becomes possible.
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
    icon: "🌿",
    title: "Natural Wealth",
    accent: "#C9A24A",
    paras: [
      "Natural Wealth is the collective value of Earth's forests, wildlife, rivers, oceans, minerals, mountains, biodiversity, fertile landscapes and renewable energy resources.",
      "It is the natural foundation upon which human life, economic prosperity and sustainable development depend.",
      "Natural Wealth is not simply a collection of natural resources. It is humanity's greatest opportunity to build a more just, prosperous and sustainable future.",
    ],
  },
  {
    icon: "⚖️",
    title: "Economic Justice",
    accent: "#C9A24A",
    paras: [
      "Economic Justice is realised when Natural Wealth fulfils its highest purpose.",
      "It is achieved when the opportunities and benefits generated by Natural Wealth advance Human Dignity, enable the full enjoyment of Human Rights, promote Equity, strengthen Justice, create Equitable and Sustainable Prosperity, and inspire the long-term conservation of Natural Capital.",
      "Economic Justice ensures that communities prosper because of the Natural Wealth around them — not despite it.",
    ],
  },
  {
    icon: "🏅",
    title: "Human Dignity",
    accent: "#60a5fa",
    paras: [
      "Every person deserves the opportunity to live with dignity, security and hope.",
      "Natural Wealth should expand those opportunities by creating decent livelihoods, strengthening local economies and improving quality of life.",
      "Human Dignity is the first dividend of Economic Justice.",
    ],
  },
  {
    icon: "📜",
    title: "Human Rights",
    accent: "#34d399",
    paras: [
      "Natural Wealth should strengthen the enjoyment of Human Rights.",
      "Communities should participate meaningfully in decisions affecting the Natural Wealth with which they live and should benefit fairly from the opportunities it creates.",
      "Responsible stewardship of Natural Wealth strengthens social, economic, cultural and environmental rights for present and future generations.",
    ],
  },
  {
    icon: "🤝",
    title: "Equity",
    accent: "#f472b6",
    paras: [
      "Equity ensures that the opportunities and benefits generated by Natural Wealth are accessible and shared fairly across communities, regions and generations.",
      "No community should remain excluded from the prosperity created by the Natural Wealth surrounding it.",
    ],
  },
  {
    icon: "🏛️",
    title: "Justice",
    accent: "#a78bfa",
    paras: [
      "Justice transforms Natural Wealth into lasting public value.",
      "Transparent institutions, accountable leadership, the rule of law and responsible governance ensure that Natural Wealth serves the common good.",
      "Justice builds public trust and strengthens sustainable development.",
    ],
  },
  {
    icon: "🌱",
    title: "Equitable and Sustainable Prosperity",
    accent: "#34d399",
    paras: [
      "Prosperity is meaningful only when it is equitable and sustainable.",
      "Natural Wealth should improve lives, expand opportunities, strengthen resilient economies and create lasting value while conserving Natural Capital for future generations.",
    ],
  },
  {
    icon: "🌍",
    title: "Natural Capital",
    accent: "#C9A24A",
    paras: [
      "Natural Capital is the living foundation of sustainable prosperity.",
      "Healthy forests, oceans, rivers, biodiversity, wildlife and ecosystems support economies, strengthen resilience and sustain life itself.",
      "Protecting Natural Capital is therefore not only an environmental responsibility. It is an economic, social and moral imperative.",
    ],
  },
];

function CorePhilosophySection() {
  return (
    <section className="bg-[#F7F8FA] py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block text-[#C9A24A] text-xs font-bold tracking-widest uppercase mb-3">Foundations</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#08152F] mb-3">Core Philosophy</h2>
          <p className="text-[#08152F]/55 max-w-2xl mx-auto text-base">
            Eight interconnected principles that define how EJF understands the relationship between Natural Wealth and human progress.
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
  { icon: "🌿", label: "Natural Wealth" },
  { icon: "⚖️", label: "Economic Justice" },
  { icon: "🏅", label: "Human Dignity" },
  { icon: "📜", label: "The Full Enjoyment of Human Rights" },
  { icon: "🤝", label: "Equity" },
  { icon: "🏛️", label: "Justice" },
  { icon: "🌱", label: "Equitable and Sustainable Prosperity" },
  { icon: "🌍", label: "Long-term Conservation of Natural Capital" },
];

function WayOfThinkingSection() {
  return (
    <section className="bg-[#08152F] py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block text-[#C9A24A] text-xs font-bold tracking-widest uppercase mb-3">Framework</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">Our Way of Thinking</h2>
          <p className="text-white/50 max-w-xl mx-auto text-base">
            A principled progression from Natural Wealth to lasting conservation.
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
            This framework guides our research, informs our policy, shapes our partnerships and inspires our action.
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
              From Principles to Practice
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#08152F] leading-tight mb-6">
              Philosophy in Action
            </h2>
            <p className="text-[#08152F]/70 text-base leading-relaxed mb-5">
              EJF translates this philosophy into research, advocacy, partnerships and practical solutions that strengthen the relationship between people and Natural Capital.
            </p>
            <p className="text-[#08152F]/70 text-base leading-relaxed mb-5">
              Every programme we run, every partnership we build and every policy we influence begins with a single commitment: ensuring that Natural Wealth fulfils its highest purpose.
            </p>
            <p className="text-[#08152F] font-semibold text-base">
              That commitment is Economic Justice.
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
            Natural Wealth fulfils its highest purpose through Economic Justice.
          </p>

          <div className="flex items-center justify-center gap-4">
            <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-[#C9A24A]/50" />
            <div className="w-2 h-2 rounded-full bg-[#C9A24A]" />
            <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-[#C9A24A]/50" />
          </div>

          <p className="text-white/70 text-lg sm:text-xl leading-relaxed">
            The future of People and the future of Natural Capital are inseparable.
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
