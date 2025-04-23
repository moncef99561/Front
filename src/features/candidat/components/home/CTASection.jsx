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
            <h2 className="fw-bold">Rejoignez notre équipe en pleine croissance</h2>
            <p className="">
              Découvrez des opportunités de carrière passionnantes et entrez en contact avec notre équipe de recrutement pour en savoir plus.
            </p>
            <div className="d-flex justify-content-center justify-content-md-start pb-3">
              <button className="btn btn-outline-primary me-3 px-4 py-2">Explorer</button>
              <button className="btn btn-warning px-4 py-2">Contact</button>
            </div>
          </div>

          <div className="col-md-6 text-center">
            <img 
              src={cta}
              alt="Rejoignez notre équipe"
              className="img-fluid rounded"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
