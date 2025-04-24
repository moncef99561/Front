// 📁 src/features/candidat/components/offers/Offers.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import OffersHeader from "./OffersHeader";
import OffersFilterPanel from "./OffersFilterPanel";
import OfferCard from "./OfferCard";
import OffersPagination from "./OffersPagination";
import OfferDetailsModal from "./OfferDetailsModal";
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
    <div className="container-fluid bg-light">
      <OffersHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="container py-5">
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
              <p>Chargement des offres d'emploi...</p>
            ) : error ? (
              <p className="text-danger">{error}</p>
            ) : (
              <>
                {currentOffers.map((job) => (
                  <OfferCard key={job.offerEmloiId} job={job} onSelect={setSelectedJob} />
                ))}
                <OffersPagination
                  totalPages={totalPages}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
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
