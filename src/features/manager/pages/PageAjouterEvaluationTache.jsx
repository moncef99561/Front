import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function PageAjouterEvaluationTache() {
    const [titre, setTitre] = useState("");
    const [description, setDescription] = useState("");
    const [dateEvaluation, setDateEvaluation] = useState("");
    const [tacheId, setTacheId] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/evaluation/api/new', {
                titre,
                description,
                dateEvaluation,
                tacheId,
            });
            alert("Évaluation ajoutée avec succès");
            // Réinitialisation des champs
            setTitre("");
            setDescription("");
            setDateEvaluation("");
            setTacheId("");
            setError("");
        } catch (error) {
            setError("Erreur lors de l'ajout de l'évaluation. Veuillez vérifier les champs.");
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <div className="card shadow-sm p-4 rounded-4" style={{ width: '100%', maxWidth: '500px' }}>
                <h3 className="text-center fw-bold mb-4">Ajouter Évaluation de Tâche</h3>

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
                            placeholder="Titre"
                            value={titre}
                            onChange={(e) => setTitre(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Description</label>
                        <textarea
                            className="form-control rounded-3"
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        ></textarea>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Date d'Évaluation</label>
                        <input
                            type="date"
                            className="form-control rounded-3"
                            value={dateEvaluation}
                            onChange={(e) => setDateEvaluation(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="form-label">ID de Tâche</label>
                        <input
                            type="text"
                            className="form-control rounded-3"
                            placeholder="ID de Tâche"
                            value={tacheId}
                            onChange={(e) => setTacheId(e.target.value)}
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

export default PageAjouterEvaluationTache;
