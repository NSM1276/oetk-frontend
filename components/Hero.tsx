import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HERO, type LangSlug } from "@/lib/i18n";

export default function Hero({ lang }: { lang: LangSlug }) {
  const t = HERO[lang];

  return (
    <section className="relative isolate overflow-hidden bg-ink text-cream">
      <div className="absolute inset-0 -z-10">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover opacity-65"
        >
          <source src="/hero.webm" type="video/webm" />
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/20 via-ink/40 to-ink" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-28 md:py-36 lg:py-44">
        <p className="mb-6 text-[11px] uppercase tracking-[0.32em] text-gold-soft">
          Österreichisch–Tadschikische Kulturgemeinde
        </p>

        <h1 className="max-w-4xl font-display text-5xl font-light leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
          {t.title}
        </h1>

        <p className="mt-8 max-w-xl text-lg leading-relaxed text-cream/75 md:text-xl">
          {t.subtitle}
        </p>

        <div className="mt-12">
          <Link
            href={lang === "tg" ? "/about" : `/${lang}/about`}
            className="group inline-flex items-center gap-3 border-b border-gold-soft pb-1 text-sm uppercase tracking-[0.22em] text-gold-soft transition hover:border-cream hover:text-cream"
          >
            {t.cta}
            <ArrowRight
              size={16}
              strokeWidth={1.5}
              className="transition group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-soft/40 to-transparent" />
    </section>
  );
}
