import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import api from '../../services/api';

const EditEmployee = ({ show, handleClose, handleSubmit, formData, handleInputChange, setFormData,}) => {
  const [departments, setDepartments] = useState([]);
  const [services, setServices] = useState([]);
  const [postes, setPostes] = useState([]);

  useEffect(() => {
    api.get('/departments').then(res => setDepartments(res.data));
}, []);

const handleDepartmentChange = async (departmentId) => {
  try {
    const res = await api.get(`/services?departmentId=${departmentId}`);
    setServices(res.data);
    setPostes([]);
    setFormData(prev => ({
      ...prev,
      departmentId: departmentId,
      serviceId: '',
      posteId: ''
    }));
  } catch (error) {
    console.error("Erreur de chargement des services:", error);
  }
};

const handleServiceChange = async (serviceId) => {
  try {
    const res = await api.get(`/postes?serviceId=${serviceId}`);
    setPostes(res.data);
    setFormData(prev => ({
      ...prev,
      serviceId: serviceId,
      posteId: ''
    }));
  } catch (error) {
    console.error("Erreur de chargement des postes:", error);
  }
};

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title>Modifier Employé</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label>CIN *</Form.Label>
                <Form.Control
                  type="text"
                  name="cin"
                  value={formData.cin}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Nom *</Form.Label>
                <Form.Control
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Prénom *</Form.Label>
                <Form.Control
                  type="text"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Date de Naissance *</Form.Label>
                <Form.Control
                  type="date"
                  name="dateNaissance"
                  value={formData.dateNaissance}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email *</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </div>

            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label>Téléphone</Form.Label>
                <Form.Control
                  type="text"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Adresse</Form.Label>
                <Form.Control
                  type="text"
                  name="adresse"
                  value={formData.adresse}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Date Embauche *</Form.Label>
                <Form.Control
                  type="date"
                  name="dateEmbauche"
                  value={formData.dateEmbauche}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>RIB</Form.Label>
                <Form.Control
                  type="text"
                  name="rib"
                  value={formData.rib}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Banque</Form.Label>
                <Form.Control
                  type="text"
                  name="banque"
                  value={formData.banque}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>CNSS</Form.Label>
                <Form.Control
                  type="text"
                  name="cnss"
                  value={formData.cnss}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
    <Form.Label>Département</Form.Label>
    <Form.Select 
        onChange={(e) => handleDepartmentChange(e.target.value)}
        value={formData.departmentId || ''}
    >
        <option value="">Sélectionnez un département</option>
        {departments.map(dept => (
            <option key={dept.departmentId} value={dept.departmentId}>
                {dept.name}
            </option>
        ))}
    </Form.Select>
</Form.Group>

<Form.Group className="mb-3">
    <Form.Label>Service</Form.Label>
    <Form.Select
        onChange={(e) => handleServiceChange(e.target.value)}
        value={formData.serviceId || ''}
    >
        <option value="">Sélectionnez un service</option>
        {services.map(service => (
            <option key={service.serviceId} value={service.serviceId}>
                {service.name}
            </option>
        ))}
    </Form.Select>
</Form.Group>

<Form.Group className="mb-3">
    <Form.Label>Poste</Form.Label>
    <Form.Select
        name="posteId"
        value={formData.posteId || ''}
        onChange={handleInputChange}
    >
        <option value="">Sélectionnez un poste</option>
        {postes.map(poste => (
            <option key={poste.posteId} value={poste.posteId}>
                {poste.title}
            </option>
        ))}
    </Form.Select>
</Form.Group>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Annuler
          </Button>
          <Button variant="primary" type="submit">
            Sauvegarder
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditEmployee;