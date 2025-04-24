// 📁 src/features/candidat/components/offers/OfferCard.jsx
import React from "react";
import { Briefcase, MapPin, Clock } from "lucide-react";

export default function OfferCard({ job, onSelect }) {
  return (
    <div className="bg-white rounded shadow p-4 mb-4 border border-primary-subtle">
      <div className="d-flex justify-content-between align-items-start">
        <div className="d-flex">
          <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: 60, height: 60 }}>
            <Briefcase size={28} />
          </div>
          <div>
            <h5 className="mb-1 fw-bold">{job.offreEmploiId} : {job.titre}</h5>
            <div className="text-muted small">
              <MapPin size={16} className="me-1" /> {job.lieu}
              <span className="ms-3">
                <Clock size={16} className="me-1" /> {job.dateCreation}
              </span>
            </div>
            <p className="text-muted mt-2 mb-0">{job.description.substring(0, 100)}...</p>
          </div>
        </div>
        <button className="btn btn-outline-primary btn-sm align-self-center" onClick={() => onSelect(job)}>
          Plus d'infos
        </button>
      </div>
    </div>
  );
}