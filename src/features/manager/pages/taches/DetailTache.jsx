import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DetailTache = ({ show, handleClose, tache }) => {
  if (!tache) return null;
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Détails de la Tâche</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Titre :</strong> {tache.titre}</p>
        <p><strong>Description :</strong> {tache.description}</p>
        <p><strong>Projet :</strong> {tache.projetNom}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Fermer</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DetailTache;