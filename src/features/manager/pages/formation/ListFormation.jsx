import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Alert } from 'react-bootstrap';
import { FaTrash, FaEdit, FaInfoCircle } from 'react-icons/fa';
import AddFormation from './AddFormation';
import EditFormation from './EditFormation';
import DetailFormation from './DetailFormation'; // ton fichier de détails

const ListFormation = () => {
  const [formations, setFormations] = useState([]);
  const [formateursMock] = useState([
    { id: 1, nom: "Driss El Badaoui" },
    { id: 2, nom: "Amina Khadiri" },
    { id: 3, nom: "Yassine Bouchta" }
  ]);
  const [types, setTypes] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    typeId: '',
    formateur: '',
    dateDebut: '',
    dateFin: ''
  });
  const [selectedFormation, setSelectedFormation] = useState(null); // ✅ ici la déclaration correcte
  const [error, setError] = useState('');

  // ✅ AJOUTER CETTE FONCTION
  const loadFormations = async () => {
    try {
      const res = await axios.get('http://localhost:5132/api/Formation');
      setFormations(res.data);
    } catch (error) {
      console.error('Erreur lors du chargement des formations', error);
    }
  };

  const loadTypes = async () => {
    try {
      const res = await axios.get('http://localhost:5132/api/TypeFormation');
      setTypes(res.data);
    } catch (error) {
      console.error('Erreur lors du chargement des types de formation', error);
    }
  };

  useEffect(() => {
    axios.get('http://localhost:5132/api/TypeFormation')
      .then(res => setTypes(res.data))
      .catch(err => console.error('Erreur lors du chargement des types', err));
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const newFormation = {
        titre: formData.titre,
        description: formData.description,
        typeFormationId: parseInt(formData.typeFormationId),
        formateur: formData.formateur,
        dateDebut: formData.dateDebut,
        dateFin: formData.dateFin
      };
      await axios.post('http://localhost:5132/api/Formation', newFormation);
      alert('Formation ajoutée avec succès');
      loadFormations();
      setShowAdd(false);
      setFormData({
        id: null,
        titre: '',
        description: '',
        typeFormationId: '',
        formateur: '',
        dateDebut: '',
        dateFin: ''
      });
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la formation', error);
      alert('Erreur lors de l\'ajout de la formation');
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const updatedFormation = {
        id: formData.id,
        titre: formData.titre,
        description: formData.description,
        typeFormationId: parseInt(formData.typeFormationId),
        formateur: formData.formateur,
        dateDebut: formData.dateDebut,
        dateFin: formData.dateFin
      };
      await axios.put(`http://localhost:5132/api/Formation/${formData.id}`, updatedFormation);
      alert('Formation modifiée avec succès');
      loadFormations();
      setShowEdit(false);
      setFormData({
        id: null,
        titre: '',
        description: '',
        typeFormationId: '',
        formateur: '',
        dateDebut: '',
        dateFin: ''
      });
    } catch (error) {
      console.error('Erreur lors de la modification de la formation', error);
      alert('Erreur lors de la modification');
    }
  };

  const openEdit = (formation) => {
    setFormData({
      id: formation.id,
      titre: formation.titre,
      description: formation.description,
      typeFormationId: formation.typeFormationId,
      formateur: formation.formateur,
      dateDebut: formation.dateDebut?.substring(0, 10) || '',
      dateFin: formation.dateFin?.substring(0, 10) || ''
    });
    setShowEdit(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Confirmer la suppression ?")) {
      try {
        await axios.delete(`http://localhost:5132/api/Formation/${id}`);
        alert('Formation supprimée');
        loadFormations();
      } catch (error) {
        console.error('Erreur lors de la suppression de la formation', error);
        alert('Erreur lors de la suppression');
      }
    }
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
      <td>{types.find(t => t.id === f.typeId)?.nom || 'N/A'}</td> {/* ici on affiche Présentiel par exemple */}
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
  handleSubmit={handleAdd}
  formData={formData}
  setFormData={setFormData}
  types={types}         // 💬 utiliser les vrais types ici
  formateurs={formateursMock}
/>

<EditFormation
  show={showEdit}
  handleClose={() => setShowEdit(false)}
  handleSubmit={handleEdit}
  formData={formData}
  setFormData={setFormData}
  types={types}         // 💬 utiliser les vrais types ici
  formateurs={formateursMock}
/>

<DetailFormation
  formation={selectedFormation}
  onHide={() => setSelectedFormation(null)}
  types={types}
/>
    </div>
  );
};

export default ListFormation;
