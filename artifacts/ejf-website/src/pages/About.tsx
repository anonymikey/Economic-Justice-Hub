import { useState } from "react";
import { Link } from "wouter";

import imgHero    from "@assets/hero_1775860211048.jpeg";
import imgComDia  from "@assets/comm_dia_1775860211044.jpeg";
import imgComEv   from "@assets/com_event_1775860211043.jpeg";
import imgEme     from "@assets/eme_1775860211046.jpeg";
import imgFood    from "@assets/food_ev_1775860211047.jpeg";
import imgTm      from "@assets/tm_1775860211028.jpeg";
import imgYouth   from "@assets/youth_ev_1775860211030.jpeg";
import imgChris   from "@assets/chris_1775864978911.jpeg";
import imgArnold  from "@assets/arnold_1775864978910.jpeg";
import imgHassan  from "@assets/hassan_1775864978921.jpeg";
import imgIsaac   from "@assets/issac_1775864978922.jpeg";
import imgMoses   from "@assets/moses_1775864978933.jpeg";
import imgTeam    from "@assets/WhatsApp_Image_2026-04-08_at_17.23.53_(2)_1775865230373.jpeg";

// ─── TEAM DATA ───────────────────────────────────────────────────────────────
const president = {
  name: "Hon. Christopher Mwambingu",
  role: "President & Founder",
  initials: "CM",
  photo: imgChris,
  photoPos: "object-top",
  color: "from-[#0e1f3d] to-[#1a3a6e]",
  bio: "Mr. Christopher Mwambingu is an independent leader, former Member of the County Assembly of Taita Taveta, and 2025 Mwatate MP candidate. A committed advocate of economic justice, human rights, and the protection of both people's and environmental rights, he has dedicated his life to defending the rights of rural and marginalized communities and ensuring they achieve economic freedom. Christopher believes that true justice and lasting freedom cannot exist without economic empowerment, and he works tirelessly to create opportunities that enable communities to thrive. Drawing on his experience in governance, public service, and community organizing, he combines vision, integrity, and transformative leadership to advance equity, accountability, and sustainable development for all.",
};

const coFounders = [
  {
    name: "Hon. Amriya Boy Juma",
    role: "Co-Founder",
    initials: "AJ",
    photo: null as string | null,
    photoPos: "object-center",
    color: "from-[#1a4a7a] to-[#2a6aaa]",
    bio: "Hon. Amriya Boy Juma, fondly known as Wakili Mtetezi, is the first elected female Member of the County Assembly (MCA) for Mjambere Ward, Mombasa County, renowned for her commitment to justice, equity, and community empowerment. She is a distinguished Advocate of the High Court of Kenya, holding an LL.B. from the University of Nairobi and a Postgraduate Diploma in Law from the Kenya School of Law, and is the founder of Amriya Juma Boy and Company Advocates, championing human rights, gender equality, legal aid expansion, and community legal education. Elected in 2025 to chair the Lands Committee, she continues to advocate for land rights, good governance, social justice, and equitable resource distribution, inspiring communities and nurturing future leaders.",
  },
  {
    name: "Moses Macharia",
    role: "Co-Founder",
    initials: "MM",
    photo: imgMoses as string | null,
    photoPos: "object-top",
    color: "from-[#2d4a1e] to-[#4a7a30]",
    bio: "Mr. Moses Macharia Bakari is a visionary leader and firm believer in selfless and dedicated leadership aimed at transforming the nation. He sees leadership as a God-ordained responsibility, grounded in service, integrity, and the pursuit of positive change. Moses is committed to empowering communities, fostering equity, and driving sustainable development for the greater good. He is an alumnus of Njabini Boys High School and a Political Science graduate from the University of Nairobi, where he gained the knowledge and skills that continue to guide his leadership journey.",
  },
  {
    name: "Reverend Isaac Mwambingu",
    role: "Co-Founder",
    initials: "IM",
    photo: imgIsaac as string | null,
    photoPos: "object-top",
    color: "from-[#4a2d1e] to-[#7a4a30]",
    bio: "Rev. Isaac Mwambingu is an Anglican Minister in the Diocese of Taita/Taveta, Kenya, with a track record of fostering positive development across five parishes. He is a passionate advocate for human rights, social justice, and poverty eradication, serving as Secretary of Social Justice Ambassadors and Director of Wahudumu SACCO. A standing committee member of the Diocesan Synod and board member of Mwambonu, Kitumbi, and Ngangao High Schools, Rev. Mwambingu embodies transformative leadership that integrates service to God, humanity, and the environment.",
  },
  {
    name: "Mr. Hassan Maghanga",
    role: "Co-Founder",
    initials: "HM",
    photo: imgHassan as string | null,
    photoPos: "object-top",
    color: "from-[#3a1a4a] to-[#6a3a7a]",
    bio: "Hassan Maghanga is a community entrepreneur and leader committed to empowering the transportation sector in Taita Taveta, with a focus on the motorbike and taxi industry. Through his work, he supports local drivers, fosters economic opportunities, and promotes sustainable growth within the sector. Hassan's leadership is anchored in community development, innovation, and ensuring that the transportation industry serves as a vehicle for economic empowerment for marginalized communities.",
  },
  {
    name: "Mr. Egwa Arnold",
    role: "Co-Founder & Digital Rights Director",
    initials: "EA",
    photo: imgArnold as string | null,
    photoPos: "object-top",
    color: "from-[#1a3a4a] to-[#2a5a6a]",
    bio: "Arnold Egwa is a young tech leader, AI expert, and Program Director for Digital Rights at the Economic Justice Forum, committed to advancing digital justice and economic equity. He champions data privacy, combats digital monopolies, and ensures that technology empowers communities rather than deepens disparities. Driven by a belief that technology should serve humanity, Arnold works to close the digital divide and create systems and policies that allow all communities to thrive in the digital age.",
  },
];

