// src/router/index.ts
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";

const routes = [
  {
    path: "/:selectedCoffee?",
    name: "Coffee",
    component: HomeView,
    props: true, // Allows route params to be passed as props
  },
  // ... other routes
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
