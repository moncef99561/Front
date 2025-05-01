import React, { useEffect, useState } from "react";
import { FiMapPin, FiCalendar } from "react-icons/fi";
import { BsBuilding } from "react-icons/bs";
import { Link } from "react-router-dom";
import apiRecrutement from "../../../services/apiRecrutement";
import "./CandidaturesResume.css";

export default function CandidaturesResume() {
  const [candidatures, setCandidatures] = useState([]);

  useEffect(() => {
    const fetchCandidatures = async () => {
      const id = localStorage.getItem("utilisateurId");
      if (!id) return;

      try {
        const response = await apiRecrutement.get(`/Candidature/mes-candidatures`);
        setCandidatures(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des candidatures :", error);
      }
    };

    fetchCandidatures();
  }, []);

  return (
    <div className="card mt-4 rounded-4 border-0">
      <div className="card-body">
        <h5 className="fw-bold mb-2">Candidatures</h5>
        <p className="text-muted mb-4">Liste des candidatures en cours et passées</p>

        <div className="table-responsive">
          <table className="table align-middle">
            <thead className="small text-muted">
              <tr>
                <th style={{ width: "30%" }}>POSTE</th>
                <th style={{ width: "25%" }}>ENTREPRISE</th>
                <th style={{ width: "15%" }}>DATE</th>
                <th style={{ width: "15%" }}>STATUT</th>
                <th style={{ width: "15%" }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {candidatures.map((c, idx) => (
                <tr key={idx}>
                  <td>
                    <div className="fw-bold">{c.offreEmploi?.titre}</div>
                    <div className="text-muted small d-flex align-items-center">
                      <FiMapPin className="me-1" />
                      {c.offreEmploi?.lieu || "Non précisée"}
                    </div>
                  </td>
                  <td>
                    <div className="fw-semibold">Work Wise</div>
                    <div className="text-muted small d-flex align-items-center">
                      <BsBuilding className="me-1" /> CDI
                    </div>
                  </td>
                  <td className="text-muted small">
                    <FiCalendar className="me-1" />
                    {new Date(c.dateCandidature).toLocaleDateString()}
                  </td>
                  <td>
                    <span className={`badge rounded-pill px-3 py-2 bg-opacity-25 fw-medium 
              ${c.status === "En attente" ? "bg-primary text-primary"
                        : c.status === "Refusé" ? "bg-danger text-danger"
                          : c.status === "Entretien" ? "bg-info text-info"
                            : "bg-secondary text-secondary"}`}>
                      {c.status}
                    </span>
                  </td>
                  <td>
                    <Link to={`/candidature/${c.candidatureId}`} className="text-primary me-2">Détails</Link>
                    <button className="btn btn-link btn-sm text-muted">Modifier</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-start mb-2">
          <Link to="/profil/Candidature" className="text-primary fw-semibold small">
            Voir toutes les candidatures &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
