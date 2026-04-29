import Link from "next/link";
import Image from "next/image";
import { type Article, formatDate } from "@/lib/joomla";
import { type LangSlug, LANGUAGES } from "@/lib/i18n";

export default function ArticleCard({
  article,
  lang = "tg",
  variant = "default",
}: {
  article: Article;
  lang?: LangSlug;
  variant?: "default" | "compact";
}) {
  const basePath = lang === "tg" ? "/articles" : `/${lang}/articles`;
  const href = `${basePath}/${article.alias}`;
  const dateLocale = LANGUAGES[lang].dateLocale;

  // 4:3 — близко к нативной пропорции ваших Joomla-баннеров,
  // не кропает текст и краевые элементы. compact — чуть шире.
  const aspect = variant === "compact" ? "aspect-[16/10]" : "aspect-[4/3]";

  return (
    <article className="group">
      <Link
        href={href}
        className={`relative block ${aspect} overflow-hidden bg-cream-dark`}
      >
        {article.image ? (
          <Image
            src={article.image}
            alt={article.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            // object-cover красивее для grid-ритма, но кропает.
            // У вас часть статей — готовые баннеры с текстом и логотипами,
            // их обрезка портит. Используем contain для целостности.
            className="object-contain transition duration-700 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-muted">
            <span className="font-display text-4xl opacity-30">ÖTK</span>
          </div>
        )}
      </Link>

      <div className="mt-5">
        <div className="mb-3 flex items-center gap-3 text-[10px] uppercase tracking-[0.22em] text-muted">
          <span className="text-burgundy">{article.category}</span>
          <span className="h-px w-5 bg-line" />
          <span>{formatDate(article.created, dateLocale)}</span>
        </div>

        <h3 className="font-display text-2xl font-light leading-snug tracking-tight text-ink">
          <Link
            href={href}
            className="transition group-hover:text-burgundy"
          >
            {article.title}
          </Link>
        </h3>

        <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
          {article.introtext}
        </p>
      </div>
    </article>
  );
}
