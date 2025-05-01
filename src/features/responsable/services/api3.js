import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5263/api', // microservice courant (interviews)
});

export const fetchCandidats = async () => {
  const res = await axios.get('http://localhost:5272/api/candidats'); // microservice Candidats
  return res.data;
};

export default api;