import React, { useEffect, useState } from 'react';
import { Table, Button, Form, Modal, Alert } from 'react-bootstrap';
import { FaEdit, FaTrash, FaDownload } from 'react-icons/fa';
import axios from 'axios';

const typesDocuments = ['Attestation de travail', 'Attestation de salaire', 'Relevé d’heures'];

const DemandeDocuments = () => {
  const [demandes, setDemandes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ typeDocument: '' });
  const [error, setError] = useState('');
  const employeeId = localStorage.getItem("employeeId");

  useEffect(() => {
    const fetchDemandes = async () => {
      try {
        const res = await axios.get(`http://localhost:5107/api/DemandeDocumentEmploye/${employeeId}`);
        setDemandes(res.data);
      } catch (error) {
        console.error("Erreur chargement demandes documents", error);
      }
    };

    if (employeeId) {
      fetchDemandes();
    }
  }, [employeeId]);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.typeDocument) {
      setError("Veuillez choisir un type de document.");
      return;
    }

    const nouvelleDemande = {
      ...formData,
      employeId: parseInt(employeeId),
    };

    try {
      await axios.post('http://localhost:5107/api/DemandeDocumentEmploye', nouvelleDemande);
      setShowModal(false);
      setFormData({ typeDocument: '' });
      setError('');
      window.location.reload();
    } catch (error) {
      console.error("Erreur ajout demande document", error);
    }
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
          </tr>
        </thead>
        <tbody>
          {demandes.map((d) => (
            <tr key={d.id}>
              <td>{new Date(d.dateDemande).toLocaleDateString()}</td>
              <td>{d.typeDocument}</td>
              <td>
                <span className={`badge bg-${d.statut === 'accepté' ? 'success' : d.statut === 'refusé' ? 'danger' : 'warning'}`}>
                  {d.statut}
                </span>
              </td>
              <td>
                {d.statut === 'accepté' && d.fichier ? (
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    href={`http://localhost:5107/fichiers/${d.fichier}`}
                    target="_blank"
                  >
                    <FaDownload /> Télécharger
                  </Button>
                ) : (
                  <span className="text-muted">--</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Nouvelle demande</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSave}>
          <Modal.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form.Group className="mb-3">
              <Form.Label>Type de document</Form.Label>
              <Form.Select
                value={formData.typeDocument}
                onChange={(e) => setFormData({ ...formData, typeDocument: e.target.value })}
              >
                <option value="">-- Choisir un type --</option>
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
