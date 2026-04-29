import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
}: {
  currentPage: number;
  totalPages: number;
  basePath: string; // "/articles" или "/de/articles"
}) {
  if (totalPages <= 1) return null;

  const href = (n: number) => (n === 1 ? basePath : `${basePath}?page=${n}`);

  // Простая стратегия: показываем все страницы пока их < 10,
  // иначе делаем «1 … current-1 current current+1 … last».
  const pages: (number | "…")[] = [];
  if (totalPages <= 9) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push("…");
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push("…");
    pages.push(totalPages);
  }

  const prevDisabled = currentPage <= 1;
  const nextDisabled = currentPage >= totalPages;

  return (
    <nav className="mt-20 flex items-center justify-center gap-2 border-t border-line pt-10">
      {prevDisabled ? (
        <span className="flex items-center gap-2 px-3 py-2 text-[11px] uppercase tracking-[0.2em] text-muted/40">
          <ChevronLeft size={14} strokeWidth={1.5} />
        </span>
      ) : (
        <Link
          href={href(currentPage - 1)}
          className="flex items-center gap-2 px-3 py-2 text-[11px] uppercase tracking-[0.2em] text-ink-soft transition hover:text-burgundy"
        >
          <ChevronLeft size={14} strokeWidth={1.5} />
        </Link>
      )}

      {pages.map((p, i) =>
        p === "…" ? (
          <span
            key={`dots-${i}`}
            className="px-2 text-sm text-muted"
            aria-hidden="true"
          >
            …
          </span>
        ) : p === currentPage ? (
          <span
            key={p}
            aria-current="page"
            className="flex h-9 w-9 items-center justify-center border-b-2 border-burgundy text-sm text-burgundy"
          >
            {p}
          </span>
        ) : (
          <Link
            key={p}
            href={href(p)}
            className="flex h-9 w-9 items-center justify-center text-sm text-ink-soft transition hover:text-burgundy"
          >
            {p}
          </Link>
        ),
      )}

      {nextDisabled ? (
        <span className="flex items-center gap-2 px-3 py-2 text-[11px] uppercase tracking-[0.2em] text-muted/40">
          <ChevronRight size={14} strokeWidth={1.5} />
        </span>
      ) : (
        <Link
          href={href(currentPage + 1)}
          className="flex items-center gap-2 px-3 py-2 text-[11px] uppercase tracking-[0.2em] text-ink-soft transition hover:text-burgundy"
        >
          <ChevronRight size={14} strokeWidth={1.5} />
        </Link>
      )}
    </nav>
  );
}
