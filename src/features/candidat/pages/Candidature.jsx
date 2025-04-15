import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Apply() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData] = useState({
    status: "En attente",
    datePostulation: new Date().toISOString().split("T")[0],
    offreEmploiId: id,
  });

  const [cvFile, setCvFile] = useState(null);
  const [lettreMotivationFile, setLettreMotivationFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!cvFile) {
      alert("Le CV est obligatoire");
      return;
    }
  
    const form = new FormData();
    form.append("Status", formData.status);               
    form.append("DatePostulation", formData.datePostulation);
    form.append("OffreEmploiId", formData.offreEmploiId);
    form.append("Cv", cvFile);                            
    if (lettreMotivationFile) {
      form.append("LettreMotivation", lettreMotivationFile);
    }
  
    try {
      setLoading(true);
      await axios.post("http://localhost:5049/api/Candidatures", form, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`, 
        },
      });
      setMessage("Candidature envoyée avec succès !");
      setTimeout(() => {
        navigate("/offers");
      }, 2000);
    } catch (error) {
      console.error(error);
      setMessage("Erreur lors de l'envoi de la candidature.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="container py-5">
      <h3 className="mb-4">Postuler pour l'offre #{id}</h3>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label className="form-label">CV <span className="text-danger">*</span></label>
          <input type="file" className="form-control" onChange={(e) => setCvFile(e.target.files[0])} />
        </div>
        <div className="mb-3">
          <label className="form-label">Lettre de motivation (optionnelle)</label>
          <input type="file" className="form-control" onChange={(e) => setLettreMotivationFile(e.target.files[0])} />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Envoi en cours..." : "Envoyer la candidature"}
        </button>
      </form>
    </div>
  );
}
