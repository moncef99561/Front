import api from '../../services/api';
import React, { useState, useEffect, useCallback } from 'react';
import { FaEdit, FaTrash, FaUser, FaFileContract, FaInfoCircle } from 'react-icons/fa';
import { Button, Alert, Container, Table } from 'react-bootstrap';
import AddEmployee from './AddEmployee';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [services, setServices] = useState([]);
  const [postes, setPostes] = useState([]);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    cin: '', nom: '', prenom: '', dateNaissance: '', email: '', telephone: '', adresse: '',
    dateEmbauche: '', rib: '', banque: '', cnss: '', departmentId: '', serviceId: '', posteId: ''
  });
  const [error, setError] = useState('');

  const fetchEmployees = useCallback(async () => {
    try {
      const response = await api.get('/employees');
      setEmployees(response.data);
    } catch (err) {
      showError("Impossible de charger les employés - Code erreur : " + err.response?.status);
    }
  }, []);

  const loadDepartments = useCallback(async () => {
    try {
      const response = await api.get('/departments');
      setDepartments(response.data);
    } catch (error) {
      console.error("Erreur de chargement des départements:", error);
    }
  }, []);

  useEffect(() => {
    const fetchInitialData = async () => {
      await fetchEmployees();
      await loadDepartments();
    };
    fetchInitialData();
  }, [fetchEmployees, loadDepartments]);

  const handleDepartmentChange = async (departmentId) => {
    try {
      const response = await api.get(`/services?departmentId=${departmentId}`);
      setServices(response.data);
      setFormData(prev => ({ ...prev, departmentId, serviceId: '', posteId: '' }));
    } catch {
      showError('Erreur de chargement des services');
    }
  };

  const handleServiceChange = async (serviceId) => {
    try {
      const response = await api.get(`/postes?serviceId=${serviceId}`);
      setPostes(response.data);
      setFormData(prev => ({ ...prev, serviceId, posteId: '' }));
    } catch {
      showError('Erreur de chargement des postes');
    }
  };

  const showError = (message) => {
    setError(message);
    setTimeout(() => setError(''), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      CIN: formData.cin,
      Nom: formData.nom,
      Prenom: formData.prenom,
      DateNaissance: new Date(formData.dateNaissance).toISOString(),
      DateEmbauche: new Date(formData.dateEmbauche).toISOString(),
      Email: formData.email,
      Telephone: formData.telephone,
      Adresse: formData.adresse,
      Rib: formData.rib,
      Banque: formData.banque,
      CNSS: formData.cnss,
      PosteId: Number(formData.posteId)
    };
    try {
      const response = await api.post('/employees', payload);
      if (response.status === 201) {
        setShowModal(false);
        fetchEmployees();
      }
    } catch (err) {
      const errorData = err.response?.data;
      if (errorData?.errors) {
        const errorMessages = Object.entries(errorData.errors)
          .map(([field, errors]) => `${field}: ${errors.join(", ")}`)
          .join("\n");
        showError(errorMessages);
      } else {
        showError(errorData?.title || "Erreur lors de la création");
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      if (!window.confirm('Confirmer la suppression ?')) return;
      await api.delete(`/employees/${id}`);
      setEmployees(prev => prev.filter(emp => emp.employeeId !== id));
    } catch {
      showError('Erreur lors de la suppression');
    }
  };

  const handleShowModal = (employee = null) => {
    setCurrentEmployee(employee);
    if (employee) {
      setFormData({
        ...employee,
        dateNaissance: employee.dateNaissance.split('T')[0],
        dateEmbauche: employee.dateEmbauche.split('T')[0],
        departmentId: employee.departmentId?.toString() || '',
        serviceId: employee.serviceId?.toString() || '',
        posteId: employee.posteId?.toString() || ''
      });
      if (employee.departmentId) handleDepartmentChange(employee.departmentId);
      if (employee.serviceId) handleServiceChange(employee.serviceId);
    } else {
      setFormData({
        cin: '', nom: '', prenom: '', dateNaissance: '', email: '', telephone: '', adresse: '',
        dateEmbauche: '', rib: '', banque: '', cnss: '', departmentId: '', serviceId: '', posteId: ''
      });
      setServices([]);
      setPostes([]);
    }
    setShowModal(true);
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Gestion des Employés</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Button variant="primary" className="mb-3" onClick={() => handleShowModal()}>Ajouter Employé</Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>CIN</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee.employeeId}>
              <td>{employee.cin}</td>
              <td>{employee.nom}</td>
              <td>{employee.prenom}</td>
              <td>{employee.email}</td>
              <td>
                <Button variant="info" className="me-2"><FaUser /></Button>
                <Button variant="secondary" className="me-2"><FaFileContract /></Button>
                <Button variant="warning" className="me-2" onClick={() => handleShowModal(employee)}><FaEdit /></Button>
                <Button variant="danger" className="me-2" onClick={() => handleDelete(employee.employeeId)}><FaTrash /></Button>
                <Button variant="success"><FaInfoCircle /></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <AddEmployee
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        departments={departments}
        services={services}
        postes={postes}
        handleDepartmentChange={handleDepartmentChange}
        handleServiceChange={handleServiceChange}
        currentEmployee={currentEmployee}
      />
    </Container>
  );
};

export default EmployeeList;