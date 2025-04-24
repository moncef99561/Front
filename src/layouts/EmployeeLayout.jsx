import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Sidebar from "../features/employee/components/sidebar/Sidebar";
import ProfilEmployee from "../features/employee/page/ProfilEmployee";
import ProjetTachesEmploye from "../features/employee/page/ProjetTachesEmploye";
import DemandeConge from "../features/employee/page/DemandeConge";
import AbsencesEmploye from "../features/employee/page/AbsencesEmploye";
import FormationsEmploye from "../features/employee/page/FormationsEmploye";
import DashboardEmploye from "../features/employee/page/DashboardEmploye";
import { Image } from "react-bootstrap";

const employeeMock = {
  photo: "https://randomuser.me/api/portraits/men/32.jpg"
};

function EmployeeLayout() {
  const navigate = useNavigate();

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <Sidebar />
      <div className="flex-grow-1 bg-light">
        {/* Barre en haut avec image profil */}
        <div className="d-flex justify-content-end align-items-center px-4"
  style={{
    borderLeft : 0, 
    height: "60px",
    backgroundColor: "#fff",
    boxShadow: "0 0 1px 0 rgba(0,0,0,0.1)"
  }}>
          <Image
            src={employeeMock.photo}
            roundedCircle
            width={40}
            height={40}
            style={{ cursor: 'pointer', border: '2px solid #ccc', marginRight: '10px' }}
            onClick={() => navigate("/employee/profil")}
            title="Mon profil"
          />
        </div>

        <div className="p-3">
          <Routes>
          <Route path="/" element={<DashboardEmploye />} />
            <Route path="/profil" element={<ProfilEmployee />} />
            {/* Autres routes à ajouter ici */}
            {/* <Route path="/equipe" element={<PageAjouterEquipe />} /> */}
             <Route path="/projetTache" element={<ProjetTachesEmploye />} />
            <Route path="/conges" element={<DemandeConge />} />
            <Route path="/absences" element={<AbsencesEmploye />} />
            <Route path="/formations" element={<FormationsEmploye />} />
            {/* <Route path="/equipes" element={<ListEquipe />} />
            <Route path="/type-formation" element={<ListTypeFormation />} />
            <Route path="/formations" element={<ListFormation />} /> */}
            {/* <Route path="/chat" element={<chatPage currentUser={{ userId: "1", name: "Admin" }} />} /> */}
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default EmployeeLayout;