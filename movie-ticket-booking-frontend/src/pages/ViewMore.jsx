import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import MovieDetails from "../movies/MovieDetail";

export default function ViewMore() {
  const [movie, setMovie] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
      const res = await axios.get(`http://localhost:8080/api/movies/movie/${movieId}`);
        setMovie(res.data);
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    };
    if (movieId) fetchMovie();
  }, [movieId]);

  if (!movie) return <div>Loading...</div>;

  return <MovieDetails movie={movie} />;
}
