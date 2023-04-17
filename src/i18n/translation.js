import i18n from "@/i18n";
import { nextTick } from "vue";

const Trans = {
  get defaultLocale() {
    return import.meta.env.VITE_DEFAULT_LOCALE;
  },

  get supportedLocales() {
    return import.meta.env.VITE_SUPPORTED_LOCALES.split(",");
  },

  get currentLocale() {
    return i18n.global.locale.value;
  },

  set currentLocale(newLocale) {
    // setter that switches the locale globally
    i18n.global.locale.value = newLocale;
  },

  async switchLanguage(newLocale) {
    // accepts the newly chosen locale and uses the setter. It also adjusts the lang attribute for the html tag.
    await Trans.loadLocaleMessages(newLocale);
    Trans.currentLocale = newLocale;
    document.querySelector("html").setAttribute("lang", newLocale);
    localStorage.setItem("user-locale", newLocale);
  },

  async loadLocaleMessages(locale) {
    if (!i18n.global.availableLocales.includes(locale)) {
      // Check whether the files have already been loaded previously
      const messages = await import(`@/i18n/locales/${locale}.json`);
      i18n.global.setLocaleMessage(locale, messages.default);
    }

    return nextTick();
  },

  isLocaleSupported(locale) {
    // checks whether the locale is present in the list of all the available locales
    return Trans.supportedLocales.includes(locale);
  },

  getUserLocale() {
    // read preferred language sent by browser.
    // return this language in two “flavors”: with and without the region code.
    // locales might contain the region part written in the following way: en-US, ru-RU, fr-BE, and so on.
    // The region part represents a country or region where the language is spoken because sometimes the differences are quite significant
    // (compare US English to British English, for instance). To cover both scenarios, we’ll compare the preferred
    // language with and without the region code to understand whether we can support it or not.
    const locale =
      window.navigator.language ||
      window.navigator.userLanguage ||
      Trans.defaultLocale;

    return {
      locale: locale,
      localeNoRegion: locale.split("-")[0],
    };
  },

  getPersistedLocale() {
    // reads the local storage and checks whether the persisted locale is supported by the app.
    const persistedLocale = localStorage.getItem("user-locale");

    if (Trans.isLocaleSupported(persistedLocale)) {
      return persistedLocale;
    } else {
      return null;
    }
  },

  guessDefaultLocale() {
    const userPersistedLocale = Trans.getPersistedLocale();
    if (userPersistedLocale) {
      return userPersistedLocale;
    }

    const userPreferredLocale = Trans.getUserLocale();

    if (Trans.isLocaleSupported(userPreferredLocale.locale)) {
      return userPreferredLocale.locale;
    }

    if (Trans.isLocaleSupported(userPreferredLocale.localeNoRegion)) {
      return userPreferredLocale.localeNoRegion;
    }

    return Trans.defaultLocale;
  },

  async routeMiddleware(to, _from, next) {
    const paramLocale = to.params.locale;

    if (!Trans.isLocaleSupported(paramLocale)) {
      return next(Trans.guessDefaultLocale());
    }

    await Trans.switchLanguage(paramLocale);

    return next();
  },

  i18nRoute(to) {
    return {
      ...to,
      params: {
        locale: Trans.currentLocale,
        ...to.params,
      },
    };
  },
};

export default Trans;
