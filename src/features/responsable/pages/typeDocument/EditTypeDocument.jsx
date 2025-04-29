import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import api from '../../services/api';

const EditTypeDocument = ({ show, handleClose, typeDocument, fetchData }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (typeDocument) {
      setName(typeDocument.name || '');
    }
  }, [typeDocument]);

  const showError = (msg) => {
    setError(msg);
    setTimeout(() => setError(''), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!name.trim()) {
        showError('Le nom est obligatoire');
        return;
      }

      await api.put(`/typedocument/${typeDocument.typeDocumentId}`, {
        typeDocumentId: typeDocument.typeDocumentId,
        name
      });

      handleClose();
      fetchData();
    } catch (err) {
      const backendError = err.response?.data?.Errors
        ? Object.entries(err.response.data.Errors).map(([key, val]) => `${key}: ${val.join(', ')}`).join('\n')
        : err.response?.data?.Message || 'Erreur inconnue';
      showError(backendError);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modifier Type de Document</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form.Group className="mb-3">
            <Form.Label>Nom *</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              minLength={2}
              maxLength={100}
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

export default EditTypeDocument;
