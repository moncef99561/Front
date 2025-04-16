import React from "react";
import { Routes, Route } from "react-router-dom";
import ContractTypeList from "../features/responsable/pages/contratType/ContractTypeList";
import DepartmentList from "../features/responsable/pages/departement/DepartmentList";
import JobOfferList from "../features/responsable/pages/jobOffres/JobOfferList";
import Dashboard from "../features/responsable/components/dashboard/Dashboard";
import EmployeeList from "../features/responsable/pages/employee/EmployeeList";
import ServiceList from "../features/responsable/pages/service/ServiceList"
import Sidebar from "../features/responsable/components/sidebar/Sidebar";
import PosteList from "../features/responsable/pages/poste/PosteListe";
// import { GuardedRoute } from "../middleware/Guards";

function ResponsableLayout() {
  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <Sidebar />
      <div className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/jobOffers" element={<JobOfferList />} />
          <Route path="/contractTypes" element={<ContractTypeList />} />
          <Route path="/departments" element={<DepartmentList />} />
          <Route path="/services" element={<ServiceList />} />
          <Route path="/postes" element={<PosteList />} />

          {/* <Route path="/interviews" element={<InterviewList />} /> */}
        </Routes>
      </div>
    </div>
  );
}

export default ResponsableLayout;
