import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// import { HiOutlineLogout } from "react-icons/hi";
import { useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {

  const location = useLocation();

  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid py-2 px-5">
        <Link className="navbar-brand fs-3" to="/"> <span className="text-primary">Work </span> Wise</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Basculer la navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-center fs-5" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item"><Link className="nav-link" to="/">Accueil</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/about">À propos</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/contact">Contact</Link></li>
          </ul>

          <div className="d-lg-none mt-3 text-center">
            <Link className="btn btn-primary w-100 fs-6" to="/login">Connexion</Link>
          </div>
        </div>

        <div className="d-none d-lg-block me-2">
          <Link className="btn btn-primary" to="/login">Connexion</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
