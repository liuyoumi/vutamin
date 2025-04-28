import request from "@/share/request.js";

export const AuthApi = {
  getProfile() {
    return request.get("/auth/profile");
  },
};