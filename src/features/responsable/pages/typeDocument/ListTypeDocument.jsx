import React, { useState, useEffect, useCallback } from 'react';
import { Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import api from '../../services/api';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ListTypeDocument = () => {
  const [types, setTypes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ typeDocumentId: null, name: '' });
  const [error, setError] = useState('');

  // Charger les données
  const fetchData = useCallback(async () => {
    try {
      const res = await api.get('/typedocument');
      setTypes(res.data);
    } catch (err) {
      showError('Erreur de chargement des types de documents');
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const showError = (msg) => {
    setError(msg);
    setTimeout(() => setError(''), 3000);
  };

  // Soumettre formulaire ajout / modification
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { name: formData.name };

      if (!payload.name) {
        showError('Le nom est obligatoire');
        return;
      }

      if (formData.typeDocumentId) {
        await api.put(`/typedocument/${formData.typeDocumentId}`, { typeDocumentId: formData.typeDocumentId, name: formData.name });
      } else {
        await api.post('/typedocument', payload);
      }

      setShowModal(false);
      fetchData();
    } catch (err) {
      const backendError = err.response?.data?.Errors
        ? Object.entries(err.response.data.Errors).map(([key, val]) => `${key}: ${val.join(', ')}`).join('\n')
        : err.response?.data?.Message || 'Erreur inconnue';
      showError(backendError);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Confirmer la suppression ?')) {
      try {
        await api.delete(`/typedocument/${id}`);
        fetchData();
      } catch (err) {
        showError('Erreur de suppression');
      }
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-5">Gestion des Types de Documents</h1>

      {error && <Alert variant="danger">{error}</Alert>}

      <Button 
        variant="primary" 
        onClick={() => {
          setFormData({ typeDocumentId: null, name: '' });
          setShowModal(true);
        }}
      >
        Ajouter Type Document
      </Button>

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {types.map(type => (
            <tr key={type.typeDocumentId}>
              <td>{type.name}</td>
              <td>
                <Button
                  variant="warning"
                  className="me-2"
                  onClick={() => {
                    setFormData({ typeDocumentId: type.typeDocumentId, name: type.name });
                    setShowModal(true);
                  }}
                >
                  <FaEdit />
                </Button>
                <Button 
                  variant="danger" 
                  onClick={() => handleDelete(type.typeDocumentId)}
                >
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{formData.typeDocumentId ? 'Modifier' : 'Ajouter'} Type de Document</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Nom *</Form.Label>
              <Form.Control
                name="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                minLength={2}
                maxLength={100}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button 
              variant="secondary" 
              onClick={() => setShowModal(false)}
            >
              Annuler
            </Button>
            <Button variant="primary" type="submit">
              Sauvegarder
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default ListTypeDocument;
