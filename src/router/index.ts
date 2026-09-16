import { createRouter, createWebHistory } from "vue-router";
import { DEFAULT_SALE_POINT } from "@/utils/cups";
import { slug } from "@/utils/format";

const routes = [
  { path: "/", redirect: "/" + slug(DEFAULT_SALE_POINT) },
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
