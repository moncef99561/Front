import axios from "axios";

const BASE_URL = "http://localhost:5287/api";

// Récupérer tous les employés
export const getAllEmployees = () => axios.get(`${BASE_URL}/employee`);

// Récupérer les messages non lus pour un utilisateur
export const getUnreadMessages = (receiverId) =>
  axios.get(`${BASE_URL}/message/unreadByUser`, {
    params: { receiverId },
  });

// Marquer les messages comme lus entre deux utilisateurs
export const markMessagesAsRead = (senderId, receiverId) =>
  axios.post(`${BASE_URL}/message/markAsRead`, { senderId, receiverId });

// Récupérer tous les messages entre deux utilisateurs
export const getMessagesBetweenUsers = (receiverId, senderId) =>
  axios.get(`${BASE_URL}/message/messages/${receiverId}`, {
    params: { senderId },
  });

//Uploader un fichier
export const uploadFile = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return axios.post(`${BASE_URL}/File/upload`, formData);
};
