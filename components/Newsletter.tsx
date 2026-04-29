import { ArrowRight } from "lucide-react";
import { SECTIONS, type LangSlug } from "@/lib/i18n";

export default function Newsletter({ lang }: { lang: LangSlug }) {
  const s = SECTIONS[lang];

  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="grid items-center gap-10 border-t border-line pt-16 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="mb-3 text-[11px] uppercase tracking-[0.28em] text-burgundy">
            {s.newsletterEyebrow}
          </p>
          <h2 className="font-display text-3xl font-light leading-tight tracking-tight text-ink md:text-4xl">
            {s.newsletterTitle}
          </h2>
        </div>

        <form className="flex flex-col gap-3 sm:flex-row">
          <input
            type="email"
            placeholder="email@example.com"
            className="flex-1 border-b border-ink/20 bg-transparent px-1 py-3 text-base text-ink placeholder:text-muted/70 focus:border-burgundy focus:outline-none"
          />
          <button
            type="submit"
            className="group inline-flex items-center justify-center gap-3 bg-ink px-7 py-4 text-[11px] uppercase tracking-[0.25em] text-cream transition hover:bg-burgundy"
          >
            {s.newsletterSubmit}
            <ArrowRight
              size={14}
              strokeWidth={1.5}
              className="transition group-hover:translate-x-1"
            />
          </button>
        </form>
      </div>
    </section>
  );
}
