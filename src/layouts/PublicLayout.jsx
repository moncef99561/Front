import React from "react";
import { Routes, Route } from "react-router-dom";
import ProfilCandidat from "../features/candidat/pages/Profil/ProfilCandidat";
import Navbar from "../features/candidat/components/navbar/Navbar";
import Footer from "../features/candidat/components/footer/Footer";
import Candidature from "../features/candidat/pages/Candidature";
import Contact from "../features/candidat/pages/Contact";
import Offers from "../features/candidat/pages/offers/Offers";
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
        <Route  path="/candidature/:id" element={<Candidature />}/>

        {/* 🔐 Routes protégées */}
        <Route path="/profil" element={ <GuardedRoute> <ProfilCandidat /> </GuardedRoute>}/>

      </Routes>
      <Footer />
    </div>
  );
}

export default PublicLayout;