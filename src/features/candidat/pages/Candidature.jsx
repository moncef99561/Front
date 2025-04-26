import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import FileUploadBox from "./FileUploadBox";
import "./Candidature.css";

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

      // 1️⃣ Vérifier l'extension du CV
      const cvExt = getExtension(cvFile.name);
      if (!allowedExtensions.includes(cvExt)) {
        throw new Error(`Format de fichier CV non autorisé (${cvExt}). Formats autorisés : ${allowedExtensions.join(", ")}`);
      }

      // 2️⃣ Vérifier la taille du CV
      if (cvFile.size > 5 * 1024 * 1024) {
        throw new Error("Le fichier CV dépasse la taille maximale autorisée de 5MB.");
      }

      if (lettreMotivationFile) {
        const lettreExt = getExtension(lettreMotivationFile.name);
        if (!allowedExtensions.includes(lettreExt)) throw new Error(`Format de lettre non autorisé (${lettreExt}). Formats autorisés : ${allowedExtensions.join(", ")}`);
      }

      const formData = new FormData();
      formData.append("Status", "En attente");
      formData.append("DateCandidature", new Date().toISOString().split("T")[0]);
      formData.append("OffreEmploiId", id);
      formData.append("Cv", cvFile);
      if (lettreMotivationFile) formData.append("LettreMotivation", lettreMotivationFile);

      setLoading(true);
      await axios.post("http://localhost:5272/api/Candidature", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("✅ Candidature envoyée avec succès !");
      setCvFile(null);
      setLettreMotivationFile(null);
      setTimeout(() => navigate("/offers"), 2000);
    } catch (error) {
      console.error("Erreur lors de l'envoi :", error);
      setMessage(error.response?.data || error.message || "Erreur lors de l'envoi de la candidature.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-3" style={{ minHeight: "100vh" }}>
      <div className="row justify-content-center">
        <div className="col-md-10 col-lg-8">
          <div className="card border-0">
            <div className="card-body py-5 px-4">
              <h3 className="card-title mb-5 text-center text-primary">
                {offre ? `Postuler à l'offre : ${offre.titre}` : `Postuler pour l'offre #${id}`}
              </h3>

              {message && <div className={`alert ${message.includes("succès") ? "alert-success" : "alert-danger"}`}>{message}</div>}

              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="row">
                  <div className="col-md-6">
                    <FileUploadBox
                      title="CV"
                      onChange={(e) => setCvFile(e.target.files[0])}
                      file={cvFile}
                      required={true}
                      note="*Votre CV doit être à jour et inclure vos expériences professionnelles pertinentes."
                    />
                  </div>
                  <div className="col-md-6">
                    <FileUploadBox
                      title="Lettre de motivation"
                      onChange={(e) => setLettreMotivationFile(e.target.files[0])}
                      file={lettreMotivationFile}
                      note="*Facultative mais peut renforcer votre candidature."
                    />
                  </div>
                </div>


                <button
                  type="submit"
                  className="btn btn-primary w-100 fw-semibold"
                  disabled={loading}
                  aria-busy={loading}
                  aria-disabled={loading}
                >
                  {loading ? "⏳ Envoi en cours..." : "Envoyer"}
                </button>


              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
