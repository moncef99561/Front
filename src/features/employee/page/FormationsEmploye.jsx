import React, { useState } from "react";
import { Table, Button, Badge, Alert, Row, Col } from "react-bootstrap";

const FormationsEmploye = () => {
  const formationsDisponibles = [
    { id: 1, titre: "Communication efficace", date: "2024-05-10" },
    { id: 2, titre: "Leadership et motivation", date: "2024-05-15" },
    { id: 3, titre: "Gestion du stress", date: "2024-05-20" },
  ];

  const formationsEnCours = [
    { id: 4, titre: "Cybersécurité pour tous", date: "2024-04-25" },
  ];

  const formationsPassees = [
    { id: 5, titre: "Utilisation avancée d'Excel", date: "2024-03-18" },
    { id: 6, titre: "Bien-être au travail", date: "2024-03-01" },
  ];

  const [vue, setVue] = useState("disponibles");
  const [feedback, setFeedback] = useState(null);

  const handleAssister = (id) => {
    alert("Inscription enregistrée pour la formation ID: " + id);
  };

  const handleFeedback = (id) => {
    const commentaire = prompt("Laissez votre feedback pour la formation ID: " + id);
    if (commentaire) {
      setFeedback(`Merci pour votre retour : \"${commentaire}\"`);
    }
  };

  const getFormations = () => {
    if (vue === "cours") return formationsEnCours;
    if (vue === "passees") return formationsPassees;
    return formationsDisponibles;
  };

  return (
    <div className="container mt-4">
      <h4 className="mb-4">🎓 Formations</h4>

      <Row className="mb-3">
        <Col>
          <Button variant="primary" onClick={() => setVue("disponibles")}>Formations disponibles</Button>{" "}
          <Button variant="warning" onClick={() => setVue("cours")}>En cours</Button>{" "}
          <Button variant="secondary" onClick={() => setVue("passees")}>Historique</Button>
        </Col>
      </Row>

      {feedback && <Alert variant="success">{feedback}</Alert>}

      <Table bordered hover className="shadow-sm">
        <thead className="table-light">
          <tr>
            <th>Titre</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {getFormations().map((f) => (
            <tr key={f.id}>
              <td>{f.titre}</td>
              <td>{new Date(f.date).toLocaleDateString()}</td>
              <td>
                {vue === "passees" ? (
                  <Button size="sm" variant="outline-primary" onClick={() => handleFeedback(f.id)}>
                    Laisser un feedback
                  </Button>
                ) : vue === "disponibles" ? (
                  <Button size="sm" variant="success" onClick={() => handleAssister(f.id)}>
                    Assister
                  </Button>
                ) : (
                  <Badge bg="info">En cours</Badge>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default FormationsEmploye;