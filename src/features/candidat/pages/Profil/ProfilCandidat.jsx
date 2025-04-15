import React from "react";
import "./ProfilCandidat.css"; // CSS personnalisé

const ProfilCandidat = () => {
  return (
    <div className="card shadow rounded-4 overflow-hidden mt-3 mx-auto" style={{ maxWidth: '85%' }}>
      {/* Header bleu avec avatar */}
      <div className="header-blue position-relative">
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="avatar"
          className="rounded-circle border border-white position-absolute top-100 start-0 translate-middle ms-4"
          style={{ width: "80px", height: "80px" }}
        />
      </div>

      <div className="card-body pt-5">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <div>
            <h5 className="fw-bold mb-0">Thomas Martin</h5>
            <small className="text-muted">Développeur Full Stack</small>
          </div>
          <div className="d-flex align-items-center gap-2">
            <span className="badge bg-success bg-opacity-10 text-success">Actif</span>
            <button className="btn btn-primary btn-sm">Contacter</button>
          </div>
        </div>

        {/* Contact info */}
        <div className="d-flex flex-wrap text-muted small mb-3 gap-3">
          <div><i className="bi bi-envelope me-1"></i> thomas.martin@example.com</div>
          <div><i className="bi bi-telephone me-1"></i> +33 6 12 34 56 78</div>
          <div><i className="bi bi-geo-alt me-1"></i> Paris, France</div>
          <div><i className="bi bi-linkedin me-1"></i> <a href="/" className="text-decoration-none">Profil LinkedIn</a></div>
        </div>

        <hr />

        {/* Statistiques */}
        <div className="row text-center text-muted fw-semibold">
          <div className="col-md-3 mb-3">
            <i className="bi bi-briefcase mb-1 d-block fs-4 text-primary"></i>
            <div>Expérience</div>
            <div className="text-dark">5 ans</div>
          </div>
          <div className="col-md-3 mb-3">
            <i className="bi bi-clock mb-1 d-block fs-4 text-primary"></i>
            <div>Disponibilité</div>
            <div className="text-dark">Immédiate</div>
          </div>
          <div className="col-md-3 mb-3">
            <i className="bi bi-person-check mb-1 d-block fs-4 text-primary"></i>
            <div>Candidatures</div>
            <div className="text-dark">3 actives</div>
          </div>
          <div className="col-md-3 mb-3">
            <i className="bi bi-calendar-check mb-1 d-block fs-4 text-primary"></i>
            <div>Dernier entretien</div>
            <div className="text-dark">25/04/2023</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilCandidat;
