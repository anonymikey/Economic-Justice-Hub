import { useState } from "react";

/* ─────────────────────────────────────────────
   TEAM DATA
───────────────────────────────────────────── */
const president = {
  name: "Hon. Christopher Mwambingu",
  role: "President & Founder",
  initials: "CM",
  color: "from-[#0e1f3d] to-[#1a3a6e]",
  bio: "Mr. Christopher Mwambingu is an independent leader, former Member of the County Assembly of Taita Taveta, and 2025 Mwatate MP candidate. A committed advocate of economic justice, human rights, and the protection of both people's and environmental rights, he has dedicated his life to defending the rights of rural and marginalized communities and ensuring they achieve economic freedom. Christopher believes that true justice and lasting freedom cannot exist without economic empowerment, and he works tirelessly to create opportunities that enable communities to thrive. Drawing on his experience in governance, public service, and community organizing, he combines vision, integrity, and transformative leadership to advance equity, accountability, and sustainable development for all.",
};

const coFounders = [
  {
    name: "Hon. Amriya Boy Juma",
    role: "Co-Founder",
    initials: "AJ",
    color: "from-[#1a4a7a] to-[#2a6aaa]",
    bio: "Hon. Amriya Boy Juma, fondly known as Wakili Mtetezi, is the first elected female Member of the County Assembly (MCA) for Mjambere Ward, Mombasa County, renowned for her commitment to justice, equity, and community empowerment. She is a distinguished Advocate of the High Court of Kenya, holding an LL.B. from the University of Nairobi and a Postgraduate Diploma in Law from the Kenya School of Law, and is the founder of Amriya Juma Boy and Company Advocates, championing human rights, gender equality, legal aid expansion, and community legal education. Elected in 2025 to chair the Lands Committee, she continues to advocate for land rights, good governance, social justice, and equitable resource distribution, inspiring communities and nurturing future leaders.",
  },
  {
    name: "Moses Macharia",
    role: "Co-Founder",
    initials: "MM",
    color: "from-[#2d4a1e] to-[#4a7a30]",
    bio: "Mr. Moses Macharia Bakari is a visionary leader and firm believer in selfless and dedicated leadership aimed at transforming the nation. He sees leadership as a God-ordained responsibility, grounded in service, integrity, and the pursuit of positive change. Moses is committed to empowering communities, fostering equity, and driving sustainable development for the greater good. He is an alumnus of Njabini Boys High School and a Political Science graduate from the University of Nairobi, where he gained the knowledge and skills that continue to guide his leadership journey.",
  },
  {
    name: "Reverend Isaac Mwambingu",
    role: "Co-Founder",
    initials: "IM",
    color: "from-[#4a2d1e] to-[#7a4a30]",
    bio: "Rev. Isaac Mwambingu is an Anglican Minister in the Diocese of Taita/Taveta, Kenya, with a track record of fostering positive development across five parishes. He is a passionate advocate for human rights, social justice, and poverty eradication, serving as Secretary of Social Justice Ambassadors and Director of Wahudumu SACCO. A standing committee member of the Diocesan Synod and board member of Mwambonu, Kitumbi, and Ngangao High Schools, Rev. Mwambingu embodies transformative leadership that integrates service to God, humanity, and the environment.",
  },
  {
    name: "Mr. Hassan Maghanga",
    role: "Co-Founder",
    initials: "HM",
    color: "from-[#3a1a4a] to-[#6a3a7a]",
    bio: "Hassan Maghanga is a community entrepreneur and leader committed to empowering the transportation sector in Taita Taveta, with a focus on the motorbike and taxi industry. Through his work, he supports local drivers, fosters economic opportunities, and promotes sustainable growth within the sector. Hassan's leadership is anchored in community development, innovation, and ensuring that the transportation industry serves as a vehicle for economic empowerment for marginalized communities.",
  },
  {
    name: "Mr. Egwa Arnold",
    role: "Co-Founder & Digital Rights Director",
    initials: "EA",
    color: "from-[#1a3a4a] to-[#2a5a6a]",
    bio: "Arnold Egwa is a young tech leader, AI expert, and Program Director for Digital Rights at the Economic Justice Forum, committed to advancing digital justice and economic equity. He champions data privacy, combats digital monopolies, and ensures that technology empowers communities rather than deepens disparities. Driven by a belief that technology should serve humanity, Arnold works to close the digital divide and create systems and policies that allow all communities to thrive in the digital age.",
  },
];

