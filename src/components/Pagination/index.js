import React from 'react';
import {
  ButtonsWrapper,
  Button,
} from './style'

const Pagination = ({ currentPage, itemsPerPage, totalItems, paginate }) => {
  const pageNumbers = [];
  for(let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <ButtonsWrapper>
      {pageNumbers.map(number => (
        <Button
          data-testid="pag-button"
          className={currentPage === number ? 'active' : null}
          key={`page-number-${number}`}
          onClick={() => paginate(number)} 
        >
          { number }
        </Button>
      ))}
    </ButtonsWrapper>
  );
};

export default Pagination;
