import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../features/responsable/components/dashboard/Dashboard";
import Sidebar from "../features/responsable/components/sidebar/Sidebar";
import EmployeeList from "../features/responsable/pages/employee/EmployeeList";
// import { GuardedRoute } from "../middleware/Guards";

function ResponsableLayout() {
  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <Sidebar />
      <div className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/employees" element={<EmployeeList />} />
          {/* <Route path="/joboffers" element={<JobOfferList />} /> */}
          {/* <Route path="/contracttypes" element={<ContractTypeList />} /> */}
          {/* <Route path="/" element={<EmployeeList />} /> */}

          {/* <Route path="/departments" element={<DepartmentList />} /> */}
          {/* <Route path="/services" element={<ServiceList />} /> */}
          {/* <Route path="/postes" element={<PosteList />} /> */}

          {/* <Route path="/interviews" element={<InterviewList />} /> */}
        </Routes>
      </div>
    </div>
  );
}

export default ResponsableLayout;
