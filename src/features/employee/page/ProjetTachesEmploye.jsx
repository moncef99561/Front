import React, { useState } from 'react';
import { Card, Button, ListGroup, Badge } from 'react-bootstrap';

const projetsMock = [
  {
    id: 1,
    titre: "Application RH",
    taches: [
      { id: 1, titre: "Créer formulaire congé", statut: "à faire" },
      { id: 2, titre: "Affichage liste absences", statut: "en cours" }
    ]
  },
  {
    id: 2,
    titre: "Refonte site web",
    taches: [
      { id: 3, titre: "Maquette page d'accueil", statut: "terminé" },
      { id: 4, titre: "Formulaire contact", statut: "à faire" },
      { id: 5, titre: "Ajout section témoignages", statut: "en cours" }
    ]
  },
  {
    id: 3,
    titre: "Portail Employé",
    taches: [
      { id: 6, titre: "Connexion avec JWT", statut: "en cours" },
      { id: 7, titre: "Tableau de bord RH", statut: "à faire" }
    ]
  },
  {
    id: 4,
    titre: "Automatisation des fiches de paie",
    taches: [
      { id: 8, titre: "Génération PDF", statut: "à faire" },
      { id: 9, titre: "Envoi email mensuel", statut: "à faire" }
    ]
  }
];

const ProjetTachesEmploye = () => {
  const [projets, setProjets] = useState(projetsMock);
  const [selectedProjet, setSelectedProjet] = useState(null);

  const changerStatut = (projetId, tacheId, nouveauStatut) => {
    const projetMisAJour = projets.map(p => {
      if (p.id === projetId) {
        return {
          ...p,
          taches: p.taches.map(t =>
            t.id === tacheId ? { ...t, statut: nouveauStatut } : t
          )
        };
      }
      return p;
    });
    setProjets(projetMisAJour);
    setSelectedProjet(projetMisAJour.find(p => p.id === projetId));
  };

  return (
    <div className="container mt-4">
      {!selectedProjet ? (
        <>
          <h4 className="mb-3 fw-semibold">📁 Projets attribués</h4>
          <ListGroup className="shadow-sm">
            {projets.map(p => (
              <ListGroup.Item
                key={p.id}
                action
                onClick={() => setSelectedProjet(p)}
                className="d-flex justify-content-between align-items-center"
              >
                <strong>{p.titre}</strong>
                <Badge pill bg="primary">{p.taches.length} tâches</Badge>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </>
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="fw-semibold">🧩 Tâches - {selectedProjet.titre}</h4>
            <Button variant="secondary" onClick={() => setSelectedProjet(null)}>⬅ Retour</Button>
          </div>
          <ListGroup className="shadow-sm">
            {selectedProjet.taches.map(t => (
              <ListGroup.Item
                key={t.id}
                className="d-flex justify-content-between align-items-center py-3"
              >
                <div>
                  <div className="fw-bold mb-1">{t.titre}</div>
                  <Badge bg={
                    t.statut === "terminé" ? "success" :
                    t.statut === "en cours" ? "warning text-dark" :
                    "secondary"
                  } className="text-capitalize">
                    {t.statut}
                  </Badge>
                </div>
                <div className="btn-group">
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => changerStatut(selectedProjet.id, t.id, "à faire")}
                  >
                    À faire
                  </Button>
                  <Button
                    variant="outline-warning"
                    size="sm"
                    onClick={() => changerStatut(selectedProjet.id, t.id, "en cours")}
                  >
                    En cours
                  </Button>
                  <Button
                    variant="outline-success"
                    size="sm"
                    onClick={() => changerStatut(selectedProjet.id, t.id, "terminé")}
                  >
                    Terminé
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </>
      )}
    </div>
  );
};

export default ProjetTachesEmploye;