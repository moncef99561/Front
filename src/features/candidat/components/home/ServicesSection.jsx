import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/ServicesSection.css";

const ServicesSection = () => {
  return (
    <section className="services-section container-fluid py-5 section-uniform">
      <div className="container-fluid px-5 text-center">
        <h2 className="fw-bold pb-3">Explore Exciting Job Opportunities Today</h2>
        <p className="text-muted">
          Discover a variety of job categories tailored to your skills and interests. 
          Our platform connects you with top employers seeking talented individuals like you.
        </p>

        <div className="row mt-5">
          <div className="col-md-4">
            <i className="fas fa-briefcase service-icon"></i>
            <h4 className="fw-semibold mt-3">Available Job Categories</h4>
            <p className="text-muted">From technology to healthcare, we have roles for everyone.</p>
          </div>

          <div className="col-md-4">
            <i className="fas fa-building service-icon"></i>
            <h4 className="fw-semibold mt-3">Departments Actively Hiring</h4>
            <p className="text-muted">Join dynamic teams across various industries.</p>
          </div>

          <div className="col-md-4">
            <i className="fas fa-user-check service-icon"></i>
            <h4 className="fw-semibold mt-3">Find Your Perfect Job Match</h4>
            <p className="text-muted">Browse our listings to find your ideal position.</p>
          </div>
        </div>

        <div className="mt-5">
          <button className="btn btn-outline-dark px-4 py-2 me-3">View</button>
          <button className="btn btn-dark px-4 py-2">Apply</button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
