import { router } from "@/router/router";
import { store } from "@/store/store";
import type { RouteRecordRaw } from "vue-router";

import NotFound from "./notFound/NotFound.vue";

const routes: RouteRecordRaw[] = [
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
  {
    path: "/",
    component: () => import("./home/Home.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/workers",
    component: () => import("./workers/Workers.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/dayOff",
    component: () => import("./vacation/Vacation.vue"),
    props: { type: "dayOff" },
    meta: { requiresAuth: true },
  },
  {
    path: "/vacation/",
    component: () => import("./vacation/Vacation.vue"),
    props: { type: "vacation" },
    meta: { requiresAuth: true },
  },
  {
    path: "/license/",
    component: () => import("./vacation/Vacation.vue"),
    props: { type: "license" },
    meta: { requiresAuth: true },
  },
  {
    path: "/worker/:_id",
    name: "worker",
    component: () => import("./worker/Worker.vue"),
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/departments",
    name: "departments",
    component: () => import("./departments/Departments.vue"),
    meta: { requiresAuth: true },
  },
];

export { routes };
