"use client";

import { useState } from "react";
import type { LangSlug } from "@/lib/i18n";

const HEADINGS: Record<LangSlug, { eyebrow: string; title: string }> = {
  tg: { eyebrow: "Фотоархив", title: "Чорабиниҳои мо" },
  de: { eyebrow: "Fotoarchiv", title: "Unsere Veranstaltungen" },
  en: { eyebrow: "Photo Archive", title: "Our Events" },
  ru: { eyebrow: "Фотоархив", title: "Наши мероприятия" },
};

type CardData = {
  year: string;
  title: string;
  gradient: string;
  accentColor: string;
};

const CARDS: CardData[] = [
  {
    year: "2024",
    title: "Eröffnungsfeier / Opening Ceremony",
    gradient:
      "linear-gradient(160deg, #8b2635 0%, #3a342c 40%, #15110d 100%)",
    accentColor: "#b8924a",
  },
  {
    year: "2024",
    title: "Nowruz Festival · Наврӯз",
    gradient:
      "linear-gradient(160deg, #b8924a 0%, #8b2635 50%, #3a342c 100%)",
    accentColor: "#faf6ee",
  },
  {
    year: "2024",
    title: "Kulturabend Wien · Вена",
    gradient:
      "linear-gradient(160deg, #15110d 0%, #3a342c 45%, #8b2635 100%)",
    accentColor: "#b8924a",
  },
  {
    year: "2025",
    title: "Tadschikische Küche · Таоми тоҷикӣ",
    gradient:
      "linear-gradient(160deg, #c9a96e 0%, #b8924a 35%, #7a5c28 100%)",
    accentColor: "#8b2635",
  },
  {
    year: "2025",
    title: "Jugendprojekt · Лоиҳаи ҷавонон",
    gradient:
      "linear-gradient(160deg, #5c1520 0%, #8b2635 40%, #b8924a 100%)",
    accentColor: "#faf6ee",
  },
  {
    year: "2025",
    title: "Jahresfest · Ҷашни солона",
    gradient:
      "linear-gradient(160deg, #15110d 0%, #2a2018 40%, #b8924a 100%)",
    accentColor: "#8b2635",
  },
];

