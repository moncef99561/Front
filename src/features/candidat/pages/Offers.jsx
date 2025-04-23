import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MapPin, Filter, Briefcase, Clock } from "lucide-react";
import { Modal, Button } from "react-bootstrap";

export default function Offers() {
  const navigate = useNavigate();
  const [jobOffers, setJobOffers] = useState([]);
  const [filteredOffers, setFilteredOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const offersPerPage = 5;

  const [selectedFilters, setSelectedFilters] = useState({
    type: "all",
    category: "all",
    experience: "all",
  });

  const jobTypes = ["Temps plein", "Temps partiel", "Freelance", "Stage"];
  const jobCategories = ["Développement", "Design", "Marketing", "Ventes", "RH"];
  const experiences = ["Débutant", "1-3 ans", "3-5 ans", "5-10 ans"];

  useEffect(() => {
    axios.get("http://localhost:5272/api/OffreEmploi")
      .then((response) => {
        setJobOffers(response.data);
        setFilteredOffers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des offres d'emploi:", error);
        setError("Échec de la récupération des offres d'emploi.");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let filtered = jobOffers;

    if (selectedFilters.type !== "all") {
      filtered = filtered.filter((job) => job.typeContrat === selectedFilters.type);
    }

    if (selectedFilters.category !== "all") {
      filtered = filtered.filter((job) => job.categorieTravail === selectedFilters.category);
    }

    if (selectedFilters.experience !== "all") {
      filtered = filtered.filter((job) => job.experience === selectedFilters.experience);
    }

    setFilteredOffers(filtered);
    setCurrentPage(1);
  }, [selectedFilters, jobOffers]);

  const indexOfLastOffer = currentPage * offersPerPage;
  const indexOfFirstOffer = indexOfLastOffer - offersPerPage;
  const currentOffers = filteredOffers.slice(indexOfFirstOffer, indexOfLastOffer);
  const totalPages = Math.ceil(filteredOffers.length / offersPerPage);

  return (
    <div className="container-fluid bg-light">
      <div className="bg-primary text-white py-5 text-center">
        <div className="container">
          <h1 className="fw-bold">Trouvez votre emploi de rêve</h1>
          <p className="lead">Des milliers d'opportunités vous attendent</p>
          <div className="row justify-content-center mt-4">
            <div className="col-md-10">
              <div className="bg-white rounded shadow-sm mb-4 p-2 d-flex">
                <input type="text" className="form-control border-0" placeholder="Titre de l'emploi ou mot-clé" />
                <button className="btn btn-primary px-4">Rechercher</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5">
        <div className="row">
          <div className="col-lg-3">
            <div className="bg-white rounded shadow-sm p-4">
              <h5><Filter size={20} className="me-2" />Filtres</h5>

              <h6 className="mt-3">Type d'emploi</h6>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" checked={selectedFilters.type === "all"} onChange={() => setSelectedFilters({ ...selectedFilters, type: "all" })} />
                <label className="form-check-label">Tous</label>
              </div>
              {jobTypes.map((type) => (
                <div className="form-check" key={type}>
                  <input className="form-check-input" type="checkbox" checked={selectedFilters.type === type} onChange={() => setSelectedFilters({ ...selectedFilters, type })} />
                  <label className="form-check-label">{type}</label>
                </div>
              ))}

              <h6 className="mt-3">Catégorie</h6>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" checked={selectedFilters.category === "all"} onChange={() => setSelectedFilters({ ...selectedFilters, category: "all" })} />
                <label className="form-check-label">Tous</label>
              </div>
              {jobCategories.map((category) => (
                <div className="form-check" key={category}>
                  <input className="form-check-input" type="checkbox" checked={selectedFilters.category === category} onChange={() => setSelectedFilters({ ...selectedFilters, category })} />
                  <label className="form-check-label">{category}</label>
                </div>
              ))}

              <h6 className="mt-3">Expérience</h6>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" checked={selectedFilters.experience === "all"} onChange={() => setSelectedFilters({ ...selectedFilters, experience: "all" })} />
                <label className="form-check-label">Tous</label>
              </div>
              {experiences.map((exp) => (
                <div className="form-check" key={exp}>
                  <input className="form-check-input" type="checkbox" checked={selectedFilters.experience === exp} onChange={() => setSelectedFilters({ ...selectedFilters, experience: exp })} />
                  <label className="form-check-label">{exp}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="col-lg-9">
            {loading ? (
              <p>Chargement des offres d'emploi...</p>
            ) : error ? (
              <p className="text-danger">{error}</p>
            ) : (
              <>
                {currentOffers.map((job) => (
                  <div key={job.id} className="bg-white rounded shadow-sm p-4 mb-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex">
                        <div className="bg-light rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: 50, height: 50 }}>
                          <Briefcase size={24} />
                        </div>
                        <div>
                          <h6 className="mb-1">{job.titre}</h6>
                          <span className="text-muted"><MapPin size={16} className="me-1" /> {job.lieu}</span>
                          <span className="text-muted ms-3"><Clock size={16} className="me-1" /> {job.dateCreation}</span>
                          <p className="text-muted mt-2">{job.description.substring(0, 100)}...</p>
                        </div>
                      </div>
                      <button
                        className="btn btn-primary btn-sm px-4 py-2 align-self-center"
                        onClick={() => setSelectedJob(job)}
                      >
                        Plus
                      </button>
                    </div>
                  </div>
                ))}

                <nav className="mt-4">
                  <ul className="pagination justify-content-center">
                    {[...Array(totalPages)].map((_, index) => (
                      <li key={index} className={`page-item ${index + 1 === currentPage ? "active" : ""}`}>
                        <button className="page-link" onClick={() => setCurrentPage(index + 1)}>
                          {index + 1}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ✅ MODALE AVEC REACT-BOOTSTRAP */}
      <Modal show={!!selectedJob} onHide={() => setSelectedJob(null)} centered size="lg">
        {selectedJob && (
          <>
            <React.Fragment key={selectedJob.offreEmploiId}></React.Fragment>
            <Modal.Header closeButton>
              <Modal.Title>{selectedJob.titre}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p><strong>Id :</strong> {selectedJob.offreEmploiId}</p>
              <p><strong>Description :</strong> {selectedJob.description}</p>
              <p><strong>Lieu :</strong> {selectedJob.lieu}</p>
              <p><strong>Date de publication :</strong> {selectedJob.dateCreation}</p>
              <p><strong>Type de contrat :</strong> {selectedJob.typeContrat}</p>
              <p><strong>Catégorie :</strong> {selectedJob.categorieTravail}</p>
              <p><strong>Niveau d'expérience :</strong> {selectedJob.experience}</p>
              <p><strong>Exigences :</strong> {selectedJob.exigences}</p>
              <p><strong>Salaire :</strong> {selectedJob.salaire}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setSelectedJob(null)}>Fermer</Button>
              <Button
                variant="success"
                onClick={() => {
                  setSelectedJob(null);
                  setTimeout(() => {
                    navigate(`/candidature/${selectedJob.offreEmploiId}`);
                  }, 200);
                }}
              >
                Postuler
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  );
}
