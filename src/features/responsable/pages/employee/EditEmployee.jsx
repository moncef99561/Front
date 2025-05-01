import React, { useEffect, useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import api from '../../services/api';

const EditEmployee = ({ 
  show, 
  handleClose, 
  handleSubmit, 
  formData, 
  setFormData,
  currentEmployee
}) => {
  const [departments, setDepartments] = useState([]);
  const [services, setServices] = useState([]);
  const [postes, setPostes] = useState([]);
  const [minDateNaissance, setMinDateNaissance] = useState("");

  useEffect(() => {
  const fetchData = async () => {
    try {
      const deptRes = await api.get('/departments');
      setDepartments(deptRes.data);

      if (formData.departmentId) {
        const servRes = await api.get(`/services?departmentId=${formData.departmentId}`);
        setServices(servRes.data);

        if (!servRes.data.some(s => s.serviceId === formData.serviceId)) {
          setFormData(prev => ({ ...prev, serviceId: '' }));
        }

        if (formData.serviceId) {
          const postRes = await api.get(`/postes?serviceId=${formData.serviceId}`);
          setPostes(postRes.data);

          if (!postRes.data.some(p => p.posteId === formData.posteId)) {
            setFormData(prev => ({ ...prev, posteId: '' }));
          }
        } else {
          setPostes([]);
        }
      } else {
        setServices([]);
        setPostes([]);
      }
    } catch (err) {
      console.error('Erreur lors du chargement des données:', err);
    }
  };

  if (show) fetchData();
}, [show]);

  const handleDepartmentChange = async (departmentId) => {
    try {
      const res = await api.get(`/services?departmentId=${departmentId}`);
      setServices(res.data);
      setFormData(prev => ({ ...prev, departmentId, serviceId: '', posteId: '' }));
    } catch (err) {
      console.error("Erreur services:", err);
    }
  };

  const handleServiceChange = async (serviceId) => {
    try {
      const res = await api.get(`/postes?serviceId=${serviceId}`);
      setPostes(res.data);
      setFormData(prev => ({ ...prev, serviceId, posteId: '' }));
    } catch (err) {
      console.error("Erreur postes:", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateAge = () => {
    const birthDate = new Date(formData.dateNaissance);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (validateAge() < 18) {
      alert("L'employé doit avoir au moins 18 ans.");
      return;
    }
    handleSubmit(e);
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title>Modifier Employé</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label>CIN *</Form.Label>
                <Form.Control
                  type="text"
                  name="cin"
                  pattern="^[A-Z]{1,2}[0-9]{1,}$"
                  title="Doit commencer par 1 ou 2 lettres suivies d'au moins 1 chiffre"
                  value={formData.cin || ''}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Nom *</Form.Label>
                <Form.Control
                  type="text"
                  name="nom"
                  pattern="^[A-Za-zÀ-ÿ\s\-']+$"
                  title="Lettres uniquement"
                  value={formData.nom || ''}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Prénom *</Form.Label>
                <Form.Control
                  type="text"
                  name="prenom"
                  pattern="^[A-Za-zÀ-ÿ\s\-']+$"
                  title="Lettres uniquement"
                  value={formData.prenom || ''}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Date de Naissance *</Form.Label>
                <Form.Control
                  type="date"
                  name="dateNaissance"
                  max={minDateNaissance}
                  value={formData.dateNaissance || ''}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email *</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                  title="Email valide requis"
                  value={formData.email || ''}
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
                  pattern="^(06|07)[0-9]{8}$"
                  title="Format marocain valide: 06XXXXXXXX"
                  value={formData.telephone || ''}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Adresse</Form.Label>
                <Form.Control
                  type="text"
                  name="adresse"
                  value={formData.adresse || ''}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Date Embauche *</Form.Label>
                <Form.Control
                  type="date"
                  name="dateEmbauche"
                  value={formData.dateEmbauche || ''}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>RIB</Form.Label>
                <Form.Control
                  type="text"
                  name="rib"
                  pattern="^[0-9]{24}$"
                  title="RIB composé de 24 chiffres"
                  value={formData.rib || ''}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Banque</Form.Label>
                <Form.Control
                  type="text"
                  name="banque"
                  value={formData.banque || ''}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>CNSS</Form.Label>
                <Form.Control
                  type="text"
                  name="cnss"
                  pattern="^[0-9]{8,10}$"
                  title="Numéro CNSS valide (8 à 10 chiffres)"
                  value={formData.cnss || ''}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Département</Form.Label>
                <Form.Select onChange={(e) => handleDepartmentChange(e.target.value)} value={formData.departmentId || ''}>
                  <option value="">Sélectionnez un département</option>
                  {departments.map((d) => (
                    <option key={d.departmentId} value={d.departmentId}>{d.name}</option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Service</Form.Label>
                <Form.Select onChange={(e) => handleServiceChange(e.target.value)} value={formData.serviceId || ''} disabled={!services.length}>
                  <option value="">Sélectionnez un service</option>
                  {services.map((s) => (
                    <option key={s.serviceId} value={s.serviceId}>{s.name}</option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Poste</Form.Label>
                <Form.Select name="posteId" onChange={handleInputChange} value={formData.posteId || ''} disabled={!postes.length}>
                  <option value="">Sélectionnez un poste</option>
                  {postes.map((p) => (
                    <option key={p.posteId} value={p.posteId}>{p.title}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Annuler</Button>
          <Button variant="primary" type="submit">Mettre à jour</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditEmployee;