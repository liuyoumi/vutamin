import {createRouter, createWebHistory} from "vue-router";
import {baseRoutes} from "@/router/routes.js";
import {setupGuard} from "@/router/guard.js";

const router = createRouter({
  history: createWebHistory(),
  strict: true,
  routes: baseRoutes,
  scrollBehavior: () => ({left: 0, top: 0}),
});

setupGuard(router);

export default router;