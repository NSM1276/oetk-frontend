import type { LangSlug } from "@/lib/i18n";

/* ── Section copy ───────────────────────────────────────────────────── */
const HEADING: Record<LangSlug, { eyebrow: string; title: string }> = {
  tg: {
    eyebrow: "Аъзоён мегӯянд",
    title: "Овозҳои анҷумани мо",
  },
  de: {
    eyebrow: "Stimmen aus dem Verein",
    title: "Was unsere Mitglieder sagen",
  },
  en: {
    eyebrow: "Voices from the association",
    title: "What our members say",
  },
  ru: {
    eyebrow: "Голоса ассоциации",
    title: "Что говорят наши члены",
  },
};

/* ── Card data ──────────────────────────────────────────────────────── */
interface CardData {
  initials: string;
  avatarVariant: "burgundy" | "gold";
  content: Record<LangSlug, { quote: string; name: string; role: string }>;
}

const CARDS: CardData[] = [
  {
    initials: "AT",
    avatarVariant: "burgundy",
    content: {
      tg: {
        quote:
          "Мо барои пайванд кардани ду фарҳанги бузург — Австрия ва Тоҷикистон — кор мекунем.",
        name: "Абдулхайр Тураев",
        role: "Раиси анҷуман",
      },
      de: {
        quote:
          "Wir arbeiten daran, zwei große Kulturen — Österreich und Tadschikistan — zu verbinden.",
        name: "Abdulchair Turaev",
        role: "Obmann",
      },
      en: {
        quote:
          "We work to connect two great cultures — Austria and Tajikistan — through shared values.",
        name: "Abdulchair Turaev",
        role: "Chairperson",
      },
      ru: {
        quote:
          "Мы работаем над тем, чтобы соединить две великие культуры — Австрию и Таджикистан.",
        name: "Абдулхайр Тураев",
        role: "Председатель",
      },
    },
  },
  {
    initials: "MO",
    avatarVariant: "gold",
    content: {
      tg: {
        quote:
          "Фарҳанг забони умумии одамон аст, ки ба якдигар наздиктар мешавад.",
        name: "Маҳмадкарим Орзуев",
        role: "Муовини раис",
      },
      de: {
        quote:
          "Kultur ist die gemeinsame Sprache der Menschen, die einander näherbringt.",
        name: "Mahmadkarim Orzuev",
        role: "Obmann-Stellvertreter",
      },
      en: {
        quote: "Culture is the common language that brings people closer to one another.",
        name: "Mahmadkarim Orzuev",
        role: "Deputy Chairperson",
      },
      ru: {
        quote:
          "Культура — это общий язык людей, который сближает нас друг с другом.",
        name: "Махмадкарим Орзуев",
        role: "Заместитель председателя",
      },
    },
  },
  {
    initials: "ÖTK",
    avatarVariant: "burgundy",
    content: {
      tg: {
        quote:
          "Ин анҷуман барои мо — тоҷикони сокини Австрия — як хонаи дуюм шуд.",
        name: "Аъзои анҷуман",
        role: "Вена, Австрия",
      },
      de: {
        quote:
          "Dieser Verein ist für uns Tadschiken in Österreich zu einem zweiten Zuhause geworden.",
        name: "Vereinsmitglied",
        role: "Wien, Österreich",
      },
      en: {
        quote: "This association has become a second home for us Tajiks living in Austria.",
        name: "Association Member",
        role: "Vienna, Austria",
      },
      ru: {
        quote:
          "Эта ассоциация стала для нас — таджиков в Австрии — вторым домом.",
        name: "Член ассоциации",
        role: "Вена, Австрия",
      },
    },
  },
];

/* ── Avatar ─────────────────────────────────────────────────────────── */
function Avatar({
  initials,
  variant,
}: {
  initials: string;
  variant: "burgundy" | "gold";
}) {
  const isBurgundy = variant === "burgundy";
  return (
    <div
      className={[
        "flex h-12 w-12 shrink-0 items-center justify-center rounded-full",
        "text-[13px] font-semibold tracking-wide",
        isBurgundy
          ? "bg-burgundy text-cream"
          : "bg-gold text-ink",
      ].join(" ")}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}

/* ── Single card ────────────────────────────────────────────────────── */
function TestimonialCard({
  card,
  lang,
}: {
  card: CardData;
  lang: LangSlug;
}) {
  const { quote, name, role } = card.content[lang];

  return (
    <article
      className={[
        "group relative flex flex-col gap-6 rounded-2xl bg-ink p-8",
        "transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl",
      ].join(" ")}
    >
      {/* Opening quote mark — decorative, positioned top-left */}
      <span
        className="pointer-events-none absolute left-6 top-4 select-none font-display text-8xl leading-none text-gold opacity-20"
        aria-hidden="true"
      >
        &ldquo;
      </span>

      {/* Quote body */}
      <blockquote className="relative z-10 flex-1 pt-6">
        <p className="font-display text-lg font-light italic leading-relaxed text-[#f1ead9]/80">
          {quote}
        </p>
      </blockquote>

      {/* Divider */}
      <div className="h-px w-12 bg-gold/30" />

      {/* Author row */}
      <footer className="flex items-center gap-4">
        <Avatar initials={card.initials} variant={card.avatarVariant} />
        <div>
          <p className="font-display text-sm font-medium text-gold">{name}</p>
          <p className="mt-0.5 text-[12px] uppercase tracking-[0.18em] text-muted">
            {role}
          </p>
        </div>
      </footer>
    </article>
  );
}

/* ── Section ────────────────────────────────────────────────────────── */
export default function TestimonialCards({ lang }: { lang: LangSlug }) {
  const { eyebrow, title } = HEADING[lang];

  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section heading */}
        <div className="mb-14">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.28em] text-burgundy">
            {eyebrow}
          </p>
          <h2 className="font-display text-3xl font-light tracking-tight text-ink md:text-4xl">
            {title}
          </h2>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {CARDS.map((card, i) => (
            <TestimonialCard key={i} card={card} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  );
}
