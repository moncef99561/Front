import React from 'react';
import { Table, Button } from 'react-bootstrap';
import {  FaTrash } from 'react-icons/fa'; // j'ajoute aussi FaEdit pour plus tard

const JobOfferTable = ({ jobOffers, onRowClick, handleDelete }) => {
  return (
    <Table striped bordered hover responsive className="mt-4 shadow-sm">
      <thead className="bg-primary text-white">
        <tr>
          <th>Titre</th>
          <th>Type de Contrat</th>
          <th>Lieu</th>
          <th>Date de Création</th>
          <th className="text-center">Action</th>
        </tr>
      </thead>
      <tbody>
        {jobOffers.map(offer => (
          <tr key={offer.offreEmploiId} onClick={() => onRowClick(offer)} style={{ cursor: 'pointer' }}>
            <td>{offer.titre}</td>
            <td>{offer.typeContrat}</td>
            <td>{offer.lieu}</td>
            <td>{offer.dateCreation}</td>
            <td className="text-center">
              <Button
                variant="danger"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation(); // Stop propagation pour éviter d'ouvrir les détails
                  handleDelete(offer.offreEmploiId);
                }}
              >
                <FaTrash />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default JobOfferTable;
