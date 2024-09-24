import { createApp } from "vue";
import "./style.css";
// import router from "./router";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import VueFeather from "vue-feather";

import App from "./App.vue";
import "./styles/variables.css"; // Import global variables

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
// app.use(router);
app.component(VueFeather.name || "default-name", VueFeather);

app.mount("#app");
