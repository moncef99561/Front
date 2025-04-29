import React, { useEffect, useState } from "react";
import { Table, Badge, Form, Alert, Row, Col } from "react-bootstrap";
import axios from "axios";

const AbsencesEmploye = () => {
  const [absences, setAbsences] = useState([]);
  const [message, setMessage] = useState("");
  const employeeId = localStorage.getItem("employeeId");

  useEffect(() => {
    const fetchAbsences = async () => {
      try {
        const res = await axios.get(`http://localhost:5107/api/AbsenceEmploye/${employeeId}`);
        setAbsences(res.data);
      } catch (error) {
        console.error("Erreur chargement absences", error);
      }
    };

    if (employeeId) {
      fetchAbsences();
    }
  }, [employeeId]);

  const handleUpload = async (e, id) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("Justificatif", file);

    try {
      await axios.post(`http://localhost:5107/api/AbsenceEmploye/justifier/${id}`, formData);
      setMessage("Justificatif envoyé avec succès.");
    } catch (error) {
      console.error("Erreur upload justificatif", error);
    }
  };

  return (
    <div className="container mt-4">
      <h4 className="mb-4">📌 Suivi de mes absences</h4>

      {message && <Alert variant="info">{message}</Alert>}

      <Table striped bordered hover className="shadow-sm">
        <thead className="table-light">
          <tr className="align-middle text-center">
            <th>Date</th>
            <th>Statut</th>
            <th>Justificatif</th>
          </tr>
        </thead>
        <tbody>
          {absences.map((abs) => (
            <tr key={abs.id} className="align-middle text-center">
              <td>{new Date(abs.date).toLocaleDateString()}</td>
              <td>
                <Badge
                  bg={
                    abs.statut === "justifiée"
                      ? "success"
                      : abs.statut === "en attente"
                      ? "warning"
                      : "danger"
                  }
                >
                  {abs.statut}
                </Badge>
              </td>
              <td>
                {abs.statut !== "justifiée" ? (
                  <Form.Control
                    type="file"
                    size="sm"
                    onChange={(e) => handleUpload(e, abs.id)}
                  />
                ) : (
                  <span className="text-muted">Justifié</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AbsencesEmploye;
