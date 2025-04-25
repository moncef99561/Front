import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';

const AddTache = ({ show, handleClose, reload }) => {
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [projetId, setProjetId] = useState('');
  const [projets, setProjets] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (show) {
      axios.get('http://localhost:5132/api/Projet')
        .then(res => setProjets(res.data))
        .catch(err => console.error(err));
    }
  }, [show]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5132/api/Tache', { titre, description, projetId });
      handleClose();
      reload();
    } catch (err) {
      setError("Erreur lors de l'ajout.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" centered>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter Tâche</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form.Group className="mb-3">
            <Form.Label>Titre</Form.Label>
            <Form.Control value={titre} onChange={e => setTitre(e.target.value)} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" value={description} onChange={e => setDescription(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Projet</Form.Label>
            <Form.Select value={projetId} onChange={e => setProjetId(e.target.value)} required>
              <option value="">-- Sélectionner un projet --</option>
              {projets.map(p => (
                <option key={p.id} value={p.id}>{p.nom}</option>
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

export default AddTache;