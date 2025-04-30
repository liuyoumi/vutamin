import {toPascalCase} from "@/share/index.js";
import {SystemMenuTypeEnum} from "@/share/const.js";

/** 基础路由 */
const baseRoutes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: "登录",
    },
  },
];

/** 异常路由 */
const errorRoutes = [
  {
    path: "/404",
    name: "NotFound",
    component: () => import("@/views/error/404.vue"),
    meta: {
      title: "404",
    },
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
];

/** 所有视图组件 */
const VIEW_COMPONENTS = import.meta.glob("@/views/**/*.vue");

/**
 * 安全解析动态组件
 * @param {string} key - 后端返回的组件标识（如 'system/user'）
 * @returns {Function} 返回组件或undefined
 */
const resolveComponent = (key) => {
  key = key.replace(/^\/+/, "").replace(/\.vue$/, "");
  return VIEW_COMPONENTS[`/src/views/${key}.vue`];
};

/**
 * 转换菜单为路由配置
 * @param {Array} menus - 后端菜单数据
 * @returns {import("vue-router").RouteRecordRaw[]} 生成的路由配置
 */
const generateRoutes = (menus) => {
  return menus.map(item => {
    const route = {
      path: item.path,
      name: toPascalCase(item.path),
      redirect: item.redirect,
      meta: {
        icon: item.icon,
        title: item.name,
        layout: item.layout,
        noCache: item.noCache,
        visible: item.visible,
        external: item.external,
        breadcrumb: item.breadcrumb,
      },
    };
    
    // 对于菜单，需要添加component
    if (item.type === SystemMenuTypeEnum.MENU) {
      route.component = resolveComponent(item.component);
    }
    
    // 如果存在子菜单，则递归调用生成子路由
    if (item.children) {
      route.children = generateRoutes(item.children);
    }
    return route;
  });
};

export {baseRoutes, errorRoutes, generateRoutes};