import type { LangSlug } from "@/lib/i18n";

const CONTENT: Record<LangSlug, { title: string; subtitle: string; body: string[] }> = {
  tg: {
    title: "Сайёҳат ба Тоҷикистон",
    subtitle: "Ба сарзамини куҳҳои баланду водиҳаҳои дилрабо сафар кунед",
    body: [
      "Ҳамроҳи Анҷумани фарҳангии Австрия ва Тоҷикистон ба кишваре аз қаторкӯҳҳои сарбафалак ва водиҳои шукуфон, сафар кунед. Бо меҳмоннавозии гарм, сафар қад-қади Роҳи Абрешим, бо роҳҳои зебову афсонавии куҳӣ шуморо интизор аст.",
      "ÖTK метавонад бо истифода аз имконоти худ, аз қабили алоқаҳои гуногуни ҷамъиятӣ ва инфиродии худ саёҳати хотирмоне барои шумо ташкил кунад. Ба Тоҷикистон сафар кунед ва аз меҳмоннавозии тоҷикон лаззат баред!",
    ],
  },
  de: {
    title: "Reisen in Tadschikistan",
    subtitle: "Reisen in ein Land von hohen Bergen und tiefen Tälern",
    body: [
      "Die Österreich-Tadschikische Kulturgemeinde ist bereit, jedem zu helfen, der nach Tadschikistan reisen möchte. Nach Tadschikistan, das mit seinen majestätischen Bergketten und wohlhabenden Tälern das Herz jedes Reisenden erobern wird. Herzliche Gastfreundschaft, eine Reise entlang der Seidenstraße mit wunderschönen und legendären Bergstraßen erwartet Sie.",
      "Der ÖTK kann mit seinen Möglichkeiten, wie zum Beispiel seinen vielfältigen öffentlichen und privaten Kontakten, eine unvergessliche Reise für Sie organisieren. Besuchen Sie Tadschikistan und genießen Sie die tadschikische Gastfreundschaft!",
    ],
  },
  en: {
    title: "Travel to Tajikistan",
    subtitle: "Journey to lands of high mountains and captivating valleys",
    body: [
      "Travel with the Austrian-Tajik Cultural Association to a country of soaring mountain ranges and blooming valleys. Warm hospitality, a journey along the Silk Road with beautiful and legendary mountain roads awaits you.",
      "ÖTK can use its possibilities — including its diverse public and private contacts — to organize an unforgettable trip for you. Visit Tajikistan and enjoy Tajik hospitality!",
    ],
  },
  ru: {
    title: "Путешествие в Таджикистан",
    subtitle: "В страну высоких гор и живописных долин",
    body: [
      "Вместе с Австрийско-Таджикской культурной ассоциацией отправьтесь в страну горных хребтов и цветущих долин. Тёплое гостеприимство, путешествие вдоль Шёлкового пути по красивым легендарным горным дорогам — всё это ждёт вас.",
      "ÖTK с помощью своих возможностей — разнообразных общественных и личных контактов — может организовать для вас незабываемое путешествие. Посетите Таджикистан и насладитесь таджикским гостеприимством!",
    ],
  },
};

export default function ProjectsContent({ lang }: { lang: LangSlug }) {
  const c = CONTENT[lang];
  return (
    <div className="mx-auto max-w-4xl px-6 py-24 md:py-32">
      <p className="mb-4 text-[11px] uppercase tracking-[0.28em] text-burgundy">
        {lang === "tg" ? "Лоиҳаҳо" : lang === "de" ? "Projekte" : lang === "en" ? "Projects" : "Проекты"}
      </p>
      <h1 className="mb-6 font-display text-5xl font-light tracking-tight text-ink md:text-6xl">
        {c.title}
      </h1>
      <p className="mb-12 text-xl font-light text-ink-soft">{c.subtitle}</p>
      <div className="space-y-6">
        {c.body.map((p, i) => (
          <p key={i} className="text-lg leading-relaxed text-ink-soft">{p}</p>
        ))}
      </div>
    </div>
  );
}
