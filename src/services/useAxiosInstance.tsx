import { BASE_URL } from "@/secrets/secrets";
import axios from "axios";
import Cookies from "js-cookie";

export default function useAxiosInstance() {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });
  axiosInstance.interceptors.request.use(
    async (config) => {
      const token = Cookies.get("MSI_authentication_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  return {
    axiosInstance,
  };
}
