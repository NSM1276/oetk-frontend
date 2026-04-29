"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LANG_ORDER, LANGUAGES, detectLang } from "@/lib/i18n";

export default function LanguageSwitcher() {
  const pathname = usePathname() ?? "/";
  const current = detectLang(pathname);

  return (
    <div className="flex items-center gap-3">
      {LANG_ORDER.map((slug, i) => {
        const lang = LANGUAGES[slug];
        const isActive = current === slug;
        return (
          <span key={slug} className="flex items-center gap-3">
            {i > 0 && (
              <span className="h-3 w-px bg-line" aria-hidden="true" />
            )}
            <Link
              href={lang.path}
              className={`transition hover:text-burgundy ${
                isActive ? "text-burgundy" : ""
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              {lang.label}
            </Link>
          </span>
        );
      })}
    </div>
  );
}
