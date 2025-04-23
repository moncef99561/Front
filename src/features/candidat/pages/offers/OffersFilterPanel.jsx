// 📁 src/features/candidat/components/offers/OffersFilterPanel.jsx
import React from "react";
import { Filter } from "lucide-react";

export default function OffersFilterPanel({ selectedFilters, setSelectedFilters, jobTypes, jobCategories, experiences }) {
  return (
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
        <label className="form-check-label">Toutes</label>
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
        <label className="form-check-label">Tous niveaux</label>
      </div>
      {experiences.map((exp) => (
        <div className="form-check" key={exp}>
          <input className="form-check-input" type="checkbox" checked={selectedFilters.experience === exp} onChange={() => setSelectedFilters({ ...selectedFilters, experience: exp })} />
          <label className="form-check-label">{exp}</label>
        </div>
      ))}
    </div>
  );
}