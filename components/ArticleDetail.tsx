import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { type Article, formatDate } from "@/lib/joomla";
import { STRINGS, LANGUAGES, type LangSlug } from "@/lib/i18n";

export default function ArticleDetail({
  article,
  lang = "tg",
}: {
  article: Article;
  lang?: LangSlug;
}) {
  const articlesPath = lang === "tg" ? "/articles" : `/${lang}/articles`;
  const t = STRINGS[lang];
  const dateLocale = LANGUAGES[lang].dateLocale;

  return (
    <article>
      {/* Hero */}
      <header className="mx-auto max-w-4xl px-6 pt-16 pb-10 md:pt-24">
        <Link
          href={articlesPath}
          className="mb-10 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-muted transition hover:text-burgundy"
        >
          <ArrowLeft size={14} strokeWidth={1.5} />
          {t.backToArticles}
        </Link>

        <div className="mb-5 flex items-center gap-4 text-[11px] uppercase tracking-[0.22em] text-muted">
          <span className="text-burgundy">{article.category}</span>
          <span className="h-px w-8 bg-line" />
          <span>{formatDate(article.created, dateLocale)}</span>
        </div>

        <h1 className="font-display text-4xl font-light leading-[1.1] tracking-tight text-ink md:text-6xl">
          {article.title}
        </h1>

        <p className="mt-8 max-w-2xl text-xl leading-relaxed text-ink-soft">
          {article.introtext}
        </p>
      </header>

      {article.image && (
        <div className="relative mx-auto aspect-[16/9] max-w-5xl overflow-hidden bg-cream-dark">
          <Image
            src={article.image}
            alt={article.title}
            fill
            sizes="(min-width: 1024px) 1024px, 100vw"
            priority
            // object-contain — не кропает портреты и баннеры с текстом.
            // Letterbox-фон (cream-dark) закрывает пустые поля.
            className="object-contain"
          />
        </div>
      )}

      <div
        className="prose prose-neutral mx-auto max-w-3xl px-6 py-16 prose-headings:font-display prose-headings:font-light"
        dangerouslySetInnerHTML={{
          __html: article.fulltext || `<p>${article.introtext}</p>`,
        }}
      />
    </article>
  );
}
