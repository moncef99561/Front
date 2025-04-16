import React, { useState, useEffect } from 'react';
import { Modal, Form, Alert, Button, Badge, ListGroup, Row, Col } from 'react-bootstrap';
import { FaEdit, FaSync } from 'react-icons/fa';
import api from '../../services/api';

const ContractModal = ({ employeeId, show, handleClose }) => {
  const [contract, setContract] = useState(null);
  const [contractTypes, setContractTypes] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    contractTypeId: '',
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [typesResponse, contractResponse] = await Promise.all([
          api.get('/contracttypes'),
          api.get(`/employees/${employeeId}/contracts`)
        ]);

        setContractTypes(typesResponse.data);
        
        if (contractResponse.data) {
          setContract(contractResponse.data);
          setFormData({
            contractTypeId: contractResponse.data.contractTypeId,
            startDate: contractResponse.data.startDate.split('T')[0],
            endDate: contractResponse.data.endDate.split('T')[0]
          });
        }
      } catch (err) {
        setError('Erreur de chargement des données');
      }
    };
    if (show) fetchData();
  }, [employeeId, show]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (contract) {
        await api.put(`/employees/${employeeId}/contracts/${contract.employeeContractId}`, formData);
      } else {
        await api.post(`/employees/${employeeId}/contracts`, formData);
      }
      const updated = await api.get(`/employees/${employeeId}/contracts`);
      setContract(updated.data);
      setEditMode(false);
    } catch (err) {
      setError(err.response?.data || 'Erreur de sauvegarde');
    }
  };

  const handleRenew = async () => {
    if (!window.confirm('Voulez-vous créer un nouveau contrat avec les mêmes conditions ?')) return;
    
    try {
      const newEndDate = new Date(contract.endDate);
      newEndDate.setFullYear(newEndDate.getFullYear() + 1);

      const response = await api.post(`/employees/${employeeId}/contracts`, {
        contractTypeId: contract.contractTypeId,
        startDate: new Date().toISOString().split('T')[0],
        endDate: newEndDate.toISOString().split('T')[0]
      });

      setContract(response.data);
    } catch (err) {
      setError('Erreur lors du renouvellement');
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Gestion du Contrat</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}

        {!contract && !editMode && (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Type de contrat *</Form.Label>
              <Form.Select
                name="contractTypeId"
                value={formData.contractTypeId}
                onChange={handleFormChange}
                required
              >
                <option value="">Sélectionnez un type</option>
                {contractTypes.map(ct => (
                  <option key={ct.contractTypeId} value={ct.contractTypeId}>
                    {ct.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Date de début *</Form.Label>
              <Form.Control
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleFormChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Date de fin</Form.Label>
              <Form.Control
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleFormChange}
              />
            </Form.Group>
          </Form>
        )}

        {contract && !editMode && (
          <div className="border p-3 rounded bg-light">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0">{contract.contractTypeName}</h5>
              <Badge bg={new Date(contract.endDate) > new Date() ? "success" : "danger"}>
                {new Date(contract.endDate) > new Date() ? "Actif" : "Expiré"}
              </Badge>
            </div>

            <ListGroup className="mb-3">
              <ListGroup.Item>
                <Row>
                  <Col md={4} className="fw-bold">Employé:</Col>
                  <Col md={8}>{contract.employeeFullName}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col md={4} className="fw-bold">Période:</Col>
                  <Col md={8}>
                    {new Date(contract.startDate).toLocaleDateString()} - 
                    {new Date(contract.endDate).toLocaleDateString()}
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </div>
        )}

        {editMode && (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Type de contrat *</Form.Label>
              <Form.Select
                name="contractTypeId"
                value={formData.contractTypeId}
                onChange={handleFormChange}
                required
              >
                {contractTypes.map(ct => (
                  <option key={ct.contractTypeId} value={ct.contractTypeId}>
                    {ct.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Date de début *</Form.Label>
              <Form.Control
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleFormChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Date de fin</Form.Label>
              <Form.Control
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleFormChange}
              />
            </Form.Group>
          </Form>
        )}
      </Modal.Body>

      <Modal.Footer>
        {!contract && !editMode && (
          <>
            <Button variant="secondary" onClick={handleClose}>
              Fermer
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Sauvegarder
            </Button>
          </>
        )}

        {contract && !editMode && (
          <>
            <Button variant="secondary" onClick={handleClose}>
              Fermer
            </Button>
            <Button variant="warning" onClick={() => setEditMode(true)}>
              <FaEdit className="me-1" /> Modifier
            </Button>
            <Button variant="success" onClick={handleRenew}>
              <FaSync className="me-1" /> Renouveler
            </Button>
          </>
        )}

        {editMode && (
          <>
            <Button variant="secondary" onClick={() => setEditMode(false)}>
              Annuler
            </Button>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Enregistrer
            </Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default ContractModal;