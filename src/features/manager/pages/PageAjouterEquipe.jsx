import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function PageAjouterEquipe() {
    const [specialite, setSpecialite] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/equipe/api/new', { specialite });
            alert("Équipe ajoutée avec succès");
            setSpecialite("");
            setError("");
        } catch (error) {
            setError("Erreur lors de l'ajout de l'équipe. Veuillez réessayer.");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-body">
                            <h3 className="card-title mb-4 text-center">Ajouter Équipe</h3>
                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="specialite" className="form-label">Spécialité</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="specialite"
                                        placeholder="Spécialité"
                                        value={specialite}
                                        onChange={(e) => setSpecialite(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-100">
                                    Ajouter
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PageAjouterEquipe;
