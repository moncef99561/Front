import React, { useEffect, useState } from 'react';
import { Form, Button, Modal, Tabs, Tab, Row, Col } from 'react-bootstrap';

const AddEmployee = ({
  show,
  handleClose,
  handleSubmit,
  formData,
  setFormData,
  departments,
  services,
  postes,
  handleDepartmentChange,
  handleServiceChange,
  currentEmployee
}) => {
  const [minDateNaissance, setMinDateNaissance] = useState("");

  useEffect(() => {
    const today = new Date();
    today.setFullYear(today.getFullYear() - 18);
    setMinDateNaissance(today.toISOString().split('T')[0]);
  }, []);

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
    <Modal show={show} onHide={handleClose} size="lg" centered backdrop="static">
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title>{currentEmployee ? 'Éditer' : 'Ajouter'} un Employé</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit} className="p-3">
        <Modal.Body>
          <Tabs defaultActiveKey="identite" id="employee-tabs" className="mb-3">
            <Tab eventKey="identite" title="Identité">
              <Row className="gy-2">
                <Col md={6}>
                  <Form.Group className="mb-2">
                    <Form.Label>CIN *</Form.Label>
                    <Form.Control
                      name="cin"
                      pattern="^[A-Z]{1,2}[0-9]{1,}$"
                      title="Doit commencer par 1 ou 2 lettres suivies d'au moins 1 chiffre"
                      value={formData.cin}
                      onChange={(e) => setFormData({ ...formData, cin: e.target.value })}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-2">
                    <Form.Label>Nom *</Form.Label>
                    <Form.Control
                      name="nom"
                      pattern="^[A-Za-zÀ-ÿ\s\-']+$"
                      title="Le nom ne doit contenir que des lettres"
                      value={formData.nom}
                      onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-2">
                    <Form.Label>Date de Naissance *</Form.Label>
                    <Form.Control
                      type="date"
                      name="dateNaissance"
                      max={minDateNaissance}
                      value={formData.dateNaissance}
                      onChange={(e) => setFormData({ ...formData, dateNaissance: e.target.value })}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-2">
                    <Form.Label>Téléphone</Form.Label>
                    <Form.Control
                      name="telephone"
                      pattern="^(06|07)[0-9]{8}$"
                      title="Format valide: 06XXXXXXXX"
                      value={formData.telephone}
                      onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-2">
                    <Form.Label>Prénom *</Form.Label>
                    <Form.Control
                      name="prenom"
                      pattern="^[A-Za-zÀ-ÿ\s\-']+$"
                      title="Le prénom ne doit contenir que des lettres"
                      value={formData.prenom}
                      onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-2">
                    <Form.Label>Email *</Form.Label>
                    <Form.Control
                      type="email"
                      pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                      title="Email valide requis"
                      name="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-2">
                    <Form.Label>Adresse</Form.Label>
                    <Form.Control
                      name="adresse"
                      value={formData.adresse}
                      onChange={(e) => setFormData({ ...formData, adresse: e.target.value })}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Tab>

            <Tab eventKey="banque" title="Banque & CNSS">
              <Form.Group className="mb-3">
                <Form.Label>RIB</Form.Label>
                <Form.Control
                  name="rib"
                  pattern="^[0-9]{24}$"
                  title="RIB composé de 24 chiffres"
                  value={formData.rib}
                  onChange={(e) => setFormData({ ...formData, rib: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Banque</Form.Label>
                <Form.Control
                  name="banque"
                  value={formData.banque}
                  onChange={(e) => setFormData({ ...formData, banque: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>CNSS</Form.Label>
                <Form.Control
                  name="cnss"
                  pattern="^[0-9]{8,10}$"
                  title="Numéro CNSS valide (8 à 10 chiffres)"
                  value={formData.cnss}
                  onChange={(e) => setFormData({ ...formData, cnss: e.target.value })}
                />
              </Form.Group>
            </Tab>

            <Tab eventKey="emploi" title="Emploi">
              <Form.Group className="mb-2">
                <Form.Label>Date d'Embauche *</Form.Label>
                <Form.Control
                  type="date"
                  name="dateEmbauche"
                  value={formData.dateEmbauche}
                  onChange={(e) => setFormData({ ...formData, dateEmbauche: e.target.value })}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Département</Form.Label>
                <Form.Select
                  onChange={(e) => handleDepartmentChange(e.target.value)}
                  value={formData.departmentId}
                  required
                >
                  <option value="">Sélectionnez un département</option>
                  {departments.map(d => (
                    <option key={d.departmentId} value={d.departmentId}>{d.name}</option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Service</Form.Label>
                <Form.Select
                  onChange={(e) => handleServiceChange(e.target.value)}
                  value={formData.serviceId}
                  disabled={!services.length}
                  required
                >
                  <option value="">Sélectionnez un service</option>
                  {services.map(s => (
                    <option key={s.serviceId} value={s.serviceId}>{s.name}</option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Poste</Form.Label>
                <Form.Select
                  name="posteId"
                  value={formData.posteId}
                  onChange={(e) => setFormData({ ...formData, posteId: e.target.value })}
                  disabled={!postes.length}
                  required
                >
                  <option value="">Sélectionnez un poste</option>
                  {postes.map(p => (
                    <option key={p.posteId} value={p.posteId}>{p.title}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Tab>
          </Tabs>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Annuler</Button>
          <Button variant="primary" type="submit">Sauvegarder</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddEmployee;
