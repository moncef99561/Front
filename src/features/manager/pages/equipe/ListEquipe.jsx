import React, { useState, useEffect } from 'react';
import { Table, Button, Alert } from 'react-bootstrap';
import { FaEdit, FaTrash, FaInfoCircle } from 'react-icons/fa';
import EditEquipe from './EditEquipe';
import DetailEquipe from './DetailEquipe';

// ✅ constante simple et immédiate
const employesFictifs = [
  { id: 1, nom: 'ACH-CHATOUANI', prenom: 'Abdo' },
  { id: 2, nom: 'CHARIFI', prenom: 'Moncef' },
  { id: 3, nom: 'Arbib', prenom: 'Oualid' },
  { id: 4, nom: 'MOKHTARI', prenom: 'Oumayma' },
  { id: 5, nom: 'AMARA', prenom: 'Hamza' },

];

const ListEquipe = () => {
  const [equipes, setEquipes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ id: null, nom: '', description: '', employes: [] });
  const [error, setError] = useState('');
  const [selectedEquipe, setSelectedEquipe] = useState(null);

  // ✅ Charger les équipes depuis localStorage au démarrage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("equipes")) || [];
    const mapped = saved.map(eq => ({
      ...eq,
      employes: eq.employes.map(id =>
        employesFictifs.find(emp => emp.id === id) || { id, nom: "Inconnu", prenom: "" }
      )
    }));
    setEquipes(mapped);
  }, []);

  // ✅ Sauvegarder dans localStorage à chaque changement
  useEffect(() => {
    const toStore = equipes.map(eq => ({
      ...eq,
      employes: eq.employes.map(emp => emp.id)
    }));
    localStorage.setItem("equipes", JSON.stringify(toStore));
  }, [equipes]);

  const showError = (message) => {
    setError(message);
    setTimeout(() => setError(''), 3000);
  };

  const handleDelete = (id) => {
    try {
      setEquipes(equipes.filter(eq => eq.id !== id));
    } catch {
      showError('Erreur lors de la suppression');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nom.trim()) return showError("Le nom est requis");

    const mappedEmployes = formData.employes.map(id => employesFictifs.find(e => e.id === parseInt(id)));

    if (formData.id) {
      const updated = equipes.map(eq =>
        eq.id === formData.id ? { ...formData, employes: mappedEmployes } : eq
      );
      setEquipes(updated);
    } else {
      const nouvelleEquipe = {
        ...formData,
        id: Date.now(),
        employes: mappedEmployes,
      };
      setEquipes([...equipes, nouvelleEquipe]);
    }

    setFormData({ id: null, nom: '', description: '', employes: [] });
    setShowModal(false);
  };

  const handleOpenAdd = () => {
    setFormData({ id: null, nom: '', description: '', employes: [] });
    setShowModal(true);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mt-32 mb-5">Gestion des Équipes</h1>

      {error && <Alert variant="danger">{error}</Alert>}

      <Button variant="primary" onClick={handleOpenAdd}>
        Ajouter Équipe
      </Button>

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Description</th>
            <th>Employés</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {equipes.map((equipe) => (
            <tr key={equipe.id}>
              <td>{equipe.nom}</td>
              <td>{equipe.description}</td>
              <td>
                {equipe.employes.map(e => (
                  <span key={e.id} className="badge bg-secondary me-1">
                    {e.nom} {e.prenom}
                  </span>
                ))}
              </td>
              <td>
                <Button
                  variant="warning"
                  onClick={() => {
                    setFormData({
                      ...equipe,
                      employes: equipe.employes.map(e => e.id.toString())
                    });
                    setShowModal(true);
                  }}
                >
                  <FaEdit />
                </Button>
                <Button variant="danger" className="ms-2" onClick={() => handleDelete(equipe.id)}>
                  <FaTrash />
                </Button>
                <Button variant="info" className="ms-2" onClick={() => setSelectedEquipe(equipe)}>
                  <FaInfoCircle />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modale Ajouter / Modifier */}
      <EditEquipe
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        employes={employesFictifs}
      />

      {/* Modale Détails */}
      <DetailEquipe
        equipe={selectedEquipe}
        onHide={() => setSelectedEquipe(null)}
      />
    </div>
  );
};

export default ListEquipe;
