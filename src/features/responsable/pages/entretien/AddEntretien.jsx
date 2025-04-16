import React, { useState } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import api from '../../services/api';

const AddEntretien = ({ show, onClose, candidats, employees, onAdd }) => {
    const [formData, setFormData] = useState({
        candidatId: '',
        employeeId: '',
        dateHeure: new Date().toISOString().slice(0, 16),
        statut: 'Planifié',
        notes: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError('');
            const payload = {
                ...formData,
                candidatId: parseInt(formData.candidatId),
                employeeId: parseInt(formData.employeeId),
                dateHeure: new Date(formData.dateHeure).toISOString()
            };
            const response = await api.post('/interviews', payload);
            onAdd(response.data);
            onClose();
        } catch (err) {
            setError(err.response?.data?.message || 'Erreur technique');
        }
    };

    return (
        <Modal show={show} onHide={onClose} size="lg">
            <Modal.Header closeButton className="bg-primary text-white">
                <Modal.Title>Nouvel entretien</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form.Group className="mb-3">
                        <Form.Label>Candidat *</Form.Label>
                        <Form.Select name="candidatId" value={formData.candidatId} onChange={handleChange} required>
                            <option value="">Sélectionnez un candidat</option>
                            {candidats.map(c => (
                                <option key={c.candidatId} value={c.candidatId}>{c.prenom} {c.nom}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Jury *</Form.Label>
                        <Form.Select name="employeeId" value={formData.employeeId} onChange={handleChange} required>
                            <option value="">Sélectionnez un employé</option>
                            {employees.map(e => (
                                <option key={e.employeeId} value={e.employeeId}>{e.prenom} {e.nom}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Date et Heure *</Form.Label>
                        <Form.Control type="datetime-local" name="dateHeure" value={formData.dateHeure} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Statut *</Form.Label>
                        <Form.Select name="statut" value={formData.statut} onChange={handleChange} required>
                            <option value="Planifié">Planifié</option>
                            <option value="Terminé">Terminé</option>
                            <option value="Annulé">Annulé</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Notes</Form.Label>
                        <Form.Control as="textarea" name="notes" rows={3} value={formData.notes} onChange={handleChange} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onClose}>Annuler</Button>
                    <Button variant="primary" type="submit">Créer</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default AddEntretien;
