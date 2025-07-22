import {menuList} from "../_data/index.js";
import {generateTime, R} from "../_utils/index.js";

export default [
  {
    url: "/api/system/menu/list",
    method: "get",
    timeout: generateTime(),
    response() {
      return R.ok(menuList);
    },
  },
  {
    url: "/api/system/menu/detail",
    method: "get",
    timeout: generateTime(),
    response({query}) {
      console.log(query);
      return R.ok(menuList.find(item => item.id === query.id));
    },
  },
];
