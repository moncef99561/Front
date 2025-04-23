import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/TestimonialSection.css";

const TestimonialSection = () => {
  return (
    <section className="testimonial-section container-fluid bg-light py-5">
      <div className="container-fluid px-5 text-center">
        <div id="testimonialCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            
            <div className="carousel-item active">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" className="testimonial-img" alt="Utilisateur" />
              <p className="testimonial-text">
                "Travailler ici a transformé ma carrière. L’environnement bienveillant et les opportunités d’évolution sont incomparables."
              </p>
              <h5 className="fw-semibold">John Doe</h5>
              <p className="text-muted">Développeur Senior, TechCorp</p>
            </div>

            <div className="carousel-item">
              <img src="https://randomuser.me/api/portraits/women/44.jpg" className="testimonial-img" alt="Utilisateur" />
              <p className="testimonial-text">
                "L'entreprise valorise vraiment ses employés et encourage une culture d’innovation et de collaboration."
              </p>
              <h5 className="fw-semibold">Jane Smith</h5>
              <p className="text-muted">Cheffe de projet, InnovateX</p>
            </div>

          </div>

          <button className="carousel-control-prev" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon"></span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon"></span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
