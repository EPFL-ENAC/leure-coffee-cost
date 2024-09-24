// src/router/index.ts
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";

const routes = [
  {
    path: "/:selectedCoffee?/:selectedSalePoint?",
    name: "Coffee",
    component: HomeView,
    props: true, // Allows route params to be passed as props
  },
  // {
  //   path: "/",
  //   redirect: "/selection",
  // },
  // { path: "/:pathMatch(.*)*", redirect: "/" },
  // ... other routes
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes,
});

export default router;
