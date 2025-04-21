// import axios from "axios";

// const BASE_URL = "http://localhost:5287/api";

// export const getAllEmployees = () => axios.get(`${BASE_URL}/employee`);

// export const getUnreadMessages = (receiverId) =>
//   axios.get(`${BASE_URL}/message/unreadByUser`, {
//     params: { receiverId },
//   });

// export const markMessagesAsRead = (senderId, receiverId) =>
//   axios.post(`${BASE_URL}/message/markAsRead`, { senderId, receiverId });

// export const getMessagesBetweenUsers = (receiverId, senderId) =>
//   axios.get(`${BASE_URL}/message/messages/${receiverId}`, {
//     params: { senderId },
//   });

// export const uploadFile = (file) => {
//   const formData = new FormData();
//   formData.append("file", file);
//   return axios.post(`${BASE_URL}/File/upload`, formData);
// };
