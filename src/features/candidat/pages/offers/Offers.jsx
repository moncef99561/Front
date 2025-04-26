import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import OffersHeader from "./OffersHeader";
import OffersFilterPanel from "./OffersFilterPanel";
import OfferCard from "./OfferCard";
import OffersPagination from "./OffersPagination";
import OfferDetailsModal from "./OfferDetailsModal";
import { ImSad  } from "react-icons/im";

import "bootstrap/dist/css/bootstrap.min.css";

export default function Offers() {
  const navigate = useNavigate();
  const [jobOffers, setJobOffers] = useState([]);
  const [filteredOffers, setFilteredOffers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
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

  const jobTypes = ["CDI", "CDD", "Freelance", "Stage"];
  const jobCategories = ["Développement", "Design", "Marketing", "Ventes", "RH"];
  const experiences = ["Débutant", "1-3 ans", "3-5 ans", "5-10 ans"];

  useEffect(() => {
    axios.get("http://localhost:5272/api/OffreEmploi")
      .then((response) => {
        setJobOffers(response.data);
        setFilteredOffers(response.data);
        setLoading(false);
      })
      .catch(() => {
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

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((job) =>
        job.titre.toLowerCase().includes(searchTerm.trim().toLowerCase())
      );
    }

    setFilteredOffers(filtered);
    setCurrentPage(1);
  }, [selectedFilters, jobOffers, searchTerm]);

  const indexOfLastOffer = currentPage * offersPerPage;
  const indexOfFirstOffer = indexOfLastOffer - offersPerPage;
  const currentOffers = filteredOffers.slice(indexOfFirstOffer, indexOfLastOffer);
  const totalPages = Math.ceil(filteredOffers.length / offersPerPage);

  return (
    <div className="container-fluid bg-white">
      <OffersHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="container py-3">
        <div className="row">
          <div className="col-lg-3">
            <OffersFilterPanel
              selectedFilters={selectedFilters}
              setSelectedFilters={setSelectedFilters}
              jobTypes={jobTypes}
              jobCategories={jobCategories}
              experiences={experiences}
            />
          </div>
          <div className="col-lg-9">
            {loading ? (
              <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "300px" }}>
                <div className="spinner-border text-primary" role="status" style={{ width: "4rem", height: "4rem" }}>
                  <span className="visually-hidden">Chargement...</span>
                </div>
              </div>
            ) : error ? (
              <p className="text-danger">{error}</p>
            ) : (
              <>
                {currentOffers.length === 0 ? (
                  <div className="text-center py-5">
                    <ImSad  size={50} className="text-muted mb-3" />
                    <h5 className="text-muted">
                      <p className="h5">Aucune offre trouvée.</p>
                      <p className="h5">Essayez d'élargir vos filtres ou revenez plus tard.</p>
                    </h5>
                  </div>
                ) : (
                  <>
                    {currentOffers.map((job) => (
                      <OfferCard key={job.offreEmploiId} job={job} onSelect={setSelectedJob} />
                    ))}
                    <OffersPagination
                      totalPages={totalPages}
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                    />
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <OfferDetailsModal
        job={selectedJob}
        onClose={() => setSelectedJob(null)}
        onApply={(offerEmloiId) => {
          setSelectedJob(null);
          setTimeout(() => navigate(`/candidature/${offerEmloiId}`), 200);
        }}
      />
    </div>
  );
}
