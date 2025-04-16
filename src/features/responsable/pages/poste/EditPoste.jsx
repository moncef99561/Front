import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import api from '../../services/api';

const EditPoste = ({ show, onHide, poste, services, onUpdated }) => {
  const [formData, setFormData] = useState({
    title: '',
    serviceId: ''
  });
  const [error, setError] = useState('');

  // Mettre à jour les données du formulaire lorsque 'poste' change
  useEffect(() => {
    if (poste) {
      setFormData({
        title: poste.title || '',
        serviceId: poste.serviceId?.toString() || ''
      });
    }
  }, [poste]);

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

  // Vérifie si l'ID du poste existe pour une mise à jour
  if (!formData.posteId) {
    showError('ID du poste manquant');
    return;
  }

  const payload = {
    title: formData.title,
    serviceId: Number(formData.serviceId),
  };

  if (!payload.title || !payload.serviceId) {
    showError('Tous les champs sont obligatoires');
    return;
  }

  try {
    // Utilise PUT pour mettre à jour un poste existant
    const response = await api.put(`/postes/${formData.posteId}`, payload);

    if (response.status === 200) {
      setShowModal(false);
      fetchData(); // Recharge les données pour afficher la modification
    }
  } catch (err) {
    const backendError = err.response?.data?.Errors
      ? Object.entries(err.response.data.Errors)
          .map(([key, val]) => `${key}: ${val.join(', ')}`)
          .join('\n')
      : err.response?.data?.Message || 'Erreur inconnue';

    showError(backendError);
    console.error('Détails erreur:', err.response?.data);
  }
};


  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Modifier Poste</Modal.Title>
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
          <Button variant="secondary" onClick={onHide}>Annuler</Button>
          <Button variant="primary" type="submit">Enregistrer</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditPoste;
