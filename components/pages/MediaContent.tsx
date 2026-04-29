import type { LangSlug } from "@/lib/i18n";

const CONTENT: Record<LangSlug, { title: string; msg: string }> = {
  tg: { title: "Расона", msg: "Ин бахш дар зудтарин вақт пур карда мешавад." },
  de: { title: "Presse", msg: "Dieser Bereich wird in Kürze befüllt." },
  en: { title: "Media", msg: "This section will be available soon." },
  ru: { title: "СМИ", msg: "Этот раздел скоро будет заполнен." },
};

export default function MediaContent({ lang }: { lang: LangSlug }) {
  const c = CONTENT[lang];
  return (
    <div className="mx-auto max-w-4xl px-6 py-24 text-center md:py-40">
      <h1 className="mb-6 font-display text-5xl font-light tracking-tight text-ink md:text-6xl">
        {c.title}
      </h1>
      <p className="text-lg text-muted">{c.msg}</p>
    </div>
  );
}
