import React, { useEffect, useState } from "react";
import { Card, Row, Col, Badge, Container } from "react-bootstrap";
import axios from "axios";

const ProfilEmployee = () => {
  const [profil, setProfil] = useState(null);

  useEffect(() => {
    loadProfil();
  }, []);

  const loadProfil = async () => {
    try {
      const res = await axios.get("http://localhost:5107/api/ProfilEmploye");
      setProfil(res.data);
    } catch (err) {
      console.error("Erreur chargement profil", err);
    }
  };

  if (!profil) return <p>Chargement du profil...</p>;

  return (
    <Container className="mt-4">
      <Card className="shadow-lg border-0">
        <Card.Header className="bg-primary text-white text-center py-3">
          <h4>Profil</h4>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <Card className="border-0">
                <Card.Body>
                  <h5 className="fw-semibold mb-3">Détails personnels</h5>
                  <p><strong>CIN :</strong> {profil.cin}</p>
                  <p><strong>Nom :</strong> {profil.nom} {profil.prenom}</p>
                  <p><strong>Naissance :</strong> {new Date(profil.dateNaissance).toLocaleDateString()}</p>
                  <p><strong>Email :</strong> {profil.email}</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="border-0">
                <Card.Body>
                  <h5 className="fw-semibold mb-3">Coordonnées</h5>
                  <p><strong>Téléphone :</strong> {profil.telephone}</p>
                  <p><strong>Adresse :</strong> {profil.adresse}</p>
                  <p><strong>Date d'embauche :</strong> {new Date(profil.dateEmbauche).toLocaleDateString()}</p>
                  <p><strong>RIB :</strong> {profil.rib} ({profil.banque})</p>
                  <p><strong>CNSS :</strong> {profil.cnss}</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <h5 className="fw-semibold mt-4 text-center">Informations professionnelles</h5>
          <Row className="text-center mt-3">
            <Col md={4}>
              <Badge bg="info" pill>{profil.departement || "Non défini"}</Badge>
            </Col>
            <Col md={4}>
              <Badge bg="secondary" pill>{profil.service || "Non défini"}</Badge>
            </Col>
            <Col md={4}>
              <Badge bg="primary" pill>{profil.poste || "Non défini"}</Badge>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProfilEmployee;
