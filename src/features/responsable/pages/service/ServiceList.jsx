// ServiceList.jsx
import React, { useState, useEffect, useCallback } from 'react';
import api from '../../services/api';
import { Table, Button, Modal, Alert, ListGroup, Badge } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import AddService from './AddService';
import EditService from './EditService';

const ServiceList = () => {
  const [services, setServices] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', departmentId: '' });
  const [error, setError] = useState('');
  const [departmentDetails, setDepartmentDetails] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const [servicesRes, deptsRes] = await Promise.all([
        api.get('/services'),
        api.get('/departments')
      ]);
      setServices(servicesRes.data);
      setDepartments(deptsRes.data);
    } catch (err) {
      setError('Erreur de chargement des données');
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/services/${id}`);
      fetchData();
    } catch (err) {
      setError('Erreur lors de la suppression');
    }
  };

  const handleDepartmentClick = async (departmentId) => {
    try {
      const response = await api.get(`/departments/${departmentId}`);
      setDepartmentDetails(response.data);
    } catch (error) {
      setError('Erreur lors du chargement des détails du département');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = formData.serviceId
        ? `/services/${formData.serviceId}`
        : '/services';
      const method = formData.serviceId ? 'put' : 'post';
      await api[method](url, formData);
      setShowModal(false);
      setFormData({ name: '', departmentId: '' });
      fetchData();
    } catch (err) {
      setError(err.response?.data?.title || 'Erreur de sauvegarde');
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mt-32 mb-5">Gestion des Services</h1>
      {error && <Alert variant="danger">{error}</Alert>}

      <Button variant="primary" onClick={() => {
        setFormData({ name: '', departmentId: '' });
        setShowModal(true);
      }}>
        Ajouter Service
      </Button>

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Département</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map(service => (
            <tr key={service.serviceId}>
              <td>{service.name}</td>
              <td>
                <Button
                  variant="link"
                  onClick={() => handleDepartmentClick(service.departmentId)}
                  className="p-0 text-decoration-none"
                >
                  {service.department?.name || 'Non attribué'}
                </Button>
              </td>
              <td>
                <Button variant="warning" onClick={() => {
                  setFormData({
                    serviceId: service.serviceId,
                    name: service.name,
                    departmentId: service.departmentId
                  });
                  setShowModal(true);
                }}>
                  <FaEdit />
                </Button>
                <Button variant="danger" className="ms-2" onClick={() => handleDelete(service.serviceId)}>
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {formData.serviceId ? (
        <EditService
          show={showModal}
          handleClose={() => setShowModal(false)}
          handleSubmit={handleSubmit}
          formData={formData}
          setFormData={setFormData}
          departments={departments}
        />
      ) : (
        <AddService
          show={showModal}
          handleClose={() => setShowModal(false)}
          handleSubmit={handleSubmit}
          formData={formData}
          setFormData={setFormData}
          departments={departments}
        />
      )}

      <Modal show={!!departmentDetails} onHide={() => setDepartmentDetails(null)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Détails du Département</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {departmentDetails && (
            <div>
              <h4>{departmentDetails.name}</h4>
              <p className="text-muted">{departmentDetails.description}</p>
              <div className="mt-3">
                <h5>Détails complémentaires</h5>
                <p>{departmentDetails.detail || "Aucun détail supplémentaire"}</p>
              </div>
              <h5 className="mt-4">Services associés :</h5>
              <ListGroup>
                {departmentDetails.services?.map(service => (
                  <ListGroup.Item key={service.serviceId}>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6>{service.name}</h6>
                        <small className="text-muted">
                          {service.postes?.length} poste(s) associé(s)
                        </small>
                      </div>
                      <Badge pill bg="info">{service.postes?.length || 0}</Badge>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ServiceList;