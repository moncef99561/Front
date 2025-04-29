import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import ContractTypeList from "../features/responsable/pages/contratType/ContractTypeList";
import DepartmentList from "../features/responsable/pages/departement/DepartmentList";
import JobOfferList from "../features/responsable/pages/jobOffres/JobOfferList";
import Dashboard from "../features/responsable/components/dashboard/Dashboard";
import EmployeeList from "../features/responsable/pages/employee/EmployeeList";
import ServiceList from "../features/responsable/pages/service/ServiceList"
import Sidebar from "../features/responsable/components/sidebar/Sidebar";
import PosteList from "../features/responsable/pages/poste/PosteList";
import DetailEmployee from "../features/responsable/pages/employee/DetailEmployee";
import ListDemandeConges from "../features/responsable/pages/conge/ListDemandeConges";
// import { GuardedRoute } from "../middleware/Guards";
import EntretienList from "../features/responsable/pages/entretien/EntretienList";
import ListAbsence from "../features/responsable/pages/absence/ListAbsence";
//import ChatPage from "../features/responsable/pages/chat/chatPage";
import ListTypeDocument from "../features/responsable/pages/typeDocument/ListTypeDocument";
import { Image } from "react-bootstrap";
import { FaBell, FaComments } from "react-icons/fa";


const employeeMock = {
  photo: "https://randomuser.me/api/portraits/men/21.jpg"
};


function ResponsableLayout() {
  const navigate = useNavigate();

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <Sidebar />
      <div className="flex-grow-1 bg-light">
        {/* Barre en haut avec image profil et autres icônes */}
        <div
          className="d-flex justify-content-between align-items-center px-4"
          style={{
            borderLeft: 0,
            height: "70px",
            backgroundColor: "#fff",
            boxShadow: "0 0 1px 0 rgba(0,0,0,0.1)"
          }}
        >
          <h4 className="fw-semibold mt-2">Bienvenue Mr ACH-CHATOUANI</h4>
          <div className="d-flex align-items-center gap-3">
            <FaBell size={18} style={{ cursor: "pointer" }} title="Notifications" />
            <FaComments size={18} style={{ cursor: "pointer" }} title="Messagerie" />
            <Image
              src={employeeMock.photo}
              roundedCircle
              width={40}
              height={40}
              style={{ cursor: 'pointer', border: '2px solid #ccc', marginRight: '10px' }}
              onClick={() => navigate("/responsable/profil")}
              title="Mon profil"
            />
          </div>
        </div>

        <div className="p-3">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/jobOffers" element={<JobOfferList />} />
          <Route path="/contractTypes" element={<ContractTypeList />} />
          <Route path="/departments" element={<DepartmentList />} />
          <Route path="/services" element={<ServiceList />} />
          <Route path="/postes" element={<PosteList />} />
          <Route path="/entretiens" element={<EntretienList />} />
          <Route path="/detail/:employeeId" element={<DetailEmployee />} />
          <Route path="/demandes-conges" element={<ListDemandeConges />} />
          <Route path="/absences" element={<ListAbsence />} />
          <Route path="/type-document" element={<ListTypeDocument />} />

          {/* <Route path="/chat" element={<ChatPage />} />
          <Route path="/chat" element={<ChatPage currentUser={{ userId: "1", name: "Admin" }} />} /> */}


        </Routes>
        </div>
      </div>
    </div>
  );
}


export default ResponsableLayout;
