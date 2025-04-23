import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EditFormation = ({ show, handleClose, handleSubmit, formData, setFormData, types, formateurs }) => {
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" centered>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier la formation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Titre</Form.Label>
            <Form.Control
              type="text"
              required
              value={formData.titre}
              onChange={(e) => setFormData({ ...formData, titre: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Type de formation</Form.Label>
            <Form.Select
              required
              value={formData.typeId}
              onChange={(e) => setFormData({ ...formData, typeId: e.target.value })}
            >
              <option value="">-- Sélectionner un type --</option>
              {types.map(type => (
                <option key={type.id} value={type.id}>{type.nom}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Formateur</Form.Label>
            <Form.Select
              required
              value={formData.formateur}
              onChange={(e) => setFormData({ ...formData, formateur: e.target.value })}
            >
              <option value="">-- Sélectionner un formateur --</option>
              {formateurs.map(f => (
                <option key={f.id} value={f.nom}>{f.nom}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Date de début</Form.Label>
            <Form.Control
              type="date"
              required
              value={formData.dateDebut}
              onChange={(e) => setFormData({ ...formData, dateDebut: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Date de fin</Form.Label>
            <Form.Control
              type="date"
              required
              value={formData.dateFin}
              onChange={(e) => setFormData({ ...formData, dateFin: e.target.value })}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Annuler</Button>
          <Button type="submit" variant="success">Modifier</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditFormation;