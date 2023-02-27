import { router } from "@/router/router";
import { store } from "@/store/store";
import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/login",
    component: () => import("./login/Login.vue"),
    beforeEnter() {
      return store.state.user ? router.push("/home") : true;
    },
  },
  {
    path: "/home",
    component: () => import("./home/Home.vue"),
    meta: { requiresAuth: true },
  },
];

export { routes };
