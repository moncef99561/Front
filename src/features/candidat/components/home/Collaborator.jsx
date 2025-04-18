import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/Collaborator.css";

const logos = [
    { name: "Microsoft", src: "/logos/microsoft.png" },
    { name: "IBM", src: "/logos/ibm.png" },
    { name: "Google", src: "/logos/google.png" },
    { name: "Amazon", src: "/logos/amazon.png" },
  ];

const Collaborator = () => {
  return (
    <section className="trusted-section py-5">
      <div className="container text-center">
        <p className="text-muted mb-4 fw-medium">
        Trusted by top tech collaborators worldwide
        </p>
        <div className="row justify-content-center gx-4 gy-4">
          {logos.map((logo, index) => (
            <div className="col-4 col-sm-3 col-md-2" key={index}>
              <img
                src={logo.src}
                alt={logo.name}
                className="img-fluid trusted-logo rounded"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collaborator;
