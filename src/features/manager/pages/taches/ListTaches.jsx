import React, { useState, useEffect } from 'react';
import { Table, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import AddTache from './AddTache';
import EditTache from './EditTache';
import DetailTache from './DetailTache';
import { FaEdit, FaTrash, FaInfoCircle } from 'react-icons/fa';

const ListTaches = () => {
  const [taches, setTaches] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedTache, setSelectedTache] = useState(null);
  const [error, setError] = useState('');

  const loadTaches = async () => {
    try {
      const response = await axios.get('http://localhost:5132/api/Tache');
      setTaches(response.data);
    } catch (err) {
      console.error(err);
      setError('Erreur de chargement des tâches.');
    }
  };

  useEffect(() => {
    loadTaches();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Confirmer la suppression ?')) return;
    try {
      await axios.delete(`http://localhost:5132/api/Tache/${id}`);
      loadTaches();
    } catch (err) {
      setError('Erreur lors de la suppression.');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Gestion des Tâches</h2>
      {error && <Alert variant="danger">{error}</Alert>}

      <Button variant="primary" onClick={() => setShowAdd(true)}>
        Ajouter une Tâche
      </Button>

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Titre</th>
            <th>Description</th>
            <th>Projet</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {taches.map((t) => (
            <tr key={t.id}>
              <td>{t.titre}</td>
              <td>{t.description}</td>
              <td>{t.projetNom}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => {
                    setSelectedTache(t);
                    setShowEdit(true);
                  }}>
                  <FaEdit />
                </Button>{' '}
                <Button
                  variant="info"
                  size="sm"
                  onClick={() => {
                    setSelectedTache(t);
                    setShowDetail(true);
                  }}>
                  <FaInfoCircle />
                </Button>{' '}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(t.id)}>
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <AddTache show={showAdd} handleClose={() => setShowAdd(false)} reload={loadTaches} />
      {selectedTache && <EditTache show={showEdit} handleClose={() => setShowEdit(false)} tache={selectedTache} reload={loadTaches} />}
      {selectedTache && <DetailTache show={showDetail} handleClose={() => setShowDetail(false)} tache={selectedTache} />}
    </div>
  );
};

export default ListTaches;