import React, { useState, useEffect, useCallback } from 'react';
import { Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import api from '../../services/api';
import { FaEdit, FaTrash } from 'react-icons/fa';

const PosteList = () => {
  const [postes, setPostes] = useState([]); // Définir l'état des postes
  const [services, setServices] = useState([]); // Définir l'état des services
  const [showModal, setShowModal] = useState(false); // Définir l'état de l'affichage du modal
  const [formData, setFormData] = useState({
    posteId: null,
    title: '',
    serviceId: ''
  });
  const [error, setError] = useState(''); // Gestion des erreurs

  // Fonction pour récupérer les données
  const fetchData = useCallback(async () => {
    try {
      const [postesRes, servicesRes] = await Promise.all([
        api.get('/postes'),
        api.get('/services')
      ]);
      setPostes(postesRes.data);
      setServices(servicesRes.data);
    } catch (err) {
      showError('Erreur de chargement des données');
    }
  }, []);
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const showError = (msg) => {
    setError(msg);
    setTimeout(() => setError(''), 3000);
  };

  // Fonction de soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        title: formData.title,
        serviceId: Number(formData.serviceId)
      };

      if (!payload.title || !payload.serviceId) {
        showError('Tous les champs sont obligatoires');
        return;
      }

      const response = await api.post('/postes', payload);
      if (response.status === 201) {
        setShowModal(false); // Ferme le modal après ajout
        fetchData(); // Recharge les données
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

  const handleDelete = async (id) => {
    if (window.confirm('Confirmer la suppression ?')) {
      try {
        await api.delete(`/postes/${id}`);
        fetchData();
      } catch (err) {
        showError('Erreur de suppression');
      }
    }
  };

  return (
    <div className="container mt-4">
      {error && <Alert variant="danger">{error}</Alert>}

      <Button 
        variant="primary" 
        onClick={() => {
          setFormData({ posteId: null, title: '', serviceId: '' });
          setShowModal(true); // Affiche le modal
        }}
      >
        Ajouter Poste
      </Button>

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Titre</th>
            <th>Service</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {postes.map(poste => (
            <tr key={poste.posteId}>
              <td>{poste.title}</td>
              <td>{poste.service?.name}</td>
              <td>
                <Button
                  variant="warning"
                  className="me-2"
                  onClick={() => {
                    setFormData({
                      posteId: poste.posteId,
                      title: poste.title,
                      serviceId: poste.serviceId.toString()
                    });
                    setShowModal(true); // Affiche le modal pour modification
                  }}
                >
                  <FaEdit />
                </Button>
                <Button 
                  variant="danger" 
                  onClick={() => handleDelete(poste.posteId)}
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
          <Modal.Title>
            {formData.posteId ? 'Modifier' : 'Ajouter'} Poste
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Titre *</Form.Label>
              <Form.Control
                name="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                minLength={3}
                maxLength={100}
              />
              <Form.Select
                name="serviceId"
                value={formData.serviceId}
                onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
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

export default PosteList;
