import React, { useState, useEffect, useCallback } from 'react';
import { Table, Button, Alert } from 'react-bootstrap';
import { FaEdit, FaTrash, FaInfoCircle } from 'react-icons/fa';

import api from '../../services/api';
import AddDepartement from './AddDepartement';
import EditDepartement from './EditDepartement';
import DetailDepartment from './DetailDepartment';

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '', detail: '' });
  const [error, setError] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await api.get('/departments');
      setDepartments(response.data);
    } catch (err) {
      showError('Erreur de chargement des départements');
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const showError = (message) => {
    setError(message);
    setTimeout(() => setError(''), 3000);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/departments/${id}`);
      setDepartments(prev => prev.filter(d => d.departmentId !== id));
    } catch (err) {
      showError('Erreur lors de la suppression');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = formData.departmentId
        ? await api.put(`/departments/${formData.departmentId}`, formData)
        : await api.post('/departments', formData);

      if (response.status >= 200 && response.status < 300) {
        setShowModal(false);
        setFormData({ name: '', description: '', detail: '' });
        fetchData();
      } else {
        showError('Erreur inconnue');
      }
    } catch (err) {
      const serverError = err.response?.data;
      if (serverError?.errors) {
        const errorMessages = Object.entries(serverError.errors)
          .map(([field, errors]) => `${field}: ${errors.join(", ")}`)
          .join("\n");
        showError(errorMessages);
      } else {
        showError(serverError?.title || serverError?.Message || "Erreur serveur");
      }
    }
  };

  const handleOpenAdd = () => {
    setFormData({ name: '', description: '', detail: '' });
    setShowModal(true);
  };

  const handleOpenEdit = (dept) => {
    setFormData(dept);
    setShowModal(true);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mt-32 mb-5">Gestion des Départements</h1>

      {error && <Alert variant="danger">{error}</Alert>}

      <Button variant="primary" onClick={handleOpenAdd}>
        Ajouter Département
      </Button>

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map(dept => (
            <tr key={dept.departmentId}>
              <td>{dept.name}</td>
              <td>{dept.description}</td>
              <td>
                <Button variant="warning" onClick={() => handleOpenEdit(dept)}>
                  <FaEdit />
                </Button>
                <Button variant="danger" className="ms-2" onClick={() => handleDelete(dept.departmentId)}>
                  <FaTrash />
                </Button>
                <Button variant="info" className="ms-2" onClick={() => setSelectedDepartment(dept)}>
                  <FaInfoCircle />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {formData.departmentId ? (
        <EditDepartement
          show={showModal}
          handleClose={() => setShowModal(false)}
          handleSubmit={handleSubmit}
          formData={formData}
          setFormData={setFormData}
        />
      ) : (
        <AddDepartement
          show={showModal}
          handleClose={() => setShowModal(false)}
          handleSubmit={handleSubmit}
          formData={formData}
          setFormData={setFormData}
        />
      )}

<DetailDepartment 
  department={selectedDepartment}
  onHide={() => setSelectedDepartment(null)}
/>
    </div>
  );
};

export default DepartmentList;