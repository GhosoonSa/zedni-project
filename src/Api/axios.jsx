import axios from "axios";
import { baseUrl } from "./api";

export const Axios = axios.create({
  baseURL: baseUrl,
});

// interceptor يضيف التوكن لكل طلب بشكل ديناميكي
Axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
