import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  { path: "/login", component: () => import("./login/Login.vue") },
  // {
  //   path: "/pokemon/:search/",
  //   component: () => import("./Pokemon/PokemonPage.vue"),
  // },
];

export { routes };
