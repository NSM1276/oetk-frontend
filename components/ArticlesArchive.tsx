import ArticleCard from "@/components/ArticleCard";
import SectionHeading from "@/components/SectionHeading";
import Pagination from "@/components/Pagination";
import { getArticlesPaginated } from "@/lib/joomla";
import { LANGUAGES, SECTIONS, type LangSlug } from "@/lib/i18n";

const PER_PAGE = 12;

export default async function ArticlesArchive({
  lang,
  page = 1,
}: {
  lang: LangSlug;
  page?: number;
}) {
  const config = LANGUAGES[lang];
  const s = SECTIONS[lang];
  const { articles, currentPage, totalPages } = await getArticlesPaginated({
    page,
    perPage: PER_PAGE,
    language: config.joomlaCode,
  });

  const basePath = lang === "tg" ? "/articles" : `/${lang}/articles`;

  return (
    <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <SectionHeading eyebrow={s.archiveEyebrow} title={s.archiveTitle} />

      {articles.length === 0 ? (
        <p className="py-20 text-center text-muted">
          No articles in this language yet.
        </p>
      ) : (
        <>
          <div className="grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} lang={lang} />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            basePath={basePath}
          />
        </>
      )}
    </section>
  );
}
