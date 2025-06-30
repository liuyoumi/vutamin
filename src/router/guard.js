import {getToken} from "@/share/auth.js";
import {useNProgress} from "@/hooks/useNProgress.js";
import {useUserStore} from "@/store/modules/user.js";
import {useDictStore} from "@/store/modules/dict.js";

const whiteList = ["/login"];

const progress = useNProgress();

/**
 * @param {import("vue-router")} router
 */
export const setupGuard = (router) => {
  router.beforeEach(async (to, from, next) => {
    progress.start();
    if (getToken()) {
      if (to.path === "/login") {
        next("/");
        return;
      }
      
      const dictStore = useDictStore();
      const userStore = useUserStore();
      
      if (!dictStore.isSynced) {
        await dictStore.loadState();
      }
      
      if (!userStore.isSynced) {
        await userStore.loadState();
        userStore.routes.forEach(route => {
          router.addRoute(route);
        });
        // 告诉VueRouter：喂，我刚刚加了新路由，你再重新跳一下吧，这次一定能匹配上。
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
  
  router.afterEach(() => {
    progress.done();
  });
};
