import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RegisterPageView } from "@/components/auth";
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
    ...dictionary.metadata.register,
    alternates: {
      languages: { id: "/id/register", en: "/en/register" },
    },
  };
}

export default async function RegisterPage({ params }: PageProps) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const dictionary = await getDictionary(lang);
  return <RegisterPageView locale={lang} dictionary={dictionary} />;
}
