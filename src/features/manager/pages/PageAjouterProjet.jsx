import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const PageAjouterProjet = () => {
    const [nomProjet, setNomProjet] = useState('');
    const [description, setDescription] = useState('');
    const [employees, setEmployees] = useState([]);
    const [showEmployeeList, setShowEmployeeList] = useState(false);
    const [selectedEmployees, setSelectedEmployees] = useState([]);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/employee/recuperer');
                setEmployees(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des employés :', error);
            }
        };

        fetchEmployees();
    }, []);

    const toggleEmployeeList = () => {
        setShowEmployeeList(!showEmployeeList);
    };

    const handleEmployeeSelect = (employeeId) => {
        if (selectedEmployees.includes(employeeId)) {
            setSelectedEmployees(selectedEmployees.filter(id => id !== employeeId));
        } else {
            setSelectedEmployees([...selectedEmployees, employeeId]);
        }
    };

    const addEmployeesToProject = () => {
        console.log('Employés sélectionnés ajoutés au projet:', selectedEmployees);
        setSelectedEmployees([]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Nom du projet:', nomProjet);
        console.log('Description:', description);
        console.log('Employés sélectionnés:', selectedEmployees);

        setNomProjet('');
        setDescription('');
        setSelectedEmployees([]);
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <div className="card shadow p-4 rounded-4 w-100" style={{ maxWidth: '600px' }}>
                <h2 className="text-center fw-bold mb-4">Ajouter un Projet</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Nom du Projet</label>
                        <input
                            type="text"
                            className="form-control rounded-3"
                            value={nomProjet}
                            onChange={(e) => setNomProjet(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Description</label>
                        <textarea
                            className="form-control rounded-3"
                            rows="3"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="button"
                        className="btn btn-outline-secondary w-100 mb-3"
                        onClick={toggleEmployeeList}
                    >
                        {showEmployeeList ? 'Masquer la Liste des Employés' : 'Afficher la Liste des Employés'}
                    </button>

                    {showEmployeeList && (
                        <div className="mb-3">
                            <h5 className="mb-3">Liste des Employés</h5>
                            <ul className="list-group mb-3">
                                {employees.map((employee) => (
                                    <li key={employee.id} className="list-group-item d-flex align-items-center">
                                        <input
                                            type="checkbox"
                                            className="form-check-input me-2"
                                            checked={selectedEmployees.includes(employee.id)}
                                            onChange={() => handleEmployeeSelect(employee.id)}
                                        />
                                        {employee.nom} {employee.prenom}
                                    </li>
                                ))}
                            </ul>
                            <button
                                type="button"
                                className="btn btn-success w-100"
                                onClick={addEmployeesToProject}
                            >
                                Ajouter Employés au Projet
                            </button>
                        </div>
                    )}

                    <button type="submit" className="btn btn-primary w-100">
                        Ajouter Projet
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PageAjouterProjet;
