import React, { useState, useEffect } from 'react';
import { Modal, Form, Alert, Button } from 'react-bootstrap';
import api from '../../services/api';

const AccountModal = ({ employeeId, show, handleClose }) => {
  const [account, setAccount] = useState(null);
  const [accountForm, setAccountForm] = useState({ login: '', password: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const response = await api.get(`/employees/${employeeId}/account`);
        setAccount(response.data);
      } catch (err) {
        setAccount(null);
      }
    };
    if (show) fetchAccount();
  }, [employeeId, show]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/employees/${employeeId}/account`, accountForm);
      handleClose();
    } catch (err) {
      setError(err.response?.data || 'Erreur de sauvegarde');
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Gestion du Compte</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          {account ? (
            <div>
              <p><strong>Login:</strong> {account.login}</p>
              <p>Mot de passe crypté</p>
            </div>
          ) : (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Login</Form.Label>
                <Form.Control
                  type="text"
                  required
                  value={accountForm.login}
                  onChange={(e) => setAccountForm({...accountForm, login: e.target.value})}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Mot de passe</Form.Label>
                <Form.Control
                  type="password"
                  required
                  value={accountForm.password}
                  onChange={(e) => setAccountForm({...accountForm, password: e.target.value})}
                />
              </Form.Group>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Annuler
          </Button>
          {!account && (
            <Button variant="primary" type="submit">
              Sauvegarder
            </Button>
          )}
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AccountModal;