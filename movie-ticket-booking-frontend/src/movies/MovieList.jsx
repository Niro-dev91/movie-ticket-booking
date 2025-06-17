import React from "react";
import { Link } from "react-router-dom";

const MovieList = () => {
  const dummyMovies = [
    { id: "1", title: "Inception" },
    { id: "2", title: "Interstellar" },
  ];

  return (
    <div>
      <h2>Now Showing</h2>
      <ul>
        {dummyMovies.map((movie) => (
          <li key={movie.id}>
            <strong>{movie.title}</strong><br />
            <Link to={`/movie/${movie.id}`}>View Details</Link> |{" "}
            <Link to={`/movie/${movie.id}/trailer`}>Trailer</Link> |{" "}
            <Link to={`/movie/${movie.id}/book`}>Book</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
