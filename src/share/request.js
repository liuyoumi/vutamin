import axios from "axios";
import {getToken} from "@/share/auth.js";
import {MessagePlugin} from "tdesign-vue-next";

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 30000,
});

service.interceptors.request.use(config => {
  // 设置Token
  if (getToken()) {
    config.headers["Authorization"] = "Bearer " + getToken();
  }
  return config;
});

service.interceptors.response.use(response => {
  let data = response.data;
  
  if (data.code === 0) {
    return data.data;
  }
  
  // 访问的用户是未认证的（登录令牌失效或没有登录）
  if (data.code === 401) {
    return;
  }
  
  const msg = data.msg || "系统未知错误，请反馈给管理员";
  MessagePlugin.error(msg);
  return Promise.reject(new Error(msg));
}, error => {
  MessagePlugin.error(error.message);
  return Promise.reject(error);
});