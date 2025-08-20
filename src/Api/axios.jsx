import axios from "axios";
import { baseUrl } from "./api";

const authToken = localStorage.getItem("authToken");
export const Axios = axios.create({
  baseURL: baseUrl,
  headers: {
    Authorization: `Bearer ${authToken}`,
  },
});
