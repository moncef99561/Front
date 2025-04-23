import React, { useState } from 'react';
import { Table, Button, Alert } from 'react-bootstrap';
import { FaTrash, FaEdit } from 'react-icons/fa';
import AddFormation from './AddFormation';
import EditFormation from './EditFormation';

const formateursMock = [
  { id: 1, nom: "Driss El Badaoui" },
  { id: 2, nom: "Amina Khadiri" },
  { id: 3, nom: "Yassine Bouchta" }
];

const typesMock = [
  { id: 1, nom: "Leadership" },
  { id: 2, nom: "Cybersécurité" },
  { id: 3, nom: "Communication" }
];

const ListFormation = () => {
  const [formations, setFormations] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    titre: '',
    description: '',
    typeId: '',
    formateur: '',
    dateDebut: '',
    dateFin: ''
  });
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.titre || !formData.typeId || !formData.formateur) {
      setError("Veuillez remplir tous les champs obligatoires");
      return;
    }
    const newFormation = { ...formData, id: Date.now() };
    setFormations([...formations, newFormation]);
    setShowAdd(false);
    setFormData({ id: null, titre: '', description: '', typeId: '', formateur: '', dateDebut: '', dateFin: '' });
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setFormations(formations.map(f => f.id === formData.id ? formData : f));
    setShowEdit(false);
    setFormData({ id: null, titre: '', description: '', typeId: '', formateur: '', dateDebut: '', dateFin: '' });
  };

  const openEdit = (formation) => {
    setFormData(formation);
    setShowEdit(true);
  };

  const handleDelete = (id) => {
    setFormations(formations.filter(f => f.id !== id));
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4 text-center">Liste des Formations</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      <Button variant="primary" onClick={() => setShowAdd(true)}>Ajouter Formation</Button>

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Titre</th>
            <th>Type</th>
            <th>Formateur</th>
            <th>Dates</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {formations.map((f) => (
            <tr key={f.id}>
              <td>{f.titre}</td>
              <td>{typesMock.find(t => t.id == f.typeId)?.nom || 'N/A'}</td>
              <td>{f.formateur}</td>
              <td>{f.dateDebut} → {f.dateFin}</td>
              <td>
                <Button variant="warning" className="me-2" onClick={() => openEdit(f)}><FaEdit /></Button>
                <Button variant="danger" onClick={() => handleDelete(f.id)}><FaTrash /></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <AddFormation
        show={showAdd}
        handleClose={() => setShowAdd(false)}
        handleSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        types={typesMock}
        formateurs={formateursMock}
      />

      <EditFormation
        show={showEdit}
        handleClose={() => setShowEdit(false)}
        handleSubmit={handleEdit}
        formData={formData}
        setFormData={setFormData}
        types={typesMock}
        formateurs={formateursMock}
      />
    </div>
  );
};

export default ListFormation;