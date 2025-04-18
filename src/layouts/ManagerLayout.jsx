import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../features/manager/components/sidebar/Sidebar";
import PageAjouterEquipe from "../features/manager/pages/PageAjouterEquipe"
import PageAjouterEvaluationTache from "../features/manager/pages/PageAjouterEvaluationTache"
import PageAjouterManager from "../features/manager/pages/PageAjouterManager"
import PageAjouterProjet from "../features/manager/pages/PageAjouterProjet"
import PageAjouterTache from "../features/manager/pages/PageAjouterTache"
// import { GuardedRoute } from "../middleware/Guards";

function ManagerLayout() {
  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <Sidebar />
      <div className="flex-grow-1 bg-light">
        <Routes>
          {/* <Route path="/" element={<Dashboard />} /> */}
          <Route path="/equipe" element={<PageAjouterEquipe />} />
          <Route path="/evaluation" element={<PageAjouterEvaluationTache />} />
          <Route path="/addManager" element={<PageAjouterManager />} />
          <Route path="/projet" element={<PageAjouterProjet />} />
          <Route path="/tache" element={<PageAjouterTache />} />
        </Routes>
      </div>
    </div>
  );
}

export default ManagerLayout;
