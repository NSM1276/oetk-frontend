// Карта языков сайта.
// `slug` — то, что в URL (`/`, `/de`, `/en`, `/ru`).
// `joomlaCode` — то, что лежит в `attributes.language` у Joomla.
// `dateLocale` — для форматирования дат через Intl.

export type LangSlug = "tg" | "de" | "en" | "ru";

export const LANGUAGES: Record<
  LangSlug,
  {
    slug: LangSlug;
    label: string;
    joomlaCode: string;
    dateLocale: string;
    path: string;
  }
> = {
  tg: {
    slug: "tg",
    label: "TJ",
    // У вас в Joomla таджикский контент живёт в контейнере ru-RU
    // (sef=tg) — выбор «Вариант A» из прошлой сессии.
    joomlaCode: "ru-RU",
    dateLocale: "ru-RU",
    path: "/",
  },
  de: {
    slug: "de",
    label: "DE",
    joomlaCode: "de-DE",
    dateLocale: "de-DE",
    path: "/de",
  },
  en: {
    slug: "en",
    label: "EN",
    joomlaCode: "en-GB",
    dateLocale: "en-GB",
    path: "/en",
  },
  ru: {
    slug: "ru",
    label: "RU",
    // TODO: когда добавите настоящий русский Content Language в Joomla
    // (например, ru-RU будет переименован, или появится отдельный код),
    // подставьте сюда правильный joomlaCode.
    joomlaCode: "ru-RU__placeholder",
    dateLocale: "ru-RU",
    path: "/ru",
  },
};

export const LANG_ORDER: LangSlug[] = ["tg", "de", "en", "ru"];

// Определить текущий язык из URL.
export function detectLang(pathname: string): LangSlug {
  const seg = pathname.split("/").filter(Boolean)[0];
  if (seg === "de" || seg === "en" || seg === "ru") return seg;
  return "tg";
}

// === Тексты интерфейса ===
// TG — оригинал из вашего Joomla.
// DE — перевод по запросу пользователя.
// EN, RU — автоматические переводы; проверьте и при необходимости поправьте
// прямо в этом файле.

export const HERO: Record<
  LangSlug,
  { title: string; subtitle: string; cta: string }
> = {
  tg: {
    title: "Анҷумани Фарҳангии Тоҷикистон ва Утриш",
    subtitle: "Фарҳанг, дӯстӣ ва ҳамкорӣ байни ду миллат",
    cta: "Дар бораи мо",
  },
  de: {
    title: "Kulturverein Tadschikistans und Österreichs",
    subtitle:
      "Kultur, Freundschaft und Zusammenarbeit zwischen zwei Nationen",
    cta: "Über uns",
  },
  en: {
    title: "Cultural Association of Tajikistan and Austria",
    subtitle: "Culture, friendship and cooperation between two nations",
    cta: "About us",
  },
  ru: {
    title: "Культурная ассоциация Таджикистана и Австрии",
    subtitle: "Культура, дружба и сотрудничество между двумя народами",
    cta: "О нас",
  },
};

// Главное меню — пункты совпадают с тем, что у вас на Joomla.
// Переводы выполнены автоматически и согласованы со стандартными немецкими/
// английскими/русскими аналогами. Поправьте, если что не так.
export const MENU: Record<
  LangSlug,
  Array<{ href: string; label: string }>
