import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/FeatureSection.css";

const FeatureSection = () => {
  return (
    <section className="feature-section py-4">
      <div className="container">
        <div className="row text-center">
          <div className="col-md-4">
            <div className="p-4">
              <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: "60px", height: "60px" }}>
                <i className="fas fa-briefcase fa-2x"></i>
              </div>
              <h3 className="h5">10,000+ Jobs</h3>
              <p className="text-muted">Access thousands of job opportunities updated daily</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-4">
              <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: "60px", height: "60px" }}>
                <i className="fas fa-users fa-2x"></i>
              </div>
              <h3 className="h5">Top Companies</h3>
              <p className="text-muted">Collaborate with leading companies in the industry</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-4">
              <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: "60px", height: "60px" }}>
                <i className="fas fa-chart-line fa-2x"></i>
              </div>
              <h3 className="h5">Career Growth</h3>
              <p className="text-muted">Develop your career with opportunities for growth</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
