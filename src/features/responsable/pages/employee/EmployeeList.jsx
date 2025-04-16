import React, { useState, useEffect, useCallback } from 'react';
import { 
  Button, 
  Alert, 
  Container, 
  Table 
} from 'react-bootstrap';
import { 
  FaEdit, 
  FaTrash, 
  FaUser, 
  FaFileContract, 
  FaInfoCircle 
} from 'react-icons/fa';
import api from '../../services/api';
import AddEmployee from './AddEmployee';
import DetailEmployee from './DetailEmployee';
import AccountModal from '../compte/AccountModal';
import ContractModal from '../contract/ContractModal';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [services, setServices] = useState([]);
  const [postes, setPostes] = useState([]);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [showContractModal, setShowContractModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [selectedEmployeeInfo, setSelectedEmployeeInfo] = useState(null);
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
      employeeId: currentEmployee?.employeeId,
      cin: formData.cin,
      nom: formData.nom,
      prenom: formData.prenom,
      dateNaissance: new Date(formData.dateNaissance).toISOString(),
      dateEmbauche: new Date(formData.dateEmbauche).toISOString(),
      email: formData.email,
      telephone: formData.telephone || null,
      adresse: formData.adresse || null,
      rib: formData.rib || null,
      banque: formData.banque || null,
      cnss: formData.cnss || null,
      posteId: Number(formData.posteId)
    };
  
    try {
      if (currentEmployee) {
        await api.put(`/employees/${currentEmployee.employeeId}`, payload);
      } else {
        await api.post('/employees', payload);
      }
      
      await fetchEmployees();
      setShowModal(false);
      setFormData({
        cin: '', nom: '', prenom: '', dateNaissance: '', email: '',
        telephone: '', adresse: '', dateEmbauche: '', rib: '',
        banque: '', cnss: '', departmentId: '', serviceId: '', posteId: ''
      });
    } catch (err) {
      if (err.response?.data?.errors) {
        const errorMessages = Object.entries(err.response.data.errors)
          .map(([field, errors]) => `${field}: ${errors.join(", ")}`)
          .join("\n");
        alert(`Erreurs de validation :\n${errorMessages}`);
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

  const handleShowAccountModal = (employee) => {
    setSelectedEmployeeId(employee.employeeId);
    setShowAccountModal(true);
  };

  const handleShowContractModal = (employee) => {
    setSelectedEmployeeId(employee.employeeId);
    setShowContractModal(true);
  };

  const handleShowInfoModal = (employee) => {
    setSelectedEmployeeInfo(employee);
    setShowInfoModal(true);
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Gestion des Employés</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Button variant="primary" className="mb-3" onClick={() => handleShowModal()}>
        Ajouter Employé
      </Button>

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
                <Button 
                  variant="info" 
                  className="me-2"
                  onClick={() => handleShowAccountModal(employee)}
                >
                  <FaUser />
                </Button>
                <Button 
                  variant="secondary" 
                  className="me-2"
                  onClick={() => handleShowContractModal(employee)}
                >
                  <FaFileContract />
                </Button>
                <Button 
                  variant="warning" 
                  className="me-2" 
                  onClick={() => handleShowModal(employee)}
                >
                  <FaEdit />
                </Button>
                <Button 
                  variant="danger" 
                  className="me-2" 
                  onClick={() => handleDelete(employee.employeeId)}
                >
                  <FaTrash />
                </Button>
                <Button 
                  variant="success" 
                  onClick={() => handleShowInfoModal(employee)}
                >
                  <FaInfoCircle />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <AccountModal
        employeeId={selectedEmployeeId}
        show={showAccountModal}
        handleClose={() => setShowAccountModal(false)}
      />

      <ContractModal
        employeeId={selectedEmployeeId}
        show={showContractModal}
        handleClose={() => setShowContractModal(false)}
      />

      <DetailEmployee 
        show={showInfoModal}
        onHide={() => setShowInfoModal(false)}
        employee={selectedEmployeeInfo}
      />

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