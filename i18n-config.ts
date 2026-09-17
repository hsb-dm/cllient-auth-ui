export const i18n = {
  defaultLocale: "id",
  locales: ["id", "en"],
} as const;

export type Locale = (typeof i18n.locales)[number];

export function hasLocale(value: string): value is Locale {
  return i18n.locales.includes(value as Locale);
}
