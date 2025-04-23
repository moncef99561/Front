import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Candidature() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [cvFile, setCvFile] = useState(null);
  const [lettreMotivationFile, setLettreMotivationFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const allowedExtensions = [".pdf", ".doc", ".docx"];

  const getExtension = (filename) =>
    filename?.substring(filename.lastIndexOf(".")).toLowerCase();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!id || isNaN(Number(id))) {
        throw new Error("L'identifiant de l'offre est invalide.");
      }

      if (!cvFile) {
        throw new Error("Le CV est obligatoire.");
      }

      const cvExt = getExtension(cvFile.name);
      if (!allowedExtensions.includes(cvExt)) {
        throw new Error(`Format de fichier CV non autorisé (${cvExt}). Formats autorisés : ${allowedExtensions.join(", ")}`);
      }

      if (lettreMotivationFile) {
        const lettreExt = getExtension(lettreMotivationFile.name);
        if (!allowedExtensions.includes(lettreExt)) {
          throw new Error(`Format de lettre non autorisé (${lettreExt}). Formats autorisés : ${allowedExtensions.join(", ")}`);
        }
      }

      const formData = {
        status: "En attente",
        datePostulation: new Date().toISOString().split("T")[0],
        offreEmploiId: id,
      };

      const form = new FormData();
      form.append("Status", formData.status);
      form.append("DatePostulation", formData.datePostulation);
      form.append("OffreEmploiId", formData.offreEmploiId);
      form.append("Cv", cvFile);
      if (lettreMotivationFile) {
        form.append("LettreMotivation", lettreMotivationFile);
      }

      // Debug
      for (let pair of form.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
      }

      setLoading(true);
      await axios.post("http://localhost:5272/api/Candidature", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("Candidature envoyée avec succès !");
      setCvFile(null);
      setLettreMotivationFile(null);
      setTimeout(() => {
        navigate("/offers");
      }, 2000);
    } catch (error) {
      console.error("Erreur lors de l'envoi :", error);
      setMessage(error.message || "Erreur lors de l'envoi de la candidature.");
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
          <label htmlFor="cvInput" className="form-label">
            CV <span className="text-danger">*</span>
          </label>
          <input
            type="file"
            id="cvInput"
            accept=".pdf,.doc,.docx"
            className="form-control"
            onChange={(e) => setCvFile(e.target.files[0])}
            required
          />
          {cvFile && <div className="mt-2 text-muted">Fichier sélectionné : {cvFile.name}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="lettreInput" className="form-label">
            Lettre de motivation (optionnelle)
          </label>
          <input
            type="file"
            id="lettreInput"
            accept=".pdf,.doc,.docx"
            className="form-control"
            onChange={(e) => setLettreMotivationFile(e.target.files[0])}
          />
          {lettreMotivationFile && (
            <div className="mt-2 text-muted">Fichier sélectionné : {lettreMotivationFile.name}</div>
          )}
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Envoi en cours..." : "Envoyer la candidature"}
        </button>
      </form>
    </div>
  );
}
