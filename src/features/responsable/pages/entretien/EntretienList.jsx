import React, { useEffect, useState } from 'react';
import { Table, Button, Alert, Spinner } from 'react-bootstrap';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import api from '../../services/api';
import AddEntretien from './AddEntretien';
import EditEntretien from './EditEntretien';

const EntretienList = () => {
    const [interviews, setInterviews] = useState([]);
    const [candidats, setCandidats] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedInterview, setSelectedInterview] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [interviewsRes, candidatsRes, employeesRes] = await Promise.all([
                    api.get('/interviews'),
                    api.get('/candidats'),
                    api.get('/employees'),
                ]);
                setInterviews(interviewsRes.data);
                setCandidats(candidatsRes.data);
                setEmployees(employeesRes.data);
            } catch (error) {
                setError('Erreur de chargement : ' + (error.response?.status || 'inconnue'));
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Supprimer définitivement cet entretien ?')) {
            try {
                await api.delete(`/interviews/${id}`);
                setInterviews(prev => prev.filter(i => i.interviewId !== id));
            } catch (error) {
                setError('Erreur suppression : ' + (error.response?.data || error.message));
            }
        }
    };

    if (loading) {
        return <div className="text-center mt-4"><Spinner animation="border" /><p>Chargement...</p></div>;
    }

    return (
        <div className="container mt-4">
            {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}

            <Button onClick={() => setShowAddModal(true)} className="mb-3">
                <FaPlus className="me-2" /> Ajouter Entretien
            </Button>

            <Table striped bordered hover responsive>
                <thead className="bg-primary text-white">
                    <tr>
                        <th>Candidat</th>
                        <th>Jury</th>
                        <th>Date/Heure</th>
                        <th>Statut</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {interviews.length === 0 ? (
                        <tr><td colSpan="5" className="text-center">Aucun entretien trouvé</td></tr>
                    ) : (
                        interviews.map(interview => {
                            const candidat = candidats.find(c => c.candidatId === interview.candidatId);
                            const employee = employees.find(e => e.employeeId === interview.employeeId);

                            return (
                                <tr key={interview.interviewId}>
                                    <td>{candidat ? `${candidat.prenom} ${candidat.nom}` : 'Candidat inconnu'}</td>
                                    <td>{employee ? `${employee.prenom} ${employee.nom}` : 'Employé inconnu'}</td>
                                    <td>{new Date(interview.dateHeure).toLocaleString()}</td>
                                    <td>
                                        <span className={`badge ${
                                            interview.statut === 'Planifié' ? 'bg-warning' :
                                            interview.statut === 'Terminé' ? 'bg-success' : 'bg-danger'
                                        }`}>{interview.statut}</span>
                                    </td>
                                    <td>
                                        <Button variant="warning" className="me-2" onClick={() => {
                                            setSelectedInterview(interview);
                                            setShowEditModal(true);
                                        }}>
                                            <FaEdit />
                                        </Button>
                                        <Button variant="danger" onClick={() => handleDelete(interview.interviewId)}>
                                            <FaTrash />
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })
                    )}
                </tbody>
            </Table>

            {showAddModal && (
                <AddEntretien
                    show={showAddModal}
                    onClose={() => setShowAddModal(false)}
                    candidats={candidats}
                    employees={employees}
                    onAdd={(newInterview) => setInterviews(prev => [...prev, newInterview])}
                />
            )}

            {showEditModal && selectedInterview && (
                <EditEntretien
                    show={showEditModal}
                    onClose={() => {
                        setShowEditModal(false);
                        setSelectedInterview(null);
                    }}
                    interview={selectedInterview}
                    candidats={candidats}
                    employees={employees}
                    onUpdate={(updated) => {
                        setInterviews(prev => prev.map(i => i.interviewId === updated.interviewId ? updated : i));
                    }}
                />
            )}
        </div>
    );
};

export default EntretienList;
