// AddDepartement.jsx
import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const AddDepartement = ({ show, handleClose, handleSubmit, formData, setFormData }) => {
  return (
    <Modal show={show} onHide={handleClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Ajouter Département</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Nom *</Form.Label>
            <Form.Control
              name="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Détails *</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="detail"
              value={formData.detail}
              onChange={(e) => setFormData({ ...formData, detail: e.target.value })}
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Annuler</Button>
          <Button variant="primary" type="submit">Sauvegarder</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddDepartement;
