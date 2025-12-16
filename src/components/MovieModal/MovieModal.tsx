import { createPortal } from "react-dom";
import css from "./MovieModal.module.css";
import { useEffect } from "react";
import type { Movie } from "../../types/movie";

interface ModalProps {
  movie: Movie;
  onClose: () => void;
}

export default function MovieModal({ movie, onClose }: ModalProps) {
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className={css.modal}>
        <button
          className={css.closeButton}
          aria-label="Close modal"
          onClick={onClose}
        >
          &times;
        </button>

        <img
          className={css.image}
          src={
            movie.backdrop_path
              ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
              : "/no-backdrop.jpg"
          }
          alt={movie.title}
        />

        <div className={css.content}>
          <h2>{movie.title}</h2>

          <p>{movie.overview || "No description available."}</p>

          <p>
            <strong>Release date:</strong> {movie.release_date || "—"}
          </p>

          <p>
            <strong>Rating:</strong> {movie.vote_average?.toFixed(1) ?? "N/A"} /
            10
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}
