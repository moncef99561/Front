import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DetailProjet = ({ projet, onHide }) => {
  if (!projet) return null;

  return (
    <Modal show={!!projet} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Détails du Projet</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Nom :</strong> {projet.nom}</p>
        <p><strong>Description :</strong> {projet.description}</p>
        <p><strong>Équipe assignée :</strong> {projet.equipe?.nom || "Non attribuée"}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Fermer</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DetailProjet;
