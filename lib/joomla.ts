// Клиент Joomla Web Services REST API.
// Подключён к реальному бэкенду через JOOMLA_API_URL + JOOMLA_API_TOKEN из .env.local.

import { JOOMLA_API_URL, JOOMLA_API_TOKEN, JOOMLA_SITE_URL } from "./config";

export type Article = {
  id: number;
  title: string;
  alias: string;
  introtext: string; // короткий тизер для карточек
  fulltext: string; // полный HTML для страницы статьи
  created: string; // ISO date
  category: string; // имя категории (резолвится из ID)
  image: string | null;
  language: string; // de-DE, ru-RU и т.д.
};

type JoomlaArticleAttrs = {
  id: number;
  title: string;
  alias: string;
  state: number;
  created: string;
  publish_up: string | null;
  language: string;
  text: string;
  metadesc?: string;
  images: {
    image_intro?: string;
    image_intro_alt?: string;
    image_fulltext?: string;
    image_fulltext_alt?: string;
  };
};

type JoomlaArticle = {
  type: "articles";
  id: string;
  attributes: JoomlaArticleAttrs;
  relationships?: {
    category?: { data?: { type: string; id: string } | null };
  };
};

type JoomlaResponse<T> = {
  data: T;
  links?: { self?: string; next?: string; last?: string };
};

// Кэш категорий в памяти процесса Next.js (живёт между запросами).
let categoryCache: Map<number, string> | null = null;

async function joomlaFetch<T>(
  path: string,
  init?: RequestInit,
): Promise<JoomlaResponse<T>> {
  const url = `${JOOMLA_API_URL}${path}`;
  const res = await fetch(url, {
    ...init,
    headers: {
      Accept: "application/vnd.api+json",
      "X-Joomla-Token": JOOMLA_API_TOKEN,
      ...(init?.headers ?? {}),
    },
    // Кэшируем запрос на 5 минут (Joomla обновляется не очень часто)
    next: { revalidate: 300 },
  });
  if (!res.ok) {
    throw new Error(
      `Joomla API ${res.status} ${res.statusText} on ${path}`,
    );
  }
  return res.json() as Promise<JoomlaResponse<T>>;
}

async function loadCategories(): Promise<Map<number, string>> {
  if (categoryCache) return categoryCache;
  try {
    const json = await joomlaFetch<
      Array<{ id: string; attributes: { title: string } }>
    >("/content/categories?page%5Blimit%5D=200");
    const map = new Map<number, string>();
    for (const c of json.data) {
      map.set(Number(c.id), c.attributes.title);
    }
    categoryCache = map;
    return map;
  } catch (e) {
    console.error("[joomla] failed to load categories:", e);
    return new Map();
  }
}

// Извлекает src первой <img> из HTML (fallback когда image_intro пустой)
function extractFirstImage(html: string): string | null {
  const m = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return m ? m[1] : null;
}

