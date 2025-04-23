import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import about from "../assets/about.jpg";

const About = () => {
  return (
    <section className="bg-light d-flex align-items-center">
      <div className="container py-4">

        <h2 className="text-center fw-bold mb-4">À propos de nous</h2>

        <div className="row align-items-center mb-5">
          <div className="col-lg-6 text-center mb-4 mb-lg-0">
            <img
              src={about}
              alt="Notre équipe en action"
              className="img-fluid rounded shadow"

            />
          </div>
          <div className="col-lg-6 text-center text-lg-start">
            <h2 className="fw-semibold">Notre vision</h2>
            <p>
              <strong>Work Wise</strong> est bien plus qu'une entreprise technologique : c'est une communauté où chaque collaborateur a l'opportunité de grandir, d'innover et de contribuer à des projets porteurs de sens.
            </p>
            <p>
              Cette plateforme a été conçue pour permettre aux candidats de postuler directement aux offres internes de Work Wise, et ainsi rejoindre une équipe passionnée qui façonne l'avenir du travail.
            </p>
          </div>
        </div>

        <div className="row text-center">
          <div className="col-md-4 mb-3">
            <div className="card p-2 h-100 shadow-sm">
              <h5 className="fw-semibold fs-5 mb-2">Esprit d'équipe</h5>
              <p>Une culture collaborative et bienveillante centrée sur l'humain</p>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card p-2 h-100 shadow-sm">
              <h5 className="fw-semibold fs-5 mb-2">Opportunités</h5>
              <p>Des postes variés à pourvoir dans tous nos pôles : tech, design, RH, et plus</p>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card p-2 h-100 shadow-sm">
              <h5 className="fw-semibold fs-5 mb-2">Épanouissement</h5>
              <p>Un environnement de travail stimulant où vos idées ont de l'impact</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
