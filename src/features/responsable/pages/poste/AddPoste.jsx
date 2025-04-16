import React, { useState } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import api from '../../services/api';

const AddPoste = ({ show, onClose, services, onAdded }) => {
  const [formData, setFormData] = useState({ title: '', serviceId: '' });
  const [error, setError] = useState('');

  const showError = (msg) => {
    setError(msg);
    setTimeout(() => setError(''), 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.serviceId) {
      showError('Tous les champs sont obligatoires');
      return;
    }

    try {
      const payload = {
        title: formData.title,
        serviceId: Number(formData.serviceId)
      };

      await api.post('/postes', payload);
      onClose();
      onAdded();
      setFormData({ title: '', serviceId: '' });
    } catch (err) {
      const backendError = err.response?.data?.Errors
        ? Object.entries(err.response.data.Errors)
            .map(([key, val]) => `${key}: ${val.join(', ')}`)
            .join('\n')
        : err.response?.data?.Message || 'Erreur inconnue';

      showError(backendError);
      console.error('Erreur:', err.response?.data);
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Ajouter Poste</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form.Group className="mb-3">
            <Form.Label>Titre *</Form.Label>
            <Form.Control
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              minLength={3}
              maxLength={100}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Service *</Form.Label>
            <Form.Select
              name="serviceId"
              value={formData.serviceId}
              onChange={handleChange}
              required
            >
              <option value="">Sélectionnez un service</option>
              {services.map(service => (
                <option key={service.serviceId} value={String(service.serviceId)}>
                  {service.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>Annuler</Button>
          <Button variant="primary" type="submit">Enregistrer</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddPoste;
