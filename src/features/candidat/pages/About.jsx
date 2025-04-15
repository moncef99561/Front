import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import about from "../assets/about.jpg"

const About = () => {
  return (
    <section className="container-fluid bg-light py-5">
      <div className="container">
        <h1 className="text-center fw-bold mb-5">About Us</h1>

        <div className="row align-items-center mb-5">
          <div className="col-lg-6 text-center">
            <img
              src={about}
              alt="Our team in action"
              className="img-fluid rounded shadow"
            />
          </div>
          <div className="col-lg-6">
            <h2 className="fw-semibold">Our Mission</h2>
            <p>
              Since 2010, RecruitPro has been committed to connecting top talent
              with the most innovative companies. Our personalized approach and
              market expertise allow us to build lasting partnerships.
            </p>
            <p>
              We believe that every recruitment process is unique and requires
              special attention to ensure a perfect match between candidates and
              companies.
            </p>
          </div>
        </div>

        <div className="row text-center">
          <div className="col-md-4">
            <div className="card p-4 shadow-sm">
              <h3 className="fw-semibold">Expertise</h3>
              <p>Over 10 years of experience in specialized recruitment</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card p-4 shadow-sm">
              <h3 className="fw-semibold">Network</h3>
              <p>A network of more than 5000 qualified professionals</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card p-4 shadow-sm">
              <h3 className="fw-semibold">Satisfaction</h3>
              <p>98% client satisfaction rate</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
