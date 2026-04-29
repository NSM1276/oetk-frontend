import Hero from "@/components/Hero";
import FeaturedArticle from "@/components/FeaturedArticle";
import ArticleCard from "@/components/ArticleCard";
import SectionHeading from "@/components/SectionHeading";
import PullQuote from "@/components/PullQuote";
import Newsletter from "@/components/Newsletter";
import { getArticles } from "@/lib/joomla";
import { LANGUAGES, SECTIONS, type LangSlug } from "@/lib/i18n";

export default async function HomeContent({ lang }: { lang: LangSlug }) {
  const config = LANGUAGES[lang];
  const s = SECTIONS[lang];
  const articles = await getArticles({
    limit: 20,
    language: config.joomlaCode,
  });

  const featured = articles[0] ?? null;
  const rest = featured
    ? articles.filter((a) => a.id !== featured.id)
    : articles;
  const latest = rest.slice(0, 6);
  const archive = rest.slice(6);

  const articlesPath = lang === "tg" ? "/articles" : `/${lang}/articles`;

  return (
    <>
      <Hero lang={lang} />

      {featured ? (
        <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
          <div className="ornament-divider mb-16 text-[11px] uppercase tracking-[0.32em]">
            {s.featured}
          </div>
          <FeaturedArticle article={featured} />
        </section>
      ) : (
        <section className="mx-auto max-w-7xl px-6 py-32 text-center">
          <p className="text-[11px] uppercase tracking-[0.28em] text-muted">
            No content yet for {config.label}
          </p>
          <p className="mt-4 font-display text-2xl text-ink-soft">
            Articles in this language will appear here once published in
            Joomla.
          </p>
        </section>
      )}

      {latest.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 pb-24 md:pb-32">
          <SectionHeading
            eyebrow={s.latestEyebrow}
            title={s.latestTitle}
            href={articlesPath}
            hrefLabel={s.viewAll}
          />
          <div className="grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
            {latest.map((article) => (
              <ArticleCard key={article.id} article={article} lang={lang} />
            ))}
          </div>
        </section>
      )}

      <PullQuote lang={lang} />

      {archive.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
          <SectionHeading
            eyebrow={s.archiveTeaserEyebrow}
            title={s.archiveTeaserTitle}
            href={articlesPath}
            hrefLabel={s.viewAll}
          />
          <div className="grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
            {archive.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                lang={lang}
                variant="compact"
              />
            ))}
          </div>
        </section>
      )}

      <Newsletter lang={lang} />
    </>
  );
}
