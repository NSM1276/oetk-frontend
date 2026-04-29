import { QUOTE, type LangSlug } from "@/lib/i18n";

export default function PullQuote({ lang }: { lang: LangSlug }) {
  const q = QUOTE[lang];

  return (
    <section className="border-y border-line bg-cream-dark/60 py-28 md:py-32">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <blockquote className="font-display text-2xl font-light italic leading-[1.5] tracking-tight text-ink md:text-3xl lg:text-4xl">
          {q.lines.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </blockquote>
        <div className="mt-12 flex items-center justify-center gap-4 text-[11px] uppercase tracking-[0.32em] text-muted">
          <span className="h-px w-12 bg-gold" />
          <span>{q.attribution}</span>
          <span className="h-px w-12 bg-gold" />
        </div>
      </div>
    </section>
  );
}
