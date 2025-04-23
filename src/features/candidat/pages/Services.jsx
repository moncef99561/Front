import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Briefcase,
  Users,
  FileText,
  Globe,
  Star,
  ShieldCheck,
} from "lucide-react";

export default function Services() {
  const services = [
    {
      icon: <Briefcase size={32} className="text-primary" />,
      title: "Placement professionnel",
      description: "Nous mettons en relation les meilleurs talents avec les entreprises les plus ambitieuses.",
    },
    {
      icon: <Users size={32} className="text-primary" />,
      title: "Conseil RH",
      description: "Des solutions en ressources humaines adaptées à vos besoins et à votre culture d’entreprise.",
    },
    {
      icon: <FileText size={32} className="text-primary" />,
      title: "Aide à la rédaction de CV",
      description: "Nous vous aidons à créer un CV clair, professionnel et percutant.",
    },
    {
      icon: <Globe size={32} className="text-primary" />,
      title: "Opportunités à l’international",
      description: "Accédez à des carrières à l’étranger pour enrichir votre expérience.",
    },
    {
      icon: <Star size={32} className="text-primary" />,
      title: "Coaching de carrière",
      description: "Un accompagnement personnalisé pour atteindre vos objectifs professionnels.",
    },
    {
      icon: <ShieldCheck size={32} className="text-primary" />,
      title: "Sécurité au travail",
      description: "Nous favorisons des environnements de travail sûrs, inclusifs et bienveillants.",
    },
  ];

  return (
    <div className="container-fluid bg-light">
      {/* En-tête */}
      <div className="bg-primary text-white text-center py-5">
        <h1 className="fw-bold">Nos services</h1>
        <p className="lead">Découvrez comment nous vous aidons à faire évoluer votre carrière</p>
      </div>

      {/* Section services */}
      <div className="container py-5">
        <div className="row g-4">
          {services.map((service, index) => (
            <div key={index} className="col-md-6 col-lg-4">
              <div className="bg-white p-4 rounded shadow-sm text-center h-100 d-flex flex-column">
                <div className="mb-3">{service.icon}</div>
                <h5 className="fw-bold">{service.title}</h5>
                <p className="text-muted flex-grow-1">{service.description}</p>
                <button className="btn btn-outline-primary mt-auto">En savoir plus</button>
              </div>
            </div>
          ))}
        </div>

        {/* Section d'appel à l'action */}
        <div className="text-center mt-5">
          <h3 className="fw-bold">Prêt(e) à franchir une nouvelle étape ?</h3>
          <p className="text-muted">Rejoignez des milliers de professionnels qui nous font confiance.</p>
          <button className="btn btn-primary px-4 py-2">Commencer</button>
        </div>
      </div>
    </div>
  );
}