> = {
  tg: [
    { href: "/", label: "Хона" },
    { href: "/projects", label: "Лоиҳаҳо" },
    { href: "/articles", label: "Архив" },
    { href: "/tajikistan", label: "Тоҷикистон" },
    { href: "/about", label: "Анҷуман" },
    { href: "/media", label: "Расона" },
    { href: "/membership", label: "Узвият" },
    { href: "/links", label: "Пайвандҳо" },
    { href: "/contact", label: "Тамос" },
  ],
  de: [
    { href: "/de", label: "Startseite" },
    { href: "/de/projects", label: "Projekte" },
    { href: "/de/articles", label: "Archiv" },
    { href: "/de/tajikistan", label: "Tadschikistan" },
    { href: "/de/about", label: "Verein" },
    { href: "/de/media", label: "Presse" },
    { href: "/de/membership", label: "Mitgliedschaft" },
    { href: "/de/links", label: "Links" },
    { href: "/de/contact", label: "Kontakt" },
  ],
  en: [
    { href: "/en", label: "Home" },
    { href: "/en/projects", label: "Projects" },
    { href: "/en/articles", label: "Archive" },
    { href: "/en/tajikistan", label: "Tajikistan" },
    { href: "/en/about", label: "Association" },
    { href: "/en/media", label: "Media" },
    { href: "/en/membership", label: "Membership" },
    { href: "/en/links", label: "Links" },
    { href: "/en/contact", label: "Contact" },
  ],
  ru: [
    { href: "/ru", label: "Главная" },
    { href: "/ru/projects", label: "Проекты" },
    { href: "/ru/articles", label: "Архив" },
    { href: "/ru/tajikistan", label: "Таджикистан" },
    { href: "/ru/about", label: "Анҷуман" },
    { href: "/ru/media", label: "СМИ" },
    { href: "/ru/membership", label: "Членство" },
    { href: "/ru/links", label: "Ссылки" },
    { href: "/ru/contact", label: "Контакт" },
  ],
};

// Цитата для pull-quote блока на главной.
// Текст — оригинал Рудакӣ на таджикском, одинаков для всех языков.
// Имя автора романизируется для не-таджикских страниц.
export const QUOTE: Record<
  LangSlug,
  { lines: string[]; attribution: string }
> = {
  tg: {
    lines: [
      "Ҳеҷ шодӣ нест андар ин ҷаҳон,",
      "Бартар аз дидори рӯи дӯстон.",
      "Ҳеҷ талхӣ нест бар дил талхтар,",
      "Аз фироқи дӯстони пурҳунар.",
    ],
    attribution: "Абӯабдуллоҳи Рӯдакӣ",
  },
  de: {
    lines: [
      "Ҳеҷ шодӣ нест андар ин ҷаҳон,",
      "Бартар аз дидори рӯи дӯстон.",
      "Ҳеҷ талхӣ нест бар дил талхтар,",
      "Аз фироқи дӯстони пурҳунар.",
    ],
    attribution: "Abū Abdullāh Rūdakī",
  },
  en: {
    lines: [
      "Ҳеҷ шодӣ нест андар ин ҷаҳон,",
      "Бартар аз дидори рӯи дӯстон.",
      "Ҳеҷ талхӣ нест бар дил талхтар,",
      "Аз фироқи дӯстони пурҳунар.",
    ],
    attribution: "Abu Abdullah Rudaki",
  },
  ru: {
    lines: [
      "Ҳеҷ шодӣ нест андар ин ҷаҳон,",
      "Бартар аз дидори рӯи дӯстон.",
      "Ҳеҷ талхӣ нест бар дил талхтар,",
      "Аз фироқи дӯстони пурҳунар.",
    ],
    attribution: "Абу Абдаллах Рудаки",
  },
};

// Заголовки секций главной страницы и архива.
// Все переводы — стандартные UI-формулировки. Поправьте если хотите
// другую тональность (например, более формально или наоборот теплее).
export const SECTIONS: Record<
  LangSlug,
  {
    featured: string;
    latestEyebrow: string;
    latestTitle: string;
    archiveTeaserEyebrow: string;
    archiveTeaserTitle: string;
    archiveEyebrow: string;
    archiveTitle: string;
    viewAll: string;
    newsletterEyebrow: string;
    newsletterTitle: string;
    newsletterSubmit: string;
  }
