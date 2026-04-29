import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackgroundOrnaments from "@/components/BackgroundOrnaments";
import { detectLang } from "@/lib/i18n";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin", "latin-ext"],
  axes: ["opsz", "SOFT"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ÖTK — Österreichisch-Tadschikische Kulturgemeinde",
  description:
    "Пули фарҳангӣ миёни Австрия ва Тоҷикистон. Чорабиниҳо, лоиҳаҳо, ҷамъият.",
  openGraph: {
    title: "ÖTK — Österreichisch-Tadschikische Kulturgemeinde",
    description:
      "Пули фарҳангӣ миёни Австрия ва Тоҷикистон. Чорабиниҳо, лоиҳаҳо, ҷамъият.",
    images: [
      {
        url: "/logo-og.png",
        width: 800,
        height: 800,
        alt: "ÖTK — Österreichisch-Tadschikische Kulturgemeinde",
      },
    ],
    siteName: "ÖTK",
  },
  twitter: {
    card: "summary",
    images: ["/logo-og.png"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") ?? "/";
  const lang = detectLang(pathname);

  return (
    <html
      lang={lang}
      className={`${fraunces.variable} ${inter.variable} h-full`}
    >
      <body className="flex min-h-full flex-col text-ink">
        <BackgroundOrnaments />
        <Header />
        <main className="relative flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
