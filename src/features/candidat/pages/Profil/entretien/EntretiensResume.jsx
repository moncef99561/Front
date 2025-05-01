import React, { useEffect, useState } from "react";
import { FiCalendar, FiClock, FiVideo, FiUsers } from "react-icons/fi";
import { Link } from "react-router-dom";
import apiRecrutement from "../../services/apiRecrutement";

export default function EntretiensResume() {
  const [entretiens, setEntretiens] = useState([]);

  useEffect(() => {
    const fetchEntretiens = async () => {
      const id = localStorage.getItem("utilisateurId");
      if (!id) return;
      try {
        const res = await apiRecrutement.get(`/Entretien/candidat/${id}`);
        setEntretiens(res.data);
      } catch (err) {
        console.error("Erreur lors du chargement des entretiens :", err);
      }
    };
    fetchEntretiens();
  }, []);

  return (
    <div className="card mt-4 rounded-4 border-0">
      <div className="card-body">
        <h5 className="fw-bold">Entretiens</h5>
        <p className="text-muted">Entretiens programmés et passés</p>

        {entretiens.map((e, idx) => (
          <div key={idx} className="border rounded p-3 mb-3">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div>
                <span className="badge bg-warning bg-opacity-25 text-warning me-2">À venir</span>
                <span className="fw-semibold">Visioconférence</span>
              </div>
              <Link to={`/entretien/${e.id}`} className="text-primary small">Modifier</Link>
            </div>

            <div className="fw-bold">{e.poste}</div>
            <div className="text-muted mb-3">{e.entreprise}</div>

            <div className="row text-muted small mb-3">
              <div className="col-md-3 mb-2">
                <FiCalendar className="me-1" />
                <strong>Date</strong><br />
                {new Date(e.date).toLocaleDateString()}
              </div>
              <div className="col-md-3 mb-2">
                <FiClock className="me-1" />
                <strong>Heure</strong><br />
                {e.heureDebut} - {e.heureFin}
              </div>
              <div className="col-md-3 mb-2">
                <FiVideo className="me-1" />
                <strong>Modalité</strong><br />
                {e.modalite}
              </div>
              <div className="col-md-3 mb-2">
                <FiUsers className="me-1" />
                <strong>Interviewers</strong><br />
                {e.interviewers.join(", ")}
              </div>
            </div>

            <div className="d-flex gap-2">
              <button className="btn btn-sm btn-primary">Confirmer</button>
              <button className="btn btn-sm btn-outline-secondary">Reprogrammer</button>
              <button className="btn btn-sm btn-outline-danger">Annuler</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
