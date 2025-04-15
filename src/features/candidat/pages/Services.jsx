import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Briefcase, Users, FileText, Globe, Star, ShieldCheck } from "lucide-react";

export default function Services() {
  const services = [
    {
      icon: <Briefcase size={32} className="text-primary" />,
      title: "Job Placement",
      description: "Connecting top talents with leading companies to ensure the perfect match.",
    },
    {
      icon: <Users size={32} className="text-primary" />,
      title: "HR Consulting",
      description: "Providing HR solutions tailored to your company’s needs and culture.",
    },
    {
      icon: <FileText size={32} className="text-primary" />,
      title: "Resume Assistance",
      description: "Helping candidates craft professional resumes that stand out.",
    },
    {
      icon: <Globe size={32} className="text-primary" />,
      title: "International Opportunities",
      description: "Facilitating job placements in global markets for career growth.",
    },
    {
      icon: <Star size={32} className="text-primary" />,
      title: "Career Coaching",
      description: "Personalized coaching to help you achieve your professional goals.",
    },
    {
      icon: <ShieldCheck size={32} className="text-primary" />,
      title: "Workplace Security",
      description: "Ensuring safe and inclusive workplaces for all professionals.",
    },
  ];

  return (
    <div className="container-fluid bg-light">
      {/* Header */}
      <div className="bg-primary text-white text-center py-5">
        <h1 className="fw-bold">Our Services</h1>
        <p className="lead">Explore how we can help advance your career</p>
      </div>

      {/* Services Section */}
      <div className="container py-5">
        <div className="row g-4">
          {services.map((service, index) => (
            <div key={index} className="col-md-6 col-lg-4">
              <div className="bg-white p-4 rounded shadow-sm text-center h-100 d-flex flex-column">
                <div className="mb-3">{service.icon}</div>
                <h5 className="fw-bold">{service.title}</h5>
                <p className="text-muted flex-grow-1">{service.description}</p>
                <button className="btn btn-outline-primary mt-auto">Learn More</button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-5">
          <h3 className="fw-bold">Ready to take the next step?</h3>
          <p className="text-muted">Join thousands of professionals who trust us for their career growth.</p>
          <button className="btn btn-primary px-4 py-2">Get Started</button>
        </div>
      </div>
    </div>
  );
}
