import request from "@/share/request.js";

export const AuthApi = {
  login(data) {
    return request.post("/auth/login", data);
  },
  getProfile() {
    return request.get("/auth/profile");
  },
};