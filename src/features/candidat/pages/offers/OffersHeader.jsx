// 📁 src/features/candidat/components/offers/OffersHeader.jsx
import React from "react";

export default function OffersHeader({ searchTerm, setSearchTerm }) {
    return (
      <div className="bg-white text-primary py-5 text-center">
        <div className="container">
          <h1 className="fw-bold">Trouvez votre emploi de rêve</h1>
          <p className="fs-6 fw-bolder">Plusieurs opportunités vous attendent</p>
          <div className="row justify-content-center mt-4">
            <div className="col-md-10">
              <div className="bg-white rounded shadow-sm mb-4 p-2 d-flex">
                <input
                  type="text"
                  className="form-control border-0"
                  placeholder="Rechercher des offres d'emploi ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="btn btn-primary px-4">Rechercher</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  