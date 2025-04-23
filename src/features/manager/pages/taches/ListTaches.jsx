import React, { useState, useEffect } from 'react';
import { Table, Button, Alert } from 'react-bootstrap';
import { FaEdit, FaTrash, FaInfoCircle } from 'react-icons/fa';
import EditTache from './EditTache';
import DetailTache from './DetailTache';

const ListTaches = () => {
  const [taches, setTaches] = useState([]);
  const [projets, setProjets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ id: null, titre: '', description: '', projetId: '' });
  const [error, setError] = useState('');
  const [selectedTache, setSelectedTache] = useState(null);

  useEffect(() => {
    const savedTaches = JSON.parse(localStorage.getItem("taches")) || [];
    setTaches(savedTaches);

    // ✅ Vérifie si les projets existent déjà, sinon les ajoute
    let projetsExistants = JSON.parse(localStorage.getItem("projets")) || [];

    if (projetsExistants.length === 0) {
      projetsExistants = [
        { id: 1, nom: "Développement Frontend", description: "UI et composants React" },
        { id: 2, nom: "Backend API", description: "Services REST pour la gestion des données" },
        { id: 3, nom: "Refonte Site Web Corporate", description: "Nouvelle version du site entreprise" }
      ];
      localStorage.setItem("projets", JSON.stringify(projetsExistants));
    }

    // ✅ On ne garde que les projets demandés
    const projetsFiltres = projetsExistants.filter(p =>
      ["Développement Frontend", "Backend API", "Refonte Site Web Corporate"].includes(p.nom)
    );
    setProjets(projetsFiltres);
  }, []);

  useEffect(() => {
    localStorage.setItem("taches", JSON.stringify(taches));
  }, [taches]);

  const showError = (message) => {
    setError(message);
    setTimeout(() => setError(''), 3000);
  };

  const handleDelete = (id) => {
    setTaches(taches.filter(t => t.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.titre.trim()) return showError("Le titre est requis");

    const projet = projets.find(p => p.id === parseInt(formData.projetId));
    const tache = {
      ...formData,
      id: formData.id || Date.now(),
      projet: projet || null
    };

    if (formData.id) {
      setTaches(taches.map(t => t.id === formData.id ? tache : t));
    } else {
      setTaches([...taches, tache]);
    }

    setFormData({ id: null, titre: '', description: '', projetId: '' });
    setShowModal(false);
  };

  const handleOpenAdd = () => {
    setFormData({ id: null, titre: '', description: '', projetId: '' });
    setShowModal(true);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mt-32 mb-4">Gestion des Tâches</h1>

      {error && <Alert variant="danger">{error}</Alert>}

      <div className="d-flex justify-content-start mb-3">
        <Button variant="primary" onClick={handleOpenAdd}>Ajouter Tâche</Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Titre</th>
            <th>Description</th>
            <th>Projet associé</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {taches.map((t) => (
            <tr key={t.id}>
              <td>{t.titre}</td>
              <td>{t.description}</td>
              <td>{t.projet?.nom || 'Non attribué'}</td>
              <td>
                <Button variant="warning" onClick={() => {
                  setFormData({
                    id: t.id,
                    titre: t.titre,
                    description: t.description,
                    projetId: t.projet?.id?.toString() || ''
                  });
                  setShowModal(true);
                }}>
                  <FaEdit />
                </Button>
                <Button variant="danger" className="ms-2" onClick={() => handleDelete(t.id)}>
                  <FaTrash />
                </Button>
                <Button variant="info" className="ms-2" onClick={() => setSelectedTache(t)}>
                  <FaInfoCircle />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <EditTache
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        projets={projets}
      />

      <DetailTache
        tache={selectedTache}
        onHide={() => setSelectedTache(null)}
      />
    </div>
  );
};

export default ListTaches;
