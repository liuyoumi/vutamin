import {menuList} from "../_data/index.js";
import {convertToTree, generateTime, R} from "../_utils/index.js";

export default [
  {
    url: "/api/auth/login",
    method: "post",
    timeout: generateTime(),
    response() {
      return R.ok();
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