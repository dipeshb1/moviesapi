import { useState } from "react";
import MovieCard from "./MovieCard";

function MovieList({ movies }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const startIndex = () => (currentPage - 1) * itemsPerPage;

  const endIndex = () => startIndex() + itemsPerPage;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const currentMovies = movies.slice(startIndex(), endIndex());

  return (
    <>
      {movies.length > 0 ? (
        <div>
          <ul className="list">
            {currentMovies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </ul>
          {movies.length > itemsPerPage && (
            <div className="pagination">
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Previous
              </button>
              {Array.from(
                { length: Math.ceil(movies.length / itemsPerPage) },
                (_, i) => i + 1
              ).map((pageNumber) => (
                <button
                  key={pageNumber}
                  className={pageNumber === currentPage ? "active" : ""}
                  onClick={() => handlePageChange(pageNumber)}
                >
                  {pageNumber}  
                </button>
              ))}
              <button
                disabled={
                  currentPage === Math.ceil(movies.length / itemsPerPage)
                }
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="main-text">Search some awesome movies above </div>
      )}
    </>
  );
}

export default MovieList;
