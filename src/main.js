import { createApp } from "vue/dist/vue.esm-bundler"; // <--- 1
import App from "./App.vue";
import router from "./router";
import i18n from "./i18n"; // <--- 2

createApp(App)
  .use(router)
  .use(i18n) // <--- 3
  .mount("#app");

// 1. I’m using an ESM bundler to get rid of some annoying warnings in the console and for general optimization.
// 2. Import the I18n object.
// 3. Use the I18n plugin when mounting the app.
