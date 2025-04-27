import React from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';

const JobOfferDetailModal = ({ show, handleClose, offer, onEditClick }) => {
  if (!offer) return null;

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      {/* <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title>Détails de l'Offre</Modal.Title>
      </Modal.Header> */}

      <Modal.Body style={{ backgroundColor: '#ffffff', maxHeight: '80vh', overflowY: 'auto', padding: '20px' }}>
        <h4 className="mb-4 text-center">{offer.titre}</h4>

        <Row className="mb-3">
          <Col md={12}>
            <p><strong>Description :</strong></p>
            <div className="border rounded p-2" style={{ backgroundColor: '#f8f9fa' }}>
              <div dangerouslySetInnerHTML={{ __html: offer.description }} />
            </div>
          </Col>
        </Row>

        <Row className="g-1">
          <Col md={4}>
            <p><strong>Type de Contrat :</strong> {offer.typeContrat}</p>
          </Col>
          <Col md={4}>
            <p><strong>Catégorie :</strong> {offer.categorieTravail}</p>
          </Col>
          <Col md={4}>
            <p><strong>Expérience :</strong> {offer.experience}</p>
          </Col>
          <Col md={4}>
            <p><strong>Lieu :</strong> {offer.lieu}</p>
          </Col>
          <Col md={4}>
            <p><strong>Salaire :</strong> {offer.salaire}</p>
          </Col>
          <Col md={4}>
            <p><strong>Status :</strong> {offer.status}</p>
          </Col>
          <Col md={4}>
            <p><strong>Date de Création :</strong> {offer.dateCreation}</p>
          </Col>
        </Row>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Fermer
        </Button>
        <Button variant="primary" onClick={onEditClick}>
          Modifier
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default JobOfferDetailModal;
