import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/FeatureSection.css";

const FeatureSection = () => {
  return (
    <section className="feature-section">
      <div className="container">
        <div className="row text-center">
          <div className="col-md-4">
            <div className="p-4">
              <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: "60px", height: "60px" }}>
                <i className="fas fa-briefcase fa-2x"></i>
              </div>
              <h3 className="h5">100+ Offres</h3>
              <p className="text-muted">Accédez à des milliers d'offres d'emploi mises à jour quotidiennement</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-4">
              <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: "60px", height: "60px" }}>
                <i className="fas fa-users fa-2x"></i>
              </div>
              <h3 className="h5">Meilleures entreprises</h3>
              <p className="text-muted">Collaborez avec les entreprises les plus reconnues du secteur</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-4">
              <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: "60px", height: "60px" }}>
                <i className="fas fa-chart-line fa-2x"></i>
              </div>
              <h3 className="h5">Évolution de carrière</h3>
              <p className="text-muted">Faites évoluer votre carrière grâce à de réelles opportunités de développement</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
