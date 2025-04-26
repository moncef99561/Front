// 📁 src/features/candidat/components/offers/OfferDetailsModal.jsx
import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function OfferDetailsModal({ job, onClose, onApply }) {
  return (
    <Modal show={!!job} onHide={onClose} centered size="lg">
      {job && (
        <>
          <Modal.Header closeButton>
            <Modal.Title>{job.titre}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <p><strong>Id :</strong> {job.offreEmploiId}</p>
            <p><strong>Titre :</strong> {job.titre}</p>
            <p><strong>Description :</strong> {job.description}</p>
            <p><strong>Lieu :</strong> {job.lieu}</p>
            <p><strong>Date de publication :</strong> {job.dateCreation}</p>
            <p><strong>Type de contrat :</strong> {job.typeContrat}</p>
            <p><strong>Catégorie :</strong> {job.categorieTravail}</p>
            <p><strong>Niveau d'expérience :</strong> {job.experience}</p>
            <p><strong>Exigences :</strong> {job.exigences}</p>
            <p><strong>Salaire :</strong> {job.salaire}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>Fermer</Button>
            <Button variant="success" disabled={!job.offreEmploiId} onClick={() => onApply(job.offreEmploiId)}>Postuler</Button>

          </Modal.Footer>
        </>
      )}
    </Modal>
  );
}