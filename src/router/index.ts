// src/router/index.ts
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import { path } from "d3";

const routes = [
  {
    path: "/selection/:selectedCoffee?/:selectedSalePoint?",
    name: "Coffee",
    component: HomeView,
    props: true, // Allows route params to be passed as props
  },
  {
    path: "/",
    redirect: "/selection",
  },
  // ... other routes
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes,
});

export default router;
