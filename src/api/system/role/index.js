import request from "@/share/request.js";

export const RoleApi = {
  create(data) {
    return request.post("/system/role", data);
  },
  update(data) {
    return request.put("/system/role", data);
  },
  remove(id) {
    return request.delete("/system/role?id=" + id);
  },
  getList(params) {
    return request.get("/system/role/list", {params});
  },
  getDetail(id) {
    return request.get("/system/role/detail?id=" + id);
  },
};
