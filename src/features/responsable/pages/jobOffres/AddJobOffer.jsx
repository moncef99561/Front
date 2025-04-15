import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import RichTextEditor from './RichTextEditor'


const AddJobOffer = ({ show, handleClose, handleSubmit, formData, handleInputChange }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title>Ajouter une Offre d'Emploi</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Titre</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
  <Form.Label>Description</Form.Label>
  <RichTextEditor 
    value={formData.description} 
    onChange={(value) => handleInputChange({ target: { name: 'description', value }})}
  />
</Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Date de Publication</Form.Label>
            <Form.Control
              type="date"
              name="publicationDate"
              value={formData.publicationDate}
              onChange={handleInputChange}
              required
            />
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

export default AddJobOffer;