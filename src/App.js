import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import ResponsableLayout from "./layouts/ResponsableLayout";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
// Dans App.js ou main.jsx
import "./middleware/Intercepteur"; // active l’intercepteur globalement

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
        <Route path="/responsable/*" element={<ResponsableLayout />} />
        <Route path="/*" element={<PublicLayout />} />



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
