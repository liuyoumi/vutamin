import request from "@/share/request.js";

export const SystemDictTypeApi = {
  getList(params) {
    return request.get("/system/dict-type/list", {params});
  },
};

export const SystemDictDataApi = {
  getAll() {
    return request.get("/system/dict-data/all");
  },
};