import { useState, useRef, useEffect } from "react";

const HERO_BG = "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=1600&q=80";

function HeroSection() {
  return (
    <section
      className="relative min-h-[520px] flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${HERO_BG})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      {/* Dark navy overlay */}
      <div className="absolute inset-0 bg-[#0e1f3d]/75" />

      <div className="relative z-10 text-center text-white px-4 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
          Equity. Justice. Prosperity.
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-8">
          People's Platform for Economic, Climate, Social &amp; Digital Justice
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/about"
            className="bg-[#0e1f3d] hover:bg-[#1a2f5e] border border-white/40 text-white font-semibold px-8 py-3 rounded transition-colors"
          >
            Learn More
          </a>
          <a
            href="/join"
            className="bg-[#d4a017] hover:bg-[#b8891a] text-white font-semibold px-8 py-3 rounded transition-colors"
          >
            Join Us
          </a>
        </div>
      </div>
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
      bg: "from-green-900/80 to-green-700/60",
      imgUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80",
    },
    {
      title: "Civic Engagement on Economic & Climate Justice",
      desc: "Empowering citizens to influence policy, monitor public spending, and demand accountability in natural resource management and climate finance.",
      btnLabel: "Read more",
      bg: "from-slate-900/80 to-slate-700/60",
      imgUrl: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=80",
    },
    {
      title: "Research & Policy Advocacy",
      desc: "Developing evidence-based policy recommendations for equitable resource distribution and benefit-sharing frameworks.",
      btnLabel: "Explore Research",
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
            <div
              key={p.title}
              className="relative rounded-xl overflow-hidden h-72 group cursor-pointer"
              style={{
                backgroundImage: `url(${p.imgUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className={`absolute inset-0 bg-gradient-to-t ${p.bg}`} />
              <div className="absolute inset-0 p-5 flex flex-col justify-between">
                <h3 className="text-white font-bold text-base leading-snug">{p.title}</h3>
                <div>
                  <p className="text-white/80 text-sm mb-4 leading-relaxed">{p.desc}</p>
                  <button className="bg-[#d4a017] hover:bg-[#b8891a] text-white font-semibold text-sm px-4 py-2 rounded transition-colors">
                    {p.btnLabel}
                  </button>
                </div>
              </div>
            </div>
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
