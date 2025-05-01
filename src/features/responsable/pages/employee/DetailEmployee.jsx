import React, { useEffect, useState } from 'react';
import { Modal, Badge, Row, Col, ListGroup, Button, Spinner } from 'react-bootstrap';
import api from '../../services/api'; // ajuste le chemin selon ton projet

const DetailEmployee = ({ show, onHide, employeeId }) => {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!employeeId) return;
      setLoading(true);
      try {
        const res = await api.get(`/employees/${employeeId}/details`);
        setEmployee(res.data);
      } catch (err) {
        console.error("❌ Erreur API :", err);
        setEmployee(null);
      } finally {
        setLoading(false);
      }
    };

    if (show) fetchDetails();
  }, [show, employeeId]);

  if (!show) return null;

  return (
    <Modal show={show} onHide={onHide} size="lg" backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>Détails de l'Employé</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <div className="text-center"><Spinner animation="border" variant="primary" /></div>
        ) : employee ? (
          <>
            <Row>
              <Col md={6}>
                <ListGroup>
                  <ListGroup.Item><strong>CIN:</strong> {employee.cin}</ListGroup.Item>
                  <ListGroup.Item><strong>Nom:</strong> {employee.nom}</ListGroup.Item>
                  <ListGroup.Item><strong>Prénom:</strong> {employee.prenom}</ListGroup.Item>
                  <ListGroup.Item><strong>Date Naissance:</strong> {new Date(employee.dateNaissance).toLocaleDateString()}</ListGroup.Item>
                  <ListGroup.Item><strong>Email:</strong> {employee.email}</ListGroup.Item>
                  <ListGroup.Item><strong>Téléphone:</strong> {employee.telephone}</ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={6}>
                <ListGroup>
                  <ListGroup.Item><strong>Adresse:</strong> {employee.adresse}</ListGroup.Item>
                  <ListGroup.Item><strong>Date Embauche:</strong> {new Date(employee.dateEmbauche).toLocaleDateString()}</ListGroup.Item>
                  <ListGroup.Item><strong>RIB:</strong> {employee.rib}</ListGroup.Item>
                  <ListGroup.Item><strong>Banque:</strong> {employee.banque}</ListGroup.Item>
                  <ListGroup.Item><strong>CNSS:</strong> {employee.cnss}</ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>

            <div className="mt-4">
              <h5>Informations Professionnelles</h5>
              <Row className="g-3">
                <Col md={4}>
                  <div className="p-3 border rounded">
                    <h6 className="text-muted">Département</h6>
                    <Badge bg="info" className="fs-6">
                      {employee?.poste?.service?.department?.name ?? 'Non défini'}
                    </Badge>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="p-3 border rounded">
                    <h6 className="text-muted">Service</h6>
                    <Badge bg="secondary" className="fs-6">
                      {employee?.poste?.service?.name ?? 'Non défini'}
                    </Badge>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="p-3 border rounded">
                    <h6 className="text-muted">Poste</h6>
                    <Badge bg="primary" className="fs-6">
                      {employee?.poste?.title ?? 'Non défini'}
                    </Badge>
                  </div>
                </Col>
              </Row>
            </div>
          </>
        ) : (
          <div className="text-danger text-center fw-bold">⚠️ Aucun détail trouvé pour cet employé.</div>
        )}
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
