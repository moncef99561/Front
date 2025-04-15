import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Button, Alert, Container } from 'react-bootstrap';
import ContractTypeTable from './ContractTypeTable';
import AddContractType from './AddContractType';
import EditContractType from './EditContractType';

const ContractTypeList = () => {
  const [contractTypes, setContractTypes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentContractType, setCurrentContractType] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    terms: [] // Conditions de contrat
  });
  const [error, setError] = useState('');


  // Charger les types de contrat au démarrage
  useEffect(() => {
    const fetchContractTypes = async () => { // Déplacer la fonction à l'intérieur
      try {
        const response = await api.get('/contracttypes');
        setContractTypes(response.data);
      } catch (err) {
        showError(err.response?.data || 'Erreur de chargement');
      }
    };
    
    fetchContractTypes();
  }, []);

  // Récupérer les types de contrat
  const fetchContractTypes = async () => {
    try {
      const response = await api.get('/contracttypes');
      setContractTypes(response.data);
    } catch (err) {
      showError(err.response?.data || 'Erreur de chargement');
    }
  };

  // Gérer les changements dans le formulaire
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Ajouter une condition de contrat
  const addTerm = () => {
    setFormData({
      ...formData,
      terms: [
        ...formData.terms,
        { 
          key: '', 
          value: '', 
          startDate: new Date().toISOString().split('T')[0], // Format YYYY-MM-DD
          endDate: new Date().toISOString().split('T')[0]
        }
      ]
    });
  };
  // Supprimer une condition de contrat
  const removeTerm = (index) => {
    const newTerms = formData.terms.filter((_, i) => i !== index);
    setFormData({ ...formData, terms: newTerms });
  };

  // Mettre à jour une condition de contrat
  const handleTermChange = (index, field, value) => {
    const newTerms = formData.terms.map((term, i) => 
      i === index ? { ...term, [field]: value } : term
    );
    setFormData({ ...formData, terms: newTerms });
  };

  // Gérer la soumission du formulaire (ajout ou modification)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: formData.name,
        contractTerms: formData.terms.map(term => ({
          key: term.key,
          value: term.value,
          startDate: term.startDate || new Date().toISOString(),
          endDate: term.endDate || new Date().toISOString()
        }))
      };
  
      if (currentContractType) {
        await api.put(`/contracttypes/${currentContractType.contractTypeId}`, payload);
      } else {
        await api.post('/contracttypes', payload);
      }
      
      setShowModal(false);
      fetchContractTypes();
    } catch (err) {
      showError(err.response?.data); // Gestion améliorée
    }
  };

  // Gérer l'édition d'un type de contrat
  const handleEdit = (contractType) => {
    setCurrentContractType(contractType);
    setFormData({
      name: contractType.name,
      terms: contractType.contractTerms || []
    });
    setShowModal(true);
  };

  // Gérer la suppression d'un type de contrat
  const handleDelete = async (id) => {
    if (window.confirm('Supprimer ce type de contrat ?')) {
      try {
        await api.delete(`/contracttypes/${id}`);
        fetchContractTypes(); // Recharger la liste des types de contrat
      } catch (err) {
        showError('Erreur de suppression');
      }
    }
  };

  // Afficher un message d'erreur
  const showError = (message) => {
    // Extraire le message de l'objet d'erreur
    const errorMessage = typeof message === 'object' 
      ? message.title || message.Message || 'Erreur inconnue'
      : message;
    
    setError(errorMessage);
    setTimeout(() => setError(''), 3000);
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4 text-primary">Gestion des Types de Contrat</h1>
      
      {/* Afficher les erreurs */}
      {error && <Alert variant="danger" className="text-center">{error}</Alert>}

      {/* Bouton pour ajouter un type de contrat */}
      <div className="d-flex justify-content-end mb-3">
        <Button 
          variant="primary" 
          onClick={() => {
            setCurrentContractType(null);
            setFormData({
              name: '',
              terms: []
            });
            setShowModal(true);
          }}
        >
          Ajouter un Type de Contrat
        </Button>
      </div>

      {/* Tableau des types de contrat */}
      <ContractTypeTable 
        contractTypes={contractTypes} 
        handleEdit={handleEdit} 
        handleDelete={handleDelete} 
      />

      {/* Modale pour ajouter ou modifier un type de contrat */}
      {currentContractType ? (
        <EditContractType
          show={showModal}
          handleClose={() => setShowModal(false)}
          handleSubmit={handleSubmit}
          formData={formData}
          handleInputChange={handleInputChange}
          addTerm={addTerm}
          removeTerm={removeTerm}
          handleTermChange={handleTermChange}
        />
      ) : (
        <AddContractType
          show={showModal}
          handleClose={() => setShowModal(false)}
          handleSubmit={handleSubmit}
          formData={formData}
          handleInputChange={handleInputChange}
          addTerm={addTerm}
          removeTerm={removeTerm}
          handleTermChange={handleTermChange}
        />
      )}
    </Container>
  );
};

export default ContractTypeList;