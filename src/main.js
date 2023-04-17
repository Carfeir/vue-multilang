import { createApp } from "vue/dist/vue.esm-bundler"; // to get rid of some annoying warnings in the console and for general optimization
import App from "./App.vue";
import router from "./router";
import i18n from "./i18n"; // Import the I18n object

createApp(App)
  .use(router)
  .use(i18n) // Use the I18n plugin when mounting the app.
  .mount("#app");
