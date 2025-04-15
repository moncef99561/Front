import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import ResponsableLayout from "./layouts/ResponsableLayout";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
// import DashboardRH from "./features/responsable/DashboardRH";
// import Dashboard from "./features/responsable/Dashboard";
// import { GuardedRoute } from "./middleware/Guards";

function App() {
  return (
    <Router>
      <Routes>
        {/* 🔐 Authentification */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
   
        {/* 🔐 Layouts */}   
        <Route path="/public/*" element={<PublicLayout />} />
        <Route path="/responsable/*" element={<ResponsableLayout />} />



        {/* 🔐 Exemple d'espace privé externe */}
        {/* <Route
          path="/dashboard"
          element={
            <GuardedRoute>
              <Dashboard />
            </GuardedRoute>
          }
        /> */}
      </Routes>
    </Router>
  );
}

export default App;