// ─── TEAM CARD ───────────────────────────────────────────────────────────────
type TeamPerson = {
  name: string; role: string; initials: string;
  photo: string | null; photoPos: string; color: string; bio: string;
};

function TeamCard({ person, isPresident = false }: { person: TeamPerson; isPresident?: boolean }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <>
      <div className="md:hidden">
        <div className="relative rounded-2xl overflow-hidden shadow-xl cursor-pointer"
          onClick={() => setFlipped(f => !f)}>
          <div className={`bg-gradient-to-br ${person.color} h-64 flex flex-col items-center justify-center gap-3 p-6 relative`}>
            {person.photo
              ? <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#C9A24A]/70 shadow-xl">
                  <img src={person.photo} alt={person.name} className={`w-full h-full object-cover ${person.photoPos}`} loading="lazy" />
                </div>
              : <div className="w-20 h-20 rounded-full bg-white/20 border-4 border-white/40 flex items-center justify-center text-white font-bold text-2xl">{person.initials}</div>
            }
            <div className="text-center">
              <div className="text-white font-bold text-base leading-tight">{person.name}</div>
              <div className="text-[#C9A24A] text-xs mt-1 font-medium">{person.role}</div>
            </div>
            <div className="absolute bottom-3 right-3 bg-white/20 rounded-full w-7 h-7 flex items-center justify-center">
              <svg className={`w-4 h-4 text-white transition-transform duration-300 ${flipped ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          <div className="overflow-hidden transition-all duration-500 ease-in-out bg-[#08152F]"
            style={{ maxHeight: flipped ? "500px" : "0px" }}>
            <div className="p-5">
              <div className="w-8 h-0.5 bg-[#C9A24A] mb-3" />
              <p className="text-white/80 text-sm leading-relaxed">{person.bio}</p>
            </div>
          </div>
        </div>
      </div>

      <div className={`hidden md:block ${isPresident ? "md:col-span-1" : ""}`} style={{ perspective: "1000px" }}>
        <div className="relative w-full h-80 cursor-pointer"
          style={{ transformStyle: "preserve-3d", transition: "transform 0.6s" }}
          onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "rotateY(180deg)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "rotateY(0deg)"; }}>
          <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${person.color} flex flex-col items-center justify-center gap-4 p-6 shadow-xl overflow-hidden`}
            style={{ backfaceVisibility: "hidden" }}>
            {person.photo
              ? <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-[#C9A24A]/70 shadow-2xl">
                  <img src={person.photo} alt={person.name} className={`w-full h-full object-cover ${person.photoPos}`} loading="lazy" />
                </div>
              : <div className="w-24 h-24 rounded-full bg-white/20 border-4 border-white/40 flex items-center justify-center text-white font-bold text-3xl">{person.initials}</div>
            }
            <div className="text-center">
              <div className="text-white font-bold text-base leading-tight">{person.name}</div>
              <div className="text-[#C9A24A] text-sm mt-1 font-medium">{person.role}</div>
            </div>
            <div className="absolute bottom-4 text-white/40 text-xs">Hover to learn more</div>
          </div>
          <div className="absolute inset-0 rounded-2xl bg-[#08152F] border border-[#C9A24A]/30 p-5 flex flex-col justify-center shadow-xl overflow-hidden"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
            <div className="w-8 h-0.5 bg-[#C9A24A] mb-3" />
            <div className="text-[#C9A24A] font-bold text-sm mb-1">{person.name}</div>
            <div className="text-white/50 text-xs mb-3">{person.role}</div>
            <p className="text-white/80 text-xs leading-relaxed overflow-y-auto max-h-52 pr-1">{person.bio}</p>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── HERO ────────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative h-[70vh] min-h-[480px] flex items-center justify-center overflow-hidden">
      <img src={imgHero} alt="About EJF hero"
        className="absolute inset-0 w-full h-full object-cover scale-105"
        style={{ animation: "aboutKenBurns 14s ease-in-out infinite alternate" }} />
      <div className="absolute inset-0 bg-gradient-to-b from-[#08152F]/80 via-[#08152F]/65 to-[#08152F]/90" />
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto" style={{ animation: "aboutFadeUp 0.9s ease both" }}>
        <span className="inline-block text-[#C9A24A] text-xs font-bold tracking-[0.25em] uppercase mb-5">
          Economic Justice Forum
        </span>
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6 tracking-tight">
          ABOUT THE<br />ECONOMIC JUSTICE FORUM
        </h1>
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-16 bg-[#C9A24A]/60" />
          <div className="w-2 h-2 rounded-full bg-[#C9A24A]" />
          <div className="h-px w-16 bg-[#C9A24A]/60" />
        </div>
        <p className="text-white/75 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
          Advancing Economic Justice by Strengthening the Relationship Between People and Natural Capital
        </p>
      </div>
      <style>{`
        @keyframes aboutKenBurns { from { transform: scale(1.05); } to { transform: scale(1.0); } }
        @keyframes aboutFadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scrollFadeIn { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </section>
  );
}

// ─── WHO WE ARE ───────────────────────────────────────────────────────────────
function WhoWeAreSection() {
  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
              <img src={imgComDia} alt="EJF community dialogue on natural wealth"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="absolute -bottom-5 -right-5 bg-[#08152F] text-white rounded-2xl px-6 py-4 shadow-xl max-w-[220px]">
              <p className="text-[#C9A24A] text-[10px] font-bold tracking-widest uppercase mb-1">Founded On</p>
              <p className="font-bold text-sm leading-snug">Natural Wealth fulfils its highest purpose through Economic Justice</p>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <span className="inline-block text-[#C9A24A] text-xs font-bold tracking-widest uppercase mb-4 border-b border-[#C9A24A]/30 pb-1">
              Who We Are
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#08152F] leading-tight mb-6">
              An Independent Global Think Tank
            </h2>
            <p className="text-[#08152F]/70 text-base leading-relaxed mb-4">
              The Economic Justice Forum (EJF) is an independent global think tank, policy institute and partnership platform advancing Economic Justice by strengthening the relationship between People and Natural Capital.
            </p>
            <p className="text-[#08152F]/70 text-base leading-relaxed mb-5">
              EJF was founded on a simple but profound idea:
            </p>
            <blockquote className="border-l-4 border-[#C9A24A] pl-5 py-3 my-6 bg-[#F7F8FA] rounded-r-xl">
              <p className="text-[#08152F] font-bold text-lg leading-snug">
                Natural Wealth fulfils its highest purpose through Economic Justice.
              </p>
            </blockquote>
            <p className="text-[#08152F]/70 text-base leading-relaxed">
              This idea shapes everything we do. It informs our research, inspires our partnerships, strengthens our policy engagement and guides our commitment to creating a world where Natural Wealth advances Human Dignity, enables the full enjoyment of Human Rights, promotes Equity, strengthens Justice, creates Equitable and Sustainable Prosperity, and inspires the long-term conservation of Natural Capital.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── OUR PURPOSE ─────────────────────────────────────────────────────────────
function PurposeSection() {
  return (
    <section className="bg-[#F7F8FA] py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block text-[#C9A24A] text-xs font-bold tracking-widest uppercase mb-3">Why We Exist</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#08152F]">Our Purpose</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[#08152F] font-semibold text-lg leading-relaxed mb-5">
              Natural Wealth has the power to transform lives.
            </p>
            <p className="text-[#08152F]/70 text-base leading-relaxed mb-5">
              Yet across the world, many communities living alongside forests, wildlife, oceans, rivers, minerals and other forms of Natural Wealth continue to experience poverty, inequality, unemployment, exclusion and environmental degradation.
            </p>
            <p className="text-[#08152F]/70 text-base leading-relaxed mb-5">
              From the coastal communities of Mombasa and Taita Taveta to the mineral-rich landscapes of Kivu, the Copperbelt, the Niger Delta and the Amazon, this paradox remains one of the defining development challenges of our time.
            </p>
            <div className="space-y-3 mb-6">
              {[
                "Natural Wealth should create opportunity, not exclusion.",
                "It should strengthen communities, not leave them behind.",
                "It should build resilient economies while protecting the Natural Capital upon which future generations depend.",
              ].map(line => (
                <div key={line} className="flex items-start gap-3">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#C9A24A] flex-shrink-0" />
                  <p className="text-[#08152F]/80 text-base leading-relaxed font-medium">{line}</p>
                </div>
              ))}
            </div>
            <p className="text-[#08152F] font-semibold text-base">
              The Economic Justice Forum exists to help realise that future.
            </p>
          </div>

          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
              <img src={imgComEv} alt="Communities and natural wealth"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="absolute -top-5 -left-5 bg-[#C9A24A] text-white rounded-2xl px-6 py-4 shadow-xl max-w-[200px]">
              <p className="font-bold text-sm leading-snug">People at the centre of Natural Capital governance</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── OUR DISTINCTIVE CONTRIBUTION ────────────────────────────────────────────
function DistinctiveSection() {
  return (
    <section className="bg-[#08152F] py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <span className="inline-block text-[#C9A24A] text-xs font-bold tracking-widest uppercase mb-4">What Sets Us Apart</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-8">
              Our Distinctive Contribution
            </h2>
            <div className="border border-[#C9A24A]/40 bg-[#C9A24A]/5 rounded-2xl p-8 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[#C9A24A] text-3xl">"</span>
              </div>
              <p className="text-white text-2xl font-bold leading-snug mb-2">We begin with Natural Wealth.</p>
              <div className="h-0.5 w-12 bg-[#C9A24A] mt-4" />
            </div>
            <p className="text-white/70 text-base leading-relaxed mb-4">
              Natural Wealth is humanity's greatest opportunity for advancing Human Dignity, the full enjoyment of Human Rights, Equity, Justice and Equitable and Sustainable Prosperity.
            </p>
            <p className="text-white/70 text-base leading-relaxed">
              Economic Justice is the pathway through which that opportunity is realised. This philosophy enables EJF to connect Natural Capital governance with public finance, responsible investment, climate resilience, democratic governance, technological innovation, community development and sustainable economic transformation within one integrated framework.
            </p>
          </div>

          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
              <img src={imgTm} alt="EJF knowledge and partnership platform"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-[#08152F]/60 to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── OUR APPROACH ─────────────────────────────────────────────────────────────
function ApproachSection() {
  const cards = [
    {
      icon: "🔬",
      title: "Research",
      desc: "Generating original ideas, evidence and knowledge that shape policy and strengthen decision-making.",
    },
    {
      icon: "🏛️",
      title: "Policy",
      desc: "Supporting governments and institutions to develop practical, inclusive and forward-looking policies.",
    },
    {
      icon: "🤝",
      title: "Partnerships",
      desc: "Building trusted relationships with governments, international organizations, development partners, academia, civil society, responsible enterprise and host communities.",
    },
    {
      icon: "⚡",
      title: "Action",
      desc: "Supporting practical initiatives that demonstrate how Natural Wealth can create lasting public value through Economic Justice.",
    },
  ];

  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block text-[#C9A24A] text-xs font-bold tracking-widest uppercase mb-3">How We Work</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#08152F] mb-3">Our Approach</h2>
          <p className="text-[#08152F]/55 max-w-xl mx-auto text-base">
            Four integrated pillars through which EJF advances Economic Justice.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((c) => (
            <div key={c.title}
              className="group bg-[#F7F8FA] rounded-3xl border border-gray-100 p-8 hover:-translate-y-2 hover:shadow-2xl hover:bg-white transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-[#08152F] group-hover:bg-[#C9A24A] flex items-center justify-center text-2xl mb-6 transition-colors duration-300">
                {c.icon}
              </div>
              <h3 className="text-lg font-extrabold text-[#08152F] mb-3">{c.title}</h3>
              <div className="h-0.5 w-8 bg-[#C9A24A] rounded mb-4" />
              <p className="text-[#08152F]/60 text-sm leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FROM LOCAL REALITIES TO GLOBAL SOLUTIONS ────────────────────────────────
const LOCAL_STORIES = [
  {
    img: imgYouth,
    location: "Mombasa, Kenya",
    title: "A young entrepreneur seeking opportunity through the blue economy.",
    theme: "Blue Economy",
  },
  {
    img: imgFood,
    location: "Northern Kenya",
    title: "A pastoralist adapting to climate change in northern Kenya.",
    theme: "Climate Resilience",
  },
  {
    img: imgComEv,
    location: "Taita Taveta, Kenya",
    title: "A mining community striving for equitable benefit sharing.",
    theme: "Benefit Sharing",
  },
  {
    img: imgEme,
    location: "Kivu, DRC",
    title: "A family living alongside cobalt mines in Kivu.",
    theme: "Resource Justice",
  },
  {
    img: imgComDia,
    location: "East African Coast",
    title: "A fishing community protecting mangroves on the East African coast.",
    theme: "Conservation",
  },
];

function LocalToGlobalSection() {
  return (
    <section className="bg-[#F7F8FA] py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block text-[#C9A24A] text-xs font-bold tracking-widest uppercase mb-3">Our Reach</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#08152F] mb-3">
            From Local Realities to Global Solutions
          </h2>
          <p className="text-[#08152F]/55 max-w-2xl mx-auto text-base">
            Across the world, Natural Wealth presents both a challenge and an opportunity.
          </p>
        </div>

        <div className="space-y-8 mb-14">
          {LOCAL_STORIES.map((s, i) => (
            <div key={s.location}
              className={`flex flex-col ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-0 rounded-3xl overflow-hidden shadow-md bg-white hover:shadow-xl transition-shadow duration-300 group`}>
              <div className="md:w-80 flex-shrink-0 aspect-[4/3] md:aspect-auto overflow-hidden">
                <img src={s.img} alt={s.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="flex-1 flex items-center p-8 md:p-10">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C9A24A]" />
                    <span className="text-[#C9A24A] text-xs font-bold tracking-widest uppercase">{s.theme}</span>
                  </div>
                  <p className="text-[#08152F] font-semibold text-lg leading-snug mb-2">{s.title}</p>
                  <p className="text-[#08152F]/45 text-sm font-medium">{s.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#08152F] rounded-3xl p-10 md:p-14 text-center max-w-3xl mx-auto">
          <p className="text-white/65 text-base leading-relaxed mb-5">
            Although these realities differ, they are connected by one common question:
          </p>
          <p className="text-[#C9A24A] font-bold text-xl md:text-2xl leading-snug mb-6 italic">
            "How can Natural Wealth fulfil its highest purpose?"
          </p>
          <p className="text-white/65 text-base leading-relaxed">
            EJF contributes to answering that question by combining local knowledge, global perspectives and practical solutions that strengthen the relationship between People and Natural Capital.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── OUR COMMITMENT ───────────────────────────────────────────────────────────
const COMMITMENTS = [
  { icon: "🌿", text: "Communities prosper because of the Natural Wealth around them — not despite it." },
  { icon: "🏛️", text: "Governments strengthen public trust through transparent and accountable stewardship." },
  { icon: "🤝", text: "Responsible enterprise creates shared value." },
  { icon: "🔬", text: "Research informs better policy." },
  { icon: "💡", text: "Innovation expands opportunity." },
  { icon: "🌐", text: "Partnerships transform ideas into lasting impact." },
];

function CommitmentSection() {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      <div className="absolute inset-0">
        <img src={imgHero} alt="EJF commitment background"
          className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#08152F]/97 via-[#08152F]/90 to-[#08152F]/80" />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block text-[#C9A24A] text-xs font-bold tracking-widest uppercase mb-3">What We Stand For</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Our Commitment</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          {COMMITMENTS.map(c => (
            <div key={c.text}
              className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/8 hover:border-[#C9A24A]/30 transition-all duration-300">
              <span className="text-2xl flex-shrink-0 mt-0.5">{c.icon}</span>
              <p className="text-white/80 text-sm leading-relaxed">{c.text}</p>
            </div>
          ))}
        </div>

        <div className="border border-[#C9A24A]/40 bg-[#C9A24A]/8 rounded-2xl p-8 text-center">
          <div className="h-0.5 w-16 bg-[#C9A24A] mx-auto mb-5" />
          <p className="text-white font-semibold text-base leading-relaxed">
            Above all, we are committed to ensuring that Natural Wealth fulfils its highest purpose through Economic Justice.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── FOUNDING TEAM ────────────────────────────────────────────────────────────
function FoundingTeam() {
  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block text-[#C9A24A] text-xs font-bold tracking-widest uppercase mb-3">Leadership</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#08152F] mb-2">Founding Team</h2>
          <p className="text-[#08152F]/50 text-base">The visionary leaders who established and drive the Economic Justice Forum.</p>
        </div>

        {/* President */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-6 h-0.5 bg-[#C9A24A]" />
            <span className="text-[#C9A24A] text-xs font-bold uppercase tracking-wider">President &amp; Founder</span>
          </div>
          <div className="md:hidden">
            <TeamCard person={president} isPresident />
          </div>
          <div className="hidden md:flex bg-gradient-to-r from-[#08152F] to-[#1a3a6e] rounded-2xl overflow-hidden shadow-2xl">
            <div className="w-72 flex-shrink-0 flex flex-col items-center justify-center p-8 border-r border-white/10 gap-4">
              <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-[#C9A24A] shadow-2xl">
                <img src={president.photo} alt={president.name}
                  className={`w-full h-full object-cover ${president.photoPos}`} loading="eager" />
              </div>
              <div className="text-center">
                <div className="text-white font-bold text-lg leading-tight mb-1">{president.name}</div>
                <div className="text-[#C9A24A] text-xs font-semibold">{president.role}</div>
              </div>
            </div>
            <div className="flex-1 p-10 flex items-center">
              <div>
                <div className="w-10 h-0.5 bg-[#C9A24A] mb-4" />
                <p className="text-white/80 text-sm leading-relaxed">{president.bio}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Co-Founders */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <span className="w-6 h-0.5 bg-[#C9A24A]" />
            <span className="text-[#C9A24A] text-xs font-bold uppercase tracking-wider">Co-Founders</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {coFounders.map(person => (
              <TeamCard key={person.name} person={person} />
            ))}
          </div>
        </div>

        {/* Team photo */}
        <div className="mt-14">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-6 h-0.5 bg-[#C9A24A]" />
            <span className="text-[#C9A24A] text-xs font-bold uppercase tracking-wider">The EJF Team</span>
          </div>
          <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
            <img src={imgTeam} alt="EJF Founding Team"
              className="w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
              style={{ maxHeight: 480 }} loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#08152F]/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <p className="text-white font-bold text-lg">Our People</p>
              <p className="text-white/60 text-sm mt-1">The growing EJF community — members, volunteers and advocates working together for Economic Justice.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FINAL SECTION ────────────────────────────────────────────────────────────
function FinalSection() {
  return (
    <section className="bg-[#08152F] py-24 px-4 text-center">
      <div className="max-w-2xl mx-auto">
        <p className="text-[#C9A24A] text-xs font-bold tracking-[0.25em] uppercase mb-4">
          Independent. Global. Principled.
        </p>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
          Economic Justice Forum
        </h2>
        <p className="text-white/50 font-semibold text-lg tracking-widest mb-8">
          Equity &bull; Justice &bull; Prosperity
        </p>
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-[#C9A24A]" />
          <div className="w-2 h-2 rounded-full bg-[#C9A24A]" />
          <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-[#C9A24A]" />
        </div>
        <Link href="/contact"
          className="inline-flex items-center gap-2 bg-[#C9A24A] hover:bg-[#b08a35] text-white font-bold px-10 py-4 rounded-xl transition-all text-sm shadow-xl shadow-[#C9A24A]/25">
          Partner With Us →
        </Link>
      </div>
    </section>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function About() {
  return (
    <>
      <HeroSection />
      <WhoWeAreSection />
      <PurposeSection />
      <DistinctiveSection />
      <ApproachSection />
      <LocalToGlobalSection />
      <CommitmentSection />
      <FoundingTeam />
      <FinalSection />
    </>
  );
}
