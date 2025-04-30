import React from "react";
import { FiMapPin, FiCalendar } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./CandidaturesResume.css";

export default function CandidaturesResume() {
  const candidatures = [
    {
      id: 1,
      poste: "Développeur Frontend React",
      ville: "Paris, France",
      date: "15/04/2023",
      statut: "En cours",
    },
    {
      id: 2,
      poste: "Développeur Full Stack JavaScript",
      ville: "Lyon, France",
      date: "10/04/2023",
      statut: "Entretien",
    },
    {
      id: 3,
      poste: "Lead Developer React",
      ville: "Remote",
      date: "05/04/2023",
      statut: "Refusé",
    },
  ];

  return (
    <div className="card mt-4 rounded-4 border-0">
      <div className="card-body">
        <h5 className="fw-bold mb-2">Candidatures</h5>
        <p className="text-muted mb-4">Liste des candidatures en cours et passées</p>

        {candidatures.map((c, idx) => (
          <div key={idx} className="card mb-3 border-0 rounded-3">
            <div className="card-body d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
              <div className="flex-grow-1 col-4">
                <div className="fw-bold fs-6 mb-1">{c.poste}</div>
                <div className="text-muted small d-flex align-items-center mb-1">
                  <FiMapPin className="me-1" />
                  {c.ville}
                </div>
              </div>

              <div className="text-muted small d-flex align-items-center flex-grow-1 col-4">
                <FiCalendar className="me-1" />
                {c.date}
              </div>

              <div className="flex-shrink-0">
                <span className={`badge badge-status ${c.statut.toLowerCase().replace(" ", "-")}`}>
                  {c.statut}
                </span>
              </div>

              <div className="ms-3">
                <Link to={`/candidature/${c.id}`} className="text-primary me-3">
                  Détails
                </Link>
                <button className="btn btn-link btn-sm text-muted">Modifier</button>
              </div>
            </div>
          </div>
        ))}

        <div className="text-start mb-2">
          <Link to="/profil/candidatures" className="text-primary fw-semibold small">
            Voir toutes les candidatures &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
