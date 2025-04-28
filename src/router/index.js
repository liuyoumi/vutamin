import {createRouter, createWebHistory} from "vue-router";
import {baseRoutes} from "@/router/routes.js";

const router = createRouter({
  history: createWebHistory(),
  strict: true,
  routes: baseRoutes,
  scrollBehavior: () => ({left: 0, top: 0}),
});

export default router;