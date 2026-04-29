import Reveal from "@/components/Reveal";
import { QUOTE, type LangSlug } from "@/lib/i18n";

export default function PullQuote({ lang }: { lang: LangSlug }) {
  const q = QUOTE[lang];

  // Каждая строка стиха появляется с задержкой 150ms — построчный stagger.
  // Атрибуция (имя Рӯдакӣ) появляется последней с дополнительной паузой 200ms
  // после последней строки — драматический акцент.
  const lineStep = 150;
  const attributionDelay = q.lines.length * lineStep + 200;

  return (
    <section className="border-y border-line bg-cream-dark/60 py-28 md:py-32">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <blockquote className="font-display text-2xl font-light italic leading-[1.5] tracking-tight text-ink md:text-3xl lg:text-4xl">
          {q.lines.map((line, i) => (
            <Reveal key={i} as="span" delay={i * lineStep} className="block">
              {line}
            </Reveal>
          ))}
        </blockquote>
        <Reveal delay={attributionDelay}>
          <div className="mt-12 flex items-center justify-center gap-4 text-[11px] uppercase tracking-[0.32em] text-muted">
            <span className="h-px w-12 bg-gold" />
            <span>{q.attribution}</span>
            <span className="h-px w-12 bg-gold" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
