import React, { useEffect, useState } from "react";
import { Table, Button, Badge, Alert, Row, Col } from "react-bootstrap";
import axios from "axios";

const FormationsEmploye = () => {
  const [formationsDisponibles, setFormationsDisponibles] = useState([]);
  const [formationsEnCours, setFormationsEnCours] = useState([]);
  const [formationsPassees, setFormationsPassees] = useState([]);
  const [vue, setVue] = useState("disponibles");
  const [feedback, setFeedback] = useState(null);
  const employeeId = localStorage.getItem("employeeId");

  useEffect(() => {
    const fetchFormations = async () => {
      try {
        const dispo = await axios.get(`http://localhost:5107/api/FormationEmploye/disponibles/${employeeId}`);
        const encours = await axios.get(`http://localhost:5107/api/FormationEmploye/encours/${employeeId}`);
        const passees = await axios.get(`http://localhost:5107/api/FormationEmploye/passees/${employeeId}`);
        setFormationsDisponibles(dispo.data);
        setFormationsEnCours(encours.data);
        setFormationsPassees(passees.data);
      } catch (error) {
        console.error("Erreur chargement formations", error);
      }
    };

    if (employeeId) {
      fetchFormations();
    }
  }, [employeeId]);

  const getFormations = () => {
    if (vue === "cours") return formationsEnCours;
    if (vue === "passees") return formationsPassees;
    return formationsDisponibles;
  };

  const handleFeedback = async (idFormation) => {
    const commentaire = prompt("Laissez votre feedback pour cette formation :");
    if (commentaire) {
      setFeedback(`Merci pour votre retour : "${commentaire}"`);
      // Optionnel : envoyer le feedback vers le backend
    }
  };

  const handleAssister = async (idFormation) => {
    try {
      await axios.post(`http://localhost:5107/api/FormationEmploye/inscription`, {
        formationId: idFormation,
        employeId: parseInt(employeeId),
      });
      alert("Inscription réussie !");
      window.location.reload();
    } catch (error) {
      console.error("Erreur inscription", error);
    }
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
              <td>{new Date(f.dateDebut).toLocaleDateString()}</td>
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
