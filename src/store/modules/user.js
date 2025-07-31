import {defineStore} from "pinia";
import {AuthApi} from "@/api/auth/index.js";
import {baseRoutes, errorRoutes, generateRoutes} from "@/router/routes.js";
import {removeToken} from "@/share/auth.js";

export const useUserStore = defineStore("user", {
  state: () => ({
    name: "",
    roles: [],
    perms: [],
    menus: [],
    routes: [],
    isSynced: false,
  }),
  getters: {
    rootRoutes() {
      return this.routes.filter(route => route.meta?.visible);
    },
  },
  actions: {
    async logout() {
      removeToken();
      this.isSynced = false;
    },
    async loadState() {
      const data = await AuthApi.getProfile();
      this.name = data.name;
      this.roles = data.roles;
      this.perms = data.perms;
      this.menus = data.menus;
      this.routes = baseRoutes.concat(generateRoutes(data.menus), errorRoutes);
      this.isSynced = true;
    },
  },
});
