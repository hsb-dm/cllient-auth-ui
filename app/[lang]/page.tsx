import { redirect } from "next/navigation";
import { hasLocale, i18n } from "@/i18n-config";

export default async function LocalePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = hasLocale(lang) ? lang : i18n.defaultLocale;

  redirect(`/${locale}/login`);
}
