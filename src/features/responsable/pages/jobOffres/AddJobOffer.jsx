import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import RichTextEditor from './RichTextEditor';
import axios from 'axios';

const AddJobOffer = ({ show, handleClose, handleSave }) => {
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    dateCreation: '',
    status: 'Actif',
    typeContrat: '',
    categorieTravail: '',
    experience: '',
    lieu: '',
    salaire: ''
  });

  const [contratTypes, setContratTypes] = useState([]);

  useEffect(() => {
    const fetchContratTypes = async () => {
      try {
        const res = await axios.get('http://localhost:5263/api/contracttypes');
        setContratTypes(res.data);
      } catch (error) {
        console.error('Erreur lors du chargement des types de contrat :', error);
      }
    };
    fetchContratTypes();
  }, []);

  const postes = [
    'Développement',
    'Informatique',
    'Management / Digital',
    'Industrie / Production',
    'Communication / Marketing'
  ];

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
                  readOnly
                />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group>
                <Form.Label>Type de Contrat</Form.Label>
                <Form.Select
                  name="typeContrat"
                  value={formData.typeContrat}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Sélectionner --</option>
                  {contratTypes.map((type) => (
                    <option key={type.contractTypeId} value={type.name}>
                      {type.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group>
                <Form.Label>Poste</Form.Label>
                <Form.Select
                  name="categorieTravail"
                  value={formData.categorieTravail}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Sélectionner --</option>
                  {postes.map((poste, index) => (
                    <option key={index} value={poste}>{poste}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group>
                <Form.Label>Expérience</Form.Label>
                <Form.Select
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Sélectionner --</option>
                  <option value="Débutant">Débutant</option>
                  <option value="1-3 ans">1-3 ans</option>
                  <option value="3-5 ans">3-5 ans</option>
                  <option value="5-10 ans">5-10 ans</option>
                </Form.Select>
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
                <RichTextEditor
                  value={formData.description}
                  onChange={(val) => setFormData(prev => ({ ...prev, description: val }))}
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
