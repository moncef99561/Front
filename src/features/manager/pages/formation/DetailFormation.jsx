// 📁 src/features/manager/pages/formation/DetailFormation.jsx
import React from 'react';
import { Modal, Button, ListGroup } from 'react-bootstrap';

const DetailFormation = ({ formation, onHide, types }) => {
  if (!formation) return null;

  const typeNom = types.find(t => t.id === formation.typeId)?.nom || "N/A";

  return (
    <Modal show={!!formation} onHide={onHide} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>Détails de la Formation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup variant="flush">
          <ListGroup.Item><strong>Titre :</strong> {formation.titre}</ListGroup.Item>
          <ListGroup.Item><strong>Description :</strong> {formation.description || 'Non renseignée'}</ListGroup.Item>
          <ListGroup.Item><strong>Type :</strong> {typeNom}</ListGroup.Item>
          <ListGroup.Item><strong>Formateur :</strong> {formation.formateur}</ListGroup.Item>
          <ListGroup.Item><strong>Date de début :</strong> {formation.dateDebut}</ListGroup.Item>
          <ListGroup.Item><strong>Date de fin :</strong> {formation.dateFin}</ListGroup.Item>
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Fermer</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DetailFormation;
