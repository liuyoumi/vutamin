import request from "@/share/request.js";

export const StatisticsApi = {
  getList(params) {
    return request.get("/statistics/list", {params});
  },
  getChart() {
    return request.get("/statistics/chart");
  },
};
