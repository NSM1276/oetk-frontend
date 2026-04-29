"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Search, Menu, Phone, Mail, X } from "lucide-react";
import { useState } from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { MENU, detectLang } from "@/lib/i18n";

// Контакты — те что у вас на текущем Joomla-сайте.
// Можно поменять прямо в этом файле.
const CONTACT = {
  phone: "+43 6656 5830 000",
  email: "contact@oetk.org",
};

export default function Header() {
  const pathname = usePathname() ?? "/";
  const lang = detectLang(pathname);
  const navItems = MENU[lang];
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line bg-cream/85 backdrop-blur-md">
        {/* Topbar */}
        <div className="border-b border-line/70">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-2 text-[11px] uppercase tracking-[0.18em] text-muted">
            <div className="flex items-center gap-5">
              <a
                href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                className="hidden items-center gap-2 transition hover:text-burgundy md:inline-flex"
              >
                <Phone size={12} strokeWidth={1.5} />
                {CONTACT.phone}
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                className="hidden items-center gap-2 transition hover:text-burgundy md:inline-flex"
              >
                <Mail size={12} strokeWidth={1.5} />
                {CONTACT.email}
              </a>
            </div>
            <LanguageSwitcher />
          </div>
        </div>

        {/* Main nav */}
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-6 py-5">
          <Link href={lang === "tg" ? "/" : `/${lang}`} className="flex items-center gap-3">
            <Image
              src="/logo-gold.png"
              alt="ÖTK"
              width={120}
              height={120}
              className="h-12 w-auto"
              priority
              unoptimized
            />
            <span className="hidden text-[10px] uppercase tracking-[0.25em] text-muted lg:inline leading-relaxed">
              Österreichisch–Tadschikische
              <br />
              Kulturgemeinde
            </span>
          </Link>

          <nav className="hidden items-center gap-6 text-[13px] text-ink-soft xl:flex">
            {navItems.map((item, i) => (
              <Link
                key={i}
                href={item.href}
                className="relative py-1 transition hover:text-burgundy"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              aria-label="Search"
              className="rounded-full p-2 text-ink-soft transition hover:bg-cream-dark hover:text-ink"
            >
              <Search size={18} strokeWidth={1.5} />
            </button>
            <button
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
              className="rounded-full p-2 text-ink-soft transition hover:bg-cream-dark hover:text-ink xl:hidden"
            >
              <Menu size={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 xl:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />

          {/* Drawer panel */}
          <div className="absolute right-0 top-0 flex h-full w-80 max-w-full flex-col bg-cream shadow-2xl">
            {/* Panel header */}
            <div className="flex items-center justify-between border-b border-line px-6 py-5">
              <Image
                src="/logo-gold.png"
                alt="ÖTK"
                width={80}
                height={80}
                className="h-10 w-auto"
                unoptimized
              />
              <button
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
                className="rounded-full p-2 text-ink-soft transition hover:bg-cream-dark hover:text-ink"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            {/* Nav items */}
            <nav className="flex-1 overflow-y-auto px-4 py-6">
              <ul className="space-y-1">
                {navItems.map((item, i) => (
                  <li key={i}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-lg px-4 py-3 text-[15px] text-ink-soft transition hover:bg-cream-dark hover:text-burgundy"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Panel footer — language switcher + contacts */}
            <div className="space-y-4 border-t border-line px-6 py-6">
              <LanguageSwitcher />
              <div className="space-y-2 text-[13px] text-muted">
                <a
                  href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-2 transition hover:text-burgundy"
                >
                  <Phone size={13} strokeWidth={1.5} />
                  {CONTACT.phone}
                </a>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="flex items-center gap-2 transition hover:text-burgundy"
                >
                  <Mail size={13} strokeWidth={1.5} />
                  {CONTACT.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
