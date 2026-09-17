import { redirect } from "next/navigation";
import { isAuthLocale } from "@/components/auth/i18n";

export default async function LocalePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  redirect(`/${isAuthLocale(locale) ? locale : "id"}/login`);
}
