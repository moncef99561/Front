// import React, { useState, useEffect } from "react";
// import ChatWindow from "./ChatWindow";
// import {
//   getAllEmployees,
//   getUnreadMessages,
//   markMessagesAsRead,
// } from "../../services/chatApi";

// import "./chatPage.css";


// const ChatPage = ({ currentUser }) => {
//   const [employees, setEmployees] = useState([]);
//   const [selectedEmployee, setSelectedEmployee] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [unreadCounts, setUnreadCounts] = useState({});

//   useEffect(() => {
//     if (!currentUser) return;

//     getAllEmployees()
//       .then((res) => setEmployees(res.data))
//       .catch(console.error);
//   }, [currentUser]);

//   useEffect(() => {
//     if (!currentUser) return;

//     getUnreadMessages(currentUser.userId)
//       .then((res) => setUnreadCounts(res.data))
//       .catch((err) => console.error("Erreur récupération messages non lus", err));
//   }, [currentUser]);

//   useEffect(() => {
//     if (!selectedEmployee || !currentUser) return;

//     markMessagesAsRead(selectedEmployee.id, currentUser.userId)
//       .then(() => {
//         setUnreadCounts((prev) => ({
//           ...prev,
//           [selectedEmployee.id]: 0,
//         }));
//       });
//   }, [selectedEmployee]);

//   return currentUser ? (
//     <div className="chat-container">
//       <div className="sidebar">
//         <h2 className="chat-title">Contact</h2>
//         <input
//           type="text"
//           placeholder="Rechercher un contact..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="search-bar"
//         />

//         <ul className="user-list">
//           {employees
//             .filter(
//               (e) =>
//                 e.id !== currentUser?.userId &&
//                 e.name.toLowerCase().includes(searchQuery.toLowerCase())
//             )
//             .map((employee) => (
//               <li
//                 key={employee.id}
//                 onClick={() => setSelectedEmployee(employee)}
//                 className="user-item"
//               >
//                 {employee.name}
//                 {unreadCounts[employee.id] > 0 && (
//                   <span className="badge">{unreadCounts[employee.id]}</span>
//                 )}
//               </li>
//             ))}
//         </ul>
//       </div>

//       <div className="chat-window">
//         {selectedEmployee ? (
//           <ChatWindow selectedEmployee={selectedEmployee} />
//         ) : (
//           <p>Sélectionnez un employé pour discuter.</p>
//         )}
//       </div>
//     </div>
//   ) : (
//     <p>Chargement en cours...</p>
//   );
// };

// export default ChatPage;
