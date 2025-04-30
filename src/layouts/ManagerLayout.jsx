import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Sidebar from "../features/manager/components/sidebar/Sidebar";
import ListDemandeConges from "../features/manager/pages/conge/ListDemandeConges";
import ListAbsence from "../features/manager/pages/absence/ListAbsence";
import ListEquipe from "../features/manager/pages/equipe/ListEquipe";
import ListProjet from "../features/manager/pages/projet/ListProjet";
import ListTaches from "../features/manager/pages/taches/ListTaches";
import Dashboard from "../features/manager/pages/Dashboard";
import ListTypeFormation from "../features/manager/pages/typeFormation/ListTypeFormation";
import ListFormation from "../features/manager/pages/formation/ListFormation";
import ChatPage from "../features/manager/pages/chat/chatPage"; // 🔁 Ajout route chat
import { Image } from "react-bootstrap";
import { FaBell, FaComments } from "react-icons/fa";

const employeeMock = {
  photo: "https://randomuser.me/api/portraits/men/11.jpg"
};

function ManagerLayout() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const fakeUser = {
      userId: "6769ff86c88d8211b94eeb99",
      name: "Moncef Manager"
    };
    localStorage.setItem("currentUser", JSON.stringify(fakeUser));
    localStorage.setItem("userId", fakeUser.userId);
    setCurrentUser(fakeUser);
  }, []);

  //  À activer plus tard quand login sera prêt
  /*
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) {
      setCurrentUser(user);
    }
  }, []);
  */

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <Sidebar />
      <div className="flex-grow-1 bg-light">
        {/* Barre en haut */}
        <div
          className="d-flex justify-content-between align-items-center px-4"
          style={{
            borderLeft: 0,
            height: "70px",
            backgroundColor: "#fff",
            boxShadow: "0 0 1px 0 rgba(0,0,0,0.1)"
          }}
        >
          <h4 className="fw-semibold mt-2">Bienvenue Mr Moncef</h4>
          <div className="d-flex align-items-center gap-3">
            <FaBell size={18} style={{ cursor: "pointer" }} title="Notifications" />
            <FaComments
              size={18}
              style={{ cursor: "pointer" }}
              title="Messagerie"
              onClick={() => navigate("/manager/chat")}
            />
            <Image
              src={employeeMock.photo}
              roundedCircle
              width={40}
              height={40}
              style={{ cursor: 'pointer', border: '2px solid #ccc', marginRight: '10px' }}
              onClick={() => navigate("/manager/profil")}
              title="Mon profil"
            />
          </div>
        </div>

        <div className="p-3">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/projet" element={<ListProjet />} />
            <Route path="/taches" element={<ListTaches />} />
            <Route path="/demandes-conges" element={<ListDemandeConges />} />
            <Route path="/absences" element={<ListAbsence />} />
            <Route path="/equipes" element={<ListEquipe />} />
            <Route path="/type-formation" element={<ListTypeFormation />} />
            <Route path="/formations" element={<ListFormation />} />
            {currentUser && (
              <Route path="chat" element={<ChatPage currentUser={currentUser} />} />
            )}
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default ManagerLayout;
