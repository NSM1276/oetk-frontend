import type { LangSlug } from "@/lib/i18n";

const FACTS = [
  { label: { tg: "Қитъа", de: "Kontinent", en: "Continent", ru: "Континент" }, value: { tg: "Осиё", de: "Asien", en: "Asia", ru: "Азия" } },
  { label: { tg: "Масоҳат", de: "Größe", en: "Area", ru: "Площадь" }, value: { tg: "143 095 км²", de: "143 095 km²", en: "143 095 km²", ru: "143 095 км²" } },
  { label: { tg: "Пойтахт", de: "Hauptstadt", en: "Capital", ru: "Столица" }, value: { tg: "Душанбе", de: "Duschanbe", en: "Dushanbe", ru: "Душанбе" } },
  { label: { tg: "Аҳолӣ", de: "Einwohnerzahl", en: "Population", ru: "Население" }, value: { tg: "10,1 млн", de: "10,1 Mio", en: "10.1 million", ru: "10,1 млн" } },
  { label: { tg: "Зичии аҳолӣ", de: "Einwohnerdichte", en: "Pop. density", ru: "Плотность" }, value: { tg: "70 нафар/км²", de: "70 pro km²", en: "70 per km²", ru: "70 чел/км²" } },
  { label: { tg: "Забони расмӣ", de: "Landessprache", en: "Official language", ru: "Язык" }, value: { tg: "Тоҷикӣ, Русӣ", de: "Tadschikisch, Russisch", en: "Tajik, Russian", ru: "Таджикский, Русский" } },
  { label: { tg: "Асъор", de: "Währung", en: "Currency", ru: "Валюта" }, value: { tg: "Сомонӣ", de: "Somoni", en: "Somoni", ru: "Сомони" } },
];

const CONTENT: Record<LangSlug, { title: string; subtitle: string; body: string }> = {
  tg: {
    title: "Тоҷикистон",
    subtitle: "Тоҷикистон: Факту рақамҳо",
    body: "Тоҷикистон кишварест дар Осиёи Марказӣ, ки аз тарафи Афғонистон, Хитой, Қирғизистон ва Ӯзбекистон иҳота шудааст. Тақрибан 90 фисади қаламрави он кӯҳӣ буда, аз Ҳимолой ба ғарб тӯл кашидааст. Кӯҳҳои Фан дар шимол бо қуллаҳое зиёда аз 5 000 метр ва баландтарин нуқта — қӯҳи Сомонӣ бо баландии 7 495 метр — иборатанд. Дарёчаҳои машҳур: Искандаркӯл, Алоуддин, Ҳафткӯл ва Кулӣколон.",
  },
  de: {
    title: "Tadschikistan",
    subtitle: "Tadschikistan: Fakten und Zahlen",
    body: "Tadschikistan ist ein Land in Zentralasien, das von Afghanistan, China, Kirgisistan und Usbekistan umgeben ist. Etwa 90 % des Territoriums ist gebirgig und erstreckt sich westlich vom Himalaya. Die Fan-Berge im Norden mit schneebedeckten Gipfeln über 5.000 Metern und dem höchsten Punkt Somoni mit 7.495 Metern sind besonders bemerkenswert. Bekannte Seen: Iskanderkul, Alovudinkul, Haftkul und Kulikalon im Nordwesten sowie Sarez, Zorkul, Yashikul und Karakul im Pamir.",
  },
  en: {
    title: "Tajikistan",
    subtitle: "Tajikistan: Facts and Figures",
    body: "Tajikistan is a country in Central Asia, bordered by Afghanistan, China, Kyrgyzstan and Uzbekistan. Approximately 90% of the territory is mountainous, extending westward from the Himalayas. The Fan Mountains in the north feature snow-capped peaks exceeding 5,000 metres, with the highest point — Mount Somoni at 7,495 metres. Notable lakes include Iskandarkul, Alovudinkul, Haftkul and Kulikalon in the northwest, and Sarez, Zorkul, Yashikul and Karakul in the Pamirs.",
  },
  ru: {
    title: "Таджикистан",
    subtitle: "Таджикистан: факты и цифры",
    body: "Таджикистан — страна в Центральной Азии, граничащая с Афганистаном, Китаем, Кыргызстаном и Узбекистаном. Около 90% территории горное, простираясь на запад от Гималаев. Фанские горы на севере с заснеженными вершинами свыше 5 000 м и высшая точка — пик Сомони (7 495 м). Известные озёра: Искандеркуль, Алауддин, Хафткуль и Куликалон на северо-западе, Сарез, Зоркуль, Яшилькуль и Каракуль на Памире.",
  },
};

export default function TajikistanContent({ lang }: { lang: LangSlug }) {
  const c = CONTENT[lang];
  return (
    <div className="mx-auto max-w-4xl px-6 py-24 md:py-32">
      <h1 className="mb-4 font-display text-5xl font-light tracking-tight text-ink md:text-6xl">
        {c.title}
      </h1>
      <p className="mb-10 text-xl font-light text-ink-soft">{c.subtitle}</p>
      <p className="mb-16 text-lg leading-relaxed text-ink-soft">{c.body}</p>

      {/* Facts table */}
      <div className="overflow-hidden rounded-lg border border-line">
        {FACTS.map((fact, i) => (
          <div
            key={i}
            className={`flex items-baseline gap-4 px-6 py-4 ${i % 2 === 0 ? "bg-cream" : "bg-cream-dark"}`}
          >
            <span className="w-48 shrink-0 text-[12px] uppercase tracking-[0.18em] text-muted">
              {fact.label[lang]}
            </span>
            <span className="text-[15px] text-ink">{fact.value[lang]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
