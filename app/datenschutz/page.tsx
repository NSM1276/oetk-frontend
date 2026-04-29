export const metadata = { title: "Datenschutzerklärung — ÖTK" };

export default function DatenschutzPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24 md:py-32">
      <h1 className="mb-12 font-display text-5xl font-light tracking-tight text-ink">
        Datenschutzerklärung
      </h1>

      <div className="space-y-12 text-[15px] leading-relaxed text-ink-soft">

        <section>
          <h2 className="mb-4 font-display text-2xl font-light text-ink">1. Verantwortlicher</h2>
          <p>
            Verantwortlich für die Datenverarbeitung auf dieser Website ist:
          </p>
          <div className="mt-3 space-y-1">
            <p className="text-ink">Österreich-Tadschikische Kulturgemeinde</p>
            <p>Barawitzkagasse 32/8-10, 1190 Wien</p>
            <p>
              E-Mail:{" "}
              <a href="mailto:contact@oetk.org" className="transition hover:text-burgundy">
                contact@oetk.org
              </a>
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-4 font-display text-2xl font-light text-ink">2. Hosting — Vercel</h2>
          <p>
            Diese Website wird gehostet von{" "}
            <strong className="text-ink">Vercel Inc.</strong>, 340 Pine Street Suite 701,
            San Francisco, CA 94104, USA.
          </p>
          <p className="mt-3">
            Bei jedem Aufruf der Website verarbeitet Vercel technisch notwendige Zugriffsdaten
            (IP-Adresse, Browsertyp, Betriebssystem, aufgerufene Seite, Datum und Uhrzeit des
            Zugriffs). Diese Daten werden in Server-Logs gespeichert und dienen der
            Sicherstellung des Betriebs sowie der Sicherheit der Website.
          </p>
          <p className="mt-3">
            Die Übermittlung in die USA erfolgt auf Grundlage der EU-Standardvertragsklauseln
            (Art. 46 Abs. 2 lit. c DSGVO). Weitere Informationen entnehmen Sie der
            Datenschutzerklärung von Vercel:{" "}
            <a
              href="https://vercel.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-burgundy underline"
            >
              vercel.com/legal/privacy-policy
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="mb-4 font-display text-2xl font-light text-ink">3. Kontaktformular</h2>
          <p>
            Wenn Sie uns über das Kontaktformular eine Nachricht senden, werden die von Ihnen
            eingegebenen Daten (Name, E-Mail-Adresse, Betreff, Nachricht) ausschließlich zum
            Zweck der Bearbeitung Ihrer Anfrage verarbeitet.
          </p>
          <p className="mt-3">
            Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung) bzw.
            Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung von Anfragen).
          </p>
          <p className="mt-3">
            Die Daten werden nicht an Dritte weitergegeben und nach abschließender Bearbeitung
            Ihrer Anfrage gelöscht, sofern keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
          </p>
        </section>

        <section>
          <h2 className="mb-4 font-display text-2xl font-light text-ink">4. Cookies und Tracking</h2>
          <p>
            Diese Website verwendet <strong className="text-ink">keine</strong> Tracking-Cookies,
            keine Analyse-Tools (z. B. Google Analytics) und keine Social-Media-Pixel.
            Es werden lediglich technisch notwendige Funktionen eingesetzt, die für den
            Betrieb der Website erforderlich sind.
          </p>
        </section>

        <section>
          <h2 className="mb-4 font-display text-2xl font-light text-ink">5. Ihre Rechte</h2>
          <p>Sie haben gemäß DSGVO folgende Rechte:</p>
          <ul className="mt-3 space-y-2">
            {[
              "Auskunft über Ihre gespeicherten Daten (Art. 15 DSGVO)",
              "Berichtigung unrichtiger Daten (Art. 16 DSGVO)",
              "Löschung Ihrer Daten (Art. 17 DSGVO)",
              "Einschränkung der Verarbeitung (Art. 18 DSGVO)",
              "Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)",
              "Datenübertragbarkeit (Art. 20 DSGVO)",
            ].map((r, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-burgundy" />
                {r}
              </li>
            ))}
          </ul>
          <p className="mt-4">
            Zur Ausübung Ihrer Rechte wenden Sie sich bitte an:{" "}
            <a href="mailto:contact@oetk.org" className="transition hover:text-burgundy">
              contact@oetk.org
            </a>
          </p>
        </section>

        <section>
          <h2 className="mb-4 font-display text-2xl font-light text-ink">6. Beschwerderecht</h2>
          <p>
            Sie haben das Recht, sich bei der österreichischen Datenschutzbehörde zu beschweren:
          </p>
          <div className="mt-3 space-y-1">
            <p className="text-ink">Datenschutzbehörde</p>
            <p>Barichgasse 40-42, 1030 Wien</p>
            <p>
              <a
                href="https://www.dsb.gv.at"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-burgundy underline"
              >
                www.dsb.gv.at
              </a>
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}
