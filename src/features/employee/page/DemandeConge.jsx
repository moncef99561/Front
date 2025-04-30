import React, { useEffect, useState } from 'react';
import { Table, Button, Form, Modal, Badge, Alert } from 'react-bootstrap';
import axios from "axios";

const typesConge = ["Maladie", "Annuel", "Maternité", "Sans solde"];

const DemandeConge = () => {
  const [demandes, setDemandes] = useState([]);
  const [formData, setFormData] = useState({ type: '', dateDebut: '', dateFin: '' });
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');
  const employeeId = localStorage.getItem("employeeId");

  const fetchDemandes = async () => {
    try {
      const res = await axios.get(`http://localhost:5107/api/DemandeCongeEmploye/${employeeId}`);
      setDemandes(res.data);
    } catch (error) {
      console.error("Erreur chargement demandes congé", error);
    }
  };

  useEffect(() => {
    if (employeeId) {
      fetchDemandes();
    }
  }, [employeeId]);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.type || !formData.dateDebut || !formData.dateFin) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    const nouvelleDemande = {
      ...formData,
      employeeId: parseInt(employeeId),
    };

    try {
      await axios.post('http://localhost:5107/api/DemandeCongeEmploye', nouvelleDemande);
      setFormData({ type: '', dateDebut: '', dateFin: '' });
      setShowModal(false);
      fetchDemandes();
      setError('');
    } catch (error) {
      console.error("Erreur enregistrement demande", error);
    }
  };

  return (
    <div className="container mt-4">
      <h4 className="mb-3">📆 Mes demandes de congé</h4>

      <Button variant="primary" className="mb-3" onClick={() => setShowModal(true)}>
        + Nouvelle demande
      </Button>

      <Table bordered hover>
        <thead>
          <tr>
            <th>Type</th>
            <th>Du</th>
            <th>Au</th>
            <th>Statut</th>
          </tr>
        </thead>
        <tbody>
          {demandes.map((d) => (
            <tr key={d.id}>
              <td>{d.type}</td>
              <td>{new Date(d.dateDebut).toLocaleDateString()}</td>
              <td>{new Date(d.dateFin).toLocaleDateString()}</td>
              <td>
                <Badge
                  bg={
                    d.statut === 'Validé'
                      ? 'success'
                      : d.statut === 'Refusé'
                      ? 'danger'
                      : 'warning'
                  }
                >
                  {d.statut}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Nouvelle demande de congé</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSave}>
          <Modal.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form.Group className="mb-3">
              <Form.Label>Type de congé</Form.Label>
              <Form.Select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                <option value="">-- Choisir un type --</option>
                {typesConge.map((t, idx) => (
                  <option key={idx} value={t}>{t}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date début</Form.Label>
              <Form.Control
                type="date"
                value={formData.dateDebut}
                onChange={(e) => setFormData({ ...formData, dateDebut: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date fin</Form.Label>
              <Form.Control
                type="date"
                value={formData.dateFin}
                onChange={(e) => setFormData({ ...formData, dateFin: e.target.value })}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Annuler
            </Button>
            <Button variant="primary" type="submit">
              Enregistrer
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default DemandeConge;
