import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, i18n } from "@/i18n-config";
import "../globals.css";

export const metadata: Metadata = {
  title: "HSB",
  description: "HSB authentication",
};

export function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  return (
    <html lang={lang}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
