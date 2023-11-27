import React from "react";
import style from "./pagination.module.css";
import { LeftDir, RightDir } from "../../../../frontend/utils/svg";

function Pagination({ currentPage, pageCount, onPageChange }) {
  console.log(currentPage);
  console.log(pageCount);

  const renderPageNumbers = () => {
    const pageNumbers = [];

    if (pageCount <= 6) {
      for (let i = 1; i <= pageCount; i++) {
        pageNumbers.push(i);
      }
    } else {
      for (
        let i = Math.max(1, currentPage - 2);
        i <= Math.min(currentPage + 2, pageCount);
        i++
      ) {
        pageNumbers.push(i);
      }
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
      {currentPage > 1 && (
        <button
          className={style.pag__button}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <LeftDir />
        </button>
      )}
      {renderPageNumbers()}
      {currentPage < pageCount && (
        <button
          className={style.pag__button}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <RightDir />
        </button>
      )}
    </div>
  );
}

export default Pagination;
