# oetk-frontend

Фронтенд для сайта ÖTK (Österreichisch-Tadschikische Kulturvereinigung). Next.js 15 + React 19 + Tailwind CSS v4 + TypeScript. Контент тянется из Joomla через REST API.

## Запуск локально

```bash
npm install
cp .env.example .env.local   # заполнить JOOMLA_API_TOKEN
npm run dev
```

Открыть http://localhost:3000.

## Структура

```
app/                  страницы App Router
├── layout.tsx        общий layout (Header + Footer)
├── page.tsx          главная (Hero + список статей)
├── articles/
│   ├── page.tsx      список всех статей
│   └── [slug]/       одна статья по alias
└── about/            «Дар бораи мо»

components/           переиспользуемые компоненты
├── Header.tsx
├── Footer.tsx
├── Hero.tsx
└── ArticleCard.tsx

lib/
├── config.ts         базовый URL и токен Joomla из .env
└── joomla.ts         клиент REST API (пока mock-данные)
```

## Подключение к Joomla

Сейчас `lib/joomla.ts` отдаёт mock-статьи, чтобы был виден дизайн. Когда появится Joomla API Token и CORS настроен, раскомментировать `joomlaFetch` в `lib/joomla.ts` и заменить заглушки на реальные запросы:

- `GET /v1/content/articles` — список статей
- `GET /v1/content/articles/{id}` — одна статья
- `GET /v1/content/categories` — категории

Авторизация: заголовок `X-Joomla-Token: <token>`.

## Деплой

Проект готов к деплою на Vercel. Инициализировать git → запушить → подключить в Vercel → задать переменные окружения из `.env.example`.
