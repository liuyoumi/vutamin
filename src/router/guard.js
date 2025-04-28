import {getToken} from "@/share/auth.js";
import {useUserStore} from "@/store/modules/user.js";

const whiteList = ["/login"];

/**
 * @param {import("vue-router")} router
 */
export const setupGuard = (router) => {
  router.beforeEach(async (to, from, next) => {
    if (getToken()) {
      if (to.path === "/login") {
        next("/");
        return;
      }
      
      const userStore = useUserStore();
      if (!userStore.isSynced) {
        await userStore.syncProfile();
        userStore.routes.forEach(route => {
          router.addRoute(route);
        });
        next({...to, replace: true});
        return;
      }
      
      next();
      return;
    }
    
    if (whiteList.indexOf(to.path) === -1) {
      next("/login");
    } else {
      next();
    }
  });
};