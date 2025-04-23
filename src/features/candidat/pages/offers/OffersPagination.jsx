// 📁 src/features/candidat/components/offers/OffersPagination.jsx
import React from "react";

export default function OffersPagination({ totalPages, currentPage, setCurrentPage }) {
  if (totalPages <= 1) return null;

  return (
    <nav className="mt-4">
      <ul className="pagination justify-content-center">
        {[...Array(totalPages)].map((_, index) => {
          const pageNumber = index + 1;
          return (
            <li
              key={pageNumber}
              className={`page-item ${pageNumber === currentPage ? "active" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => setCurrentPage(pageNumber)}
                style={{ cursor: "pointer" }}
              >
                {pageNumber}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
