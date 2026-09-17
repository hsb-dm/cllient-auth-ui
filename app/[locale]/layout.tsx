import { notFound } from "next/navigation";
import {
  authLocales,
  isAuthLocale,
} from "@/components/auth/i18n";

export function generateStaticParams() {
  return authLocales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!isAuthLocale(locale)) {
    notFound();
  }

  return <div lang={locale}>{children}</div>;
}
