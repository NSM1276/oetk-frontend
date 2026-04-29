import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { type Article, formatDate } from "@/lib/joomla";

export default function FeaturedArticle({ article }: { article: Article }) {
  return (
    <article className="group grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
      <Link
        href={`/articles/${article.alias}`}
        className="relative block aspect-[3/2] overflow-hidden bg-cream-dark lg:col-span-7"
      >
        {article.image ? (
          <Image
            src={article.image}
            alt={article.title}
            fill
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="object-contain transition duration-700 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-cream-dark text-muted">
            <span className="font-display text-6xl opacity-30">ÖTK</span>
          </div>
        )}
        <div className="absolute left-5 top-5 bg-cream/90 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-burgundy backdrop-blur">
          Featured
        </div>
      </Link>

      <div className="lg:col-span-5">
        <div className="mb-4 flex items-center gap-4 text-[11px] uppercase tracking-[0.22em] text-muted">
          <span className="text-burgundy">{article.category}</span>
          <span className="h-px w-8 bg-line" />
          <span>{formatDate(article.created)}</span>
        </div>

        <h2 className="font-display text-4xl font-light leading-[1.1] tracking-tight text-ink md:text-5xl">
          <Link
            href={`/articles/${article.alias}`}
            className="bg-gradient-to-r from-burgundy to-burgundy bg-[length:0_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_1px]"
          >
            {article.title}
          </Link>
        </h2>

        <p className="mt-6 text-lg leading-relaxed text-ink-soft">
          {article.introtext}
        </p>

        <Link
          href={`/articles/${article.alias}`}
          className="mt-8 inline-flex items-center gap-3 text-sm uppercase tracking-[0.22em] text-burgundy transition hover:text-burgundy-dark"
        >
          Хондан
          <ArrowRight size={16} strokeWidth={1.5} />
        </Link>
      </div>
    </article>
  );
}
