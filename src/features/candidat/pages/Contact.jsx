import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Mail, Phone, MapPin, Send, HelpCircle } from "lucide-react";
import map from "../assets/map.jpg";

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const faqs = [
    { question: "Quel est le délai de réponse habituel ?", answer: "Nous nous efforçons de répondre sous 24 à 48 heures ouvrées." },
    { question: "Comment puis-je suivre ma demande ?", answer: "Vous recevrez un email de confirmation avec un numéro de suivi." },
    { question: "Puis-je demander un rendez-vous téléphonique ?", answer: "Oui, vous pouvez le mentionner dans votre message avec vos disponibilités." },
  ];

  return (
    <div className="container-fluid bg-light">
      {/* En-tête */}
      <div className="bg-primary text-white text-center py-5">
        <h1 className="fw-bold">Contactez-nous</h1>
        <p className="lead">Notre équipe est là pour vous aider</p>
      </div>

      {/* Contenu principal */}
      <div className="container py-5">
        <div className="row g-4 align-items-stretch">
          {/* Informations de contact */}
          <div className="col-lg-5 d-flex">
            <div className="w-100 bg-white p-4 rounded shadow-sm h-100 d-flex flex-column">
              <h3 className="fw-bold">Nos coordonnées</h3>
              <div className="mt-4 flex-grow-1">
                <div className="d-flex align-items-center mb-3">
                  <div className="bg-light p-2 rounded-circle me-3">
                    <Mail size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="mb-0 fw-semibold">Email</p>
                    <p className="text-muted">contact@workwise.com</p>
                  </div>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <div className="bg-light p-2 rounded-circle me-3">
                    <Phone size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="mb-0 fw-semibold">Téléphone</p>
                    <p className="text-muted">+33 1 23 45 67 89</p>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <div className="bg-light p-2 rounded-circle me-3">
                    <MapPin size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="mb-0 fw-semibold">Adresse</p>
                    <p className="text-muted">123 Avenue des Champs-Élysées, Paris</p>
                  </div>
                </div>
              </div>
              <img src={map} alt="Emplacement" className="img-fluid rounded shadow-sm mt-3" />
            </div>
          </div>

          {/* Formulaire de contact */}
          <div className="col-lg-7 d-flex">
            <div className="w-100 bg-white p-4 rounded shadow-sm h-100">
              <h3 className="fw-bold mb-4">Envoyez-nous un message</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Nom complet <span className="text-danger">*</span></label>
                  <input type="text" className="form-control" placeholder="Entrez votre nom" required 
                    value={formState.name} onChange={(e) => setFormState({ ...formState, name: e.target.value })} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email <span className="text-danger">*</span></label>
                  <input type="email" className="form-control" placeholder="vous@example.com" required 
                    value={formState.email} onChange={(e) => setFormState({ ...formState, email: e.target.value })} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Sujet <span className="text-danger">*</span></label>
                  <input type="text" className="form-control" placeholder="Sujet de votre message" required 
                    value={formState.subject} onChange={(e) => setFormState({ ...formState, subject: e.target.value })} />
                </div>
                <div className="mb-5">
                  <label className="form-label">Message <span className="text-danger">*</span></label>
                  <textarea className="form-control" rows="4" placeholder="Votre message..." required 
                    value={formState.message} onChange={(e) => setFormState({ ...formState, message: e.target.value })}></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-100 d-flex align-items-center justify-content-center">
                  <Send size={20} className="me-2" /> Envoyer le message
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Section FAQ */}
        <div className="mt-5 text-center">
          <h3 className="fw-bold mb-4">Questions fréquentes</h3>
          <div className="row">
            {faqs.map((faq, index) => (
              <div key={index} className="col-md-4">
                <div className="bg-light p-4 rounded shadow-sm h-100">
                  <div className="d-flex align-items-start">
                    <HelpCircle size={20} className="text-primary me-2 mt-1" />
                    <div>
                      <h5 className="fw-semibold">{faq.question}</h5>
                      <p className="text-muted">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
