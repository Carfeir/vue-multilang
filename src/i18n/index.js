import { createI18n } from "vue-i18n";
import pluralRules from "./rules/pluralization";
import numberFormats from "./rules/numbers.js";
import datetimeFormats from "./rules/datetime.js";
import es from "./locales/es.json";

export default createI18n({
  // setting the default locale (language) for our application.
  // Its value will be fetched from the environment variable that we’ll add in a moment.
  // All environment variables must start with the VITE_ prefix.
  locale: import.meta.env.VITE_DEFAULT_LOCALE,
  // adding a fallback locale. If translations for the currently set locale are unavailable, Vue will try to read values from the fallback locale instead.
  fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE,
  // Setting the legacy parameter is very important to ensuring that the i18n plugin properly works with Vue 3.
  legacy: false,
  // all views and components have access to $t function (no longer be necessary to import manually).
  globalInjection: true,
  messages: {
    es
  },
  runtimeOnly: false,
  pluralRules, // to change words when they are plurals
  numberFormats,
  datetimeFormats,
});
