import React, { useState, useEffect } from 'react';
import { Table, Button, Alert } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import AddTypeFormation from './AddTypeFormation';
import EditTypeFormation from './EditTypeFormation';

const ListTypeFormation = () => {
  const [types, setTypes] = useState([]);
  const [formData, setFormData] = useState({ id: null, nom: '', description: '' });
  const [error, setError] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const showError = (msg) => {
    setError(msg);
    setTimeout(() => setError(''), 3000);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const newType = { ...formData, id: Date.now() };
    setTypes([...types, newType]);
    setShowAdd(false);
    setFormData({ id: null, nom: '', description: '' });
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setTypes(types.map(t => t.id === formData.id ? formData : t));
    setShowEdit(false);
    setFormData({ id: null, nom: '', description: '' });
  };

  const handleDelete = (id) => {
    setTypes(types.filter(t => t.id !== id));
  };

  const openEditModal = (type) => {
    setFormData(type);
    setShowEdit(true);
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4 text-center">Gestion des types de formation</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      <Button variant="primary" onClick={() => setShowAdd(true)}>Ajouter un type</Button>

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {types.map((t) => (
            <tr key={t.id}>
              <td>{t.nom}</td>
              <td>{t.description}</td>
              <td>
                <Button variant="warning" className="me-2" onClick={() => openEditModal(t)}><FaEdit /></Button>
                <Button variant="danger" onClick={() => handleDelete(t.id)}><FaTrash /></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <AddTypeFormation
        show={showAdd}
        handleClose={() => setShowAdd(false)}
        handleSubmit={handleAdd}
        formData={formData}
        setFormData={setFormData}
      />

      <EditTypeFormation
        show={showEdit}
        handleClose={() => setShowEdit(false)}
        handleSubmit={handleEdit}
        formData={formData}
        setFormData={setFormData}
      />
    </div>
  );
};

export default ListTypeFormation;