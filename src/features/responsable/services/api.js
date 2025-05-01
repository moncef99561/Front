// services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5263/api', // Microservice des entretiens
});

// 🔽 Ajoute cette fonction pour l'appel au microservice candidats (port 5272)
export const fetchCandidats = async () => {
  const res = await axios.get('http://localhost:5272/api/candidats');
  return res.data;
};

export default api;
