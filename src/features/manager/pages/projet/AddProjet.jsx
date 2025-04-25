import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';

const AddProjet = ({ show, handleClose, reloadProjets }) => {
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [equipeId, setEquipeId] = useState('');
  const [equipes, setEquipes] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (show) {
      axios.get('http://localhost:5132/api/Equipe')
        .then(response => setEquipes(response.data))
        .catch(err => console.error('Erreur chargement équipes', err));
    }
  }, [show]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nom.trim()) {
      setError('Le nom est requis.');
      return;
    }
    try {
      await axios.post('http://localhost:5132/api/Projet', { nom, description, equipeId });
      handleClose();
      reloadProjets();
    } catch (err) {
      console.error('Erreur ajout projet', err);
      setError('Erreur ajout projet.');
    }
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" centered>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter Projet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form.Group className="mb-3">
            <Form.Label>Nom</Form.Label>
            <Form.Control
              type="text"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Équipe</Form.Label>
            <Form.Select
              value={equipeId}
              onChange={(e) => setEquipeId(e.target.value)}
              required
            >
              <option value="">-- Sélectionner une équipe --</option>
              {equipes.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.nom}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Annuler</Button>
          <Button type="submit" variant="primary">Ajouter</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddProjet;
