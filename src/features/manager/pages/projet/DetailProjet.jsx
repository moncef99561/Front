import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DetailProjet = ({ show, handleClose, projetData }) => {
  if (!projetData) return null;

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>Détails du Projet</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Nom :</strong> {projetData.nom}</p>
        <p><strong>Description :</strong> {projetData.description}</p>
        <p><strong>Équipe :</strong> {projetData.equipeNom}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Fermer
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DetailProjet;
