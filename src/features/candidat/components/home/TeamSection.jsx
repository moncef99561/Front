import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/TeamSection.css";

const teamMembers = [
  {
    name: "Alice Johnson",
    role: "HR Manager",
    description: "Passionate about connecting talent with opportunities in dynamic environments.",
    image: "https://randomuser.me/api/portraits/men/15.jpg",
  },
  {
    name: "Emily Davis",
    role: "Talent Scout",
    description: "Skilled at building relationships and understanding client needs for effective placements.",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
  },
  {
    name: "James Brown",
    role: "Recruitment Lead",
    description: "Focused on strategic hiring practices to enhance team performance and culture.",
    image: "https://randomuser.me/api/portraits/men/35.jpg",
  },
];

const TeamSection = () => {
  return (
    <section className="team-section container-fluid py-5">
      <div className="container-fluid px-5 text-center">
        <h2 className="fw-bold">Meet Our Team</h2>
        <p className="text-muted">Dedicated professionals committed to your recruitment success.</p>

        <div className="row">
          {teamMembers.map((member, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="team-card p-3 text-center">
                <img src={member.image} alt={member.name} className="team-img mb-3" />
                <h5 className="fw-semibold">{member.name}</h5>
                <p className="text-muted">{member.role}</p>
                <p className="team-desc">{member.description}</p>
                <div className="social-icons">
                  <i className="fab fa-linkedin"></i>
                  <i className="fab fa-twitter"></i>
                  <i className="fab fa-github"></i>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <h4>We're hiring!</h4>
          <p>Join our team and make a difference today!</p>
          <button className="btn btn-dark px-4 py-2">Open Positions</button>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
