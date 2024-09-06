import { useState } from "react";
import NavBar from "./Components/NavBar";
import NumResults from "./Components/NumResults";
import Search from "./Components/Search";
import MovieList from "./Components/MovieList";
import Main from "./Components/Main";
import Loader from "./Components/Loader";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  console.log(error);
  return (
    <div>
      <NavBar>
        <Search
          setMovies={setMovies}
          setLoading={setLoading}
          setError={setError}
        />
        <NumResults length={movies.length} />
      </NavBar>
      {loading ? (
        <Loader />
      ) : (
        <Main>
          {error ? (
            <div className="error">{error}</div>
          ) : (
            <MovieList movies={movies} />
          )}
        </Main>
      )}
    </div>
  );
}

export default App;
