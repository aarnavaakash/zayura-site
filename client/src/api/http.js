import axios from "axios";

const defaultApiUrl = import.meta.env.DEV ? "http://localhost:5001/api" : "/api";
const apiUrl = (import.meta.env.VITE_API_URL || defaultApiUrl).trim().replace(/\/+$/, "");

const api = axios.create({ baseURL: apiUrl });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("zayura_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