export default function EventGallery({ lang }: { lang: LangSlug }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const h = HEADINGS[lang];

  function handleCardClick(index: number) {
    // On mobile (click-based interaction)
    setClickedIndex((prev) => (prev === index ? null : index));
  }

  function getFlexValue(index: number): number {
    if (hoveredIndex === null) return 1;
    if (index === hoveredIndex) return 4;
    return 0.5;
  }

  return (
    <section className="w-full py-20">
      {/* Section heading */}
      <div className="mx-auto mb-12 max-w-4xl px-6 text-center">
        <p className="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-gold">
          {h.eyebrow}
        </p>
        <h2 className="font-display text-4xl font-light tracking-tight text-ink md:text-5xl">
          {h.title}
        </h2>
        <div className="mx-auto mt-4 h-px w-16 bg-gold opacity-40" />
      </div>

      {/* Desktop gallery — horizontal accordion */}
      <div
        className="hidden md:flex"
        style={{
          minHeight: "500px",
          gap: "3px",
        }}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {CARDS.map((card, index) => {
          const isExpanded = hoveredIndex === index;
          const flexVal = getFlexValue(index);

          return (
            <div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              style={{
                flex: flexVal,
                background: card.gradient,
                transition:
                  "flex 0.5s ease, opacity 0.3s ease",
                minWidth: 0,
                position: "relative",
                overflow: "hidden",
                cursor: "pointer",
              }}
            >
              {/* Decorative pattern overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage:
                    "radial-gradient(circle at 30% 70%, rgba(255,255,255,0.04) 0%, transparent 60%)",
                  pointerEvents: "none",
                }}
              />

              {/* Subtle grain texture */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E\")",
                  backgroundSize: "200px 200px",
                  opacity: 0.5,
                  pointerEvents: "none",
                  mixBlendMode: "overlay",
                }}
              />

              {/* Vertical title when collapsed */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  opacity: isExpanded ? 0 : 1,
                  transition: "opacity 0.3s ease",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "8px",
                  pointerEvents: "none",
                  whiteSpace: "nowrap",
                }}
              >
                <span
                  style={{
                    writingMode: "vertical-rl",
                    textOrientation: "mixed",
                    transform: "rotate(180deg)",
                    fontFamily: "var(--font-fraunces, serif)",
                    fontSize: "11px",
                    fontWeight: 300,
                    letterSpacing: "0.08em",
                    color: "rgba(250,246,238,0.7)",
                    lineHeight: 1.3,
                  }}
                >
                  {card.title}
                </span>
                <span
                  style={{
                    writingMode: "vertical-rl",
                    transform: "rotate(180deg)",
                    fontFamily: "var(--font-inter, sans-serif)",
                    fontSize: "10px",
                    fontWeight: 600,
                    letterSpacing: "0.15em",
                    color: card.accentColor,
                    opacity: 0.8,
                  }}
                >
                  {card.year}
                </span>
              </div>

              {/* Bottom overlay when expanded */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "32px 28px 28px",
                  background:
                    "linear-gradient(to top, rgba(21,17,13,0.92) 0%, rgba(21,17,13,0.5) 60%, transparent 100%)",
                  opacity: isExpanded ? 1 : 0,
                  transition: "opacity 0.4s ease 0.1s",
                  pointerEvents: "none",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-inter, sans-serif)",
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    color: card.accentColor,
                    marginBottom: "6px",
                    textTransform: "uppercase",
                  }}
                >
                  {card.year}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-fraunces, serif)",
                    fontSize: "17px",
                    fontWeight: 300,
                    lineHeight: 1.4,
                    color: "rgba(250,246,238,0.95)",
                    letterSpacing: "0.01em",
                  }}
                >
                  {card.title}
                </p>
              </div>

              {/* Top-right corner year badge when expanded */}
              <div
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                  opacity: isExpanded ? 1 : 0,
                  transition: "opacity 0.4s ease 0.15s",
                  pointerEvents: "none",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-fraunces, serif)",
                    fontSize: "52px",
                    fontWeight: 900,
                    color: "rgba(255,255,255,0.06)",
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                  }}
                >
                  {card.year}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile gallery — vertical stack with click to expand */}
      <div className="flex flex-col gap-2 px-4 md:hidden">
        {CARDS.map((card, index) => {
          const isExpanded = clickedIndex === index;

          return (
            <div
              key={index}
              onClick={() => handleCardClick(index)}
              style={{
                background: card.gradient,
                borderRadius: "4px",
                overflow: "hidden",
                cursor: "pointer",
                position: "relative",
                height: isExpanded ? "220px" : "64px",
                transition: "height 0.5s ease",
              }}
            >
              {/* Decorative overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage:
                    "radial-gradient(circle at 20% 80%, rgba(255,255,255,0.04) 0%, transparent 60%)",
                  pointerEvents: "none",
                }}
              />

              {/* Collapsed state: horizontal title */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "64px",
                  display: "flex",
                  alignItems: "center",
                  padding: "0 20px",
                  gap: "12px",
                  opacity: isExpanded ? 0 : 1,
                  transition: "opacity 0.2s ease",
                  pointerEvents: "none",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-inter, sans-serif)",
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    color: card.accentColor,
                    minWidth: "32px",
                  }}
                >
                  {card.year}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-fraunces, serif)",
                    fontSize: "14px",
                    fontWeight: 300,
                    color: "rgba(250,246,238,0.9)",
                    letterSpacing: "0.01em",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {card.title}
                </span>
                <span
                  style={{
                    marginLeft: "auto",
                    color: "rgba(250,246,238,0.5)",
                    fontSize: "16px",
                  }}
                >
                  +
                </span>
              </div>

              {/* Expanded state: bottom overlay */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "28px 20px 20px",
                  background:
                    "linear-gradient(to top, rgba(21,17,13,0.9) 0%, transparent 100%)",
                  opacity: isExpanded ? 1 : 0,
                  transition: "opacity 0.3s ease 0.15s",
                  pointerEvents: "none",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-inter, sans-serif)",
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    color: card.accentColor,
                    marginBottom: "6px",
                    textTransform: "uppercase",
                  }}
                >
                  {card.year}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-fraunces, serif)",
                    fontSize: "18px",
                    fontWeight: 300,
                    lineHeight: 1.4,
                    color: "rgba(250,246,238,0.95)",
                  }}
                >
                  {card.title}
                </p>
              </div>

              {/* Close indicator when expanded */}
              <div
                style={{
                  position: "absolute",
                  top: "14px",
                  right: "20px",
                  opacity: isExpanded ? 1 : 0,
                  transition: "opacity 0.2s ease",
                  color: "rgba(250,246,238,0.5)",
                  fontSize: "18px",
                  lineHeight: 1,
                  pointerEvents: "none",
                }}
              >
                ×
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom caption */}
      <div className="mx-auto mt-8 max-w-4xl px-6 text-center">
        <p className="font-sans text-xs text-muted">
          {lang === "tg" && "Аксҳои воқеӣ ба зудӣ илова карда мешаванд"}
          {lang === "de" && "Echte Fotos werden in Kürze hinzugefügt"}
          {lang === "en" && "Real photos will be added soon"}
          {lang === "ru" && "Реальные фотографии будут добавлены в ближайшее время"}
        </p>
      </div>
    </section>
  );
}
