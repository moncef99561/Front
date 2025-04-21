import React, { useEffect, useState } from "react";
import { getAllAbsences } from "../services/api2";
import { Table, Alert } from "react-bootstrap";


const ListAbsence = () => {
  const [absences, setAbsences] = useState([]);
  const [error, setError] = useState("");

  const fetchAbsences = async () => {
    try {
      const response = await getAllAbsences();
      setAbsences(response.data);
    } catch (err) {
      setError("Erreur lors du chargement des absences.");
      setTimeout(() => setError(""), 3000);
    }
  };

  useEffect(() => {
    fetchAbsences();
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-5 ">Liste des Absences</h1>

      {error && <Alert variant="danger">{error}</Alert>}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nom Employé</th>
            <th>Date</th>
            <th>Raison</th>
            <th>Justificatif</th>
          </tr>
        </thead>
        <tbody>
          {absences.map((absence) => (
            <tr key={absence.id}>
              <td>{absence.nomEmploye}</td>
              <td>{absence.dateAbsence?.split("T")[0]}</td>
              <td>{absence.raison}</td>
              <td>
                {absence.justificatifPath ? (
                  <a
                  href={`http://localhost:5148/${absence.justificatifPath}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-info btn-sm"
                >
                  Voir
                </a>
                ) : (
                  "Non fourni"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ListAbsence;
