import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5263/api',
  timeout: 5000,
  withCredentials: true
});

export default api;