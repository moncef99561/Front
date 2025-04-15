import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import DashboardRH from "./features/responsable/DashboardRH";
// import { GuardedRoute } from "./middleware/Guards";

function App() {
  return (
    <Router>
      <Routes>
        {/* 🔐 Authentification */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<DashboardRH />} />       

        {/* 🔐 Exemple d'espace privé externe */}
        {/* <Route
          path="/dashboard"
          element={
            <GuardedRoute>
              <Dashboard />
            </GuardedRoute>
          }
        /> */}


        <Route path="/*" element={<PublicLayout />} />
      </Routes>
    </Router>
  );
}

export default App;
