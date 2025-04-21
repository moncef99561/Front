import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function PageAjouterManager() {
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [specialite, setSpecialite] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/Manager/new', {
                nom,
                prenom,
                specialite,
            });
            alert("Manager ajouté avec succès");
            setNom("");
            setPrenom("");
            setSpecialite("");
            setError("");
        } catch (error) {
            setError("Erreur lors de l'ajout du manager. Veuillez réessayer.");
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <div className="card shadow-sm p-4 rounded-4 w-100" style={{ maxWidth: '500px' }}>
                <h3 className="text-center fw-bold mb-4">Ajouter un Manager</h3>

                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Nom</label>
                        <input
                            type="text"
                            className="form-control rounded-3"
                            value={nom}
                            onChange={(e) => setNom(e.target.value)}
                            placeholder="Nom"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Prénom</label>
                        <input
                            type="text"
                            className="form-control rounded-3"
                            value={prenom}
                            onChange={(e) => setPrenom(e.target.value)}
                            placeholder="Prénom"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="form-label">Spécialité</label>
                        <input
                            type="text"
                            className="form-control rounded-3"
                            value={specialite}
                            onChange={(e) => setSpecialite(e.target.value)}
                            placeholder="Spécialité"
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

export default PageAjouterManager;
