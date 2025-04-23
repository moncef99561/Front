import React, { useState, useEffect } from 'react';
import { Table, Button, Alert } from 'react-bootstrap';
import { FaEdit, FaTrash, FaInfoCircle } from 'react-icons/fa';
import EditProjet from './EditProjet';
import DetailProjet from './DetailProjet';

const ListProjet = () => {
  const [projets, setProjets] = useState([]);
  const [equipes, setEquipes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ id: null, nom: '', description: '', equipeId: '' });
  const [error, setError] = useState('');
  const [selectedProjet, setSelectedProjet] = useState(null);

  // Charger projets + équipes filtrées
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("projets")) || [];
    setProjets(saved);
    chargerEquipesFiltrées();
  }, []);

  useEffect(() => {
    localStorage.setItem("projets", JSON.stringify(projets));
  }, [projets]);

  const chargerEquipesFiltrées = () => {
    const allEquipes = JSON.parse(localStorage.getItem("equipes")) || [];
    const filtered = allEquipes.filter(eq =>
      ["Backend API", "Développement Frontend", "Support Client"].includes(eq.nom)
    );
    setEquipes(filtered);
  };

  const ajouterEquipesParDefaut = () => {
    const equipesParDefaut = [
      { id: 1, nom: "Développement Frontend", description: "UI et composants React" },
      { id: 2, nom: "Backend API", description: "Services web en .NET ou Node" },
      { id: 3, nom: "Support Client", description: "Relation utilisateurs" }
    ];
    localStorage.setItem("equipes", JSON.stringify(equipesParDefaut));
    chargerEquipesFiltrées();
    alert("✅ Équipes par défaut ajoutées !");
  };

  const showError = (message) => {
    setError(message);
    setTimeout(() => setError(''), 3000);
  };

  const handleDelete = (id) => {
    setProjets(projets.filter(p => p.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nom.trim()) return showError("Le nom est requis");

    const equipe = equipes.find(eq => eq.id === parseInt(formData.equipeId));
    const projet = {
      ...formData,
      id: formData.id || Date.now(),
      equipe: equipe || null
    };

    if (formData.id) {
      setProjets(projets.map(p => p.id === formData.id ? projet : p));
    } else {
      setProjets([...projets, projet]);
    }

    setShowModal(false);
    setFormData({ id: null, nom: '', description: '', equipeId: '' });
  };

  const handleOpenAdd = () => {
    setFormData({ id: null, nom: '', description: '', equipeId: '' });
    setShowModal(true);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mt-32 mb-4">Gestion des Projets</h1>

      {error && <Alert variant="danger">{error}</Alert>}

      <div className="d-flex justify-content-between mb-3">
        <Button variant="primary" onClick={handleOpenAdd}>Ajouter Projet</Button>
        {/* <Button variant="secondary" onClick={ajouterEquipesParDefaut}>🛠 Ajouter équipes par défaut</Button> */}
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Description</th>
            <th>Équipe assignée</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projets.map((p) => (
            <tr key={p.id}>
              <td>{p.nom}</td>
              <td>{p.description}</td>
              <td>{p.equipe?.nom || 'Non attribuée'}</td>
              <td>
                <Button variant="warning" onClick={() => {
                  setFormData({
                    id: p.id,
                    nom: p.nom,
                    description: p.description,
                    equipeId: p.equipe?.id?.toString() || ''
                  });
                  setShowModal(true);
                }}>
                  <FaEdit />
                </Button>
                <Button variant="danger" className="ms-2" onClick={() => handleDelete(p.id)}>
                  <FaTrash />
                </Button>
                <Button variant="info" className="ms-2" onClick={() => setSelectedProjet(p)}>
                  <FaInfoCircle />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <EditProjet
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        equipes={equipes}
      />

      <DetailProjet
        projet={selectedProjet}
        onHide={() => setSelectedProjet(null)}
      />
    </div>
  );
};

export default ListProjet;
