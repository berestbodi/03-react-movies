import axios from "axios";
import type { MoviesResponse } from "../types/movies";

const myKey = import.meta.env.VITE_TMDB_TOKEN;

const options = {
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${myKey}`,
  },
};

export async function fetchMovies(query: string): Promise<MoviesResponse> {
  if (!query.trim()) {
    throw new Error("Empty search query");
  }

  const url = "https://api.themoviedb.org/3/search/movie";

  const res = await axios.get<MoviesResponse>(url, {
    ...options,
    params: {
      query,
      language: "en-US",
      page: 1,
    },
  });

  return res.data;
}
