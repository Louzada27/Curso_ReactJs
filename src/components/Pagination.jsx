import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Gera um array de números de página para exibir
  const getPageNumbers = () => {
    const delta = 2; // Número de páginas para mostrar antes e depois da página atual
    const range = [];
    const rangeWithDots = [];

    // Sempre mostrar a primeira página
    range.push(1);

    for (let i = currentPage - delta; i <= currentPage + delta; i++) {
      if (i > 1 && i < totalPages) {
        range.push(i);
      }
    }

    // Sempre mostrar a última página
    if (totalPages > 1) {
      range.push(totalPages);
    }

    // Adicionar os números de página com reticências quando necessário
    let l;
    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  };

  return (
    <nav aria-label="Navegação de páginas" className="my-4">
      <ul className="pagination justify-content-center">
        {/* Botão Anterior */}
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <i className="bi bi-chevron-left"></i>
            Anterior
          </button>
        </li>

        {/* Números das páginas */}
        {getPageNumbers().map((page, index) => (
          <li
            key={index}
            className={`page-item ${page === currentPage ? 'active' : ''} ${
              page === '...' ? 'disabled' : ''
            }`}
          >
            <button
              className="page-link"
              onClick={() => (page !== '...' ? onPageChange(page) : null)}
            >
              {page}
            </button>
          </li>
        ))}

        {/* Botão Próximo */}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Próximo
            <i className="bi bi-chevron-right ms-1"></i>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;