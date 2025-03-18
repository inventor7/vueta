import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import {
  loadLocaleMessages,
  setI18nLanguage,
  SUPPORT_LOCALES,
  type LanguageCode,
  setupI18n,
  i18n,
} from "@/plugins/i18n";
import { useLanguageStore } from "@/stores/useLanguageStore";

export const useLanguageGuard = async (
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const languageStore = useLanguageStore();

  const { defaultLocale, currentLanguage, direction, languages } =
    storeToRefs(languageStore);

  const paramsLocale = to.params.locale as LanguageCode | undefined;

  if (!paramsLocale) {
    return next(`/${defaultLocale.value}${to.fullPath}`);
  }

  if (!SUPPORT_LOCALES.includes(paramsLocale)) {
    return next(`/${defaultLocale.value}${to.fullPath}`);
  }

  if (!i18n.global.availableLocales.includes(paramsLocale)) {
    await loadLocaleMessages(i18n, paramsLocale);
  }

  setI18nLanguage(i18n, paramsLocale);
  currentLanguage.value = paramsLocale;
  direction.value = languages.value[paramsLocale].dir;

  return next();
};

export { i18n };
