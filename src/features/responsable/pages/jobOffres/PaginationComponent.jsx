import React from 'react';
import { Pagination } from 'react-bootstrap';

const PaginationComponent = ({ totalOffers, offersPerPage, currentPage, setCurrentPage }) => {
  const totalPages = Math.ceil(totalOffers / offersPerPage);

  if (totalPages === 1) return null; // Pas besoin de pagination si 1 seule page

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Pagination className="justify-content-center mt-3">
      {[...Array(totalPages)].map((_, index) => (
        <Pagination.Item
          key={index + 1}
          active={index + 1 === currentPage}
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </Pagination.Item>
      ))}
    </Pagination>
  );
};

export default PaginationComponent;
