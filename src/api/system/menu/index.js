import request from "@/share/request.js";

export const MenuApi = {
  create(data) {
    return request.post("/system/menu", data);
  },
  update(data) {
    return request.put("/system/menu", data);
  },
  getList(params) {
    return request.get("/system/menu/list", {params});
  },
  getDetail(id) {
    return request.get("/system/menu/detail?id=" + id);
  },
};
