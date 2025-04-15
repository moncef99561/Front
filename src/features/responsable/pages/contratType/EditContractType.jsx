import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const EditContractType = ({
    show,
    handleClose,
    handleSubmit,
    formData,
    handleInputChange,
    addTerm,
    removeTerm,
    handleTermChange
}) => {
    return (
        <Modal show={show} onHide={handleClose} centered size="lg">
            <Modal.Header closeButton className="bg-warning text-dark">
                <Modal.Title>Modifier le Type de Contrat</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Nom du contrat *</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name || ''}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Conditions du contrat *</Form.Label>
                        {formData.terms.map((term, index) => (
                            <div key={index} className="border p-3 mb-3">
                                <div className="d-flex gap-2 mb-2">
                                    <Form.Control
                                        type="text"
                                        placeholder="Clé"
                                        value={term.key || ''}
                                        onChange={(e) => handleTermChange(index, 'key', e.target.value)}
                                        required
                                    />
                                    <Form.Control
                                        type="text"
                                        placeholder="Valeur"
                                        value={term.value || ''}
                                        onChange={(e) => handleTermChange(index, 'value', e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="d-flex gap-2">
                                    <Form.Control
                                        type="date"
                                        value={term.startDate || ''}
                                        onChange={(e) => handleTermChange(index, 'startDate', e.target.value)}
                                        required
                                    />
                                    <Form.Control
                                        type="date"
                                        value={term.endDate || ''}
                                        onChange={(e) => handleTermChange(index, 'endDate', e.target.value)}
                                        required
                                    />
                                    <Button
                                        variant="outline-danger"
                                        onClick={() => removeTerm(index)}
                                        title="Supprimer cette condition"
                                    >
                                        ✕
                                    </Button>
                                </div>
                            </div>
                        ))}

                        <Button
                            variant="outline-primary"
                            onClick={addTerm}
                            className="w-100"
                        >
                            + Ajouter une Condition
                        </Button>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Annuler
                    </Button>
                    <Button variant="warning" type="submit">
                        Mettre à jour
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default EditContractType;