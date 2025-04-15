import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Réinitialiser les erreurs

    try {
      const response = await axios.post("http://localhost:5100/api/Auth/login", {
        username,
        password,
      });

      // ✅ Stockage du token JWT dans localStorage
      const { token, utilisateurId, typeUtilisateur } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("utilisateurId", utilisateurId);
      localStorage.setItem("typeUtilisateur", typeUtilisateur);

      console.log("Connexion réussie !");
      navigate("/"); // rediriger après login
    } catch (error) {
      if (error.response?.status === 401) {
        setError("Nom d'utilisateur ou mot de passe incorrect.");
      } else {
        setError("Une erreur est survenue. Veuillez réessayer.");
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <form className="bg-white p-4 rounded shadow-sm" style={{ maxWidth: "350px", width: "90%" }} onSubmit={handleSubmit}>
        <h2 className="text-center fw-bold mb-4">Se Connecter</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">Se connecter</button>

        <p className="text-center mt-3">
          Pas de compte ? <Link to="/register" className="text-decoration-none">Inscrivez-vous</Link>
        </p>
      </form>
    </div>
  );
}
