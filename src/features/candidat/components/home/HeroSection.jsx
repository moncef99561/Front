import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/HeroSection.css";
import home from "../../assets/home.png";

const HeroSection = () => {
  return (
    <section className="hero-section d-flex align-items-center">
      <div className="container-fluid px-5">
        <div className="row align-items-center">
          <div className="col-lg-6 col-md-12 text-center text-lg-center">
            <h1 className="display-4 fw-bold">Join Us in Shaping the Future Together</h1>
            <p className="lead text-muted">
              At our company, we believe in fostering a vibrant culture where talent thrives.
              Explore exciting career opportunities that align with your passion and skills.
            </p>
            <div className="d-flex justify-content-center justify-content-lg-start">
              <button className="btn btn-success me-3 px-5 py-2">Apply</button>
              <button className="btn btn-primary px-5 py-2">More</button>
            </div>
          </div>

          <div className="col-lg-6 col-md-12 text-center mt-4 mt-lg-0">
            <img src={home} alt="Company Culture" className="img-fluid rounded hero-img shadow-effect"/>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
