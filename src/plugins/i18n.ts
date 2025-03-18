import { createI18n } from "vue-i18n";
import { nextTick } from "vue";

export type LanguageCode = "en" | "fr" | "ar";

export const SUPPORT_LOCALES = ["en", "fr", "ar"] as const;

export const i18n = setupI18n("en");
export function setupI18n(locale: LanguageCode) {
  const i18n = createI18n({
    legacy: false,
    locale: locale,
    fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE,
    messages: {},
  });

  setI18nLanguage(i18n, locale);
  return i18n;
}

export function setI18nLanguage(i18n: any, locale: LanguageCode) {
  if (i18n.mode === "composition") {
    i18n.global.locale.value = locale;
  } else {
    i18n.global.locale = locale;
  }

  document.querySelector("html")?.setAttribute("lang", locale);
}

export async function loadLocaleMessages(i18n: any, locale: LanguageCode) {
  const messages = await import(`../locales/${locale}.json`);

  i18n.global.setLocaleMessage(locale, messages.default);

  return nextTick();
}

export function getI18n(i18n: any) {
  return i18n;
}
