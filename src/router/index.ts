import { createRouter, createWebHistory } from "vue-router";
import { defaultSalePoint } from "@/config/dataset";
import { slug } from "@/utils/format";

const routes = [
  // A function, so it reads the dataset once config.json is loaded.
  { path: "/", redirect: () => "/" + slug(defaultSalePoint()) },
  {
    path: "/:sp",
    name: "drinks",
    component: () => import("@/views/DrinkView.vue"),
  },
  {
    path: "/:sp/d/:drink",
    name: "bean",
    component: () => import("@/views/BeanView.vue"),
  },
  {
    path: "/:sp/d/:drink/milk",
    name: "milk",
    component: () => import("@/views/MilkView.vue"),
  },
  {
    path: "/:sp/d/:drink/sugar",
    name: "sugar",
    component: () => import("@/views/SugarView.vue"),
  },
  {
    path: "/:sp/c/:cup",
    name: "result",
    component: () => import("@/views/ResultView.vue"),
  },
  {
    path: "/:sp/c/:cup/vs/:other",
    name: "compare",
    component: () => import("@/views/CompareView.vue"),
  },
  {
    path: "/:sp/all",
    name: "all",
    component: () => import("@/views/RankingView.vue"),
  },
  { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, saved) {
    if (saved) return saved;
    if (to.path === from.path) return;
    return { top: 0 };
  },
});

export default router;
