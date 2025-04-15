import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/TestimonialSection.css";

const TestimonialSection = () => {
  return (
    <section className="testimonial-section container-fluid py-5">
      <div className="container-fluid px-5 text-center">
        <div id="testimonialCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            
            <div className="carousel-item active">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" className="testimonial-img" alt="User" />
              <p className="testimonial-text">
                "Working here has transformed my career. The supportive environment and growth opportunities are unmatched."
              </p>
              <h5 className="fw-semibold">John Doe</h5>
              <p className="text-muted">Senior Developer, TechCorp</p>
            </div>

            <div className="carousel-item">
              <img src="https://randomuser.me/api/portraits/women/44.jpg" className="testimonial-img" alt="User" />
              <p className="testimonial-text">
                "The company truly values its employees and fosters a culture of innovation and collaboration."
              </p>
              <h5 className="fw-semibold">Jane Smith</h5>
              <p className="text-muted">Project Manager, InnovateX</p>
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
