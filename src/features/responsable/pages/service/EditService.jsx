// EditService.jsx
import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const EditService = ({ show, handleClose, handleSubmit, formData, setFormData, departments }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modifier Service</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Nom du service</Form.Label>
            <Form.Control
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Département</Form.Label>
            <Form.Select
              value={formData.departmentId}
              onChange={(e) => setFormData({ ...formData, departmentId: e.target.value })}
              required
            >
              <option value="">Sélectionnez un département</option>
              {departments.map(dept => (
                <option key={dept.departmentId} value={dept.departmentId}>{dept.name}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Annuler</Button>
          <Button variant="primary" type="submit">Modifier</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditService;