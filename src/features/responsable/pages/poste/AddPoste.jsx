// AddPoste.jsx
import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const AddPoste = ({ show, handleClose, handleSubmit, formData, setFormData, services }) => {
  return (
    <Modal show={show} onHide={handleClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Ajouter Poste</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Titre *</Form.Label>
            <Form.Control
              name="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              minLength={3}
              maxLength={100}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Service *</Form.Label>
            <Form.Select
              name="serviceId"
              value={formData.serviceId}
              onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
              required
            >
              <option value="">Sélectionnez un service</option>
              {services.map(service => (
                <option key={service.serviceId} value={service.serviceId}>
                  {service.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Annuler
          </Button>
          <Button variant="primary" type="submit">
            Sauvegarder
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddPoste;