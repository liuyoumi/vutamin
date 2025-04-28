import {R} from "../_utils/index.js";
import {dictDataList, dictTypeList} from "../_data/index.js";

export default [
  {
    url: "/api/system/dict-type",
    method: "post",
    timeout: 1000,
    response() {
      let success = Math.random() > 0.5;
      if (success) {
        return R.ok();
      }
      return R.error("字典类型新增失败");
    },
  },
  {
    url: "/api/system/dict-type/list",
    method: "get",
    timeout: 1000,
    response({query}) {
      return R.page(dictTypeList, query);
    },
  },
  {
    url: "/api/system/dict-data/all",
    method: "get",
    timeout: 1000,
    response() {
      return R.ok(dictDataList);
    },
  },
  {
    url: "/api/system/dict-data/list",
    method: "get",
    timeout: 1000,
    response({query}) {
      const data = dictDataList.filter(item => {
        return item.dictType === query.dictType;
      });
      return R.page(data, query);
    },
  },
];