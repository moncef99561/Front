import React, { useState, useEffect } from "react";
import { Table, Button, Badge, Card, ListGroup } from "react-bootstrap";
import axios from "axios";

const ProjetTachesEmploye = () => {
  const [projets, setProjets] = useState([]);
  const [selectedProjet, setSelectedProjet] = useState(null);

  useEffect(() => {
    loadProjets();
  }, []);

  const loadProjets = async () => {
    try {
      const res = await axios.get("http://localhost:5107/api/ProjetEmploye");
      setProjets(res.data);
    } catch (err) {
      console.error("Erreur chargement projets", err);
    }
  };

  const changerStatut = async (projetId, tacheId, nouveauStatut) => {
    try {
      await axios.put(`http://localhost:5107/api/ProjetEmploye/${projetId}/Tache/${tacheId}`, { statut: nouveauStatut });
      loadProjets();
    } catch (err) {
      console.error("Erreur mise à jour statut tâche", err);
    }
  };

  return (
    <div className="container mt-4">
      {!selectedProjet ? (
        <>
          <h4 className="mb-4">📁 Projets attribués</h4>
          <ListGroup>
            {projets.map((projet) => (
              <ListGroup.Item
                key={projet.id}
                action
                onClick={() => setSelectedProjet(projet)}
                className="d-flex justify-content-between align-items-center"
              >
                <span><strong>{projet.titre}</strong></span>
                <Badge pill bg="primary">{projet.taches.length} tâches</Badge>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </>
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="fw-semibold">🧩 Tâches - {selectedProjet.titre}</h4>
            <Button variant="secondary" onClick={() => setSelectedProjet(null)}>⬅ Retour</Button>
          </div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Titre</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {selectedProjet.taches.map((tache) => (
                <tr key={tache.id}>
                  <td>{tache.titre}</td>
                  <td>
                    <Badge bg={
                      tache.statut === "Terminé" ? "success" :
                      tache.statut === "En cours" ? "warning" :
                      "secondary"
                    }>
                      {tache.statut}
                    </Badge>
                  </td>
                  <td>
                    <div className="btn-group">
                      <Button variant="outline-secondary" size="sm" onClick={() => changerStatut(selectedProjet.id, tache.id, "À faire")}>À faire</Button>
                      <Button variant="outline-warning" size="sm" onClick={() => changerStatut(selectedProjet.id, tache.id, "En cours")}>En cours</Button>
                      <Button variant="outline-success" size="sm" onClick={() => changerStatut(selectedProjet.id, tache.id, "Terminé")}>Terminé</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </div>
  );
};

export default ProjetTachesEmploye;
