import { Link } from "wouter";

import imgChristopher from "@assets/chris_1775864978911.jpeg";
import imgAmriya from "@assets/WhatsApp_Image_2026-07-07_at_06.52.37_1783479525445.jpeg";
import imgIsaac from "@assets/issac_1775864978922.jpeg";
import imgHassan from "@assets/hassan_1775864978921.jpeg";
import imgMoses from "@assets/moses_1775864978933.jpeg";
import imgNaphtal from "@assets/IMG-20260913-WA0017_1789330871277.jpg";
import imgArnold from "@assets/IMG-20260913-WA0018_1789330871305.jpg";
import imgAmina from "@assets/IMG-20260913-WA0019_1789330871306.jpg";

type BoardMember = {
  name: string;
  role: string;
  qualifications: string[];
  bio: string;
  image: string;
  imagePosition?: string;
  accent: string;
};

const BOARD_MEMBERS: BoardMember[] = [
  {
    name: "Hon. Christopher Mwambingu",
    role: "Chairman / President",
    qualifications: ["Public Administration & Governance — Mount Kenya University"],
    bio: "Provides institutional leadership and strategic direction, with experience in public administration, county governance, democratic institutions, public policy and community engagement.",
    image: imgChristopher,
    imagePosition: "object-top",
    accent: "#C9A24A",
  },
  {
    name: "Amriya Juma Boy",
    role: "Director",
    qualifications: ["LL.B — University of Nairobi", "Advocate of the High Court of Kenya"],
    bio: "Provides legal and governance expertise relevant to institutional accountability, rights, public policy and regulatory matters.",
    image: imgAmriya,
    imagePosition: "object-[50%_35%]",
    accent: "#4D8DB8",
  },
  {
    name: "Rev. Isaac Kandoro",
    role: "Director",
    qualifications: ["Anglican Church of Kenya", "Master of Divinity — St. Paul’s University"],
    bio: "Brings experience in community leadership, ethical leadership, social responsibility and community-based engagement.",
    image: imgIsaac,
    imagePosition: "object-top",
    accent: "#7D9B62",
  },
  {
    name: "Hassan Maghanga",
    role: "Director",
    qualifications: ["Representing the Boda Boda Riders Association of Kenya"],
    bio: "Provides direct representation of organised informal-sector and grassroots economic interests.",
    image: imgHassan,
    imagePosition: "object-top",
    accent: "#B8795A",
  },
  {
    name: "Moses Macharia",
    role: "Director",
    qualifications: ["Political Science — University of Nairobi"],
    bio: "Provides expertise relevant to governance, political systems, public institutions and public policy.",
    image: imgMoses,
    imagePosition: "object-top",
    accent: "#8C78B5",
  },
  {
    name: "Naphtal Mwamela",
    role: "Programmes Coordinator",
    qualifications: ["Political Science — University of Nairobi"],
    bio: "Coordinates programme implementation, partnerships and programme-level activities.",
    image: imgNaphtal,
    imagePosition: "object-[50%_25%]",
    accent: "#C9795A",
  },
  {
    name: "Arnold Egwa",
    role: "Co-Founder & Digital Rights Director",
    qualifications: ["Digital Rights & Technology Leadership"],
    bio: "Advances digital justice and economic equity through work on data privacy, digital monopolies and technology that empowers communities rather than deepening disparities.",
    image: imgArnold,
    imagePosition: "object-[50%_28%]",
    accent: "#5A91A5",
  },
  {
    name: "Amina Lulu",
    role: "Programmes Administrator",
    qualifications: ["Kenya Coastal National Polytechnic"],
    bio: "Supports programme administration, coordination and operational delivery.",
    image: imgAmina,
    imagePosition: "object-[50%_20%]",
    accent: "#B47C9A",
  },
];

function BoardMemberCard({ member }: { member: BoardMember }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-[#0e1f3d]/10 bg-white shadow-[0_14px_45px_rgba(8,21,47,0.09)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_55px_rgba(8,21,47,0.15)]">
      <div className="relative h-72 overflow-hidden bg-[#E8ECF2] sm:h-80">
        <img
          src={member.image}
          alt={`${member.name}, ${member.role}`}
          className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 ${member.imagePosition ?? ""}`}
          loading="lazy"
        />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#08152F]/55 to-transparent" />
        <div
          className="absolute left-5 top-5 h-1.5 w-14 rounded-full"
          style={{ backgroundColor: member.accent }}
        />
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#C9A24A]">
          {member.role}
        </p>
        <h2 className="text-xl font-extrabold leading-tight text-[#08152F]">
          {member.name}
        </h2>

        <div className="my-5 h-px bg-[#C9A24A]/25" />

        <div className="space-y-1.5">
          {member.qualifications.map((qualification) => (
            <p key={qualification} className="text-sm font-semibold leading-relaxed text-[#08152F]/75">
              {qualification}
            </p>
          ))}
        </div>

        <p className="mt-5 text-sm leading-7 text-[#08152F]/65">{member.bio}</p>
      </div>
    </article>
  );
}

export default function Board() {
  return (
    <div className="bg-[#F7F8FA]">
      <section className="relative overflow-hidden bg-[#08152F] px-4 py-24 sm:py-32">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 15% 20%, #C9A24A 0, transparent 24rem), radial-gradient(circle at 88% 80%, #4D8DB8 0, transparent 26rem)" }} />
        <div className="relative mx-auto max-w-5xl text-center">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-[#C9A24A]">
            Governance
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
            Board of Directors
          </h1>
          <div className="mx-auto my-7 flex items-center justify-center gap-3">
            <span className="h-px w-16 bg-[#C9A24A]/60" />
            <span className="h-2 w-2 rounded-full bg-[#C9A24A]" />
            <span className="h-px w-16 bg-[#C9A24A]/60" />
          </div>
          <p className="mx-auto max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
            Strategic oversight, governance and institutional accountability for an Economic Justice Forum built around equity, justice and prosperity.
          </p>
        </div>
      </section>

      <section className="px-4 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#C9A24A]">
              Our governance
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight text-[#08152F] sm:text-4xl">
              Leadership grounded in public value
            </h2>
            <p className="mt-5 text-base leading-8 text-[#08152F]/65">
              The Board provides strategic oversight, governance and institutional accountability, bringing together experience in public administration, law, faith leadership, grassroots organising and political systems.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {BOARD_MEMBERS.map((member) => (
              <BoardMemberCard key={member.name} member={member} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#08152F] px-4 py-16 sm:py-20">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-7 text-center sm:flex-row sm:text-left">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#C9A24A]">
              Economic Justice Forum
            </p>
            <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
              Learn how our philosophy guides our work.
            </h2>
          </div>
          <Link
            href="/philosophy"
            className="inline-flex shrink-0 items-center justify-center rounded-xl bg-[#C9A24A] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#C9A24A]/20 transition-all hover:-translate-y-0.5 hover:bg-[#b08a35]"
          >
            Explore our philosophy →
          </Link>
        </div>
      </section>
    </div>
  );
}