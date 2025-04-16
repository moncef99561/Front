import React, { useState, useEffect } from 'react';
import { 
  Container,
  Card,
  ListGroup,
  ListGroupItem,
  Badge,
  Spinner,
  Alert,
  Button
} from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { FaArrowLeft, FaUser, FaBuilding, FaBriefcase, FaInfoCircle } from 'react-icons/fa';
import api from '../../services/api';

const DetailEmployee = () => {
  const { employeeId } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await api.get(`/employees/${employeeId}/details`);
        setEmployee(response.data);
      } catch (err) {
        setError('Erreur de chargement des détails de l\'employé');
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [employeeId]);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Chargement des détails...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">
          {error}
        </Alert>
      </Container>
    );
  }

  if (!employee) {
    return (
      <Container className="mt-4">
        <Alert variant="warning">
          Employé introuvable
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Button 
        as={Link} 
        to="/employees" 
        variant="outline-primary" 
        className="mb-4"
      >
        <FaArrowLeft className="me-2" />
        Retour à la liste
      </Button>

      <Card>
        <Card.Header className="bg-primary text-white">
          <h3 className="mb-0">
            <FaUser className="me-2" />
            {employee.prenom} {employee.nom}
          </h3>
        </Card.Header>

        <Card.Body>
          <div className="row">
            <div className="col-md-6">
              <Card className="mb-4">
                <Card.Header>
                  <FaInfoCircle className="me-2" />
                  Informations Personnelles
                </Card.Header>
                <ListGroup variant="flush">
                  <ListGroupItem>
                    <strong>CIN:</strong> {employee.cin}
                  </ListGroupItem>
                  <ListGroupItem>
                    <strong>Date de Naissance:</strong>{" "}
                    {new Date(employee.dateNaissance).toLocaleDateString()}
                  </ListGroupItem>
                  <ListGroupItem>
                    <strong>Email:</strong> {employee.email}
                  </ListGroupItem>
                  <ListGroupItem>
                    <strong>Téléphone:</strong> {employee.telephone || '-'}
                  </ListGroupItem>
                </ListGroup>
              </Card>
            </div>

            <div className="col-md-6">
              <Card className="mb-4">
                <Card.Header>
                  <FaBriefcase className="me-2" />
                  Informations Professionnelles
                </Card.Header>
                <ListGroup variant="flush">
                  <ListGroupItem>
                    <strong>Date d'Embauche:</strong>{" "}
                    {new Date(employee.dateEmbauche).toLocaleDateString()}
                  </ListGroupItem>
                  <ListGroupItem>
                    <strong>RIB:</strong> {employee.rib || '-'}
                  </ListGroupItem>
                  <ListGroupItem>
                    <strong>Banque:</strong> {employee.banque || '-'}
                  </ListGroupItem>
                  <ListGroupItem>
                    <strong>CNSS:</strong> {employee.cnss || '-'}
                  </ListGroupItem>
                </ListGroup>
              </Card>

              {employee.poste && (
                <Card>
                  <Card.Header>
                    <FaBuilding className="me-2" />
                    Affectation
                  </Card.Header>
                  <ListGroup variant="flush">
                    <ListGroupItem>
                      <strong>Poste:</strong>{" "}
                      <Badge bg="primary">{employee.poste.title}</Badge>
                    </ListGroupItem>
                    <ListGroupItem>
                      <strong>Service:</strong>{" "}
                      {employee.poste.service?.name || 'Non spécifié'}
                    </ListGroupItem>
                    <ListGroupItem>
                      <strong>Département:</strong>{" "}
                      {employee.poste.service?.department?.name || 'Non spécifié'}
                    </ListGroupItem>
                  </ListGroup>
                </Card>
              )}
            </div>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default DetailEmployee;