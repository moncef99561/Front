import React, { useState, useEffect, useCallback } from 'react';
import { Table, Button, Alert } from 'react-bootstrap';
import api from '../../services/api';
import { FaEdit, FaTrash } from 'react-icons/fa';
import AddPoste from './AddPoste';
import EditPoste from './EditPoste';

const PosteList = () => {
  const [postes, setPostes] = useState([]);
  const [services, setServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ posteId: null, title: '', serviceId: '' });
  const [error, setError] = useState('');

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

      const url = formData.posteId
        ? `/postes/${formData.posteId}`
        : '/postes';
      const method = formData.posteId ? 'put' : 'post';

      const response = await api[method](url, payload);

      if (response.status >= 200 && response.status < 300) {
        setShowModal(false);
        setFormData({ posteId: null, title: '', serviceId: '' });
        fetchData();
      }
    } catch (err) {
      const backendError = err.response?.data?.Errors
        ? Object.entries(err.response.data.Errors)
            .map(([key, val]) => `${key}: ${val.join(', ')}`)
            .join('\n')
        : err.response?.data?.Message || 'Erreur inconnue';

      showError(backendError);
    }
  };

  return (
    <div className="container mt-4">
      {error && <Alert variant="danger">{error}</Alert>}

      <Button
        variant="primary"
        onClick={() => {
          setFormData({ posteId: null, title: '', serviceId: '' });
          setShowModal(true);
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
                    setShowModal(true);
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

      {formData.posteId ? (
        <EditPoste
          show={showModal}
          handleClose={() => setShowModal(false)}
          handleSubmit={handleSubmit}
          formData={formData}
          setFormData={setFormData}
          services={services}
        />
      ) : (
        <AddPoste
          show={showModal}
          handleClose={() => setShowModal(false)}
          handleSubmit={handleSubmit}
          formData={formData}
          setFormData={setFormData}
          services={services}
        />
      )}
    </div>
  );
};

export default PosteList;