import React, { useState } from 'react';
import { Table, Button, Form, Modal, Alert } from 'react-bootstrap';
import { FaEdit, FaTrash, FaDownload } from 'react-icons/fa';

const DemandeDocuments = () => {
  const [demandes, setDemandes] = useState([
    { id: 1, type: 'Attestation de travail', statut: 'accepté', fichier: 'attestation.pdf', date: '2024-04-01' },
    { id: 2, type: 'Attestation de salaire', statut: 'refusé', date: '2024-04-03' },
    { id: 3, type: 'Relevé d’heures', statut: 'en attente', date: '2024-04-10' }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ id: null, type: '' });
  const [error, setError] = useState('');

  const typesDocuments = ['Attestation de travail', 'Attestation de salaire', 'Relevé d’heures'];

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.type) return setError('Veuillez choisir un type de document.');

    if (formData.id) {
      setDemandes(demandes.map(d => d.id === formData.id ? { ...d, type: formData.type } : d));
    } else {
      const nouvelle = {
        id: Date.now(),
        type: formData.type,
        statut: 'en attente',
        date: new Date().toISOString().slice(0, 10)
      };
      setDemandes([...demandes, nouvelle]);
    }
    setFormData({ id: null, type: '' });
    setError('');
    setShowModal(false);
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
      <h4 className="mb-3">📄 Mes demandes de documents</h4>

      <Button variant="primary" className="mb-3" onClick={() => setShowModal(true)}>
        + Nouvelle demande
      </Button>

      <Table striped bordered hover className="shadow-sm">
        <thead className="table-light">
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Statut</th>
            <th>Téléchargement</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {demandes.map((demande) => (
            <tr key={demande.id}>
              <td>{new Date(demande.date).toLocaleDateString()}</td>
              <td>{demande.type}</td>
              <td>
                <span className={`badge bg-${demande.statut === 'accepté' ? 'success' : demande.statut === 'refusé' ? 'danger' : 'warning'}`}>{demande.statut}</span>
              </td>
              <td>
                {demande.statut === 'accepté' && demande.fichier ? (
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    href={`http://localhost:5148/fichiers/${demande.fichier}`}
                    target="_blank"
                  >
                    <FaDownload /> Télécharger
                  </Button>
                ) : (
                  <span className="text-muted">--</span>
                )}
              </td>
              <td>
                <Button variant="outline-warning" size="sm" onClick={() => handleEdit(demande)}>
                  <FaEdit />
                </Button>{' '}
                <Button variant="outline-danger" size="sm" onClick={() => handleDelete(demande.id)}>
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Demande de document</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSave}>
          <Modal.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form.Group className="mb-3">
              <Form.Label>Type de document</Form.Label>
              <Form.Select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                <option value="">-- Sélectionnez un type --</option>
                {typesDocuments.map((type, idx) => (
                  <option key={idx} value={type}>{type}</option>
                ))}
              </Form.Select>
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

export default DemandeDocuments;
