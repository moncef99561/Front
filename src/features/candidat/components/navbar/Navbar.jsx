import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white px-4 ">
      <Link className="navbar-brand fs-2" to="/">Work <span className="text-primary">Wise</span></Link>

      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto me-5">
          <li className="nav-item">
            <Link className="nav-link" to="/">Accueil</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about">À propos</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/services">Services</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/contact">Contact</Link>
          </li>
        </ul>

        {!token ? (
          <Link className="btn btn-outline-primary" to="/login">Se connecter</Link>
        ) : (
          <div className="dropdown">
            <button
              className="btn border-0 dropdown-toggle d-flex align-items-center"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <FaUserCircle size={26} className="me-2 text-primary" />
              <span className="d-none d-md-inline">{username || "Profil"}</span>
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li><Link className="dropdown-item" to="/profil">Mon profil</Link></li>
              <li><hr className="dropdown-divider" /></li>
              <li><button className="dropdown-item text-danger" onClick={handleLogout}>Se déconnecter</button></li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
