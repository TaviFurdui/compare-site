// Updated Pagination.js
import React from 'react';
import './Pagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
  const hasResults = totalPages > 0;
  
  const renderPageNumbers = () => {
    const maxVisiblePages = 5; 

    let pageStart = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let pageEnd = Math.min(pageStart + maxVisiblePages - 1, totalPages);

    if (totalPages - pageStart < maxVisiblePages - 1) {
      pageStart = Math.max(1, pageStart - (maxVisiblePages - 1 - (totalPages - pageStart)));
    }

    const pageNumbersToShow = Array.from({ length: pageEnd - pageStart + 1 }, (_, index) => index + pageStart);

    return pageNumbersToShow.map((number, index) => (
      <span
        key={index}
        className={currentPage === number ? 'active' : ''}
        onClick={() => onPageChange(number)}
      >
        {number}
      </span>
    ));
  };

  return (
    <div className="pagination">
        {hasResults && currentPage > 1 && (
            <button onClick={() => onPageChange(Math.max(1, currentPage - 1))}>Pagina precedentă</button>
        )}
        {renderPageNumbers()}
        {hasResults && currentPage < totalPages && (
            <button onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}>Pagina următoare</button>
        )}
    </div>
  );
};

export default Pagination;