> = {
  tg: {
    featured: "Намоиш",
    latestEyebrow: "Охирин",
    latestTitle: "Чорабиниҳо ва мақолаҳо",
    archiveTeaserEyebrow: "Архив",
    archiveTeaserTitle: "Аз гузориши мо",
    archiveEyebrow: "Архив",
    archiveTitle: "Ҳамаи мақолаҳо ва чорабиниҳо",
    viewAll: "Ҳама",
    newsletterEyebrow: "Хабарномаи моҳона",
    newsletterTitle:
      "Як мактуб дар як моҳ — мақолаҳо ва чорабиниҳои нав.",
    newsletterSubmit: "Обуна",
  },
  de: {
    featured: "Hervorgehoben",
    latestEyebrow: "Aktuell",
    latestTitle: "Artikel und Veranstaltungen",
    archiveTeaserEyebrow: "Archiv",
    archiveTeaserTitle: "Aus unserem Archiv",
    archiveEyebrow: "Archiv",
    archiveTitle: "Alle Artikel und Veranstaltungen",
    viewAll: "Alle anzeigen",
    newsletterEyebrow: "Monatlicher Newsletter",
    newsletterTitle:
      "Ein Brief im Monat — neue Artikel und Veranstaltungen.",
    newsletterSubmit: "Abonnieren",
  },
  en: {
    featured: "Featured",
    latestEyebrow: "Latest",
    latestTitle: "Articles and events",
    archiveTeaserEyebrow: "Archive",
    archiveTeaserTitle: "From our archive",
    archiveEyebrow: "Archive",
    archiveTitle: "All articles and events",
    viewAll: "View all",
    newsletterEyebrow: "Monthly newsletter",
    newsletterTitle: "One letter a month — new articles and events.",
    newsletterSubmit: "Subscribe",
  },
  ru: {
    featured: "Главное",
    latestEyebrow: "Свежее",
    latestTitle: "Статьи и события",
    archiveTeaserEyebrow: "Архив",
    archiveTeaserTitle: "Из нашего архива",
    archiveEyebrow: "Архив",
    archiveTitle: "Все статьи и события",
    viewAll: "Все",
    newsletterEyebrow: "Ежемесячная рассылка",
    newsletterTitle:
      "Одно письмо в месяц — новые статьи и события.",
    newsletterSubmit: "Подписаться",
  },
};

// Подписи стандартных блоков (footer и т.д.).
export const STRINGS: Record<
  LangSlug,
  {
    sitemap: string;
    contact: string;
    follow: string;
    legal: string;
    address: string;
    phone: string;
    email: string;
    imprint: string;
    privacy: string;
    rights: string;
    fullName: string;
    backToArticles: string;
  }
> = {
  tg: {
    sitemap: "Харитаи сайт",
    contact: "Тамос",
    follow: "Моро дунбол кунед",
    legal: "Иттилооти ҳуқуқӣ",
    address: "Суроға",
    phone: "Телефон",
    email: "Почтаи электронӣ",
    imprint: "Impressum",
    privacy: "Махфият",
    rights: "Ҳамаи ҳуқуқҳо ҳифз шудаанд",
    fullName: "Анҷумани Фарҳангии Тоҷикистон ва Утриш",
    backToArticles: "Ба мақолаҳо",
  },
  de: {
    sitemap: "Sitemap",
    contact: "Kontakt",
    follow: "Folgen Sie uns",
    legal: "Rechtliches",
    address: "Adresse",
    phone: "Telefon",
    email: "E-Mail",
    imprint: "Impressum",
    privacy: "Datenschutz",
    rights: "Alle Rechte vorbehalten",
    fullName: "Österreichisch–Tadschikische Kulturgemeinde",
    backToArticles: "Zurück zu den Artikeln",
  },
  en: {
    sitemap: "Sitemap",
    contact: "Contact",
    follow: "Follow us",
    legal: "Legal",
    address: "Address",
    phone: "Phone",
    email: "Email",
    imprint: "Imprint",
    privacy: "Privacy",
    rights: "All rights reserved",
    fullName: "Austrian–Tajik Cultural Association",
    backToArticles: "Back to articles",
  },
  ru: {
    sitemap: "Карта сайта",
    contact: "Контакт",
    follow: "Мы в соцсетях",
    legal: "Правовая информация",
    address: "Адрес",
    phone: "Телефон",
    email: "Email",
    imprint: "Imprint",
    privacy: "Конфиденциальность",
    rights: "Все права защищены",
    fullName: "Австрийско-Таджикская культурная ассоциация",
    backToArticles: "К статьям",
  },
};
