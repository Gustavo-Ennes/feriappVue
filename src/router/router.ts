import { store } from "@/store/store";
import { createRouter, createWebHistory } from "vue-router";
import { authenticatedRoutes, unauthenticatedRoutes } from "../routes/routes";

const router = createRouter({
  history: createWebHistory("/"),
  routes: store.state.user ? authenticatedRoutes : unauthenticatedRoutes,
});

router.beforeEach((to, from) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    return !!store.state.user ? true : router.push("/login");
  }
  return true;
});

export { router };
