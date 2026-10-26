import { useEffect } from "react";
import { Link } from "wouter";

const articleTitle = "Youth–State Social Contract Assessment in Taita Taveta | EJF";
const articleDescription =
  "EJF and HURIA convened young people in Mwatate for a two-day assessment of governance, accountability, civic participation and the youth–State relationship.";
const articleUrl =
  "https://economicjusticeforum.org/insights/youth-state-social-contract-assessment";
const articleImage =
  "https://economicjusticeforum.org/images/mwatate-youth-session.webp";

const photos = [
  {
    src: "/images/mwatate-youth-discussion.webp",
    alt: "Young participants seated together during the Mwatate assessment.",
    caption: "Participants follow the discussion during the assessment.",
  },
  {
    src: "/images/mwatate-session-speaker.webp",
    alt: "A speaker addresses participants during the engagement.",
    caption: "A speaker shares reflections with the group.",
  },
  {
    src: "/images/mwatate-huria-youth-group.webp",
    alt: "Young people gathered for the engagement at ACK St. James Social Hall.",
    caption: "Young people gather for the engagement in Mwatate.",
  },
];

function useArticleMetadata() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = articleTitle;

    const tags = [
      { attribute: "name", key: "description", content: articleDescription },
      { attribute: "property", key: "og:type", content: "article" },
      { attribute: "property", key: "og:title", content: "Economic Justice is a Human Rights Agenda" },
      { attribute: "property", key: "og:description", content: articleDescription },
      { attribute: "property", key: "og:image", content: articleImage },
      { attribute: "property", key: "og:url", content: articleUrl },
      { attribute: "name", key: "twitter:card", content: "summary_large_image" },
      { attribute: "name", key: "twitter:title", content: "Economic Justice is a Human Rights Agenda" },
      { attribute: "name", key: "twitter:description", content: articleDescription },
      { attribute: "name", key: "twitter:image", content: articleImage },
    ];

    const previousTags = tags.map(({ attribute, key, content }) => {
      let element = document.head.querySelector<HTMLMetaElement>(
        `meta[${attribute}="${key}"]`,
      );
      const existed = Boolean(element);

      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, key);
        document.head.append(element);
      }

      const previousContent = element.getAttribute("content");
      element.setAttribute("content", content);
      return { element, existed, previousContent };
    });

    let canonical = document.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );
    const canonicalExisted = Boolean(canonical);
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.append(canonical);
    }
    const previousCanonical = canonical.href;
    canonical.href = articleUrl;

    return () => {
      document.title = previousTitle;
      previousTags.forEach(({ element, existed, previousContent }) => {
        if (existed && previousContent !== null) {
          element.setAttribute("content", previousContent);
        } else {
          element.remove();
        }
      });

      if (canonicalExisted && previousCanonical) {
        canonical.href = previousCanonical;
      } else {
        canonical.remove();
      }
    };
  }, []);
}

