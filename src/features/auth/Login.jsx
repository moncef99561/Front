import React, { useState } from "react";
import apiAuth from "./services/apiAuth"; 
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await apiAuth.post("/auth/login", { username, password }); 
      const { token, utilisateurId, typeUtilisateur } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("utilisateurId", utilisateurId);
      localStorage.setItem("typeUtilisateur", typeUtilisateur);

      // 🔁 Redirection selon le rôle
      switch (typeUtilisateur.toLowerCase()) {
        case "responsable":
          navigate("/responsable");
          break;
        case "candidat":
          navigate("/");
          break;
        case "manager":
          navigate("/manager");
          break;
        case "employe":
          navigate("/employee");
          break;
        default:
          navigate("/");
          break;
      }

    } catch (error) {
      if (error.response?.status === 401) {
        setError("Nom d'utilisateur ou mot de passe incorrect.");
      } else {
        setError("Erreur de connexion. Réessayez.");
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow" style={{ maxWidth: "400px", width: "90%" }}>
        <h2 className="text-center mb-4">Connexion</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="btn btn-primary w-100">Se connecter</button>

        <p className="text-center mt-3">
          Pas encore de compte ? <Link to="/register">S'inscrire</Link>
        </p>
      </form>
    </div>
  );
}
