import React, { useEffect, useState } from "react";
import apiRecrutement from "../../services/apiRecrutement";
import "./ProfilCandidat.css";
import ProfileInfo from "./ProfileInfo";
import CandidaturesResume from "./CandidaturesResume";

export default function ProfilCandidat() {
  const [candidat, setCandidat] = useState(null);
  const [activeTab, setActiveTab] = useState("candidatures"); // Onglet actif

  useEffect(() => {
    const fetchCandidat = async () => {
      const id = localStorage.getItem("utilisateurId");
      if (!id) return;

      try {
        const response = await apiRecrutement.get(`/Candidat/${id}`);
        setCandidat(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération du profil :", error);
      }
    };

    fetchCandidat();
  }, []);

  if (!candidat) return <p className="text-center mt-5">Chargement...</p>;

  return (
    <div>
      <ProfileInfo />

      <div className="mt-4 mx-auto" style={{ maxWidth: "85%" }}>
        <ul className="nav nav-tabs mt-4 px-4">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "candidatures" ? "active" : "text-muted"}`}
              onClick={() => setActiveTab("candidatures")}
            >
              <i className="bi bi-briefcase-fill me-1"></i> Candidatures
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "entretiens" ? "active" : "text-muted"}`}
              onClick={() => setActiveTab("entretiens")}
            >
              <i className="bi bi-calendar3 me-1"></i> Entretiens
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "documents" ? "active" : "text-muted"}`}
              onClick={() => setActiveTab("documents")}
            >
              <i className="bi bi-file-earmark-text me-1"></i> Documents
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "notes" ? "active" : "text-muted"}`}
              onClick={() => setActiveTab("notes")}
            >
              <i className="bi bi-chat-left-dots me-1"></i> Notes
            </button>
          </li>
        </ul>
      </div>

      <div className="card rounded-4 overflow-hidden mt-4 mx-auto" style={{ maxWidth: "85%" }}>
        {activeTab === "candidatures" && <CandidaturesResume />}
        {activeTab === "entretiens" && <div className="p-4">📅 Liste des entretiens à venir...</div>}
        {activeTab === "documents" && <div className="p-4">📁 Liste des documents envoyés...</div>}
        {activeTab === "notes" && <div className="p-4">📝 Notes personnelles ou retours RH...</div>}
      </div>
    </div>
  );
}
