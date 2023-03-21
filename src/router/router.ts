import { store } from "@/store/store";
import { createRouter, createWebHistory } from "vue-router";
import { routes } from "../routes/routes";

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

router.beforeEach((to, from) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    return !!store.state.user ? true : router.push("/login");
  }
  return true;
});

export { router };
