import { useState } from "react";

const API_KEY = import.meta.env.VITE_APP_OMDB_API_KEY;

function Search({ setMovies, setLoading, setError }) {
  const [query, setQuery] = useState("");

  async function handleClick(e) {
    e.preventDefault();
    if (query.length < 2) return;

    setLoading(true);
    setError("");

    const resultsPerPage = 10;
    const totalResultsNeeded = 50;
    const totalPages = Math.ceil(totalResultsNeeded / resultsPerPage);

    let allResults = [];

    try {
      for (let page = 1; page <= totalPages; page++) {
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}&page=${page}`
        );
        const data = await response.json();

        if (data.Response === "True") {
          allResults = allResults.concat(data.Search);
        } else {
          console.error("Error fetching data:", data.Error);
          setError(data.Error);
          break;
        }
      }
      setMovies(allResults);
    } catch (err) {
      console.log(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleClear = (e) => {
    e.preventDefault();
    setMovies([]);
    setError("");
    setQuery("");
  };

  return (
    <form className="search-form">
      <div className="search-container">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          className="search"
          placeholder="Search movie..."
        />
        <button type="button" onClick={handleClick} className="btn-search">
          🔎
        </button>
      </div>
      <button className="btn-clear" onClick={handleClear}>
        ❌
      </button>
    </form>
  );
}

export default Search;
