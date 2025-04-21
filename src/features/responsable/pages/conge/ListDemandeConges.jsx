import React, { useEffect, useState } from "react";
//import api2 from "../../services/api2";
import {
    getDemandesCongesEnAttente,
    updateStatutDemande,
  } from "../../services/api2"
import { Table, Button, Badge, Container } from "react-bootstrap";

const ListDemandeConges = () => {
    const [demandes, setDemandes] = useState([]);
  
    // ✅ Chargement initial
    useEffect(() => {
      getDemandesCongesEnAttente()
        .then((res) => {
          console.log("Demandes récupérées :", res.data);
          setDemandes(res.data);
        })
        .catch((err) => console.error("Erreur récupération demandes", err));
    }, []);
  
    // ✅ Mise à jour du statut
    const mettreAJourStatut = (id, statut) => {
      updateStatutDemande(id, statut)
        .then(() => {
          setDemandes((prev) =>
            prev.map((d) => (d.id === id ? { ...d, statut } : d))
          );
        })
        .catch((err) => console.error("Erreur mise à jour du statut", err));
    };
  
    return (
      <Container className="mt-2 mb-6">
        <h3 className="mb-4 text-center text-primary">Demandes de congé des employés</h3>
  
        {demandes.length === 0 ? (
          <p className="text-muted text-center">Aucune demande en attente pour le moment.</p>
        ) : (
          <div className="table-responsive">
            <Table bordered hover className="align-middle shadow-sm">
              <thead className="table-light">
                <tr>
                  <th>Employé</th>
                  <th>Type</th>
                  <th>Début</th>
                  <th>Fin</th>
                  <th>Solde</th>
                  <th>Statut</th>
                  <th>Justificatif</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {demandes.map((demande) => (
                  <tr key={demande.id}>
                    <td>{demande.nomEmploye}</td>
                    <td>{demande.typeConge}</td>
                    <td>{new Date(demande.dateDebut).toLocaleDateString()}</td>
                    <td>{new Date(demande.dateFin).toLocaleDateString()}</td>
                    <td>
                      <Badge bg="info">{demande.soldeConge} jours</Badge>
                    </td>
                    <td>
                      <Badge
                        bg={
                          demande.statut === "Validé"
                            ? "success"
                            : demande.statut === "Refusé"
                            ? "danger"
                            : "warning"
                        }
                      >
                        {demande.statut}
                      </Badge>
                    </td>
                    <td>
                      {demande.justificatifPath ? (
                        <a
                          href={`http://localhost:5148/api/conges/justificatif/${demande.justificatifPath}`}
                          className="btn btn-sm btn-outline-secondary"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Télécharger
                        </a>
                      ) : (
                        <span className="text-muted">Aucun</span>
                      )}
                    </td>
                    <td>
                      {demande.statut === "En attente" ? (
                        <>
                          <Button
                            variant="success"
                            size="sm"
                            onClick={() => mettreAJourStatut(demande.id, "Validé")}
                          >
                            Valider
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            className="ms-2"
                            onClick={() => mettreAJourStatut(demande.id, "Refusé")}
                          >
                            Refuser
                          </Button>
                        </>
                      ) : (
                        <span className="text-muted">Traitée</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </Container>
    );
  };
  
  export default ListDemandeConges;