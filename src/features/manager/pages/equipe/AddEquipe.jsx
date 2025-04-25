import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';

const AddEquipe = ({ show, handleClose, reloadEquipes }) => {
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [employes, setEmployes] = useState([]);
  const [selectedEmployeIds, setSelectedEmployeIds] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEmployes = async () => {
      try {
        const response = await axios.get('http://localhost:5263/api/employees');
        setEmployes(response.data);
      } catch (err) {
        console.error('Erreur de chargement des employés', err);
        setError('Erreur de chargement des employés.');
      }
    };

    if (show) {
      fetchEmployes();
    }
  }, [show]);

  const handleCheckboxChange = (employeeId) => {
    if (selectedEmployeIds.includes(employeeId)) {
      setSelectedEmployeIds(selectedEmployeIds.filter((id) => id !== employeeId));
    } else {
      setSelectedEmployeIds([...selectedEmployeIds, employeeId]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nom.trim()) {
      setError('Le nom est requis.');
      return;
    }

    try {
      await axios.post('http://localhost:5132/api/Equipe', {
        nom,
        description,
        employeIds: selectedEmployeIds,
      });

      handleClose();
      reloadEquipes();
      setNom('');
      setDescription('');
      setSelectedEmployeIds([]);
      setError('');
    } catch (err) {
      console.error('Erreur lors de l\'ajout de l\'équipe', err);
      setError('Erreur lors de l\'ajout de l\'équipe.');
    }
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" centered>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter une Équipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form.Group className="mb-3">
            <Form.Label>Nom</Form.Label>
            <Form.Control
              type="text"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Employés</Form.Label>
            <div style={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid #ced4da', padding: '10px', borderRadius: '5px' }}>
              {employes.length > 0 ? (
                employes.map((emp) => (
                  <div key={emp.employeeId} className="mb-2">
                    <Form.Check
                      type="checkbox"
                      label={`${emp.nom} ${emp.prenom}`}
                      checked={selectedEmployeIds.includes(emp.employeeId)}
                      onChange={() => handleCheckboxChange(emp.employeeId)}
                    />
                  </div>
                ))
              ) : (
                <div>Aucun employé disponible</div>
              )}
            </div>
          </Form.Group>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Annuler
          </Button>
          <Button variant="primary" type="submit">
            Ajouter
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddEquipe;
