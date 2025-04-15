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
    { question: "What is the usual response time?", answer: "We strive to respond within 24-48 business hours." },
    { question: "How can I track my request?", answer: "You will receive an email confirmation with a tracking number." },
    { question: "Can I request a phone appointment?", answer: "Yes, you can mention it in your message along with your availability." },
  ];

  return (
    <div className="container-fluid bg-light">
      {/* Header */}
      <div className="bg-primary text-white text-center py-5">
        <h1 className="fw-bold">Contact Us</h1>
        <p className="lead">Our team is here to assist you</p>
      </div>

      {/* Main Content */}
      <div className="container py-5">
        <div className="row g-4 align-items-stretch">
          {/* Contact Info */}
          <div className="col-lg-5 d-flex">
            <div className="w-100 bg-white p-4 rounded shadow-sm h-100 d-flex flex-column">
              <h3 className="fw-bold">Our Contact Information</h3>
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
                    <p className="mb-0 fw-semibold">Phone</p>
                    <p className="text-muted">+33 1 23 45 67 89</p>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <div className="bg-light p-2 rounded-circle me-3">
                    <MapPin size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="mb-0 fw-semibold">Address</p>
                    <p className="text-muted">123 Avenue des Champs-Élysées, Paris</p>
                  </div>
                </div>
              </div>
              <img src={map} alt="Location" className="img-fluid rounded shadow-sm mt-3" />
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-lg-7 d-flex">
            <div className="w-100 bg-white p-4 rounded shadow-sm h-100">
              <h3 className="fw-bold mb-4">Send Us a Message</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Full Name <span className="text-danger">*</span></label>
                  <input type="text" className="form-control" placeholder="Enter your name" required 
                    value={formState.name} onChange={(e) => setFormState({ ...formState, name: e.target.value })} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email <span className="text-danger">*</span></label>
                  <input type="email" className="form-control" placeholder="you@example.com" required 
                    value={formState.email} onChange={(e) => setFormState({ ...formState, email: e.target.value })} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Subject <span className="text-danger">*</span></label>
                  <input type="text" className="form-control" placeholder="Subject of your message" required 
                    value={formState.subject} onChange={(e) => setFormState({ ...formState, subject: e.target.value })} />
                </div>
                <div className="mb-5">
                  <label className="form-label">Message <span className="text-danger">*</span></label>
                  <textarea className="form-control" rows="4" placeholder="Your message..." required 
                    value={formState.message} onChange={(e) => setFormState({ ...formState, message: e.target.value })}></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-100 d-flex align-items-center justify-content-center">
                  <Send size={20} className="me-2" /> Send Message
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-5 text-center">
          <h3 className="fw-bold mb-4">Frequently Asked Questions</h3>
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
