import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/HeroSection.css";
import home from "../../assets/home.png";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="hero-section d-flex align-items-center">
      <div className="container-fluid px-5">
        <div className="row align-items-center">
          <div className="col-lg-6 col-md-12 text-center text-lg-center">
            <h1 className="display-4 fw-bold">Rejoignez-nous pour construire l'avenir ensemble</h1>
            <p className="lead text- py-2 lh-lg">
              Dans notre entreprise, nous croyons en une culture dynamique où les talents sépanouissent. Découvrez des opportunités de carrière passionnantes en accord avec vos compétences.
            </p>
            <div className="d-flex justify-content-lg-start">
              <Link to="/offers" className="btn btn-success me-3 px-5 py-2">Postuler</Link>
              <Link to="/about" className="btn btn-primary px-4 py-2">En savoir plus</Link>
            </div>
          </div>

          <div className="col-lg-6 col-md-12 text-center mt-4 mt-lg-0">
            <img src={home} alt="Culture d’entreprise" className="img-fluid rounded hero-img shadow-effect"/>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
