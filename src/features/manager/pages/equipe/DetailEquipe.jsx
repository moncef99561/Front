import React, { useState, useEffect } from 'react';
import { Modal, Button, ListGroup } from 'react-bootstrap';
import axios from 'axios';

const DetailEquipe = ({ show, handleClose, equipeData }) => {
  const [employes, setEmployes] = useState([]);

  useEffect(() => {
    const fetchEmployes = async () => {
      if (equipeData?.employeIds && equipeData.employeIds.length > 0) {
        try {
          const response = await axios.get('http://localhost:5263/api/employees');
          const allEmployes = response.data;
          const filtered = allEmployes.filter(emp => equipeData.employeIds.includes(emp.employeeId));
          setEmployes(filtered);
        } catch (err) {
          console.error('Erreur de chargement des employés pour détails', err);
        }
      }
    };

    if (show) {
      fetchEmployes();
    }
  }, [equipeData, show]);

  if (!equipeData) return null;

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>Détails de l'Équipe</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Nom :</strong> {equipeData.nom}</p>
        <p><strong>Description :</strong> {equipeData.description}</p>
        <p><strong>Employés :</strong></p>
        <ListGroup>
          {employes.map(emp => (
            <ListGroup.Item key={emp.employeeId}>
              {emp.nom} {emp.prenom}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Fermer
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DetailEquipe;
