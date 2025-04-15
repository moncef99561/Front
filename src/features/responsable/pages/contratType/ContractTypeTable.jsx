import React, { useState } from 'react';
import { Table, Button, Modal, ListGroup, Alert } from 'react-bootstrap';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';

const ContractTypeTable = ({ contractTypes, handleEdit, handleDelete }) => {
  const [showConditions, setShowConditions] = useState(false);
  const [selectedContractType, setSelectedContractType] = useState(null);

  // Afficher les conditions
  const handleShowConditions = (contractType) => {
    setSelectedContractType(contractType);
    setShowConditions(true);
  };

  return (
    <>
      <Table striped bordered hover responsive className="mt-4 shadow">
        <thead className="bg-dark text-white">
          <tr>
            <th>Nom</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Ligne de test */}
          {/* <tr>
            <td>{debugData.name}</td>
            <td className="text-center">
              <Button variant="outline-info" className="me-2" onClick={() => handleShowConditions(debugData)}>
                <FaEye />
              </Button>
              <Button variant="outline-warning" className="me-2">
                <FaEdit />
              </Button>
              <Button variant="outline-danger">
                <FaTrash />
              </Button>
            </td>
          </tr> */}

          {contractTypes.map((contractType) => (
            <tr key={contractType.contractTypeId}>
              <td>{contractType.name}</td>
              <td className="text-center">
                <Button 
                  variant="outline-info" 
                  className="me-2"
                  onClick={() => handleShowConditions(contractType)}
                >
                  <FaEye />
                </Button>
                <Button
                  variant="outline-warning"
                  className="me-2"
                  onClick={() => handleEdit(contractType)}
                >
                  <FaEdit />
                </Button>
                <Button
                  variant="outline-danger"
                  onClick={() => handleDelete(contractType.contractTypeId)}
                >
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal d'affichage */}
      <Modal show={showConditions} onHide={() => setShowConditions(false)} centered>
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>
            {selectedContractType?.name || "Détails du contrat"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedContractType?.contractTerms?.length > 0 ? (
            <ListGroup variant="flush">
              {selectedContractType.contractTerms.map((term, index) => (
                <ListGroup.Item key={index}>
                  <div className="d-flex justify-content-between">
                    <span className="fw-bold">{term.key}:</span>
                    <span>{term.value}</span>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <Alert variant="info">
              Aucune condition n'a été définie pour ce type de contrat
            </Alert>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConditions(false)}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ContractTypeTable;