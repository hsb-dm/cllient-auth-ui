import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ForgetPasswordPageView } from "@/components/auth";
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
    ...dictionary.metadata.forgetPassword,
    alternates: {
      languages: { id: "/id/forget-password", en: "/en/forget-password" },
    },
  };
}

export default async function ForgetPasswordPage({ params }: PageProps) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const dictionary = await getDictionary(lang);
  return <ForgetPasswordPageView locale={lang} dictionary={dictionary} />;
}
