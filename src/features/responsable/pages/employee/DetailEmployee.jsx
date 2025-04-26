import React from 'react';
import { 
  Modal, 
  Badge, 
  Row, 
  Col, 
  ListGroup,
  Button 
} from 'react-bootstrap';

const DetailEmployee = ({ show, onHide, employee }) => {
  if (!employee) return null;

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Détails de l'Employé</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-md-6">
            <ListGroup>
              <ListGroup.Item>
                <Row>
                  <Col md={4} className="fw-bold">CIN:</Col>
                  <Col md={8}>{employee.cin}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col md={4} className="fw-bold">Nom:</Col>
                  <Col md={8}>{employee.nom}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col md={4} className="fw-bold">Prénom:</Col>
                  <Col md={8}>{employee.prenom}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col md={4} className="fw-bold">Date Naissance:</Col>
                  <Col md={8}>
                    {new Date(employee.dateNaissance).toLocaleDateString()}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col md={4} className="fw-bold">Email:</Col>
                  <Col md={8}>{employee.email}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </div>

          <div className="col-md-6">
            <ListGroup>
              <ListGroup.Item>
                <Row>
                  <Col md={4} className="fw-bold">Téléphone:</Col>
                  <Col md={8}>{employee.telephone}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col md={4} className="fw-bold">Adresse:</Col>
                  <Col md={8}>{employee.adresse}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col md={4} className="fw-bold">Date Embauche:</Col>
                  <Col md={8}>
                    {new Date(employee.dateEmbauche).toLocaleDateString()}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col md={4} className="fw-bold">RIB:</Col>
                  <Col md={8}>{employee.rib}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col md={4} className="fw-bold">Banque:</Col>
                  <Col md={8}>{employee.banque}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col md={4} className="fw-bold">CNSS:</Col>
                  <Col md={8}>{employee.cnss}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </div>
        </div>

        <div className="mt-4">
          <h5>Informations Professionnelles</h5>
          <Row className="g-3">
            <Col md={4}>
              <div className="p-3 border rounded">
                <h6 className="text-muted">Département</h6>
                <Badge bg="info" className="fs-6">
                  {employee?.poste?.service?.department?.name || 'RH'}
                </Badge>
              </div>
            </Col>
            
            <Col md={4}>
              <div className="p-3 border rounded">
                <h6 className="text-muted">Service</h6>
                <Badge bg="secondary" className="fs-6">
                  {employee?.poste?.service?.name || 'Recrutement'}
                </Badge>
              </div>
            </Col>
            
            <Col md={4}>
              <div className="p-3 border rounded">
                <h6 className="text-muted">Poste</h6>
                <Badge bg="primary" className="fs-6">
                  {employee?.poste?.title || 'Responsable RH'}
                </Badge>
              </div>
            </Col>
          </Row>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Fermer
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DetailEmployee;