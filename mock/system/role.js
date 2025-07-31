import {generateTime, R} from "../_utils/index.js";
import {roleList} from "../_data/role.js";

export default [
  {
    url: "/api/system/role",
    method: "post",
    timeout: generateTime(),
    response() {
      return R.ok();
    },
  },
  {
    url: "/api/system/role",
    method: "put",
    timeout: generateTime(),
    response() {
      return R.ok();
    },
  },
  {
    url: "/api/system/role",
    method: "delete",
    timeout: generateTime(),
    response() {
      return R.ok();
    },
  },
  {
    url: "/api/system/role/detail",
    method: "get",
    timeout: generateTime(),
    response({query}) {
      return R.ok(roleList.find(item => item.id === parseInt(query.id)));
    },
  },
  {
    url: "/api/system/role/list",
    method: "get",
    timeout: generateTime(),
    response({query}) {
      return R.page(roleList, query);
    },
  },
];