// Делает абсолютный URL картинки. Joomla отдаёт относительные пути типа
// "images/foo.jpg" — добавляем базовый домен.
export function imageUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${JOOMLA_SITE_URL}/${path.replace(/^\//, "")}`;
}

// Joomla хранит introtext/fulltext объединёнными в attributes.text.
// Делим по readmore-разделителю если он есть, иначе берём первый <p>.
function splitText(text: string): { intro: string; full: string } {
  const READMORE = /<hr\s+id=["']system-readmore["']\s*\/?>/i;
  if (READMORE.test(text)) {
    const [intro, ...rest] = text.split(READMORE);
    return { intro: intro.trim(), full: rest.join("").trim() };
  }
  return { intro: text, full: text };
}

// Грубо вытащить первый абзац как тизер для карточки.
function extractTeaser(html: string, maxLen = 220): string {
  // Берём содержимое первого <p>
  const p = html.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
  let text = p ? p[1] : html;
  // Снимаем все теги
  text = text.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  // Декодируем основные HTML-сущности
  text = text
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&laquo;/g, "«")
    .replace(/&raquo;/g, "»");
  if (text.length > maxLen) {
    text = text.slice(0, maxLen).replace(/\s+\S*$/, "") + "…";
  }
  return text;
}

// Удаляет первое вхождение картинки из HTML — чтобы не дублировать hero-изображение
// на странице статьи (hero рендерится отдельно, поэтому из fulltext её убираем).
function stripFirstImage(html: string): string {
  // <figure>...</figure>
  const fig = html.replace(/<figure\b[^>]*>[\s\S]*?<\/figure>/i, "");
  if (fig !== html) return fig.trim();
  // <p><img .../></p>
  const pImg = html.replace(/<p\b[^>]*>\s*<img\b[^>]*\/?>\s*<\/p>/i, "");
  if (pImg !== html) return pImg.trim();
  // просто <img .../>
  return html.replace(/<img\b[^>]*\/?>/i, "").trim();
}

// Переписывает относительные src в HTML-тексте на абсолютные
function rewriteImageSrcs(html: string): string {
  return html.replace(
    /(<img[^>]+src=["'])(?!https?:\/\/)([^"']+)(["'])/gi,
    (_m, p1, src, p3) =>
      `${p1}${JOOMLA_SITE_URL}/${src.replace(/^\//, "")}${p3}`,
  );
}

async function mapArticle(
  a: JoomlaArticle,
  cats: Map<number, string>,
): Promise<Article> {
  const attrs = a.attributes;
  const rawText = rewriteImageSrcs(attrs.text || "");
  const { intro, full } = splitText(rawText);

  // Картинка: image_intro → image_fulltext → первая <img> в тексте
  let imgPath: string | null = null;
  if (attrs.images?.image_intro) imgPath = attrs.images.image_intro;
  else if (attrs.images?.image_fulltext) imgPath = attrs.images.image_fulltext;
  else {
    // extractFirstImage уже отдаст абсолютный URL после rewriteImageSrcs
    const found = extractFirstImage(rawText);
    imgPath = found;
  }

  const catId = a.relationships?.category?.data?.id
    ? Number(a.relationships.category.data.id)
    : null;
  const category = catId ? cats.get(catId) ?? "—" : "—";

  // Если нашли hero-картинку — удаляем её первое вхождение из fulltext,
  // чтобы на странице статьи она не появлялась дважды.
  const cleanFull = imgPath ? stripFirstImage(full) : full;

  return {
    id: attrs.id,
    title: attrs.title,
    alias: attrs.alias,
    introtext: extractTeaser(intro),
    fulltext: cleanFull,
    created: attrs.publish_up || attrs.created,
    category,
    image: imageUrl(imgPath),
    language: attrs.language,
  };
}

// === Public API ===

export async function getArticles(
  opts: { limit?: number; language?: string; category?: number } = {},
): Promise<Article[]> {
  const params = new URLSearchParams();
  params.set("page[limit]", String(opts.limit ?? 20));
  params.set("filter[state]", "1");
  if (opts.language) params.set("filter[language]", opts.language);
  if (opts.category) params.set("filter[category]", String(opts.category));

  try {
    const [json, cats] = await Promise.all([
      joomlaFetch<JoomlaArticle[]>(`/content/articles?${params.toString()}`),
      loadCategories(),
    ]);
    const articles = await Promise.all(
      json.data.map((a) => mapArticle(a, cats)),
    );
    articles.sort((a, b) => (a.created < b.created ? 1 : -1));
    return articles;
  } catch (e) {
    console.error("[joomla] getArticles failed:", e);
    return [];
  }
}

// Пагинированная выборка статей.
// Joomla отдаёт `links.last` с offset последней страницы — отсюда
// считаем общее число страниц.
export async function getArticlesPaginated(opts: {
  page?: number;
  perPage?: number;
  language?: string;
  category?: number;
}): Promise<{
  articles: Article[];
  currentPage: number;
  totalPages: number;
}> {
  const perPage = Math.max(1, Math.min(opts.perPage ?? 12, 50));
  const currentPage = Math.max(1, opts.page ?? 1);
  const offset = (currentPage - 1) * perPage;

  const params = new URLSearchParams();
  params.set("page[limit]", String(perPage));
  params.set("page[offset]", String(offset));
  params.set("filter[state]", "1");
  if (opts.language) params.set("filter[language]", opts.language);
  if (opts.category) params.set("filter[category]", String(opts.category));

  try {
    const [json, cats] = await Promise.all([
      joomlaFetch<JoomlaArticle[]>(`/content/articles?${params.toString()}`),
      loadCategories(),
    ]);

    const articles = await Promise.all(
      json.data.map((a) => mapArticle(a, cats)),
    );
    articles.sort((a, b) => (a.created < b.created ? 1 : -1));

    // Считаем сколько всего страниц
    let totalPages = currentPage;
    const lastUrl = json.links?.last;
    if (lastUrl) {
      try {
        const url = new URL(lastUrl);
        const lastOffset = parseInt(
          url.searchParams.get("page[offset]") || "0",
          10,
        );
        totalPages = Math.floor(lastOffset / perPage) + 1;
      } catch {}
    }

    return { articles, currentPage, totalPages };
  } catch (e) {
    console.error("[joomla] getArticlesPaginated failed:", e);
    return { articles: [], currentPage: 1, totalPages: 1 };
  }
}

export async function getArticle(slug: string): Promise<Article | null> {
  // Joomla API ищет статьи по id, не по alias. Получаем список и
  // фильтруем по alias на нашей стороне. Для прода можно сделать индекс.
  const articles = await getArticles({ limit: 200 });
  return articles.find((a) => a.alias === slug) ?? null;
}

export async function getFeaturedArticle(): Promise<Article | null> {
  const articles = await getArticles({ limit: 1 });
  return articles[0] ?? null;
}

// Локализация дат. Сейчас по умолчанию русский — для таджикского контента
// (отображается как "26 марта 2026"). Когда подключим language switcher,
// будем подставлять локаль автоматически.
export function formatDate(iso: string, locale = "ru-RU"): string {
  try {
    return new Date(iso).toLocaleDateString(locale, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}
