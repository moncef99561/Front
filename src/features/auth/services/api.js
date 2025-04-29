import axios from "axios";

// Création de l'instance Axios
const api = axios.create({
  baseURL: "http://localhost:5272/api", // Remplacer par ton AuthService ou API Gateway si besoin
  timeout: 10000, // 10 secondes de timeout
});
export default api;