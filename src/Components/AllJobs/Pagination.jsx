import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import React from 'react';

function Pagination({ jobPage, setJobPage }) {
    const { currentPage, totalPages } = jobPage;

    const handleNext = () => {
        if (currentPage < totalPages) {
            setJobPage(prev => ({ ...prev, currentPage: prev.currentPage + 1, status: 'process' }));
        }
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            setJobPage(prev => ({ ...prev, currentPage: prev.currentPage - 1, status: 'process' }));
        }
    };

    const handlePageClick = (pageNumber) => {
        setJobPage(prev => ({ ...prev, currentPage: pageNumber, status: 'process' }));
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const maxPageNumbersToShow = 3;
        const ellipsis = <span key="ellipsis" className="px-3 text-primary">...</span>;

        let startPage = Math.max(1, currentPage - Math.floor(maxPageNumbersToShow / 2));
        let endPage = Math.min(totalPages, startPage + maxPageNumbersToShow - 1);

        if (endPage - startPage < maxPageNumbersToShow - 1) {
            startPage = Math.max(1, endPage - maxPageNumbersToShow + 1);
        }

        if (startPage > 1) {
            pageNumbers.push(
                <button
                    key={1}
                    className={`px-4 py-2 mx-1 border rounded-full transition-colors duration-300 ${currentPage === 1 ? 'bg-primary-color text-white' : 'bg-secondary-color text-primary-color hover:bg-primary hover:text-white'}`}
                    onClick={() => handlePageClick(1)}
                >
                    1
                </button>
            );
            if (startPage > 2) {
                pageNumbers.push(ellipsis);
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    className={`px-4 py-2 mx-1 border rounded-full transition-colors duration-300 ${i === currentPage ? 'bg-primary-color text-white' : 'bg-secondary-color text-primary-color hover:bg-primary hover:text-white'}`}
                    onClick={() => handlePageClick(i)}
                >
                    {i}
                </button>
            );
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pageNumbers.push(ellipsis);
            }
            pageNumbers.push(
                <button
                    key={totalPages}
                    className={`px-4 py-2 mx-1 border rounded-full transition-colors duration-300 ${currentPage === totalPages ? 'bg-primary text-white' : 'bg-secondary text-primary hover:bg-primary hover:text-white'}`}
                    onClick={() => handlePageClick(totalPages)}
                >
                    {totalPages}
                </button>
            );
        }

        return pageNumbers;
    };

    return (
        <div className="flex justify-center items-center my-5 font-sans">
            <button
                className="flex items-center justify-center w-10 h-10 text-primary border-2 border-primary rounded-full transition-colors duration-300 ease-in-out disabled:cursor-not-allowed disabled:text-gray-400 disabled:border-gray-400 hover:bg-primary hover:text-white"
                onClick={handlePrevious}
                disabled={currentPage <= 1}
            >
                <FaChevronLeft />
            </button>
            {renderPageNumbers()}
            <button
                className="flex items-center justify-center w-10 h-10 text-primary border-2 border-primary rounded-full transition-colors duration-300 ease-in-out disabled:cursor-not-allowed disabled:text-gray-400 disabled:border-gray-400 hover:bg-primary hover:text-white"
                onClick={handleNext}
                disabled={currentPage >= totalPages}
            >
                <FaChevronRight />
            </button>
        </div>
    );
}

export default Pagination;
