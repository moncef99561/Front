import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../features/manager/components/sidebar/Sidebar";
import PageAjouterEquipe from "../features/manager/pages/PageAjouterEquipe"
import PageAjouterEvaluationTache from "../features/manager/pages/PageAjouterEvaluationTache"
import PageAjouterManager from "../features/manager/pages/PageAjouterManager"
import PageAjouterProjet from "../features/manager/pages/PageAjouterProjet"
import PageAjouterTache from "../features/manager/pages/PageAjouterTache"
// import { GuardedRoute } from "../middleware/Guards";
import ListDemandeConges from "../features/manager/pages/conge/ListDemandeConges";
import ListAbsence from "../features/manager/pages/absence/ListAbsence";
//import ChatPage from "../features/manager/pages/chat/chatPage";

function ManagerLayout() {
  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <Sidebar />
      <div className="flex-grow-1 bg-light">
        <Routes>
          {/* <Route path="/" element={<Dashboard />} /> */}
          <Route path="/evaluation" element={<PageAjouterEvaluationTache />} />
          <Route path="/addManager" element={<PageAjouterManager />} />
          <Route path="/equipe" element={<PageAjouterEquipe />} />
          <Route path="/projet" element={<PageAjouterProjet />} />
          <Route path="/tache" element={<PageAjouterTache />} />
          <Route path="/demandes-conges" element={<ListDemandeConges />} />
          <Route path="/absences" element={<ListAbsence />} />
          {/* <Route path="/chat" element={<ChatPage />} />
          <Route path="/chat" element={<ChatPage currentUser={{ userId: "1", name: "Admin" }} />} /> */}
        </Routes>
      </div>
    </div>
  );
}

export default ManagerLayout;
