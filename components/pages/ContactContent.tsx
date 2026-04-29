"use client";

import { useState } from "react";
import { Phone, Mail } from "lucide-react";
import type { LangSlug } from "@/lib/i18n";

const CONTENT: Record<LangSlug, {
  title: string;
  intro: string;
  formTitle: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  privacy: string;
  submit: string;
  successMsg: string;
  contactPerson: string;
}> = {
  tg: {
    title: "Бо мо тамос гиред!",
    intro: "Агар суоле доред, ё пешниҳоди ҷолибе ё ба шумо кумаки мо лозим аст, лутфан бо мо дар тамос шавед. Мо ҳамеша барои табодули назар ва ҷавоб ба суолҳои Шумо омодаем. Анҷумани фарҳангии Утриш ва Тоҷикистон ҳамеша дар хизмати Шумост!",
    formTitle: "Шакли ҷавоб",
    name: "Ном",
    email: "E-mail",
    subject: "Мавзӯъ",
    message: "Паём",
    privacy: "Ман бо коркард ва нигаҳдории маълумоти шахсиам розиям",
    submit: "Ирсол",
    successMsg: "Паёми шумо фиристода шуд. Ташаккур!",
    contactPerson: "Масъули тамос",
  },
  de: {
    title: "Sprechen Sie mit uns!",
    intro: "Nehmen Sie mit uns Kontakt auf, sprechen Sie mit uns, wir freuen uns schon sehr, von Ihnen zu hören und Ihnen mit Rat und Tat zur Seite stehen zu dürfen. Die Österreich-Tadschikische Kulturgemeinde ist für Sie da.",
    formTitle: "Kontaktformular",
    name: "Name",
    email: "E-Mail",
    subject: "Betreff",
    message: "Nachricht",
    privacy: "Ich stimme der Verarbeitung und Speicherung meiner personenbezogenen Daten zu",
    submit: "Senden",
    successMsg: "Ihre Nachricht wurde gesendet. Vielen Dank!",
    contactPerson: "Ihr Ansprechpartner",
  },
  en: {
    title: "Get in touch with us!",
    intro: "If you have any questions, interesting suggestions, or need our help, please contact us. We are always ready to exchange views and answer your questions. The Austrian-Tajik Cultural Association is at your service!",
    formTitle: "Contact Form",
    name: "Name",
    email: "Email",
    subject: "Subject",
    message: "Message",
    privacy: "I agree to the processing and storage of my personal data",
    submit: "Send",
    successMsg: "Your message has been sent. Thank you!",
    contactPerson: "Your contact",
  },
  ru: {
    title: "Свяжитесь с нами!",
    intro: "Если у вас есть вопросы, интересные предложения или вам нужна наша помощь, пожалуйста, свяжитесь с нами. Мы всегда готовы к обмену мнениями и ответам на ваши вопросы. Австрийско-Таджикская культурная ассоциация всегда к вашим услугам!",
    formTitle: "Форма обратной связи",
    name: "Имя",
    email: "E-mail",
    subject: "Тема",
    message: "Сообщение",
    privacy: "Я согласен на обработку и хранение персональных данных",
    submit: "Отправить",
    successMsg: "Ваше сообщение отправлено. Спасибо!",
    contactPerson: "Контактное лицо",
  },
};

export default function ContactContent({ lang }: { lang: LangSlug }) {
  const c = CONTENT[lang];
  const [submitted, setSubmitted] = useState(false);
  const [privacy, setPrivacy] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: подключить реальную отправку (Formspree, API route и т.д.)
    setSubmitted(true);
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-24 md:py-32">
      <h1 className="mb-6 font-display text-5xl font-light tracking-tight text-ink md:text-6xl">
        {c.title}
      </h1>
      <p className="mb-16 max-w-2xl text-lg leading-relaxed text-ink-soft">{c.intro}</p>

      <div className="grid gap-16 lg:grid-cols-2">
        {/* Form */}
        <section>
          <h2 className="mb-8 font-display text-2xl font-light text-ink">{c.formTitle}</h2>

          {submitted ? (
            <div className="rounded-lg border border-line bg-cream-dark px-8 py-10 text-center">
              <p className="text-lg text-ink">{c.successMsg}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-1.5 block text-[12px] uppercase tracking-[0.18em] text-muted">
                  {c.name} *
                </label>
                <input
                  type="text"
                  required
                  className="w-full border-b border-line bg-transparent py-2 text-[15px] text-ink outline-none transition focus:border-ink"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-[12px] uppercase tracking-[0.18em] text-muted">
                  {c.email} *
                </label>
                <input
                  type="email"
                  required
                  className="w-full border-b border-line bg-transparent py-2 text-[15px] text-ink outline-none transition focus:border-ink"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-[12px] uppercase tracking-[0.18em] text-muted">
                  {c.subject} *
                </label>
                <input
                  type="text"
                  required
                  className="w-full border-b border-line bg-transparent py-2 text-[15px] text-ink outline-none transition focus:border-ink"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-[12px] uppercase tracking-[0.18em] text-muted">
                  {c.message} *
                </label>
                <textarea
                  required
                  rows={5}
                  className="w-full border-b border-line bg-transparent py-2 text-[15px] text-ink outline-none transition focus:border-ink"
                />
              </div>
              <label className="flex cursor-pointer items-start gap-3 text-[13px] text-ink-soft">
                <input
                  type="checkbox"
                  required
                  checked={privacy}
                  onChange={(e) => setPrivacy(e.target.checked)}
                  className="mt-0.5 shrink-0 accent-burgundy"
                />
                {c.privacy}
              </label>
              <button
                type="submit"
                className="rounded-full bg-ink px-8 py-3 text-[12px] uppercase tracking-[0.22em] text-cream transition hover:bg-burgundy"
              >
                {c.submit}
              </button>
            </form>
          )}
        </section>

        {/* Contact info */}
        <section className="lg:pt-14">
          <h2 className="mb-6 text-[11px] uppercase tracking-[0.28em] text-burgundy">
            {c.contactPerson}
          </h2>
          <p className="mb-6 font-display text-2xl text-ink">Abdulchair Turaev</p>
          <ul className="space-y-4 text-[15px] text-ink-soft">
            <li className="flex items-center gap-3">
              <Phone size={16} strokeWidth={1.5} className="shrink-0 text-muted" />
              <a href="tel:+436764510202" className="transition hover:text-burgundy">
                +43 676 451 0202
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={16} strokeWidth={1.5} className="shrink-0 text-muted" />
              <a href="tel:+4366565830000" className="transition hover:text-burgundy">
                +43 6656 5830 000
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={16} strokeWidth={1.5} className="shrink-0 text-muted" />
              <a href="mailto:contact@oetk.org" className="transition hover:text-burgundy">
                contact@oetk.org
              </a>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
