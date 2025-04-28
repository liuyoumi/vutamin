import {defineStore} from "pinia";
import {AuthApi} from "@/api/auth/index.js";
import {baseRoutes, errorRoutes, generateRoutes} from "@/router/routes.js";

export const useUserStore = defineStore("user", {
  state: () => ({
    name: "",
    roles: [],
    perms: [],
    routes: [],
    isSynced: false,
  }),
  getters: {
    rootRoutes() {
      return this.routes.filter(route => !route.meta?.hidden);
    },
  },
  actions: {
    async syncProfile() {
      const data = await AuthApi.getProfile();
      this.name = data.name;
      this.roles = data.roles;
      this.perms = data.perms;
      this.routes = baseRoutes.concat(generateRoutes(data.menus), errorRoutes);
      this.isSynced = true;
    },
  },
});