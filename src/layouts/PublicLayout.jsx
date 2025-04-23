import React from "react";
import { Routes, Route } from "react-router-dom";
import ProfilCandidat from "../features/candidat/pages/Profil/ProfilCandidat";
import Navbar from "../features/candidat/components/navbar/Navbar";
import Footer from "../features/candidat/components/footer/Footer";
import Candidature from "../features/candidat/pages/Candidature";
import Services from "../features/candidat/pages/Services";
import Contact from "../features/candidat/pages/Contact";
import Offers from "../features/candidat/pages/Offers";
import About from "../features/candidat/pages/About";
import Home from "../features/candidat/pages/Home";
import { GuardedRoute } from "../middleware/Guards";

function PublicLayout() {
  return (
    <div>
      <Navbar />

      <Routes>
        {/* 🔓 Routes publiques */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route  path="/candidature/:id" element={
            // <GuardedRoute>
              <Candidature />
            // </GuardedRoute>
          }
        />

        {/* 🔐 Routes protégées */}
        <Route
          path="/profil"
          element={
            // <GuardedRoute>
              <ProfilCandidat />
            // </GuardedRoute>
          }
        />
        {/* <Route
          path="/candidature/:id"
          element={
            <GuardedRoute>
              <Candidature />
            </GuardedRoute>
          }
        /> */}
      </Routes>

      <Footer />
    </div>
  );
}

export default PublicLayout;
