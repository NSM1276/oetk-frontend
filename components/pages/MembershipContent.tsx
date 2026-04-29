import type { LangSlug } from "@/lib/i18n";

const CONTENT: Record<LangSlug, {
  title: string;
  benefitsTitle: string;
  benefits: string[];
  joinTitle: string;
  joinText: string;
  downloadLabel: string;
}> = {
  tg: {
    title: "Узвият",
    benefitsTitle: "Афзалият барои узви анҷуман",
    benefits: [
      "Тахфифи назаррас барои иштирок дар чорабиниҳои фарҳангӣ ва ҷамъиятӣ",
      "Кӯмак дар ташкили сафар ба Тоҷикистон",
      "Маслиҳати умумӣ ва дастгириву кумаки муҳоҷирон",
    ],
    joinTitle: "Аъзо шудан",
    joinText: "Дар ин ҷо шумо метавонед аризаи узвиятро зеркашӣ кунед, чоп кунед, пур кунед ва тавассути почтаи электронӣ ба мо бифиристед.",
    downloadLabel: "Аризаро зеркашӣ кунед (PDF)",
  },
  de: {
    title: "Mitgliedschaft",
    benefitsTitle: "Ihre Vorteile als Mitglied",
    benefits: [
      "Ermäßigte Eintrittspreise bei unseren Veranstaltungen",
      "Unterstützung bei der Organisation von Reisen nach Tadschikistan",
      "Allgemeine Beratung und Unterstützung für Zuwanderer in Wort und Tat",
    ],
    joinTitle: "Mitglied werden",
    joinText: "Hier können Sie den Mitgliedsantrag herunterladen, ausdrucken und ausfüllen und einfach per E-Mail an uns schicken.",
    downloadLabel: "Antrag herunterladen (PDF)",
  },
  en: {
    title: "Membership",
    benefitsTitle: "Your benefits as a member",
    benefits: [
      "Discounted admission to our cultural and social events",
      "Assistance with organising trips to Tajikistan",
      "General advice and support for immigrants",
    ],
    joinTitle: "Become a member",
    joinText: "You can download the membership application, print and fill it in, and simply send it to us by email.",
    downloadLabel: "Download application (PDF)",
  },
  ru: {
    title: "Членство",
    benefitsTitle: "Преимущества членства",
    benefits: [
      "Скидки на участие в культурных и общественных мероприятиях",
      "Помощь в организации поездок в Таджикистан",
      "Общие консультации и поддержка для мигрантов",
    ],
    joinTitle: "Стать членом",
    joinText: "Здесь вы можете скачать заявление о вступлении, распечатать, заполнить и просто отправить нам по электронной почте.",
    downloadLabel: "Скачать заявление (PDF)",
  },
};

export default function MembershipContent({ lang }: { lang: LangSlug }) {
  const c = CONTENT[lang];
  return (
    <div className="mx-auto max-w-4xl px-6 py-24 md:py-32">
      <h1 className="mb-12 font-display text-5xl font-light tracking-tight text-ink md:text-6xl">
        {c.title}
      </h1>

      <section className="mb-16">
        <h2 className="mb-8 font-display text-2xl font-light text-ink">{c.benefitsTitle}</h2>
        <ul className="space-y-4">
          {c.benefits.map((b, i) => (
            <li key={i} className="flex items-start gap-4">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-burgundy" />
              <span className="text-lg leading-relaxed text-ink-soft">{b}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-lg border border-line bg-cream-dark px-8 py-8">
        <h2 className="mb-4 font-display text-2xl font-light text-ink">{c.joinTitle}</h2>
        <p className="mb-6 text-[15px] leading-relaxed text-ink-soft">{c.joinText}</p>
        <a
          href="mailto:contact@oetk.org"
          className="inline-flex items-center gap-2 rounded-full border border-ink px-6 py-3 text-[13px] uppercase tracking-[0.18em] text-ink transition hover:bg-ink hover:text-cream"
        >
          {c.downloadLabel}
        </a>
      </section>
    </div>
  );
}
