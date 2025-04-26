import React from "react";
import { Filter } from "lucide-react";

export default function OffersFilterPanel({
  selectedFilters,
  setSelectedFilters,
  jobTypes,
  jobCategories,
  experiences
}) {
  const handleFilterClick = (category, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [category]: prev[category] === value ? "all" : value
    }));
  };

  const renderTags = (label, category, options) => (
    <div className="mb-3">
      <strong>{label}</strong>
      <div className="d-flex flex-wrap gap-2 mt-2">
        {options.map(option => (
          <button
            key={option}
            type="button"
            className={`btn btn-sm rounded-pill px-3 ${
              selectedFilters[category] === option ? "btn-primary text-white" : "btn-outline-primary"
            }`}
            onClick={() => handleFilterClick(category, option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded shadow-sm p-4">
      <h5 className="mb-4">
        <Filter size={20} className="me-2" />
        Filtres
      </h5>
      {renderTags("Type de contrat", "type", jobTypes)}
      {renderTags("Poste", "category", jobCategories)}
      {renderTags("Expérience", "experience", experiences)}
    </div>
  );
}
