import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import React from "react";
import "./Footer.css";

const Footer = () => {
  const location = useLocation();
  
  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }
  return (
    <footer className="footer py-4 ">
      <div className="container-fluid px-5">
        {/* Section Subscribe */}
        <div className="row mb-4">
          <div className="col-md-6">
            <h5>Subscribe to updates</h5>
          </div>
          <div className="col-md-6 d-flex">
            <input type="email" className="form-control me-2" placeholder="Your email here" />
            <button className="btn btn-dark">Join</button>
          </div>
        </div>

        <hr />

        {/* Liens et sections */}
        <div className="row">
          <div className="col-md-2">
            <h6>Useful Links</h6>
            <ul className="list-unstyled">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact Support</Link></li>
              <li><Link to="/">Privacy Policy</Link></li>
              <li><Link to="/">Terms of Service</Link></li>
              <li><Link to="/">Careers Page</Link></li>
            </ul>
          </div>

          <div className="col-md-2">
            <h6>Get Help</h6>
            <ul className="list-unstyled">
              <li><Link to="/">FAQs</Link></li>
              <li><Link to="/">Follow Us</Link></li>
              <li><Link to="/">Facebook Page</Link></li>
              <li><Link to="/">Twitter Feed</Link></li>
              <li><Link to="/">LinkedIn Profile</Link></li>
            </ul>
          </div>

          <div className="col-md-2">
            <h6>Company Info</h6>
            <ul className="list-unstyled">
              <li><Link to="/">Our Mission</Link></li>
              <li><Link to="/">Our Vision</Link></li>
              <li><Link to="/">Our Values</Link></li>
              <li><Link to="/">Team Members</Link></li>
              <li><Link to="/">Success Stories</Link></li>
            </ul>
          </div>

          <div className="col-md-2">
            <h6>Resources</h6>
            <ul className="list-unstyled">
              <li><Link to="/">Blog Posts</Link></li>
              <li><Link to="/">Webinars</Link></li>
              <li><Link to="/">E-books</Link></li>
              <li><Link to="/">Newsletter</Link></li>
              <li><Link to="/">Join Our Community</Link></li>
            </ul>
          </div>

          <div className="col-md-2">
            <h6>Contact Us</h6>
            <ul className="list-unstyled">
              <li><Link to="/">Get in Touch</Link></li>
              <li><Link to="/">Support Center</Link></li>
              <li><Link to="/">Feedback Form</Link></li>
              <li><Link to="/">Stay Connected</Link></li>
              <li><Link to="/">Join Our Network</Link></li>
            </ul>
          </div>

          <div className="col-md-2">
            <h6>Follow Our Journey</h6>
            <ul className="list-unstyled">
              <li><Link to="/">Connect With Us</Link></li>
              <li><Link to="/">Share Your Thoughts</Link></li>
              <li><Link to="/">Join Our Team</Link></li>
              <li><Link to="/">Explore Opportunities</Link></li>
              <li><Link to="/">Get Started</Link></li>
            </ul>
          </div>
        </div>

        <hr />

        {/* Section Copyright */}
        <div className="d-flex justify-content-between align-items-center">
          <Link to="/" className="footer-logo">Work Wise</Link>
          <span>© 2024 Work Wise. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;