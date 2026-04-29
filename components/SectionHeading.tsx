import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function SectionHeading({
  eyebrow,
  title,
  href,
  hrefLabel = "Ҳама",
}: {
  eyebrow?: string;
  title: string;
  href?: string;
  hrefLabel?: string;
}) {
  return (
    <div className="mb-12 border-b border-line pb-5">
      {/* Верхняя строка: eyebrow + ссылка (на десктопе рядом, на мобильном — ссылка ниже) */}
      <div className="flex items-end justify-between gap-6">
        <div>
          {eyebrow && (
            <p className="mb-2 text-[11px] uppercase tracking-[0.28em] text-burgundy">
              {eyebrow}
            </p>
          )}
          <h2 className="font-display text-3xl font-light tracking-tight text-ink md:text-4xl">
            {title}
          </h2>
        </div>
        {href && (
          <Link
            href={href}
            className="group hidden items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-ink-soft transition hover:text-burgundy md:inline-flex"
          >
            {hrefLabel}
            <ArrowRight
              size={14}
              strokeWidth={1.5}
              className="transition group-hover:translate-x-1"
            />
          </Link>
        )}
      </div>
      {/* Ссылка «Все» — только на мобильном, под заголовком */}
      {href && (
        <Link
          href={href}
          className="group mt-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-ink-soft transition hover:text-burgundy md:hidden"
        >
          {hrefLabel}
          <ArrowRight
            size={14}
            strokeWidth={1.5}
            className="transition group-hover:translate-x-1"
          />
        </Link>
      )}
    </div>
  );
}
