import React from "react";
import { FileText } from "lucide-react";

export default function FileUploadBox({ title, onChange, file, note, required = false }) {
  return (
    <div className="border rounded p-4 mb-4 text-center border-dashed" style={{ border: "1px dashed #ccc" }}>
      <FileText size={40} className="text-muted mb-2" />
      <p className="fw-semibold mb-1">{title}</p>
      <p className="text-muted mb-2 small">Importer votre fichier (PDF, DOCX)</p>
      <p className="text-muted mb-2 small">Taille maximale: 5 Mo</p>

      <label className="btn btn-outline-primary">
        Parcourir
        <input
          type="file"
          className="d-none"
          onChange={onChange}
          required={required}
          accept=".pdf,.doc,.docx"
        />
      </label>

      {file && <p className="mt-2 text-success small">✅ {file.name}</p>}
      {note && (
        <p className="text-muted mt-2" style={{ fontSize: "0.8rem" }}>
          {note}
        </p>
      )}
    </div>
  );
}
