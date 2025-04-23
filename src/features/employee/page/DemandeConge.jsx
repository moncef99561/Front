import React, { useState } from 'react';
import { Table, Button, Form, Modal, Badge, Alert } from 'react-bootstrap';

const typesConge = ["Maladie", "Annuel", "Maternité", "Sans solde"];

const DemandeConge = () => {
  const [soldeConge, setSoldeConge] = useState(18);
  const [demandes, setDemandes] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    type: '',
    dateDebut: '',
    dateFin: '',
    statut: 'En attente'
  });
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.type || !formData.dateDebut || !formData.dateFin) {
      setError("Veuillez remplir tous les champs.");
      return;
    }
    if (formData.id) {
      setDemandes(demandes.map(d => d.id === formData.id ? formData : d));
    } else {
      const nouvelleDemande = { ...formData, id: Date.now() };
      setDemandes([...demandes, nouvelleDemande]);
    }
    setShowModal(false);
    setFormData({ id: null, type: '', dateDebut: '', dateFin: '', statut: 'En attente' });
    setError('');
  };

  const handleEdit = (demande) => {
    setFormData(demande);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setDemandes(demandes.filter(d => d.id !== id));
  };

  return (
    <div className="container mt-4">
      <h4 className="mb-3">📆 Mes demandes de congé</h4>

      <div className="mb-3">
        <strong>Solde de congé disponible :</strong>{' '}
        <Badge bg="info">{soldeConge} jours</Badge>
      </div>

      <Button variant="primary" className="mb-3" onClick={() => setShowModal(true)}>
        + Nouvelle demande
      </Button>

      {demandes.length === 0 ? (
        <Alert variant="info">Aucune demande enregistrée.</Alert>
      ) : (
        <Table bordered hover>
          <thead className="table-light">
            <tr>
              <th>Type</th>
              <th>Du</th>
              <th>Au</th>
              <th>Statut</th>
              <th>Actions</th>
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
                <td>
                  {d.statut === 'En attente' ? (
                    <>
                      <Button size="sm" variant="outline-warning" onClick={() => handleEdit(d)}>Modifier</Button>{' '}
                      <Button size="sm" variant="outline-danger" onClick={() => handleDelete(d.id)}>Supprimer</Button>
                    </>
                  ) : (
                    <span className="text-muted">Verrouillé</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

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
              <Form.Label>Date de début</Form.Label>
              <Form.Control
                type="date"
                value={formData.dateDebut}
                onChange={(e) => setFormData({ ...formData, dateDebut: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date de fin</Form.Label>
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