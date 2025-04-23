import React, { useEffect, useState, useCallback } from "react";
import { Table, Button, Alert } from "react-bootstrap";
import { getDemandesCongesEnAttente, updateStatutDemande } from "../../services/api2";

const ListDemandeConges = () => {
  const [demandes, setDemandes] = useState([]);
  const [error, setError] = useState("");

  const fetchDemandes = useCallback(async () => {
    try {
      const res = await getDemandesCongesEnAttente();
      setDemandes(res.data);
    } catch (err) {
      setError("Erreur lors du chargement des demandes");
      setTimeout(() => setError(""), 3000);
    }
  }, []);

  useEffect(() => {
    fetchDemandes();
  }, [fetchDemandes]);

  const mettreAJourStatut = async (id, statut) => {
    try {
      await updateStatutDemande(id, statut);
      setDemandes((prev) =>
        prev.map((d) => (d.id === id ? { ...d, statut } : d))
      );
    } catch (err) {
      setError("Erreur lors de la mise à jour du statut");
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mt-4 mb-5">Demandes de congé des employés</h1>

      {error && <Alert variant="danger">{error}</Alert>}

      <Table striped bordered hover className="mt-3">
        <thead>
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
              <td>{demande.soldeConge} jours</td>
              <td>{demande.statut}</td>
              <td>
                {demande.justificatifPath ? (
                  <a
                    href={`http://localhost:5148/api/conges/justificatif/${demande.justificatifPath}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-info btn-sm"
                  >
                    Voir
                  </a>
                ) : (
                  <span className="text-muted">Non fourni</span>
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
  );
};

export default ListDemandeConges;
