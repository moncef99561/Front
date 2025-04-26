import React, { useState, useEffect } from 'react';
import { Table, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import AddTypeFormation from './AddTypeFormation';
import EditTypeFormation from './EditTypeFormation';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ListTypeFormation = () => {
  const [types, setTypes] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [error, setError] = useState('');

  const loadTypes = async () => {
    try {
      const response = await axios.get('http://localhost:5132/api/TypeFormation');
      setTypes(response.data);
    } catch (err) {
      console.error(err);
      setError("Erreur de chargement des types de formation.");
    }
  };

  useEffect(() => {
    loadTypes();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Confirmer la suppression ?')) return;
    try {
      await axios.delete(`http://localhost:5132/api/TypeFormation/${id}`);
      loadTypes();
    } catch (err) {
      setError("Erreur lors de la suppression.");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Gestion des Types de Formation</h2>
      {error && <Alert variant="danger">{error}</Alert>}

      <Button variant="primary" onClick={() => setShowAdd(true)}>Ajouter Type Formation</Button>

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {types.map(t => (
            <tr key={t.id}>
              <td>{t.nom}</td>
              <td>{t.description}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => {
                    setSelectedType(t);
                    setShowEdit(true);
                  }}>
                  <FaEdit />
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

      <AddTypeFormation show={showAdd} handleClose={() => setShowAdd(false)} reload={loadTypes} />
      {selectedType && <EditTypeFormation show={showEdit} handleClose={() => setShowEdit(false)} typeFormation={selectedType} reload={loadTypes} />}
    </div>
  );
};

export default ListTypeFormation;