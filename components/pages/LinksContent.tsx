import type { LangSlug } from "@/lib/i18n";
import { ExternalLink } from "lucide-react";

const TITLE: Record<LangSlug, string> = {
  tg: "Пайвандҳо",
  de: "Links",
  en: "Links",
  ru: "Ссылки",
};

const LINKS = [
  {
    label: "Agency on Statistics under the President of the Republic of Tajikistan",
    url: "http://www.stat.tj/en/",
  },
  {
    label: "Chamber of Commerce and Industry of the Republic of Tajikistan",
    url: "http://tpp.tj/en/",
  },
  {
    label: "Ministry of Foreign Affairs of the Republic of Tajikistan",
    url: "http://www.mfa.tj/",
  },
];

export default function LinksContent({ lang }: { lang: LangSlug }) {
  return (
    <div className="mx-auto max-w-4xl px-6 py-24 md:py-32">
      <h1 className="mb-12 font-display text-5xl font-light tracking-tight text-ink md:text-6xl">
        {TITLE[lang]}
      </h1>
      <ul className="space-y-4">
        {LINKS.map((link) => (
          <li key={link.url}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 rounded-lg border border-line bg-cream px-6 py-5 transition hover:border-burgundy hover:bg-cream-dark"
            >
              <span className="text-[15px] text-ink group-hover:text-burgundy">{link.label}</span>
              <ExternalLink
                size={16}
                strokeWidth={1.5}
                className="shrink-0 text-muted transition group-hover:text-burgundy"
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
