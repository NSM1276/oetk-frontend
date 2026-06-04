"use client";

import { useEffect, useRef } from "react";
import type { LangSlug } from "@/lib/i18n";

const HEADINGS: Record<LangSlug, { eyebrow: string; title: string }> = {
  tg: { eyebrow: "Лоиҳаҳо", title: "Архиви медиа" },
  de: { eyebrow: "Projekte", title: "Medienarchiv" },
  en: { eyebrow: "Projects", title: "Media Archive" },
  ru: { eyebrow: "Проекты", title: "Медиаархив" },
};

type CardData = {
  title: string;
  year: string;
  category: string;
  gradient: string;
  accentLight: string;
};

const CARDS: CardData[] = [
  {
    gradient: "linear-gradient(145deg, #8b2635 0%, #6b1c28 50%, #15110d 100%)",
    title: "Наврӯз 2024",
    category: "Festival",
    year: "2024",
    accentLight: "#d9a0a8",
  },
  {
    gradient: "linear-gradient(145deg, #b8924a 0%, #8b2635 55%, #15110d 100%)",
    title: "Культурный вечер",
    category: "Kultur",
    year: "2024",
    accentLight: "#e8c97a",
  },
  {
    gradient: "linear-gradient(145deg, #15110d 0%, #3a342c 50%, #8b2635 100%)",
    title: "Eröffnungsfeier",
    category: "Event",
    year: "2024",
    accentLight: "#c49060",
  },
  {
    gradient: "linear-gradient(145deg, #b8924a 0%, #d9b97a 50%, #b8924a 100%)",
    title: "Тоҷикони Вена",
    category: "Community",
    year: "2025",
    accentLight: "#15110d",
  },
  {
    gradient: "linear-gradient(145deg, #6b1c28 0%, #8b2635 50%, #b8924a 100%)",
    title: "Jugendprojekt",
    category: "Jugend",
    year: "2025",
    accentLight: "#f0d8a0",
  },
  {
    gradient: "linear-gradient(145deg, #15110d 0%, #8b2635 50%, #b8924a 100%)",
    title: "Jahresfest 2025",
    category: "Annual",
    year: "2025",
    accentLight: "#e8c97a",
  },
];

/* ─── Noise SVG data URI (subtle grain overlay) ─── */
const NOISE_URI =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.07'/%3E%3C/svg%3E\")";

