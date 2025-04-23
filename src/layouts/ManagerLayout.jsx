import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../features/manager/components/sidebar/Sidebar";
// import PageAjouterEquipe from "../features/manager/pages/PageAjouterEquipe"
import PageAjouterEvaluationTache from "../features/manager/pages/PageAjouterEvaluationTache"
import PageAjouterManager from "../features/manager/pages/PageAjouterManager"
import PageAjouterProjet from "../features/manager/pages/PageAjouterProjet"
import PageAjouterTache from "../features/manager/pages/PageAjouterTache"
// import { GuardedRoute } from "../middleware/Guards";
import ListDemandeConges from "../features/manager/pages/conge/ListDemandeConges";
import ListAbsence from "../features/manager/pages/absence/ListAbsence";
import ChatPage from "../features/manager/pages/chat/chatPage";
import ListEquipe from "../features/manager/pages/equipe/ListEquipe";
import ListProjet from "../features/manager/pages/projet/ListProjet";
import ListTaches from "../features/manager/pages/taches/ListTaches";
import Dashboard from "../features/manager/pages/Dashboard";
import ListTypeFormation from "../features/manager/pages/typeFormation/ListTypeFormation";
import ListFormation from "../features/manager/pages/formation/ListFormation";

function ManagerLayout() {
  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <Sidebar />
      <div className="flex-grow-1 bg-light">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/evaluation" element={<PageAjouterEvaluationTache />} />
          <Route path="/addManager" element={<PageAjouterManager />} />
          {/* <Route path="/equipe" element={<PageAjouterEquipe />} /> */}
          <Route path="/projet" element={<ListProjet />} />
          <Route path="/taches" element={<ListTaches />} />
          <Route path="/demandes-conges" element={<ListDemandeConges />} />
          <Route path="/absences" element={<ListAbsence />} />
          <Route path="/equipes" element={<ListEquipe />} />
          <Route path="/type-formation" element={<ListTypeFormation />} />
          <Route path="/formations" element={<ListFormation />} />

          {/* <Route path="/chat" element={<chatPage currentUser={{ userId: "1", name: "Admin" }} />} /> */}
        </Routes>
      </div>
    </div>
  );
}

export default ManagerLayout;
