import type { LangSlug } from "@/lib/i18n";
import EventGallery from "@/components/EventGallery";

const CONTENT: Record<
  LangSlug,
  { title: string; intro: string }
> = {
  tg: {
    title: "Расона",
    intro:
      "Дар ин бахш акс ва видеоҳои чорабиниҳои Анҷумани Фарҳангии Тоҷикистон ва Утриш ҷамъ оварда шудаанд. Рӯйдодҳои фарҳангӣ, ҷашнвораҳо ва лоиҳаҳои муштараки ду кишварро аз назар гузаронед.",
  },
  de: {
    title: "Presse",
    intro:
      "In diesem Bereich finden Sie Fotos und Videos von den Veranstaltungen der Österreichisch-Tadschikischen Kulturgemeinde. Entdecken Sie unsere kulturellen Abende, Festivals und gemeinsamen Projekte.",
  },
  en: {
    title: "Media",
    intro:
      "Here you will find photos and videos from the events of the Austrian–Tajik Cultural Association. Browse our cultural evenings, festivals, and joint projects between the two nations.",
  },
  ru: {
    title: "СМИ",
    intro:
      "В этом разделе собраны фотографии и видеозаписи мероприятий Австрийско-Таджикской культурной ассоциации. Просматривайте культурные вечера, фестивали и совместные проекты.",
  },
};

export default function MediaContent({ lang }: { lang: LangSlug }) {
  const c = CONTENT[lang];
  return (
    <div className="w-full">
      {/* Page header — centered, max-width constrained */}
      <div className="mx-auto max-w-4xl px-6 pb-4 pt-24 text-center md:pt-40">
        <h1 className="mb-6 font-display text-5xl font-light tracking-tight text-ink md:text-6xl">
          {c.title}
        </h1>
        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted">
          {c.intro}
        </p>
        <div className="mx-auto mt-8 h-px w-16 bg-gold opacity-30" />
      </div>

      {/* Full-width gallery */}
      <EventGallery lang={lang} />
    </div>
  );
}
