import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DetailTache = ({ tache, onHide }) => {
  if (!tache) return null;

  return (
    <Modal show={!!tache} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Détails de la Tâche</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Titre :</strong> {tache.titre}</p>
        <p><strong>Description :</strong> {tache.description}</p>
        <p><strong>Projet associé :</strong> {tache.projet?.nom || "Non attribué"}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Fermer</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DetailTache;
