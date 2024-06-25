/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

import { registerPlugins } from '@/plugins'
import App from './App.vue'
import store from './store'
import { createApp } from 'vue'
import { loadFonts } from "./plugins/webfontloader";
import VueTheMask from "vue-the-mask";

async function prepareApp() {
  if (
    process.env.NODE_ENV === "development" ||
    process.env.NODE_ENV === "test"
  ) {
    const { worker } = await import("../mocks/browser.js");
    await worker.start();
  }
}

async function initializeApp() {
  await prepareApp();

  loadFonts();
  const app = createApp(App)

  registerPlugins(app);
  app.use(store).use(VueTheMask).mount("#app");
}

initializeApp();
