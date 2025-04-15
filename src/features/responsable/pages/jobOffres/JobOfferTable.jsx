import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';

const JobOfferTable = ({ jobOffers, handleEdit, handleDelete }) => {
  return (
    <Table striped bordered hover responsive className="mt-4 shadow">
      <thead className="bg-dark text-white">
        <tr>
          <th>Titre</th>
          <th>Description</th>
          <th>Date de Publication</th>
          <th className="text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {jobOffers.map(jobOffer => (
          <tr key={jobOffer.jobOfferId}>
            <td>{jobOffer.title}</td>
            <td>
              <div className="tiptap-preview" dangerouslySetInnerHTML={{ __html: jobOffer.description }} />
            </td>
            <td>{new Date(jobOffer.publicationDate).toLocaleDateString()}</td>
            <td className="text-center">
              <Button 
                variant="outline-warning" 
                className="me-2"
                onClick={() => handleEdit(jobOffer)}
                aria-label="Modifier"
              >
                <FaEdit />
              </Button>
              <Button 
                variant="outline-danger"
                onClick={() => handleDelete(jobOffer.jobOfferId)}
                aria-label="Supprimer"
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