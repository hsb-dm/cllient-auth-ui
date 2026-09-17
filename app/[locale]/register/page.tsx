import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RegisterPageView } from "@/components/auth";
import { getAuthDictionary, isAuthLocale } from "@/components/auth/i18n";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const dictionary = getAuthDictionary(isAuthLocale(locale) ? locale : "id");
  return dictionary.metadata.register;
}

export default async function RegisterPage({ params }: PageProps) {
  const { locale } = await params;

  if (!isAuthLocale(locale)) {
    notFound();
  }

  return <RegisterPageView locale={locale} />;
}
