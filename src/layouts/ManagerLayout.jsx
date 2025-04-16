import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../features/responsable/components/dashboard/Dashboard";
import Sidebar from "../features/responsable/components/sidebar/Sidebar";
// import { GuardedRoute } from "../middleware/Guards";

function ManagerLayout() {
  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <Sidebar />
      <div className="flex-grow-1 bg-light">
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  );
}

export default ManagerLayout;
