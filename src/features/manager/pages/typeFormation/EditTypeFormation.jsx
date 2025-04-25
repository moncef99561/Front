import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';

const EditTypeFormation = ({ show, handleClose, typeFormation, reload }) => {
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (show && typeFormation) {
      setNom(typeFormation.nom);
      setDescription(typeFormation.description);
    }
  }, [show, typeFormation]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5132/api/TypeFormation/${typeFormation.id}`, { id: typeFormation.id, nom, description });
      handleClose();
      reload();
    } catch (err) {
      setError("Erreur lors de la modification.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" centered>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier Type Formation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form.Group className="mb-3">
            <Form.Label>Nom</Form.Label>
            <Form.Control value={nom} onChange={e => setNom(e.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" value={description} onChange={e => setDescription(e.target.value)} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Annuler</Button>
          <Button type="submit" variant="primary">Modifier</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditTypeFormation;