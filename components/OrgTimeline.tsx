"use client";

import { useEffect, useRef } from "react";
import type { LangSlug } from "@/lib/i18n";

const HEADING: Record<LangSlug, { eyebrow: string; title: string }> = {
  tg: { eyebrow: "Geschichte / История", title: "Таърихи анҷуман" },
  de: { eyebrow: "Geschichte / История", title: "Geschichte des Vereins" },
  en: { eyebrow: "Geschichte / История", title: "Our History" },
  ru: { eyebrow: "Geschichte / История", title: "История ассоциации" },
};

const MILESTONES: Array<{
  date: string;
  content: Record<LangSlug, { title: string; desc: string }>;
}> = [
  {
    date: "Januar 2024",
    content: {
      tg: {
        title: "Таъсиси анҷуман",
        desc: "Анҷумани Фарҳангии Утришу Тоҷикистон таъсис ёфт",
      },
      de: {
        title: "Gründung des Vereins",
        desc: "Die Österreich-Tadschikische Kulturgemeinde wurde gegründet",
      },
      en: {
        title: "Association Founded",
        desc: "The Austrian-Tajik Cultural Association was established",
      },
      ru: {
        title: "Основание ассоциации",
        desc: "Австрийско-Таджикская культурная ассоциация была основана",
      },
    },
  },
  {
    date: "15. Mai 2024",
    content: {
      tg: {
        title: "Сабти ном",
        desc: "Анҷуман расман ҳамчун ташкилоти ғайритиҷоратӣ сабти ном шуд",
      },
      de: {
        title: "Vereinsregistrierung",
        desc: "Offizielle Registrierung als gemeinnütziger Verein in Österreich",
      },
      en: {
        title: "Official Registration",
        desc: "Officially registered as a non-profit organization in Austria",
      },
      ru: {
        title: "Официальная регистрация",
        desc: "Официально зарегистрирована как некоммерческая организация в Австрии",
      },
    },
  },
  {
    date: "Sommer 2024",
    content: {
      tg: {
        title: "Чорабиниҳои аввал",
        desc: "Аввалин чорабиниҳои фарҳангӣ ва ҷамъиятӣ баргузор гардид",
      },
      de: {
        title: "Erste Veranstaltungen",
        desc: "Erste kulturelle und gesellschaftliche Veranstaltungen fanden statt",
      },
      en: {
        title: "First Events",
        desc: "First cultural and social events were successfully organized",
      },
      ru: {
        title: "Первые мероприятия",
        desc: "Первые культурные и общественные мероприятия были успешно проведены",
      },
    },
  },
  {
    date: "2025",
    content: {
      tg: {
        title: "Рушди аъзоён",
        desc: "Шумораи аъзоён ва фаъолиятҳо афзоиш ёфт",
      },
      de: {
        title: "Wachstum & Expansion",
        desc: "Mitgliedschaft und Aktivitäten wuchsen kontinuierlich",
      },
      en: {
        title: "Growth & Expansion",
        desc: "Membership and activities continued to grow",
      },
      ru: {
        title: "Рост и расширение",
        desc: "Членство и деятельность организации продолжили расти",
      },
    },
  },
];

