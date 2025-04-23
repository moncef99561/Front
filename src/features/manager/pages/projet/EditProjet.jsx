import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EditProjet = ({ show, handleClose, handleSubmit, formData, setFormData, equipes }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{formData.id ? "Modifier Projet" : "Ajouter Projet"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Nom</Form.Label>
            <Form.Control
              type="text"
              value={formData.nom}
              onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Équipe assignée</Form.Label>
            <Form.Select
              value={formData.equipeId}
              onChange={(e) => setFormData({ ...formData, equipeId: e.target.value })}
              required
            >
              <option value="">-- Sélectionner une équipe --</option>
              {equipes.map(eq => (
                <option key={eq.id} value={eq.id}>{eq.nom}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Annuler</Button>
          <Button variant="primary" type="submit">Enregistrer</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditProjet;
