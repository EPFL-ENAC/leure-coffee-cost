import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import "./style.css";
import router from "./router";
import App from "./App.vue";
import { loadDataset } from "./config/dataset";

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);

// The router and the data URLs need the dataset, so it comes first.
loadDataset().then(() => {
  app.use(router);
  app.mount("#app");
});
