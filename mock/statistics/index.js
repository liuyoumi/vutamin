import {generateTime, R} from "../_utils/index.js";
import {chartData, list} from "../_data/statistics.js";

export default [
  {
    url: "/api/statistics/list",
    method: "get",
    timeout: generateTime(),
    response({query}) {
      return R.page(list, query);
    },
  },
  {
    url: "/api/statistics/chart",
    method: "get",
    timeout: generateTime(),
    response() {
      return R.ok(chartData);
    },
  },
];
