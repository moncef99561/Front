// intercepteurs/intercepteurErreur.js
import axios from "axios";

axios.interceptors.response.use((response) => {
  // Tu peux loguer les 200 si tu veux
  return response;
}, (error) => {
  const code = error.response?.status;

  if (code === 401) {
    alert("Session expirée. Veuillez vous reconnecter.");
    window.location.href = "/login";
  }

  if (code === 500) {
    console.error("Erreur serveur :", error.response?.data);
  }

  return Promise.reject(error);
});
