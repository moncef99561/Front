import React, { useState, useEffect } from 'react';
import { Table, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import AddProjet from './AddProjet';
import EditProjet from './EditProjet';
import DetailProjet from './DetailProjet';
import { FaEdit, FaTrash, FaInfoCircle } from 'react-icons/fa';

const ListProjet = () => {
  const [projets, setProjets] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [projetData, setProjetData] = useState(null);
  const [error, setError] = useState('');

  const loadProjets = async () => {
    try {
      const response = await axios.get('http://localhost:5132/api/Projet');
      setProjets(response.data);
    } catch (err) {
      console.error('Erreur de chargement des projets', err);
      setError('Erreur de chargement des projets.');
    }
  };

  useEffect(() => {
    loadProjets();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Confirmer la suppression de ce projet ?')) return;
    try {
      await axios.delete(`http://localhost:5132/api/Projet/${id}`);
      loadProjets();
    } catch (err) {
      console.error('Erreur lors de la suppression', err);
      setError('Erreur lors de la suppression.');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Gestion des Projets</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      <Button variant="primary" onClick={() => setShowAddModal(true)}>
        Ajouter un Projet
      </Button>

      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Description</th>
            <th>Équipe</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projets.map((projet) => (
            <tr key={projet.id}>
              <td>{projet.nom}</td>
              <td>{projet.description}</td>
              <td>{projet.equipeNom}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => {
                    setProjetData({
                      id: projet.id,
                      nom: projet.nom,
                      description: projet.description,
                      equipeId: projet.equipeId
                    });
                    setShowEditModal(true);
                  }}
                >
                  <FaEdit />
                </Button>{' '}
                <Button
                  variant="info"
                  size="sm"
                  onClick={() => {
                    setProjetData(projet);
                    setShowDetailModal(true);
                  }}
                >
                  <FaInfoCircle />
                </Button>{' '}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(projet.id)}
                >
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modales */}
      <AddProjet show={showAddModal} handleClose={() => setShowAddModal(false)} reloadProjets={loadProjets} />
      {projetData && (
        <EditProjet show={showEditModal} handleClose={() => setShowEditModal(false)} projetData={projetData} reloadProjets={loadProjets} />
      )}
      {projetData && (
        <DetailProjet show={showDetailModal} handleClose={() => setShowDetailModal(false)} projetData={projetData} />
      )}
    </div>
  );
};

export default ListProjet;
