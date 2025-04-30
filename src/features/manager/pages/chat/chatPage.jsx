import React, { useState, useEffect } from "react";
import ChatWindow from "../../../responsable/pages/chat/ChatWindow";
import { getAllEmployees, getUnreadMessages, markMessagesAsRead } from "../../../responsable/services/chatApi";
import "../../../responsable/pages/chat/chatPage.css";

const ChatPage = ({ currentUser }) => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [unreadCounts, setUnreadCounts] = useState({});

  useEffect(() => {
    if (!currentUser) return;

    getAllEmployees()
      .then((res) => {
        console.log("Employés récupérés :", res.data);
        setEmployees(res.data);
      })
      .catch((err) => console.error("Erreur chargement employés", err));
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser) return;

    getUnreadMessages(currentUser.userId)
      .then((res) => {
        console.log("Messages non lus :", res.data);
        setUnreadCounts(res.data);
      })
      .catch((err) => console.error("Erreur récupération messages non lus", err));
  }, [currentUser]);

  useEffect(() => {
    if (!selectedEmployee || !currentUser) return;

    markMessagesAsRead(selectedEmployee.id, currentUser.userId)
      .then(() => {
        setUnreadCounts((prev) => ({
          ...prev,
          [selectedEmployee.id]: 0,
        }));
      })
      .catch((err) => console.error("Erreur marquage messages lus", err));
  }, [selectedEmployee, currentUser]);


  console.log("Utilisateur connecté :", currentUser);
  console.log("Liste employés :", employees);

  if (!currentUser) {
    return <p>Chargement utilisateur en cours...</p>;
  }

  return (
    <div className="chat-container">
      <div className="sidebar">
        <h2 className="chat-title">Contacts</h2>
        <input
          type="text"
          placeholder="Rechercher un contact..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
        />

        <ul className="user-list">
          {employees.length === 0 ? (
            <li className="user-item">Aucun contact disponible</li>
          ) : (
            employees.map((employee) => (
              <li
                key={employee.id}
                onClick={() => setSelectedEmployee(employee)}
                className="user-item"
              >
                {employee.name}
                {unreadCounts[employee.id] > 0 && (
                  <span className="badge">{unreadCounts[employee.id]}</span>
                )}
              </li>
            ))
          )}
        </ul>
      </div>

      <div className="chat-window">
        {selectedEmployee ? (
          <ChatWindow selectedEmployee={selectedEmployee} />
        ) : (
          <p style={{ marginLeft: 20 }}>Sélectionnez un employé pour discuter.</p>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
