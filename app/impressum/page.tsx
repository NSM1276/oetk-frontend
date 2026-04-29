export const metadata = { title: "Impressum — ÖTK" };

export default function ImpressumPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24 md:py-32">
      <h1 className="mb-12 font-display text-5xl font-light tracking-tight text-ink">
        Impressum
      </h1>

      <div className="space-y-8 text-[15px] leading-relaxed text-ink-soft">
        <section>
          <p className="mb-1 text-ink font-medium">Österreich-Tadschikische Kulturgemeinde</p>
          <p>ZVR-Zahl 1076481769</p>
        </section>

        <section>
          <p className="mb-2 text-[11px] uppercase tracking-[0.22em] text-burgundy">
            Verantwortlich im Sinne des Pressegesetzes
          </p>
          <p className="text-ink font-medium">Abdulchair Turaev</p>
          <p>Vorstandsvorsitzender der Österreich-Tadschikischen Kulturgemeinde</p>
        </section>

        <section>
          <p className="mb-2 text-[11px] uppercase tracking-[0.22em] text-burgundy">Adresse</p>
          <p>Barawitzkagasse 32/8-10</p>
          <p>1190 Wien</p>
        </section>

        <section>
          <p className="mb-2 text-[11px] uppercase tracking-[0.22em] text-burgundy">Kontakt</p>
          <p>
            Telefon:{" "}
            <a href="tel:+436656583000" className="transition hover:text-burgundy">
              +43 665 65 83 0000
            </a>
          </p>
          <p>
            E-Mail:{" "}
            <a href="mailto:contact@oetk.org" className="transition hover:text-burgundy">
              contact@oetk.org
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
