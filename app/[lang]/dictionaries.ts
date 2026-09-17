import "server-only";
import type { AuthDictionary } from "@/components/auth/i18n";
import type { Locale } from "@/i18n-config";

const dictionaries: Record<Locale, () => Promise<AuthDictionary>> = {
  id: () => import("./dictionaries/id.json").then((module) => module.default),
  en: () => import("./dictionaries/en.json").then((module) => module.default),
};

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]();
}
