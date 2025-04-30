import axios from "axios";

const apiRecrutement = axios.create({
  baseURL: "http://localhost:5272/api",
});

apiRecrutement.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default apiRecrutement;
