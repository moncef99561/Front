import React, { useState, useEffect, useRef } from "react";
import { Table, Badge, Form, Alert, Button, Row, Col, Modal, Spinner } from "react-bootstrap";
import { FaCamera } from "react-icons/fa";
import Webcam from "react-webcam";
import axios from "axios";

const AbsencesEmploye = () => {
  const [absences, setAbsences] = useState([]);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const webcamRef = useRef(null);

  //const employeId = localStorage.getItem("utilisateurId");
  const employeId = 1002; 

  useEffect(() => {
    if (employeId) {
      fetchAbsences();
    }
  }, []);

  const fetchAbsences = async () => {
    try {
      const response = await axios.get(`http://localhost:5148/api/Absences/employe/${employeId}`);
      setAbsences(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des absences :", error);
      setMessage("Impossible de récupérer les absences.");
    }
  };

  const handleUpload = (e, id) => {
    const file = e.target.files[0];
    if (file) {
      const updated = absences.map((a) =>
        a.id === id ? { ...a, statut: "en attente", justificatif: file.name } : a
      );
      setAbsences(updated);
      setMessage("Justificatif envoyé ou modifié. En attente de validation du manager.");
      setTimeout(() => setMessage(""), 4000);
    }
  };

  const captureAndSend = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) {
      alert("Erreur lors de la capture de l'image");
      return;
    }
  
    try {
      setLoading(true);
      setMessage("Envoi de l'image en cours...");
  
      const response = await axios.post("http://localhost:5148/api/Scanner", {
        imageBase64: imageSrc,
      });
  
      const status = response.data.statut?.toLowerCase() ?? "";
  
      if (status === "absent:-1" || status === "inconnu") {
        setMessage("Visage non reconnu. Une absence a été enregistrée.");
      } else if (status.startsWith("present:")) {
        setMessage(" Présence détectée avec succès.");
      } else if (status.startsWith("retard:")) {
        setMessage(" Retard détecté.");
      } else if (status.startsWith("absent:")) {
        setMessage("Absence détectée.");
      } else if (status.startsWith("deja_enregistre:")) {
        setMessage("Présence déjà enregistrée aujourd’hui.");
      } else {
        setMessage("Statut inattendu : " + status);
      }
  
      setShowModal(false);
      await fetchAbsences(); // recharger la liste
    } catch (error) {
      console.error("Erreur d'envoi :", error);
      setMessage("Erreur lors de l'envoi. Vérifiez la connexion.");
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(""), 5000);
    }
  };
  
  return (
    <div className="container mt-4">
      <h4 className="mb-4 d-flex justify-content-between align-items-center">
        Suivi de mes absences
        <Button variant="outline-primary" onClick={() => setShowModal(true)}>
          <FaCamera />
        </Button>
      </h4>

      {message && <Alert variant="info">{message}</Alert>}

      <Table striped bordered hover className="shadow-sm">
        <thead className="table-light">
          <tr className="align-middle text-center">
            <th>Date</th>
            <th>Raison</th>
            <th>Justificatif</th>
          </tr>
        </thead>
        <tbody>
          {absences.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center text-muted">
                Aucune absence enregistrée.
              </td>
            </tr>
          ) : (
            absences.map((abs) => (
              <tr key={abs.id} className="align-middle text-center">
                <td>{new Date(abs.dateAbsence).toLocaleDateString()}</td>
                <td>{abs.raison || "-"}</td>
                <td>
                  {abs.justificatifPath ? (
                    <a
                      href={`http://localhost:5148/${abs.justificatifPath}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Voir
                    </a>
                  ) : (
                    <span className="text-muted">Aucun</span>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {/* Modal Scanner Présence */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Scanner votre présence</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column align-items-center">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={400}
          />
          {loading ? (
            <Spinner animation="border" variant="primary" className="mt-3" />
          ) : (
            <Button variant="success" className="mt-3" onClick={captureAndSend}>
              Capturer et Envoyer
            </Button>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AbsencesEmploye;
