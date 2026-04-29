"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MapPin, Phone, Mail } from "lucide-react";
import { MENU, STRINGS, detectLang } from "@/lib/i18n";

// Те же соцсети что у вас на Joomla. URL подставите прямо в этом файле.
const SOCIALS = [
  { label: "Facebook", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "YouTube", href: "#" },
  { label: "X / Twitter", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Pinterest", href: "#" },
];

// Контакты. Адрес — placeholder; поправьте на реальный почтовый.
const CONTACT = {
  address: "Wien, Österreich",
  phone: "+43 6656 5830 000",
  email: "contact@oetk.org",
};

export default function Footer() {
  const pathname = usePathname() ?? "/";
  const lang = detectLang(pathname);
  const t = STRINGS[lang];
  const menu = MENU[lang];

  return (
    <footer className="bg-ink text-cream/85">
      {/* Top accent line */}
      <div className="mx-auto h-px max-w-7xl bg-gradient-to-r from-transparent via-gold-soft/40 to-transparent" />

      {/* Brand block — крупный, заметный */}
      <div className="mx-auto max-w-7xl px-6 pt-20 pb-12">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Link href={lang === "tg" ? "/" : `/${lang}`} className="inline-block">
              <Image
                src="/logo-gold.png"
                alt="ÖTK"
                width={160}
                height={160}
                className="h-24 w-auto"
                unoptimized
              />
            </Link>
            <p className="mt-4 max-w-xl font-display text-2xl font-light leading-snug text-cream/80 md:text-3xl">
              {t.fullName}
            </p>
          </div>

          <div className="lg:col-span-5 lg:pt-4">
            <p className="mb-4 text-[11px] uppercase tracking-[0.28em] text-gold-soft">
              {t.follow}
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-3 text-[13px] uppercase tracking-[0.2em]">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="text-cream/70 transition hover:text-gold-soft"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-auto max-w-7xl px-6">
        <div className="h-px bg-cream/10" />
      </div>

      {/* Three columns: sitemap / contact / legal */}
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Sitemap */}
          <div>
            <h4 className="mb-6 text-[11px] uppercase tracking-[0.28em] text-gold-soft">
              {t.sitemap}
            </h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-3 text-[14px]">
              {menu.map((item, i) => (
                <li key={i}>
                  <Link
                    href={item.href}
                    className="text-cream/70 transition hover:text-cream"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-6 text-[11px] uppercase tracking-[0.28em] text-gold-soft">
              {t.contact}
            </h4>
            <ul className="space-y-4 text-[14px] text-cream/70">
              <li className="flex items-start gap-3">
                <MapPin
                  size={14}
                  strokeWidth={1.5}
                  className="mt-1 shrink-0 text-cream/50"
                />
                <span>{CONTACT.address}</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone
                  size={14}
                  strokeWidth={1.5}
                  className="mt-1 shrink-0 text-cream/50"
                />
                <a
                  href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                  className="transition hover:text-cream"
                >
                  {CONTACT.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail
                  size={14}
                  strokeWidth={1.5}
                  className="mt-1 shrink-0 text-cream/50"
                />
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="transition hover:text-cream"
                >
                  {CONTACT.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-6 text-[11px] uppercase tracking-[0.28em] text-gold-soft">
              {t.legal}
            </h4>
            <ul className="space-y-3 text-[14px]">
              <li>
                <Link
                  href="/impressum"
                  className="text-cream/70 transition hover:text-cream"
                >
                  {t.imprint}
                </Link>
              </li>
              <li>
                <Link
                  href="/datenschutz"
                  className="text-cream/70 transition hover:text-cream"
                >
                  {t.privacy}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-6 py-6 text-[11px] uppercase tracking-[0.22em] text-cream/40 md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} ÖTK · Wien</span>
          <span>{t.rights}</span>
        </div>
      </div>
    </footer>
  );
}
