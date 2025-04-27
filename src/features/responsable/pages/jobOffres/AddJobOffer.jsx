import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

const AddJobOffer = ({ show, handleClose, handleSave }) => {
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    dateCreation: '',
    status: '',
    typeContrat: '',
    categorieTravail: '',
    experience: '',
    lieu: '',
    salaire: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave(formData);
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title>Ajouter une Offre d'Emploi</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: '80vh', overflowY: 'auto', padding: '20px' }}>
        <Form onSubmit={handleSubmit}>
          <Row className="g-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Titre</Form.Label>
                <Form.Control
                  type="text"
                  name="titre"
                  value={formData.titre}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Date de Création</Form.Label>
                <Form.Control
                  type="date"
                  name="dateCreation"
                  value={formData.dateCreation}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group>
                <Form.Label>Status</Form.Label>
                <Form.Control
                  type="text"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group>
                <Form.Label>Type de Contrat</Form.Label>
                <Form.Control
                  type="text"
                  name="typeContrat"
                  value={formData.typeContrat}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group>
                <Form.Label>Catégorie</Form.Label>
                <Form.Control
                  type="text"
                  name="categorieTravail"
                  value={formData.categorieTravail}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group>
                <Form.Label>Expérience</Form.Label>
                <Form.Control
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group>
                <Form.Label>Lieu</Form.Label>
                <Form.Control
                  type="text"
                  name="lieu"
                  value={formData.lieu}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group>
                <Form.Label>Salaire</Form.Label>
                <Form.Control
                  type="text"
                  name="salaire"
                  value={formData.salaire}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex justify-content-end mt-4">
            <Button variant="secondary" onClick={handleClose} className="me-2">
              Annuler
            </Button>
            <Button variant="primary" type="submit">
              Ajouter
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddJobOffer;
