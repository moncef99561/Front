import React from 'react';
import { Modal, Button, ListGroup } from 'react-bootstrap';

const DetailEquipe = ({ equipe, onHide }) => {
  if (!equipe) return null;

  return (
    <Modal show={!!equipe} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Détails de l'équipe</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Nom :</strong> {equipe.nom}</p>
        <p><strong>Description :</strong> {equipe.description}</p>
        <p><strong>Employés :</strong></p>
        <ListGroup>
          {equipe.employes.map(emp => (
            <ListGroup.Item key={emp.id}>
              {emp.nom} {emp.prenom}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Fermer</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DetailEquipe;
