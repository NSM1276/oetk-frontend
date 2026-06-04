"use client";

import { useEffect, useRef, useState } from "react";
import type { LangSlug } from "@/lib/i18n";

// ─── Content ────────────────────────────────────────────────────────────────

const MISSION_TEXT: Record<LangSlug, string> = {
  tg: "Нигоҳдорӣ ва мустаҳкам кардани муносибатҳои байни Австрия ва Тоҷикистон тавассути фаъолиятҳои фарҳангӣ, варзишӣ, башардӯстона ва ҷамъиятӣ",
  de: "Pflege und Stärkung der Beziehungen zwischen Österreich und Tadschikistan durch kulturelle, sportliche, humanitäre und gesellschaftliche Aktivitäten",
  en: "Maintaining and strengthening relations between Austria and Tajikistan through cultural, sporting, humanitarian and social activities",
  ru: "Поддержание и укрепление отношений между Австрией и Таджикистаном посредством культурной, спортивной, гуманитарной и общественной деятельности",
};

const HIGHLIGHTED: Record<LangSlug, string[]> = {
  tg: ["фарҳангӣ", "варзишӣ", "Австрия", "Тоҷикистон"],
  de: ["kulturelle", "Österreich", "Tadschikistan", "Stärkung"],
  en: ["cultural", "Austria", "Tajikistan", "strengthening"],
  ru: ["культурной", "Австрией", "Таджикистаном", "укрепление"],
};

const EYEBROW: Record<LangSlug, string> = {
  tg: "— Миссия / Mission / Мисия",
  de: "— Mission / Missiya / Мисия",
  en: "— Mission / Missiya / Мисия",
  ru: "— Миссия / Mission / Мисия",
};

// ─── Component ──────────────────────────────────────────────────────────────

interface MissionRevealProps {
  lang: LangSlug;
}

export default function MissionReveal({ lang }: MissionRevealProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const text = MISSION_TEXT[lang];
  const highlighted = new Set(HIGHLIGHTED[lang]);
  const words = text.split(" ");

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 px-6"
      aria-label="Mission statement"
    >
      <div className="max-w-4xl mx-auto">
        {/* Eyebrow */}
        <p
          className="text-sm tracking-widest uppercase text-muted font-sans mb-8 select-none"
          aria-hidden="true"
        >
          {EYEBROW[lang]}
        </p>

        {/* Word-by-word reveal */}
        <p
          className="text-3xl md:text-4xl lg:text-5xl font-display font-light leading-snug text-ink"
          lang={lang === "tg" ? "tg" : lang === "ru" ? "ru" : lang}
        >
          {words.map((word, i) => {
            // Strip punctuation for Set lookup, keep original for render
            const bare = word.replace(/[,،.]/g, "");
            const isHighlighted = highlighted.has(bare);

            return (
              <span
                key={i}
                className="inline-block mr-[0.3em]"
                style={{
                  opacity: revealed ? 1 : 0,
                  transform: revealed ? "translateY(0)" : "translateY(8px)",
                  transition: "opacity 0.6s ease, transform 0.6s ease",
                  transitionDelay: `${i * 50}ms`,
                  willChange: "opacity, transform",
                }}
              >
                <span className={isHighlighted ? "text-burgundy" : undefined}>
                  {word}
                </span>
              </span>
            );
          })}
        </p>

        {/* Gold accent line */}
        <div
          className="mt-12"
          aria-hidden="true"
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? "scaleX(1)" : "scaleX(0)",
            transformOrigin: "left center",
            transition: "opacity 0.8s ease, transform 0.8s ease",
            transitionDelay: `${words.length * 50 + 100}ms`,
          }}
        >
          <div
            className="h-px bg-gold"
            style={{ width: "4rem" }}
          />
          <div
            className="mt-3 border-b border-line"
          />
        </div>
      </div>
    </section>
  );
}
