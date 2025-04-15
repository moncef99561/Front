import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/CTASection.css";
import cta from "../../assets/cta.jpg";

const CTASection = () => {
  return (
    <section className="cta-section container-fluid py-5 section-uniform">
      <div className="container-fluid px-5">
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start">
            <h2 className="fw-bold text-white">Join Our Growing Team Today</h2>
            <p className="text-light">
              Discover exciting career opportunities and connect with our dedicated hiring team for more details.
            </p>
            <div className="d-flex justify-content-center justify-content-md-start pb-3">
              <button className="btn btn-outline-light me-3 px-4 py-2">Explore</button>
              <button className="btn btn-light px-4 py-2">Contact</button>
            </div>
          </div>

          <div className="col-md-6 text-center">
            <img 
              src={cta}
              alt="Join Our Team"
              className="img-fluid rounded"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
