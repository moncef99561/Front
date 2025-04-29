import React, { useState } from "react";
import axios from "./services/api";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    Cin: "",
    Username: "",
    Prenom: "",
    Nom: "",
    DateNaissance: "",
    Sexe: "",
    Email: "",
    Password: "",
    confirmationMotDePasse: "",
    Adresse: "",
    Telephone: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.Password !== formData.confirmationMotDePasse) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await axios.post("/Auth/register", formData);
      navigate("/login");
    } catch (error) {
      setError("Erreur d'inscription. Vérifiez vos informations.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow" style={{ maxWidth: "600px", width: "90%" }}>
        <h2 className="text-center mb-4">Inscription</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="row">
          <div className="col-md-6">
            <input type="text" name="Cin" className="form-control mb-3" placeholder="CIN" value={formData.Cin} onChange={handleChange} required />
            <input type="text" name="Prenom" className="form-control mb-3" placeholder="Prénom" value={formData.Prenom} onChange={handleChange} required />
            <input type="text" name="Nom" className="form-control mb-3" placeholder="Nom" value={formData.Nom} onChange={handleChange} required />
            <input type="date" name="DateNaissance" className="form-control mb-3" value={formData.DateNaissance} onChange={handleChange} required />
          </div>

          <div className="col-md-6">
            <input type="email" name="Email" className="form-control mb-3" placeholder="Email" value={formData.Email} onChange={handleChange} required />
            <input type="text" name="Username" className="form-control mb-3" placeholder="Nom d'utilisateur" value={formData.Username} onChange={handleChange} required />
            <input type="password" name="Password" className="form-control mb-3" placeholder="Mot de passe" value={formData.Password} onChange={handleChange} required />
            <input type="password" name="confirmationMotDePasse" className="form-control mb-3" placeholder="Confirmation" value={formData.confirmationMotDePasse} onChange={handleChange} required />
          </div>
        </div>

        <div className="mb-3">
          <input type="text" name="Adresse" className="form-control" placeholder="Adresse (optionnelle)" value={formData.Adresse} onChange={handleChange} />
        </div>

        <div className="d-flex mb-3">
          <label className="me-2">Sexe : </label>
          <div>
            <input type="radio" name="Sexe" value="Male" onChange={handleChange} /> Homme
            <input type="radio" name="Sexe" value="Female" className="ms-3" onChange={handleChange} /> Femme
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? "Enregistrement..." : "S'inscrire"}
        </button>

        <p className="text-center mt-3">
          Déjà inscrit ? <Link to="/login">Se connecter</Link>
        </p>
      </form>
    </div>
  );
}
