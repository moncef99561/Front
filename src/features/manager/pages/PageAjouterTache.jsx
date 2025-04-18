import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function PageAjouterTache() {
    const [titre, setTitre] = useState("");
    const [description, setDescription] = useState("");
    const [dateD, setDateD] = useState("");
    const [dateF, setDateF] = useState("");
    const [etat, setEtat] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/tache/api/taches', {
                titre,
                description,
                dateDebut: dateD,
                dateFin: dateF,
                etat,
            });
            alert("Tâche ajoutée avec succès");
            // Réinitialiser les champs
            setTitre("");
            setDescription("");
            setDateD("");
            setDateF("");
            setEtat("");
            setError("");
        } catch (error) {
            setError("Erreur lors de l'ajout de la tâche. Veuillez réessayer.");
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <div className="card shadow-sm p-4 rounded-4 w-100" style={{ maxWidth: '600px' }}>
                <h3 className="text-center fw-bold mb-4">Ajouter Tâche</h3>

                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Titre</label>
                        <input
                            type="text"
                            className="form-control rounded-3"
                            value={titre}
                            onChange={(e) => setTitre(e.target.value)}
                            placeholder="Titre"
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
                            placeholder="Description"
                            required
                        ></textarea>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Date de début</label>
                        <input
                            type="date"
                            className="form-control rounded-3"
                            value={dateD}
                            onChange={(e) => setDateD(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Date de fin</label>
                        <input
                            type="date"
                            className="form-control rounded-3"
                            value={dateF}
                            onChange={(e) => setDateF(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="form-label">État</label>
                        <input
                            type="text"
                            className="form-control rounded-3"
                            value={etat}
                            onChange={(e) => setEtat(e.target.value)}
                            placeholder="État"
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-100 rounded-3">
                        Ajouter
                    </button>
                </form>
            </div>
        </div>
    );
}

export default PageAjouterTache;
