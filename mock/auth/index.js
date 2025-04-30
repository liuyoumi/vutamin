import {menuList} from "../_data/index.js";
import {convertToTree, generateTime, R} from "../_utils/index.js";

export default [
  {
    url: "/api/auth/login",
    method: "post",
    timeout: generateTime(),
    response({body}) {
      if (body.account === "admin" && body.password === "admin") {
        return R.ok(Math.random().toString(32).slice(2));
      }
      return R.error("账号和密码不匹配");
    },
  },
  {
    url: "/api/auth/profile",
    method: "get",
    timeout: generateTime(),
    response() {
      return R.ok({
        id: 1,
        name: "牛肉干",
        roles: ["super_admin"],
        perms: ["*:*:*"],
        menus: convertToTree(menuList),
      });
    },
  },
];