import React, { useState, useEffect, useCallback } from 'react';
import api from '../../services/api';
import { Alert, Container, Spinner, Toast, ToastContainer, Button } from 'react-bootstrap';
import JobOfferTable from './JobOfferTable';
import JobOfferDetailModal from './JobOfferDetailModal';
import PaginationComponent from './PaginationComponent';
import AddJobOffer from './AddJobOffer';
import EditJobOffer from './EditJobOffer';

const JobOfferList = () => {
  const [jobOffers, setJobOffers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [offersPerPage] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);

  const [selectedOffer, setSelectedOffer] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const fetchJobOffers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get('/OffreEmploi');
      setJobOffers(response.data);
    } catch (err) {
      showError('Erreur de chargement des offres.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobOffers();
  }, [fetchJobOffers]);

  const showError = (message) => {
    setError(message);
    setTimeout(() => setError(''), 3000);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Voulez-vous vraiment supprimer cette offre ?')) {
      try {
        await api.delete(`/OffreEmploi/${id}`);
        fetchJobOffers();
        setShowToast(true);
      } catch {
        showError('Erreur lors de la suppression.');
      }
    }
  };

  const handleRowClick = (offer) => {
    setSelectedOffer(offer);
  };

  const handleCloseDetailModal = () => {
    setSelectedOffer(null);
  };

  const handleEditClickFromDetail = () => {
    setShowEditModal(true);
  };

  const handleEditClickFromTable = (offer) => {
    setSelectedOffer(offer);
    setShowEditModal(true);
  };

  const handleAddOffer = async (newOffer) => {
    try {
      await api.post('/OffreEmploi', newOffer);
      fetchJobOffers();
      setShowAddModal(false);
    } catch {
      showError('Erreur lors de l\'ajout.');
    }
  };

  const handleUpdateOffer = async (updatedOffer) => {
    try {
      await api.put(`/OffreEmploi/${updatedOffer.offreEmploiId}`, updatedOffer);
      fetchJobOffers();
      setShowEditModal(false);
      setSelectedOffer(null);
    } catch {
      showError('Erreur lors de la modification.');
    }
  };

  // Pagination
  const indexOfLastOffer = currentPage * offersPerPage;
  const indexOfFirstOffer = indexOfLastOffer - offersPerPage;
  const currentOffers = jobOffers.slice(indexOfFirstOffer, indexOfLastOffer);

  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="text-center">Offres d'Emploi</h1>
        <Button variant="primary" onClick={() => setShowAddModal(true)}>
          Ajouter Offre
        </Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" role="status" />
        </div>
      ) : (
        <>
          <JobOfferTable 
            jobOffers={currentOffers} 
            onRowClick={handleRowClick} 
            handleDelete={handleDelete}
            handleEdit={handleEditClickFromTable} // ⬅️ Correction ici
          />
          <PaginationComponent
            totalOffers={jobOffers.length}
            offersPerPage={offersPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}

      {/* Modal détails */}
      {selectedOffer && !showEditModal && (
        <JobOfferDetailModal
          show={!!selectedOffer}
          handleClose={handleCloseDetailModal}
          offer={selectedOffer}
          onEditClick={handleEditClickFromDetail}
        />
      )}

      {/* Modal ajouter */}
      {showAddModal && (
        <AddJobOffer
          show={showAddModal}
          handleClose={() => setShowAddModal(false)}
          handleSave={handleAddOffer}
        />
      )}

      {/* Modal modifier */}
      {showEditModal && selectedOffer && (
        <EditJobOffer
          show={showEditModal}
          handleClose={() => {
            setShowEditModal(false);
            setSelectedOffer(null);
          }}
          offer={selectedOffer}
          handleSave={handleUpdateOffer}
        />
      )}

      {/* Toast succès */}
      <ToastContainer position="top-center" className="p-3">
        <Toast 
          onClose={() => setShowToast(false)} 
          show={showToast} 
          delay={2500} 
          autohide 
          style={{ minWidth: '400px', minHeight: '80px', backgroundColor: 'white', border: '1px solid #28a745' }}
        >
          <Toast.Body className="text-success fw-bold text-center">
            ✅ Opération réussie !
          </Toast.Body>
        </Toast>
      </ToastContainer>

    </Container>
  );
};

export default JobOfferList;
