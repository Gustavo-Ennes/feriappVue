import { router } from "@/router/router";
import { store } from "@/store/store";
import type { RouteRecordRaw } from "vue-router";

import NotFound from "./notFound/NotFound.vue";

const unauthenticatedRoutes: RouteRecordRaw[] = [
  {
    path: "/login",
    component: () => import("./login/Login.vue"),
    beforeEnter() {
      return store.state.user ? router.push("/") : true;
    },
  },
  {
    path: "/",
    component: () => import("./home/Home.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/:pathMatch(.*)",
    component: NotFound,
  },
];

const authenticatedRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("./home/Home.vue"),
    meta: { requiresAuth: true },
  },
];



export { unauthenticatedRoutes, authenticatedRoutes };
