import React from "react";
import ReactPaginate from "react-paginate";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import '../assets/Pagination.css'
import { Pagination } from 'swiper';

const CustomPagination = ({ pageCount, onPageChange, currentPage }) => {
  return (
    <ReactPaginate
      previousLabel={<FiChevronLeft />}
      nextLabel={<FiChevronRight />}
      pageCount={pageCount}
      onPageChange={onPageChange}
      containerClassName={"pagination"}
      pageLinkClassName={"pagination__link"}
      activeLinkClassName={"pagination__link__active"}
    />
  );
};

export default CustomPagination;