export default function PortfolioGallery3D({ lang }: { lang: LangSlug }) {
  const h = HEADINGS[lang];

  /* refs for IntersectionObserver on desktop cards */
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!cards.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("card-3d--visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    cards.forEach((card) => io.observe(card));
    return () => io.disconnect();
  }, []);

  return (
    <>
      {/* ── Keyframe styles injected once ── */}
      <style>{`
        /* 3D card: default tilted state */
        .card-3d {
          opacity: 0;
          transform: rotateX(15deg) rotateY(-10deg) translateZ(-40px);
          transition:
            transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94),
            opacity 0.8s ease,
            border-color 0.25s ease,
            box-shadow 0.25s ease;
          will-change: transform, opacity;
        }
        /* Unfolded state when card enters viewport */
        .card-3d--visible {
          opacity: 1;
          transform: rotateX(0deg) rotateY(0deg) translateZ(0px);
        }
        /* Hover lift — only when already visible */
        .card-3d--visible:hover {
          transform: rotateX(-2deg) rotateY(3deg) translateZ(12px);
          box-shadow:
            0 28px 60px rgba(21, 17, 13, 0.45),
            0 8px 20px rgba(21, 17, 13, 0.3),
            inset 0 1px 0 rgba(250, 246, 238, 0.08);
        }

        /* ── Mobile marquee ── */
        @keyframes portfolio-marquee-ltr {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes portfolio-marquee-rtl {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
        .portfolio-marquee-ltr {
          display: flex;
          width: max-content;
          animation: portfolio-marquee-ltr 28s linear infinite;
        }
        .portfolio-marquee-rtl {
          display: flex;
          width: max-content;
          animation: portfolio-marquee-rtl 24s linear infinite;
        }
        .portfolio-marquee-ltr:hover,
        .portfolio-marquee-rtl:hover {
          animation-play-state: paused;
        }
      `}</style>

      <section className="py-24 md:py-32 overflow-hidden bg-cream">

        {/* ── Section heading ── */}
        <div className="mx-auto mb-14 max-w-5xl px-6 text-center">
          <p
            className="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.22em] text-gold"
          >
            {h.eyebrow}
          </p>
          <h2 className="font-display text-4xl font-light tracking-tight text-ink md:text-5xl lg:text-6xl">
            {h.title}
          </h2>
          <div className="mx-auto mt-5 h-px w-16 bg-gold opacity-35" />
        </div>

        {/* ════════════════════════════════
            DESKTOP — 3D perspective grid
            ════════════════════════════════ */}
        <div
          className="hidden md:block"
          style={{ perspective: "1200px" }}
        >
          <div
            className="mx-auto grid max-w-6xl grid-cols-3 gap-6 px-8"
            style={{ transformStyle: "preserve-3d" }}
          >
            {CARDS.map((card, index) => (
              <div
                key={index}
                ref={(el) => { cardRefs.current[index] = el; }}
                className="card-3d group relative rounded-xl border border-line overflow-hidden cursor-pointer hover:border-gold"
                style={{
                  transitionDelay: `${index * 120}ms`,
                  /* subtle resting shadow */
                  boxShadow:
                    "0 6px 24px rgba(21,17,13,0.18), 0 2px 6px rgba(21,17,13,0.12)",
                }}
              >
                {/* Gradient face */}
                <div
                  className="relative"
                  style={{
                    aspectRatio: "3 / 4",
                    background: card.gradient,
                  }}
                >
                  {/* Noise grain overlay */}
                  <div
                    aria-hidden
                    style={{
                      position: "absolute",
                      inset: 0,
                      backgroundImage: NOISE_URI,
                      backgroundSize: "256px 256px",
                      mixBlendMode: "overlay",
                      opacity: 0.6,
                      pointerEvents: "none",
                    }}
                  />

                  {/* Inner light reflection (top-left) */}
                  <div
                    aria-hidden
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "radial-gradient(ellipse 80% 60% at 20% 10%, rgba(250,246,238,0.07) 0%, transparent 70%)",
                      pointerEvents: "none",
                    }}
                  />

                  {/* Watermark year (large ghost text) */}
                  <span
                    aria-hidden
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      fontFamily: "var(--font-fraunces, serif)",
                      fontSize: "clamp(64px, 10vw, 96px)",
                      fontWeight: 900,
                      color: "rgba(250,246,238,0.05)",
                      letterSpacing: "-0.04em",
                      lineHeight: 1,
                      userSelect: "none",
                      whiteSpace: "nowrap",
                      pointerEvents: "none",
                    }}
                  >
                    {card.year}
                  </span>

                  {/* Category chip (top-right) */}
                  <div
                    style={{
                      position: "absolute",
                      top: "14px",
                      right: "14px",
                      background: "rgba(21,17,13,0.55)",
                      backdropFilter: "blur(8px)",
                      border: "1px solid rgba(184,146,74,0.3)",
                      borderRadius: "100px",
                      padding: "3px 10px",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-inter, sans-serif)",
                        fontSize: "9px",
                        fontWeight: 700,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: card.accentLight,
                      }}
                    >
                      {card.category}
                    </span>
                  </div>

                  {/* Bottom gradient overlay — always visible, brightens on hover */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top, rgba(21,17,13,0.88) 0%, rgba(21,17,13,0.4) 45%, transparent 100%)",
                      pointerEvents: "none",
                    }}
                  />

                  {/* Title + year */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: "24px 20px 22px",
                      pointerEvents: "none",
                    }}
                  >
                    {/* Year */}
                    <p
                      style={{
                        fontFamily: "var(--font-inter, sans-serif)",
                        fontSize: "9px",
                        fontWeight: 700,
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        color: card.accentLight,
                        opacity: 0.85,
                        marginBottom: "5px",
                      }}
                    >
                      {card.year}
                    </p>
                    {/* Title */}
                    <p
                      style={{
                        fontFamily: "var(--font-fraunces, serif)",
                        fontSize: "17px",
                        fontWeight: 300,
                        lineHeight: 1.35,
                        letterSpacing: "0.01em",
                        color: "rgba(250,246,238,0.97)",
                      }}
                    >
                      {card.title}
                    </p>

                    {/* Thin gold rule that slides in on hover */}
                    <div
                      className="mt-3 h-px w-0 group-hover:w-8 transition-[width] duration-500"
                      style={{ background: "rgba(184,146,74,0.7)" }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ════════════════════════════════
            MOBILE — infinite marquee rows
            ════════════════════════════════ */}
        <div className="flex flex-col gap-4 md:hidden" aria-hidden="false">
          {/* Row 1 — scrolls left */}
          <div className="overflow-hidden" style={{ maskImage: "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)" }}>
            <div className="portfolio-marquee-ltr">
              {[...CARDS, ...CARDS].map((card, index) => (
                <MobileThumb key={`ltr-${index}`} card={card} />
              ))}
            </div>
          </div>

          {/* Row 2 — scrolls right, uses cards in reverse order */}
          <div className="overflow-hidden" style={{ maskImage: "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)" }}>
            <div className="portfolio-marquee-rtl">
              {[...[...CARDS].reverse(), ...[...CARDS].reverse()].map((card, index) => (
                <MobileThumb key={`rtl-${index}`} card={card} />
              ))}
            </div>
          </div>
        </div>

        {/* ── Caption ── */}
        <div className="mx-auto mt-12 max-w-4xl px-6 text-center">
          <p className="font-sans text-xs text-muted">
            {lang === "tg" && "Аксҳои воқеӣ ба зудӣ илова карда мешаванд"}
            {lang === "de" && "Echte Fotos werden in Kürze hinzugefügt"}
            {lang === "en" && "Real photos will be added soon"}
            {lang === "ru" && "Реальные фотографии будут добавлены в ближайшее время"}
          </p>
        </div>
      </section>
    </>
  );
}

