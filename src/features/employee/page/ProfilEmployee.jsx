import React from "react";
import { Card, Row, Col, Badge, Button, Container } from "react-bootstrap";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaIdCard, FaUniversity } from "react-icons/fa";

const ProfilEmployee = () => {
  const employe = {
    cin: "F112295",
    nom: "Ach-chatouani",
    prenom: "Abderrahim",
    dateNaissance: "10/01/2004",
    email: "abderrahim@gmail.com",
    telephone: "0612339977",
    adresse: "oujda sidi yahya najd 01",
    dateEmbauche: "26/02/2025",
    rib: "123456789101112",
    banque: "CIH",
    cnss: "7896543",
    departement: "Comptabilité",
    service: "Gestion des salaires",
    poste: "Comptable"
  };

  return (
    <Container className="mt-4">
      <Card className="shadow-lg border-0">
        <Card.Header className="bg-primary text-white text-center py-3">
          <h4 className="mb-0">Profil</h4>
        </Card.Header>
        <Card.Body>
          <Row className="mb-4">
            <Col md={6}>
              <Card className="border-0">
                <Card.Body>
                  <h5 className="fw-semibold mb-3">Détails Personnels</h5>
                  <p><FaIdCard className="me-2 text-primary" /> <strong>CIN:</strong> {employe.cin}</p>
                  <p><FaUser className="me-2 text-primary" /> <strong>Nom:</strong> {employe.nom} {employe.prenom}</p>
                  <p><FaCalendarAlt className="me-2 text-primary" /> <strong>Naissance:</strong> {employe.dateNaissance}</p>
                  <p><FaEnvelope className="me-2 text-primary" /> <strong>Email:</strong> {employe.email}</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="border-0">
                <Card.Body>
                  <h5 className="fw-semibold mb-3">Coordonnées</h5>
                  <p><FaPhone className="me-2 text-primary" /> <strong>Téléphone:</strong> {employe.telephone}</p>
                  <p><FaMapMarkerAlt className="me-2 text-primary" /> <strong>Adresse:</strong> {employe.adresse}</p>
                  <p><FaCalendarAlt className="me-2 text-primary" /> <strong>Date d'embauche:</strong> {employe.dateEmbauche}</p>
                  <p><FaUniversity className="me-2 text-primary" /> <strong>RIB:</strong> {employe.rib} | {employe.banque}</p>
                  <p><strong>CNSS:</strong> {employe.cnss}</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <h5 className="fw-semibold mb-3 text-center">Informations Professionnelles</h5>
          <Row className="text-center mb-4">
            <Col md={4}>
              <Card className="border-0 shadow-sm">
                <Card.Body>
                  <strong>Département</strong>
                  <div className="mt-2">
                    <Badge bg="info" pill>{employe.departement || "Non Defini"}</Badge>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="border-0 shadow-sm">
                <Card.Body>
                  <strong>Service</strong>
                  <div className="mt-2">
                    <Badge bg="secondary" pill>{employe.service || "Non Defini"}</Badge>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="border-0 shadow-sm">
                <Card.Body>
                  <strong>Poste</strong>
                  <div className="mt-2">
                    <Badge bg="primary" pill>{employe.poste || "Non Defini"}</Badge>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProfilEmployee;