import React, { useEffect, useState } from 'react';
import { Table, Button, Alert } from 'react-bootstrap';
import { FaTrash, FaEdit, FaEye } from 'react-icons/fa';
import axios from 'axios';
import AddFormation from './AddFormation';
import EditFormation from './EditFormation';
import DetailFormation from './DetailFormation'; // si tu l'as déjà

const ListFormation = () => {
  const [formations, setFormations] = useState([]);
  const [formateurs] = useState([
    { id: 1, nom: "Driss El Badaoui" },
    { id: 2, nom: "Amina Khadiri" },
    { id: 3, nom: "Yassine Bouchta" }
  ]);
  const [types, setTypes] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    titre: '',
    description: '',
    typeFormationId: '',
    formateur: '',
    dateDebut: '',
    dateFin: ''
  });
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedFormation, setSelectedFormation] = useState(null);
  const [error, setError] = useState('');

  // 🔵 Charger les formations existantes depuis API
  const loadFormations = async () => {
    try {
      const res = await axios.get('http://localhost:5132/api/Formation');
      setFormations(res.data);
    } catch (error) {
      console.error("Erreur chargement formations:", error);
    }
  };

  // 🔵 Charger les types de formation
  const loadTypes = async () => {
    try {
      const res = await axios.get('http://localhost:5132/api/TypeFormation');
      setTypes(res.data);
    } catch (error) {
      console.error("Erreur chargement types:", error);
    }
  };

  useEffect(() => {
    loadFormations();
    loadTypes();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5132/api/Formation', formData);
      await loadFormations();
      setShowAdd(false);
      setFormData({ id: null, titre: '', description: '', typeFormationId: '', formateur: '', dateDebut: '', dateFin: '' });
    } catch (error) {
      console.error("Erreur ajout formation:", error);
      setError("Erreur lors de l'ajout de la formation.");
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5132/api/Formation/${formData.id}`, formData);
      await loadFormations();
      setShowEdit(false);
      setFormData({ id: null, titre: '', description: '', typeFormationId: '', formateur: '', dateDebut: '', dateFin: '' });
    } catch (error) {
      console.error("Erreur modification formation:", error);
      setError("Erreur lors de la modification de la formation.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette formation ?')) return;
    try {
      await axios.delete(`http://localhost:5132/api/Formation/${id}`);
      await loadFormations();
    } catch (error) {
      console.error("Erreur suppression formation:", error);
    }
  };

  const getTypeName = (typeId) => {
    const type = types.find(t => t.id === typeId);
    return type ? type.nom : 'N/A';
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4 text-center">Liste des Formations</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      <Button variant="primary" className="mb-3" onClick={() => setShowAdd(true)}>Ajouter Formation</Button>

      <Table striped bordered hover>
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
          {formations.map(f => (
            <tr key={f.id}>
              <td>{f.titre}</td>
              <td>{getTypeName(f.typeFormationId)}</td>
              <td>{f.formateur}</td>
              <td>{f.dateDebut} → {f.dateFin}</td>
              <td>
                <Button variant="info" size="sm" className="me-2" onClick={() => { setSelectedFormation(f); setShowDetail(true); }}><FaEye /></Button>
                <Button variant="warning" size="sm" className="me-2" onClick={() => { setFormData(f); setShowEdit(true); }}><FaEdit /></Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(f.id)}><FaTrash /></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <AddFormation
        show={showAdd}
        handleClose={() => setShowAdd(false)}
        handleSubmit={handleAdd}
        formData={formData}
        setFormData={setFormData}
        types={types}
        formateurs={formateurs}
      />

      <EditFormation
        show={showEdit}
        handleClose={() => setShowEdit(false)}
        handleSubmit={handleEdit}
        formData={formData}
        setFormData={setFormData}
        types={types}
        formateurs={formateurs}
      />

      {selectedFormation && (
        <DetailFormation
          show={showDetail}
          handleClose={() => setShowDetail(false)}
          formation={selectedFormation}
        />
      )}
    </div>
  );
};

export default ListFormation;
