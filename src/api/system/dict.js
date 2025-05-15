import request from "@/share/request.js";

export const SystemDictDataApi = {
  getAll() {
    return request.get("/system/dict-data/all")
  }
}