/* ─────────────────────────────────────────────
   TEAM CARD – Desktop hover / Mobile tap
───────────────────────────────────────────── */
function TeamCard({ person, isPresident = false }: { person: typeof president; isPresident?: boolean }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <>
      {/* ── Mobile: tap toggles info panel ── */}
      <div className="md:hidden">
        <div
          className="relative rounded-2xl overflow-hidden shadow-xl cursor-pointer"
          onClick={() => setFlipped((f) => !f)}
        >
          {/* Avatar face */}
          <div className={`bg-gradient-to-br ${person.color} h-56 flex flex-col items-center justify-center gap-3 p-6`}>
            <div className="w-20 h-20 rounded-full bg-white/20 border-4 border-white/40 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
              {person.initials}
            </div>
            <div className="text-center">
              <div className="text-white font-bold text-base leading-tight">{person.name}</div>
              <div className="text-[#d4a017] text-xs mt-1 font-medium">{person.role}</div>
            </div>
            <div className="absolute bottom-3 right-3 bg-white/20 rounded-full w-7 h-7 flex items-center justify-center">
              <svg className={`w-4 h-4 text-white transition-transform duration-300 ${flipped ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Info panel – slides down */}
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out bg-[#0e1f3d]`}
            style={{ maxHeight: flipped ? "500px" : "0px" }}
          >
            <div className="p-5">
              <div className="w-8 h-0.5 bg-[#d4a017] mb-3" />
              <p className="text-white/80 text-sm leading-relaxed">{person.bio}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Desktop: flip card on hover ── */}
      <div
        className={`hidden md:block ${isPresident ? "md:col-span-1" : ""}`}
        style={{ perspective: "1000px" }}
      >
        <div
          className="relative w-full h-80 cursor-pointer group"
          style={{ transformStyle: "preserve-3d", transition: "transform 0.6s" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "rotateY(180deg)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "rotateY(0deg)"; }}
        >
          {/* Front */}
          <div
            className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${person.color} flex flex-col items-center justify-center gap-4 p-6 shadow-xl`}
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="w-24 h-24 rounded-full bg-white/20 border-4 border-white/40 flex items-center justify-center text-white font-bold text-3xl shadow-lg">
              {person.initials}
            </div>
            <div className="text-center">
              <div className="text-white font-bold text-lg leading-tight">{person.name}</div>
              <div className="text-[#d4a017] text-sm mt-1 font-medium">{person.role}</div>
            </div>
            <div className="absolute bottom-4 text-white/40 text-xs">Hover to learn more</div>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 rounded-2xl bg-[#0e1f3d] border border-[#d4a017]/30 p-5 flex flex-col justify-center shadow-xl overflow-hidden"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            <div className="w-8 h-0.5 bg-[#d4a017] mb-3" />
            <div className="text-[#d4a017] font-bold text-sm mb-1">{person.name}</div>
            <div className="text-white/50 text-xs mb-3">{person.role}</div>
            <p className="text-white/80 text-xs leading-relaxed overflow-y-auto max-h-52 pr-1 custom-scroll">
              {person.bio}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────
   PAGE SECTIONS
───────────────────────────────────────────── */

function AboutHero() {
  return (
    <section className="bg-[#0e1f3d] py-16 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          About the <span className="text-[#d4a017]">Economic Justice Forum</span> (EJF)
        </h1>
        <p className="text-white/60 text-sm md:text-base max-w-2xl mx-auto">
          Equity &bull; Justice &bull; Prosperity
        </p>
      </div>
    </section>
  );
}

function AboutDescription() {
  return (
    <section className="bg-white py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0e1f3d] mb-6">
          About the Economic Justice Forum (EJF)
        </h2>
        <p className="text-gray-700 leading-relaxed text-base">
          Economic Justice Forum (EJF) is a registered Community-Based Organization (CBO) and Non-Governmental Organization (NGO) in Kenya advancing Economic, Climate, Resource, and Digital Justice through a human rights–based approach. We work with and advance the interests of grassroots, rural, coastal, and marginalized communities, including women, youth, and persons with disabilities, particularly in resource-host areas such as Tsavo National Park and the Indian Ocean coastal belt. These communities are frontline custodians of vital ecosystems and resources, yet they face disproportionate impacts from climate change, environmental degradation, and inequitable resource governance, often with limited access to the social, economic, and environmental benefits generated from the resources they help sustain. EJF empowers communities through advocacy, awareness, civic engagement, capacity building, and research, ensuring they are informed, equipped, and able to claim their rights. Our work strengthens community leadership, promotes equitable resource governance, and fosters inclusive decision-making at local, national, and global levels. By partnering with EJF, donors and collaborators engage with a strategic, evidence-driven organization that amplifies community voices, translates policy into action, and supports initiatives that generate sustainable, equitable, and measurable impact. Through these efforts, EJF contributes to inclusive and resilient economic systems, where natural and communal resources become drivers of opportunity, justice, and long-term prosperity for current and future generations.
        </p>
      </div>
    </section>
  );
}

function VisionMission() {
  return (
    <section className="bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0e1f3d] mb-8">Vision &amp; Mission</h2>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-100">
          <div className="p-8">
            <div className="h-0.5 bg-gradient-to-r from-[#d4a017] to-transparent mb-5 w-32" />
            <h3 className="font-bold text-[#0e1f3d] text-lg mb-3">Our Vision</h3>
            <p className="text-gray-700 leading-relaxed">
              A just, equitable, sustainable, and digitally inclusive Kenya where every person — including those in rural, coastal, and marginalized communities — enjoys dignity, opportunity, and prosperity.
            </p>
          </div>
          <div className="p-8">
            <div className="h-0.5 bg-gradient-to-r from-[#d4a017] to-transparent mb-5 w-32" />
            <h3 className="font-bold text-[#0e1f3d] text-lg mb-3">Our Mission</h3>
            <p className="text-gray-700 leading-relaxed">
              To advance Economic and Social Justice by empowering communities, promoting systemic reforms, ensuring transparent and fair management of resources, and fostering sustainable development — locally, nationally, and globally.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function StrategicFocusAreas() {
  const areas = [
    {
      title: "Economic & Resource Justice",
      desc: "Championing transparent, accountable, and fair management of public resources for the benefit of all. We work to ensure natural resource revenues are equitably distributed between national and county governments, and that communities benefit directly from resources in their regions.",
    },
    {
      title: "Governance, Civic & Research Justice",
      desc: "Strengthening constitutionalism, integrity, public participation, and data-driven advocacy to empower citizens and institutions. We promote accountable governance through civic education, participatory budgeting, and evidence-based policy recommendations.",
    },
    {
      title: "Social, Climate, Digital & Economic Empowerment Justice",
      desc: "Driving inclusive growth through climate-smart entrepreneurship, equitable digital access, and ethical technology governance. We link environmental conservation with economic opportunities, particularly for youth and marginalized communities.",
    },
  ];

  return (
    <section className="bg-white py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0e1f3d] mb-8">Strategic Focus Areas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {areas.map((a) => (
            <div key={a.title} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-1 bg-gradient-to-r from-[#d4a017] to-[#f5c842]" />
              <div className="p-6">
                <h3 className="font-bold text-[#0e1f3d] text-base mb-3 leading-snug">{a.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{a.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CoreValues() {
  const values = [
    "Equity & Social Justice",
    "Transparency & Integrity",
    "Inclusion",
    "Sustainability",
    "Collaboration",
    "Digital Fairness",
  ];

  return (
    <section className="bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-2xl font-bold text-[#0e1f3d] mb-6">Core Values</h2>
          <div className="flex flex-wrap gap-3">
            {values.map((v) => (
              <span
                key={v}
                className="border border-gray-300 bg-gray-50 hover:bg-[#0e1f3d] hover:text-white hover:border-[#0e1f3d] text-[#0e1f3d] text-sm font-medium px-5 py-2.5 rounded-full transition-all duration-200 cursor-default"
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

function GeographicFocus() {
  const regions = [
    { emoji: "🌴", title: "Coastal Counties", counties: "Taita Taveta, Kilifi, Kwale, Lamu, Tana-River", focus: "Marine resources, blue economy, and coastal community rights." },
    { emoji: "🌵", title: "Arid & Semi-Arid", counties: "Turkana, Isiolo, Samburu", focus: "Climate resilience, sustainable resource use, and adaptation." },
    { emoji: "🏔️", title: "Resource-Rich Areas", counties: "Kajiado, Laikipia, Nyandarua", focus: "Fair benefit-sharing, environmental protection, and local empowerment." },
    { emoji: "🏙️", title: "Urban Centers", counties: "Nairobi, Mombasa", focus: "Digital inclusion, innovation, and equitable access to economic opportunities." },
  ];

  return (
    <section className="bg-white py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-2xl font-bold text-[#0e1f3d] mb-2">Geographic Focus</h2>
          <ul className="text-gray-600 text-sm leading-relaxed mb-6 space-y-1">
            <li><span className="font-medium text-[#0e1f3d]">Coastal Regions:</span> Marine resources, blue economy, and coastal community rights.</li>
            <li><span className="font-medium text-[#0e1f3d]">Arid &amp; Semi-Arid Regions:</span> Climate resilience, sustainable resource use, and adaptation.</li>
            <li><span className="font-medium text-[#0e1f3d]">Urban Centers:</span> Digital inclusion, innovation, and equitable access to economic opportunities.</li>
            <li><span className="font-medium text-[#0e1f3d]">Rural &amp; Resource-Rich Counties:</span> Fair benefit-sharing, environmental protection, and local empowerment.</li>
          </ul>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {regions.map((r) => (
              <div key={r.title} className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100 hover:border-[#d4a017]/40 hover:shadow-sm transition-all">
                <div className="text-3xl mb-3">{r.emoji}</div>
                <h3 className="font-bold text-[#0e1f3d] text-sm mb-1">{r.title}</h3>
                <p className="text-gray-500 text-xs">{r.counties}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Partnerships() {
  const partners = [
    "Development Partners",
    "Philanthropic Foundations",
    "Government Institutions",
    "Academic Institutions",
    "Civil Society Organizations",
    "Media Partners",
  ];

  return (
    <section className="bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-2xl font-bold text-[#0e1f3d] mb-2">Partnerships and Collaboration</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            EJF collaborates with development partners, philanthropic foundations, governments, academia, civil society, and media to reform systems that perpetuate inequality and co-create a just economy that serves people and the planet.
          </p>
          <div className="flex flex-wrap gap-3">
            {partners.map((p) => (
              <span
                key={p}
                className="bg-[#d4a017] hover:bg-[#b8891a] text-white text-sm font-semibold px-5 py-2.5 rounded-lg cursor-pointer transition-colors shadow-sm"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FoundingTeam() {
  return (
    <section className="bg-white py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0e1f3d] mb-2">Founding Team</h2>
          <p className="text-gray-500 text-sm">The visionary leaders who established and drive the Economic Justice Forum.</p>
        </div>

        {/* President – full-width featured card */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-6 h-0.5 bg-[#d4a017]" />
            <span className="text-[#d4a017] text-xs font-bold uppercase tracking-wider">President &amp; Founder</span>
          </div>

          {/* Mobile */}
          <div className="md:hidden">
            <TeamCard person={president} isPresident />
          </div>

          {/* Desktop featured */}
          <div className="hidden md:flex bg-gradient-to-r from-[#0e1f3d] to-[#1a3a6e] rounded-2xl overflow-hidden shadow-2xl">
            <div className="w-64 flex-shrink-0 bg-gradient-to-br from-[#0e1f3d] to-[#0a1628] flex flex-col items-center justify-center p-8 border-r border-white/10">
              <div className="w-28 h-28 rounded-full bg-white/20 border-4 border-[#d4a017]/60 flex items-center justify-center text-white font-bold text-4xl shadow-xl mb-4">
                CM
              </div>
              <div className="text-white font-bold text-center text-lg leading-tight mb-1">{president.name}</div>
              <div className="text-[#d4a017] text-xs font-semibold text-center">{president.role}</div>
            </div>
            <div className="flex-1 p-8 flex items-center">
              <div>
                <div className="w-10 h-0.5 bg-[#d4a017] mb-4" />
                <p className="text-white/80 text-sm leading-relaxed">{president.bio}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Co-Founders */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <span className="w-6 h-0.5 bg-[#d4a017]" />
            <span className="text-[#d4a017] text-xs font-bold uppercase tracking-wider">Co-Founders</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5">
            {coFounders.map((person) => (
              <TeamCard key={person.name} person={person} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function OrgStructure() {
  const units = [
    { emoji: "👥", title: "Governance Board", desc: "Strategic oversight and guidance" },
    { emoji: "🔬", title: "Thematic Working Groups", desc: "Specialized focus on key justice areas" },
    { emoji: "🗺️", title: "Regional Focal Points", desc: "Local implementation and advocacy" },
  ];

  return (
    <section className="bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-2xl font-bold text-[#0e1f3d] mb-2">Organizational Structure</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-8">
            EJF operates through a coordinated secretariat guided by a governance board, thematic working groups, and regional focal points that facilitate collaboration, advocacy, and research across Kenya's diverse regions.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {units.map((u) => (
              <div key={u.title} className="bg-gray-50 rounded-xl p-6 text-center border border-gray-100 hover:border-[#d4a017]/30 hover:shadow-md transition-all">
                <div className="text-4xl mb-3">{u.emoji}</div>
                <h3 className="font-bold text-[#0e1f3d] text-sm mb-2">{u.title}</h3>
                <p className="text-gray-500 text-sm">{u.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────── */
export default function About() {
  return (
    <>
      <AboutHero />
      <AboutDescription />
      <VisionMission />
      <StrategicFocusAreas />
      <CoreValues />
      <GeographicFocus />
      <Partnerships />
      <FoundingTeam />
      <OrgStructure />
    </>
  );
}
