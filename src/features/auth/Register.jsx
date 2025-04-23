import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

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
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    setError("");
    setSuccess("");
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.Cin || !formData.Username || !formData.Prenom || !formData.Nom ||
        !formData.DateNaissance || !formData.Sexe || !formData.Email || 
        !formData.Password || !formData.confirmationMotDePasse) {
      setError("Tous les champs requis doivent être remplis.");
      return;
    }
  
    if (formData.Password !== formData.confirmationMotDePasse) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
  
    console.log("Données envoyées :", formData); 
  
    setError("");
    setLoading(true);
  
    try {
      const response = await axios.post("http://localhost:5272/api/auth/register", formData);
      setSuccess("Inscription réussie !");
      console.log("Réponse du serveur :", response.data);
  
      setFormData({
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
  
      // Rediriger après 1 seconde
      setTimeout(() => {
        navigate("/login");
      }, 2000);
  
    } catch (error) {
      setError("Une erreur est survenue. Veuillez réessayer.");
      console.error("Erreur API :", error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <form 
        className="bg-white p-4 rounded shadow-sm" 
        style={{ maxWidth: "600px", width: "100%" }} 
        onSubmit={handleSubmit}
      >
        <h2 className="text-center fw-bold mb-4">S'inscription</h2>
  
        {error && <p className="text-danger text-center">{error}</p>}
        {success && <p className="text-success text-center">{success}</p>}
  
        <div className="d-flex gap-3 justify-content-center">
          <div className="col-6">
            <div className="mb-3">
              <input type="text" className="form-control" placeholder="CIN" name="Cin" value={formData.Cin} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <input type="text" className="form-control" placeholder="Prénom" name="Prenom" value={formData.Prenom} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <input type="text" className="form-control" placeholder="Nom" name="Nom" value={formData.Nom} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <input type="date" className="form-control" name="DateNaissance" value={formData.DateNaissance} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <input type="tel" className="form-control" placeholder="Téléphone (Optionnel)" name="Telephone" value={formData.Telephone} onChange={handleChange} />
            </div>
            <div className="mb-3 d-flex align-items-center">
              <label className="form-label me-3">Sexe:</label>
              <div className="form-check form-check-inline">
                <input id="female" type="radio" className="form-check-input" name="Sexe" value="Female" onChange={handleChange} required />
                <label htmlFor="female" className="form-check-label">Femme</label>
              </div>
              <div className="form-check form-check-inline">
                <input id="male" type="radio" className="form-check-input" name="Sexe" value="Male" onChange={handleChange} required />
                <label htmlFor="male" className="form-check-label">Homme</label>
              </div>
            </div>
          </div>
  
          <div className="col-6">
            <div className="mb-3">
              <input type="email" className="form-control" placeholder="Email" name="Email" value={formData.Email} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <input type="text" className="form-control" placeholder="Nom d'Utilisateur" name="Username" value={formData.Username} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <input type="password" className="form-control" placeholder="Mot de passe" name="Password" value={formData.Password} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <input type="password" className="form-control" placeholder="Confirmation" name="confirmationMotDePasse" value={formData.confirmationMotDePasse} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <input type="text" className="form-control" placeholder="Adresse (Optionnel)" name="Adresse" value={formData.Adresse} onChange={handleChange} />
            </div>
          </div>
        </div>
  
        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? "Enregistrement..." : "S'inscrire"}
        </button>
  
        <p className="text-center mt-3">
          Vous avez déjà un compte ? <Link to="/login" className="text-decoration-none">Connectez-vous</Link>
        </p>
      </form>
    </div>
  );
}
