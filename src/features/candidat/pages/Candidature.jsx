// 📁 src/features/candidat/components/candidature/Candidature.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FileText, FilePlus2 } from "lucide-react";

export default function Candidature() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [cvFile, setCvFile] = useState(null);
  const [lettreMotivationFile, setLettreMotivationFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [offre, setOffre] = useState(null);
  const allowedExtensions = [".pdf", ".doc", ".docx"];

  useEffect(() => {
    if (id && !isNaN(Number(id))) {
      axios.get(`http://localhost:5272/api/OffreEmploi/${id}`)
        .then(res => setOffre(res.data))
        .catch(() => setMessage("Offre introuvable ou erreur serveur."));
    } else {
      setMessage("Identifiant d'offre invalide.");
    }
  }, [id]);

  const getExtension = (filename) => filename?.substring(filename.lastIndexOf(".")).toLowerCase();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!cvFile) throw new Error("Le CV est obligatoire.");

      const cvExt = getExtension(cvFile.name);
      if (!allowedExtensions.includes(cvExt)) throw new Error(`Format de fichier CV non autorisé (${cvExt}). Formats autorisés : ${allowedExtensions.join(", ")}`);

      if (lettreMotivationFile) {
        const lettreExt = getExtension(lettreMotivationFile.name);
        if (!allowedExtensions.includes(lettreExt)) throw new Error(`Format de lettre non autorisé (${lettreExt}). Formats autorisés : ${allowedExtensions.join(", ")}`);
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
      if (lettreMotivationFile) form.append("LettreMotivation", lettreMotivationFile);

      setLoading(true);
      await axios.post("http://localhost:5272/api/Candidature", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("✅ Candidature envoyée avec succès !");
      setCvFile(null);
      setLettreMotivationFile(null);
      setTimeout(() => navigate("/offers"), 2000);
    } catch (error) {
      console.error("Erreur lors de l'envoi :", error);
      setMessage(error.message || "Erreur lors de l'envoi de la candidature.");
    } finally {
      setLoading(false);
    }
  };

return (
  <div className="container py-5" style={{ minHeight: "100vh" }}>
    <div className="row justify-content-center">
      <div className="col-md-10 col-lg-6">
        <div className="card shadow-sm border-0">
          <div className="card-body py-5 px-4">
            <h3 className="card-title mb-4 text-center text-primary">
              {offre ? `Postuler à l'offre : ${offre.titre}` : `Postuler pour l'offre #${id}`}
            </h3>

            {message && <div className={`alert ${message.includes("succès") ? "alert-success" : "alert-danger"}`}>{message}</div>}

            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="mb-4">
                <label htmlFor="cvInput" className="form-label fw-semibold">
                  <FileText size={18} className="me-2 text-primary" />CV <span className="text-danger">*</span>
                </label>
                <input
                  type="file"
                  id="cvInput"
                  accept=".pdf,.doc,.docx"
                  className="form-control"
                  onChange={(e) => setCvFile(e.target.files[0])}
                  required
                />
                {cvFile && <div className="form-text mt-1">Fichier sélectionné : {cvFile.name}</div>}
              </div>

              <div className="mb-4">
                <label htmlFor="lettreInput" className="form-label fw-semibold">
                  <FilePlus2 size={18} className="me-2 text-secondary" />Lettre de motivation (optionnelle)
                </label>
                <input
                  type="file"
                  id="lettreInput"
                  accept=".pdf,.doc,.docx"
                  className="form-control"
                  onChange={(e) => setLettreMotivationFile(e.target.files[0])}
                />
                {lettreMotivationFile && <div className="form-text mt-1">Fichier sélectionné : {lettreMotivationFile.name}</div>}
              </div>

              <button type="submit" className="btn btn-primary w-100 fw-semibold" disabled={loading}>
                {loading ? "⏳ Envoi en cours..." : "Envoyer ma candidature"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}