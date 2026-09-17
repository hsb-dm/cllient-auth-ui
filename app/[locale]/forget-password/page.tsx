import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ForgetPasswordPageView } from "@/components/auth";
import { getAuthDictionary, isAuthLocale } from "@/components/auth/i18n";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const dictionary = getAuthDictionary(isAuthLocale(locale) ? locale : "id");
  return dictionary.metadata.forgetPassword;
}

export default async function ForgetPasswordPage({ params }: PageProps) {
  const { locale } = await params;

  if (!isAuthLocale(locale)) {
    notFound();
  }

  return <ForgetPasswordPageView locale={locale} />;
}
