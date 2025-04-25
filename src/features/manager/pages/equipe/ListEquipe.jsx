import React, { useState, useEffect } from 'react';
import { Table, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import AddEquipe from './AddEquipe';
import EditEquipe from './EditEquipe';
import DetailEquipe from './DetailEquipe';
import { FaEdit, FaTrash, FaInfoCircle } from 'react-icons/fa';

const ListEquipe = () => {
  const [equipes, setEquipes] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [equipeData, setEquipeData] = useState(null);
  const [error, setError] = useState('');

  const loadEquipes = async () => {
    try {
      const response = await axios.get('http://localhost:5132/api/Equipe');
      setEquipes(response.data);
    } catch (err) {
      console.error('Erreur de chargement des équipes', err);
      setError('Erreur de chargement des équipes.');
    }
  };

  useEffect(() => {
    loadEquipes();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Confirmer la suppression de cette équipe ?')) return;
    try {
      await axios.delete(`http://localhost:5132/api/Equipe/${id}`);
      loadEquipes();
    } catch (err) {
      console.error('Erreur de suppression', err);
      setError('Erreur lors de la suppression.');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Gestion des Équipes</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      <Button variant="primary" onClick={() => setShowAddModal(true)}>
        Ajouter une Équipe
      </Button>

      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {equipes.map((equipe) => (
            <tr key={equipe.id}>
              <td>{equipe.nom}</td>
              <td>{equipe.description}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => {
                    setEquipeData({
                      id: equipe.id,
                      nom: equipe.nom,
                      description: equipe.description,
                      employeIds: equipe.employeIds || [],
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
                    setEquipeData(equipe);
                    setShowDetailModal(true);
                  }}
                >
                  <FaInfoCircle />
                </Button>{' '}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(equipe.id)}
                >
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modales */}
      <AddEquipe show={showAddModal} handleClose={() => setShowAddModal(false)} reloadEquipes={loadEquipes} />
      {equipeData && (
        <EditEquipe show={showEditModal} handleClose={() => setShowEditModal(false)} equipeData={equipeData} reloadEquipes={loadEquipes} />
      )}
      {equipeData && (
        <DetailEquipe show={showDetailModal} handleClose={() => setShowDetailModal(false)} equipeData={equipeData} />
      )}
    </div>
  );
};

export default ListEquipe;
