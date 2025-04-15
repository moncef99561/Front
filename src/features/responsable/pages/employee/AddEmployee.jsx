// AddEmployee.jsx
import React from 'react';
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
  return (
    <Modal show={show} onHide={handleClose} size="lg" centered backdrop="static">
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title>{currentEmployee ? 'Éditer' : 'Ajouter'} un Employé</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit} className="p-3">
        <Modal.Body>
          <Tabs defaultActiveKey="identite" id="employee-tabs" className="mb-3">
            <Tab eventKey="identite" title="Identité">
              <Row className="gy-2">
                <Col md={6}>
                  <Form.Group className="mb-2">
                    <Form.Label>CIN *</Form.Label>
                    <Form.Control
                      name="cin"
                      value={formData.cin}
                      onChange={(e) => setFormData({ ...formData, cin: e.target.value })}
                      required
                      placeholder="Ex: BK123456"
                    />
                  </Form.Group>

                  <Form.Group className="mb-2">
                    <Form.Label>Nom *</Form.Label>
                    <Form.Control
                      name="nom"
                      value={formData.nom}
                      onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                      required
                      placeholder="Nom de famille"
                    />
                  </Form.Group>

                  <Form.Group className="mb-2">
                    <Form.Label>Date de Naissance *</Form.Label>
                    <Form.Control
                      type="date"
                      name="dateNaissance"
                      value={formData.dateNaissance}
                      onChange={(e) => setFormData({ ...formData, dateNaissance: e.target.value })}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-2">
                    <Form.Label>Téléphone</Form.Label>
                    <Form.Control
                      name="telephone"
                      value={formData.telephone}
                      onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                      placeholder="06XXXXXXXX"
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-2">
                    <Form.Label>Prénom *</Form.Label>
                    <Form.Control
                      name="prenom"
                      value={formData.prenom}
                      onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                      required
                      placeholder="Prénom de l'employé"
                    />
                  </Form.Group>

                  <Form.Group className="mb-2">
                    <Form.Label>Email *</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      placeholder="exemple@email.com"
                    />
                  </Form.Group>

                  <Form.Group className="mb-2">
                    <Form.Label>Adresse</Form.Label>
                    <Form.Control
                      name="adresse"
                      value={formData.adresse}
                      onChange={(e) => setFormData({ ...formData, adresse: e.target.value })}
                      placeholder="Adresse complète"
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
                  value={formData.rib}
                  onChange={(e) => setFormData({ ...formData, rib: e.target.value })}
                  placeholder="Numéro RIB"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Banque</Form.Label>
                <Form.Control
                  name="banque"
                  value={formData.banque}
                  onChange={(e) => setFormData({ ...formData, banque: e.target.value })}
                  placeholder="Nom de la banque"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>CNSS</Form.Label>
                <Form.Control
                  name="cnss"
                  value={formData.cnss}
                  onChange={(e) => setFormData({ ...formData, cnss: e.target.value })}
                  placeholder="Numéro CNSS"
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
