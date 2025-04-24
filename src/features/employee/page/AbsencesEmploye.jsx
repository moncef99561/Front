import React, { useState } from "react";
import { Table, Badge, Form, Alert, Button, Row, Col } from "react-bootstrap";

const AbsencesEmploye = () => {
  const [absences, setAbsences] = useState([
    { id: 1, date: "2024-04-01", statut: "non justifiée", justificatif: null },
    { id: 2, date: "2024-04-10", statut: "justifiée" },
    { id: 3, date: "2024-04-15", statut: "en attente", justificatif: "certificat1.pdf" },
  ]);
  const [message, setMessage] = useState("");

  const handleUpload = (e, id) => {
    const file = e.target.files[0];
    if (file) {
      const updated = absences.map((a) =>
        a.id === id ? { ...a, statut: "en attente", justificatif: file.name } : a
      );
      setAbsences(updated);
      setMessage("Justificatif envoyé ou modifié. En attente de validation du manager.");
      setTimeout(() => setMessage(""), 4000);
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
                {abs.statut === "non justifiée" ? (
                  <Form.Control
                    type="file"
                    size="sm"
                    onChange={(e) => handleUpload(e, abs.id)}
                  />
                ) : abs.statut === "en attente" ? (
                  <Row className="align-items-center">
                    <Col xs={7} className="text-start">
                      <span className="text-muted small">{abs.justificatif}</span>
                    </Col>
                    <Col xs={5}>
                      <Form.Control
                        type="file"
                        size="sm"
                        onChange={(e) => handleUpload(e, abs.id)}
                      />
                    </Col>
                  </Row>
                ) : (
                  <span className="text-muted">Envoyé</span>
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