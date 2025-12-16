import { useState } from "react";
import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import toast, { Toaster } from "react-hot-toast";
import css from "./App.module.css";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (query: string) => {
    setMovies([]);
    setIsError(false);
    setIsLoader(true);

    try {
      const data = await fetchMovies(query);

      if (data.results.length === 0) {
        toast.error("No movies found for your request.");
        return;
      }

      setMovies(data.results);
    } catch {
      setIsError(true);
    } finally {
      setIsLoader(false);
    }
  };

  const openModal = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  return (
    <div className={css.app}>
      <Toaster position="top-center" />

      <SearchBar onSubmit={handleSubmit} />

      {isLoader && <Loader />}

      {!isLoader && !isError && movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={openModal} />
      )}

      {isError && <ErrorMessage />}

      {isModalOpen && selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
    </div>
  );
}

export default App;
