import {menuList} from "../_data/index.js";
import {generateTime, R} from "../_utils/index.js";

export default [
  {
    url: "/api/system/menu/list",
    method: "get",
    timeout: generateTime(),
    response() {
      return R.ok({
        list: menuList,
        total: menuList.length,
      });
    },
  },
];