/* ─── Small reusable thumbnail for the mobile marquee ─── */
function MobileThumb({ card }: { card: CardData }) {
  return (
    <div
      style={{
        width: "160px",
        flexShrink: 0,
        marginRight: "12px",
        borderRadius: "10px",
        overflow: "hidden",
        border: "1px solid rgba(229,220,200,0.5)",
        boxShadow: "0 4px 12px rgba(21,17,13,0.2)",
      }}
    >
      <div
        style={{
          aspectRatio: "3 / 4",
          background: card.gradient,
          position: "relative",
        }}
      >
        {/* Noise */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: NOISE_URI,
            backgroundSize: "256px 256px",
            mixBlendMode: "overlay",
            opacity: 0.5,
            pointerEvents: "none",
          }}
        />

        {/* Bottom overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(21,17,13,0.85) 0%, rgba(21,17,13,0.2) 50%, transparent 100%)",
            pointerEvents: "none",
          }}
        />

        {/* Text */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "16px 12px 14px",
            pointerEvents: "none",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-inter, sans-serif)",
              fontSize: "8px",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: card.accentLight,
              opacity: 0.85,
              marginBottom: "3px",
            }}
          >
            {card.category}
          </p>
          <p
            style={{
              fontFamily: "var(--font-fraunces, serif)",
              fontSize: "12px",
              fontWeight: 300,
              lineHeight: 1.3,
              color: "rgba(250,246,238,0.95)",
            }}
          >
            {card.title}
          </p>
        </div>
      </div>
    </div>
  );
}
