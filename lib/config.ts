// Конфигурация подключения к Joomla REST API.
// Реальные значения кладите в .env.local (он в .gitignore).

export const JOOMLA_API_URL =
  process.env.JOOMLA_API_URL ?? "http://s1091003060.online.de/api/index.php/v1";

export const JOOMLA_API_TOKEN = process.env.JOOMLA_API_TOKEN ?? "";

// Базовый URL Joomla-сайта — используется для построения путей к картинкам,
// которые Joomla отдаёт относительными путями (например "images/foo.jpg").
export const JOOMLA_SITE_URL =
  process.env.JOOMLA_SITE_URL ?? "http://s1091003060.online.de";
