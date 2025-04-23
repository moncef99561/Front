import React from 'react';
import { Card, Image } from 'react-bootstrap';

const ProfilEmployee = ({ employee }) => {
  if (!employee) return null;

  return (
    <Card className="shadow p-4">
      <div className="d-flex align-items-center mb-4">
        <Image
          src={employee.photo}
          roundedCircle
          width={80}
          height={80}
          className="me-3"
          style={{ border: '2px solid #ccc' }}
        />
        <div>
          <h5 className="mb-0">{employee.nom} {employee.prenom}</h5>
          <small className="text-muted">{employee.poste}</small>
        </div>
      </div>

      <p><strong>Email :</strong> {employee.email}</p>
      <p><strong>Téléphone :</strong> {employee.telephone}</p>
      <p><strong>Poste :</strong> {employee.poste}</p>
      <p><strong>Date d'embauche :</strong> {employee.dateEmbauche}</p>
      <p><strong>Département :</strong> {employee.departement}</p>
    </Card>
  );
};

export default ProfilEmployee;