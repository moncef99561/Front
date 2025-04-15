import React, { useState, useEffect, useCallback } from 'react';
import api from '../../services/api';
import { Button, Alert, Container } from 'react-bootstrap';
import JobOfferTable from './JobOfferTable';
import AddJobOffer from './AddJobOffer';
import EditJobOffer from './EditJobOffer';

const JobOfferList = () => {
  const [jobOffers, setJobOffers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentJobOffer, setCurrentJobOffer] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    publicationDate: ''
  });
  const [error, setError] = useState('');

  // Charger les offres d'emploi au démarrage
  const fetchJobOffers = useCallback(async () => {
    try {
      const response = await api.get('/joboffers');
      setJobOffers(response.data);
    } catch (err) {
      showError('Erreur de chargement des offres d\'emploi');
    }
  }, []);
  
  useEffect(() => {
    fetchJobOffers();
  }, [fetchJobOffers]);

  // Gérer les changements dans le formulaire
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Gérer la soumission du formulaire (ajout ou modification)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentJobOffer) {
        await api.put(`/joboffers/${currentJobOffer.jobOfferId}`, formData);
      } else {
        await api.post('/joboffers', formData);
      }
      setShowModal(false);
      fetchJobOffers(); // Recharger la liste des offres d'emploi
    } catch (err) {
      showError('Erreur lors de la sauvegarde');
    }
  };

  // Gérer l'édition d'une offre d'emploi
  const handleEdit = (jobOffer) => {
    setCurrentJobOffer(jobOffer);
    setFormData({
      title: jobOffer.title,
      description: jobOffer.description,
      publicationDate: jobOffer.publicationDate.split('T')[0],
      jobOfferId: jobOffer.jobOfferId // Ajoutez cette ligne
    });
    setShowModal(true);
  };

  // Gérer la suppression d'une offre d'emploi
  const handleDelete = async (id) => {
    if (window.confirm('Supprimer cette offre d\'emploi ?')) {
      try {
        await api.delete(`/joboffers/${id}`);
        fetchJobOffers(); // Recharger la liste des offres d'emploi
      } catch (err) {
        showError('Erreur de suppression');
      }
    }
  };

  // Afficher un message d'erreur
  const showError = (message) => {
    setError(message);
    setTimeout(() => setError(''), 3000); // Masquer l'erreur après 3 secondes
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4 text-primary">Gestion des Offres d'Emploi</h1>
      
      {/* Afficher les erreurs */}
      {error && <Alert variant="danger" className="text-center">{error}</Alert>}

      {/* Bouton pour ajouter une offre d'emploi */}
      <div className="d-flex justify-content-end mb-3">
        <Button 
          variant="primary" 
          onClick={() => {
            setCurrentJobOffer(null);
            setFormData({
              title: '',
              description: '',
              publicationDate: ''
            });
            setShowModal(true);
          }}
        >
          Ajouter Offre d'Emploi
        </Button>
      </div>

      {/* Tableau des offres d'emploi */}
      <JobOfferTable 
        jobOffers={jobOffers} 
        handleEdit={handleEdit} 
        handleDelete={handleDelete} 
      />

      {/* Modale pour ajouter ou modifier une offre d'emploi */}
      {currentJobOffer ? (
        <EditJobOffer
          show={showModal}
          handleClose={() => setShowModal(false)}
          handleSubmit={handleSubmit}
          formData={formData}
          handleInputChange={handleInputChange}
        />
      ) : (
        <AddJobOffer
          show={showModal}
          handleClose={() => setShowModal(false)}
          handleSubmit={handleSubmit}
          formData={formData}
          handleInputChange={handleInputChange}
        />
      )}
    </Container>
  );
};

export default JobOfferList;