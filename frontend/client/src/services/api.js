import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api",
});

// aggiunge il token jwt ad ogni richiesta automaticamente

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const register = (data) => API.post("/auth/register", data);
export const login = (data) => API.post("/auth/login", data);
export const analyzeR6S = (data) => API.post("/r6s/analyze", data);
export const analyzeOW = (data) => API.post("/ow/analyze", data);
export const getStrats = () => API.get("/strats");
export const rateStrat = (id, rating) =>
  API.put(`/strats/${id}/rating`, { rating });

export default API;