function TimelineItem({
  date,
  title,
  desc,
  index,
}: {
  date: string;
  title: string;
  desc: string;
  index: number;
}) {
  const itemRef = useRef<HTMLDivElement>(null);
  const isLeft = index % 2 === 0;

  useEffect(() => {
    const el = itemRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative grid grid-cols-[1fr_auto_1fr] items-start gap-x-6 md:gap-x-10">
      {/* Left column — date on even, empty on odd */}
      <div
        className={`pt-1 text-right ${
          isLeft
            ? "opacity-100"
            : "pointer-events-none select-none opacity-0 md:opacity-100"
        }`}
        aria-hidden={!isLeft}
      >
        {isLeft && (
          <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted">
            {date}
          </span>
        )}
      </div>

      {/* Center — dot */}
      <div className="flex flex-col items-center">
        <div className="mt-1.5 h-3 w-3 shrink-0 rounded-full bg-burgundy ring-4 ring-cream" />
      </div>

      {/* Right column — content on odd, date on even desktop */}
      <div>
        {/* On mobile: always show date above content */}
        <div className="mb-1 md:hidden">
          <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted">
            {date}
          </span>
        </div>

        {/* On desktop: right side shows content on odd items, date label on even */}
        <div className="hidden md:block">
          {!isLeft && (
            <div className="mb-1">
              <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted">
                {date}
              </span>
            </div>
          )}
        </div>

        <div
          ref={itemRef}
          style={{
            opacity: 0,
            transform: "translateY(20px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
          }}
          className={`rounded-lg border border-line bg-cream-dark px-6 py-5 ${
            !isLeft ? "" : "md:hidden"
          }`}
        >
          <h3 className="mb-2 font-display text-lg font-light text-ink">
            {title}
          </h3>
          <p className="text-[14px] leading-relaxed text-ink-soft">{desc}</p>
        </div>

        {/* Desktop left-side content card (even index, shown on right on mobile, left on desktop via col reversal) */}
      </div>
    </div>
  );
}

export default function OrgTimeline({ lang }: { lang: LangSlug }) {
  const heading = HEADING[lang];

  return (
    <section className="mt-20 pt-16 border-t border-line">
      {/* Section heading */}
      <div className="mb-14">
        <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.25em] text-burgundy">
          {heading.eyebrow}
        </p>
        <h2 className="font-display text-3xl font-light text-ink">
          {heading.title}
        </h2>
      </div>

      {/* Timeline wrapper */}
      <div className="relative">
        {/* Vertical center line */}
        <div
          className="absolute inset-y-0 left-[calc(50%-1px)] hidden w-0.5 bg-line md:block"
          aria-hidden="true"
        />
        {/* Mobile: left-edge line */}
        <div
          className="absolute inset-y-0 left-[calc(theme(spacing.3)+2px)] w-0.5 bg-line md:hidden"
          aria-hidden="true"
        />

        <div className="space-y-10">
          {MILESTONES.map((m, i) => (
            <DesktopTimelineItem
              key={i}
              date={m.date}
              title={m.content[lang].title}
              desc={m.content[lang].desc}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* -----------------------------------------------------------------------
   Separate component that handles the proper alternating layout cleanly
----------------------------------------------------------------------- */
function DesktopTimelineItem({
  date,
  title,
  desc,
  index,
}: {
  date: string;
  title: string;
  desc: string;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isLeft = index % 2 === 0;

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ── Mobile layout: left edge line + all content right ── */}
      <div className="flex items-start gap-5 md:hidden">
        {/* Dot pinned to left line */}
        <div className="mt-1.5 shrink-0 pl-0.5">
          <div className="h-3 w-3 rounded-full bg-burgundy ring-4 ring-cream" />
        </div>
        {/* Content */}
        <div
          ref={cardRef}
          style={{
            opacity: 0,
            transform: "translateY(20px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
          }}
          className="flex-1 rounded-lg border border-line bg-cream-dark px-5 py-4"
        >
          <p className="mb-1.5 text-[10px] font-medium uppercase tracking-[0.22em] text-muted">
            {date}
          </p>
          <h3 className="mb-1.5 font-display text-base font-light text-ink">
            {title}
          </h3>
          <p className="text-[13px] leading-relaxed text-ink-soft">{desc}</p>
        </div>
      </div>

      {/* ── Desktop layout: alternating left/right ── */}
      <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] md:items-start md:gap-x-10">
        {/* Left slot */}
        <div className={`pt-2 ${isLeft ? "text-right" : ""}`}>
          {isLeft ? (
            <div
              ref={cardRef}
              style={{
                opacity: 0,
                transform: "translateY(20px)",
                transition: "opacity 0.5s ease, transform 0.5s ease",
              }}
              className="inline-block w-full rounded-lg border border-line bg-cream-dark px-6 py-5 text-left"
            >
              <p className="mb-1.5 text-[10px] font-medium uppercase tracking-[0.22em] text-muted">
                {date}
              </p>
              <h3 className="mb-2 font-display text-lg font-light text-ink">
                {title}
              </h3>
              <p className="text-[14px] leading-relaxed text-ink-soft">{desc}</p>
            </div>
          ) : (
            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted">
              {date}
            </span>
          )}
        </div>

        {/* Center dot */}
        <div className="flex flex-col items-center">
          <div className="mt-2 h-3.5 w-3.5 shrink-0 rounded-full bg-burgundy ring-4 ring-cream" />
        </div>

        {/* Right slot */}
        <div className="pt-2">
          {!isLeft ? (
            <div
              ref={cardRef}
              style={{
                opacity: 0,
                transform: "translateY(20px)",
                transition: "opacity 0.5s ease, transform 0.5s ease",
              }}
              className="rounded-lg border border-line bg-cream-dark px-6 py-5"
            >
              <p className="mb-1.5 text-[10px] font-medium uppercase tracking-[0.22em] text-muted">
                {date}
              </p>
              <h3 className="mb-2 font-display text-lg font-light text-ink">
                {title}
              </h3>
              <p className="text-[14px] leading-relaxed text-ink-soft">{desc}</p>
            </div>
          ) : (
            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted">
              {date}
            </span>
          )}
        </div>
      </div>
    </>
  );
}
