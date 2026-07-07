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
