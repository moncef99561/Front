import React, { useEffect, useState } from "react";
import { FiFileText } from "react-icons/fi";
import apiRecrutement from "../../services/apiRecrutement";

export default function DocumentsResume() {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchDocs = async () => {
      const id = localStorage.getItem("utilisateurId");
      if (!id) return;

      try {
        const res = await apiRecrutement.get(`/Document/candidat/${id}`);
        setDocuments(res.data);
      } catch (error) {
        console.error("Erreur lors du chargement des documents :", error);
      }
    };

    fetchDocs();
  }, []);

  return (
    <div className="card mt-4 rounded-4 border-0">
      <div className="card-body">
        <h5 className="fw-bold mb-3">Documents</h5>

        {documents.map((doc, idx) => (
          <div key={idx} className="border rounded px-3 py-2 d-flex justify-content-between align-items-center mb-3">
            <div>
              <div className="fw-semibold d-flex align-items-center">
                <FiFileText className="me-2 text-primary" />
                {doc.nom}
              </div>
              <div className="text-muted small">
                Ajouté le {new Date(doc.dateAjout).toLocaleDateString()}
              </div>
            </div>
            <a
              href={doc.url}
              target="_blank"
              rel="noreferrer"
              className="text-primary fw-semibold small"
            >
              Télécharger
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
