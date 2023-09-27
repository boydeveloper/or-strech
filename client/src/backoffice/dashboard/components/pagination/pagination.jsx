import React from "react";
import style from "./pagination.module.css";
import { LeftDir, RightDir } from "../../../../frontend/utils/svg";

function Pagination({ currentPage, totalPages, onPageChange }) {
  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers.map((number) => (
      <button
        key={number}
        className={`${style.pag__button} ${
          currentPage === number ? style.active : ""
        }`}
        onClick={() => onPageChange(number)}
      >
        {number}
      </button>
    ));
  };

  return (
    <div className={style.pagination}>
      <button
        className={style.pag__button}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <LeftDir />
      </button>
      {renderPageNumbers()}
      <button
        className={style.pag__button}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <RightDir />
      </button>
    </div>
  );
}

export default Pagination;