export default function YouthStateSocialContract() {
  useArticleMetadata();

  return (
    <>
      <header className="relative overflow-hidden bg-[#08152F] px-4 py-16 sm:py-20">
        <div
          className="absolute inset-0 opacity-[0.08]"
          aria-hidden="true"
          style={{
            backgroundImage:
              "radial-gradient(circle, #C9A24A 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="relative mx-auto max-w-5xl">
          <Link
            href="/insights"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition-colors hover:text-white"
          >
            <span aria-hidden="true">←</span> All insights
          </Link>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#C9A24A]">
            News &amp; Announcements · Youth Participation
          </p>
          <h1 className="max-w-4xl text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">
            Economic Justice is a Human Rights Agenda
          </h1>
          <p className="mt-4 text-xl font-bold tracking-wide text-[#C9A24A] sm:text-2xl">
            Restore. Restore. Restore.
          </p>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-white/75 sm:text-lg">
            EJF and HURIA spent two days with young people from across Taita
            Taveta County, gathering perspectives on the relationship between
            youth and the State.
          </p>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-white/15 pt-5 text-sm text-white/60">
            <span>Two-day youth engagement</span>
            <span>ACK St. James Social Hall, Mwatate</span>
            <span>Economic Justice Forum &amp; HURIA</span>
          </div>
        </div>
      </header>

      <article className="bg-white text-[#08152F]">
        <figure className="mx-auto max-w-6xl px-4 pt-10 sm:pt-14">
          <img
            src="/images/mwatate-youth-session.webp"
            alt="Young people gathered for the Youth–State Social Contract Assessment in Mwatate."
            width={1800}
            height={1200}
            fetchPriority="high"
            className="max-h-[620px] w-full rounded-2xl object-cover shadow-xl"
          />
          <figcaption className="mt-3 text-sm text-[#08152F]/55">
            Young people take part in the assessment at ACK St. James Social
            Hall in Mwatate.
          </figcaption>
        </figure>

        <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
          <div className="space-y-6 text-base leading-8 text-[#243247] sm:text-lg">
            <p>
              The Economic Justice Forum (EJF) and its valued partner, Human
              Rights Agenda (HURIA), brought together young people from across
              Taita Taveta County for the Youth–State Social Contract
              Assessment ahead of Kenya’s 2027 General Elections.
            </p>
            <p>
              On the first day, young people completed a structured online
              questionnaire, followed by a focused group discussion. They
              shared perspectives on governance, public institutions,
              accountability, civic participation and the relationship between
              young people and the State. A second group joined the engagement
              on the following day, contributing further perspectives to the
              assessment.
            </p>
          </div>

          <blockquote className="my-10 border-l-4 border-[#C9A24A] bg-[#F7F8FA] px-6 py-6 text-xl font-bold leading-relaxed text-[#08152F] sm:px-8 sm:text-2xl">
            What will it take for young people to experience public
            institutions as responsive, accountable and worthy of their trust?
          </blockquote>

          <div className="space-y-6 text-base leading-8 text-[#243247] sm:text-lg">
            <p>
              The assessment seeks to document young people’s perceptions and
              expectations so that youth engagement and governance initiatives
              can be informed by evidence—not assumptions.
            </p>
            <h2 className="pt-3 text-2xl font-extrabold leading-tight text-[#08152F] sm:text-3xl">
              Connecting human rights and economic justice
            </h2>
            <p>
              The work aligns with HURIA’s commitment to human rights,
              people-centred justice, the rule of law and meaningful youth
              participation. It also reflects EJF’s conviction that economic
              rights are human rights: dignity, opportunity and the ability to
              participate in decisions that shape people’s economic and social
              lives are inseparable from justice.
            </p>
            <p>
              EJF deeply appreciates Kiongozi Yusuf Lule Mwatsefu, Founder and
              Executive Director of HURIA, for his leadership, and Wakili
              Anthony Maghanga and the dedicated HURIA team for their
              commitment to this partnership.
            </p>
            <p>
              For EJF, sustainable partnership means connecting human rights
              with the economic realities young people face—and supporting
              their ability to participate meaningfully in civic life, public
              decision-making and the shaping of their future.
            </p>
            <p className="border-t border-[#08152F]/10 pt-6 font-bold text-[#08152F]">
              Young people’s voices must be heard. Their rights must be
              respected. Their participation must count.
            </p>
          </div>
        </div>

        <section
          aria-labelledby="mwatate-gallery-heading"
          className="bg-[#F7F8FA] px-4 py-12 sm:py-16"
        >
          <div className="mx-auto max-w-6xl">
            <div className="mb-8">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#C9A24A]">
                In pictures
              </p>
              <h2
                id="mwatate-gallery-heading"
                className="text-2xl font-extrabold text-[#08152F] sm:text-3xl"
              >
                Two days of youth dialogue in Mwatate
              </h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {photos.map((photo) => (
                <figure
                  key={photo.src}
                  className="overflow-hidden rounded-2xl bg-white shadow-sm"
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    width={1800}
                    height={1200}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover"
                  />
                  <figcaption className="px-4 py-3 text-sm leading-relaxed text-[#08152F]/70">
                    {photo.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <footer className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
          <p className="text-sm leading-7 text-[#08152F]/55">
            #EconomicJusticeIsHumanRights #RESTORECoast
            #YouthStateSocialContract #YouthParticipation #HumanRights
            #Accountability #CivicEngagement #TaitaTaveta #HURIA #EJF
            #Kenya2027
          </p>
          <Link
            href="/insights"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#08152F] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#15356b]"
          >
            <span aria-hidden="true">←</span> Back to insights
          </Link>
        </footer>
      </article>
    </>
  );
}
