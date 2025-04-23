import axios from "axios";

// Base instance Axios pour toutes les requêtes
const api = axios.create({
  baseURL: "http://localhost:5148/api",
  // headers: {
  //   Authorization: `Bearer ${localStorage.getItem("token")}`, // à activer si tu gères le token ici
  // },
});

// ==============================
// 🟦 Congés
// ==============================

export const getDemandesCongesEnAttente = () => {
  return api.get("/conges/pending");
};

export const updateStatutDemande = (id, statut) => {
  return api.put(`/conges/${id}/statut`, { statut });
};

// ==============================
// 🟧 Absences
// ==============================

export const getAllAbsences = () => {
  return api.get("/absences");
};

// Tu peux ajouter ici d'autres appels liés aux absences (POST, DELETE, etc.)

// ==============================
// 🟨 Employés
// ==============================

// Exemple pour lister tous les employés
export const getAllEmployes = () => {
  return api.get("/employes");
};

// ==============================
// ... Ajoute ici d'autres modules (formations, entretiens, etc.)
// ==============================

export default api;