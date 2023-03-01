import { router } from "@/router/router";
import { store } from "@/store/store";
import type { RouteRecordRaw } from "vue-router";

import NotFound from "./notFound/NotFound.vue";
// import testRoute from "./worker/components/WorkerModal/WorkerModal.vue";

const unauthenticatedRoutes: RouteRecordRaw[] = [
  {
    path: "/login",
    component: () => import("./login/Login.vue"),
    beforeEnter() {
      return store.state.user ? router.push("/") : true;
    },
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
  {
    path: "/workers",
    component: () => import("./worker/Workers.vue"),
    meta: { requiresAuth: true },
  },
  // {
  //   path: "/test",
  //   component: testRoute,
  // },
];

export { unauthenticatedRoutes, authenticatedRoutes };
