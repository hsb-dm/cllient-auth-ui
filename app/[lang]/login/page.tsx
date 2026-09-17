import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LoginPageView } from "@/components/auth";
import { hasLocale, i18n } from "@/i18n-config";
import { getDictionary } from "../dictionaries";

type PageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const locale = hasLocale(lang) ? lang : i18n.defaultLocale;
  const dictionary = await getDictionary(locale);
  return {
    ...dictionary.metadata.login,
    alternates: {
      languages: { id: "/id/login", en: "/en/login" },
    },
  };
}

export default async function LoginPage({ params }: PageProps) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const dictionary = await getDictionary(lang);
  return <LoginPageView locale={lang} dictionary={dictionary} />;
}
