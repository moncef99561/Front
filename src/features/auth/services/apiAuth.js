import axios from "axios";

const apiAuth = axios.create({
  baseURL: "http://localhost:5100/api", // 🔥 Met ici l'URL du AuthService correct
  headers: {
    "Content-Type": "application/json"
  }
});

// Ajouter le token automatiquement s'il existe
apiAuth.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default apiAuth;
