import React from 'react';
import { Link } from 'react-router-dom';

const dummyMovies = [
  { id: '1', title: 'Inception' },
  { id: '2', title: 'Interstellar' },
];

export default function MovieList() {
  return (
    <div>
      <h2>Now Showing</h2>
      <ul>
        {dummyMovies.map(movie => (
          <li key={movie.id}>
            <strong>{movie.title}</strong>
            <br />
            <Link to={`/movie/${movie.id}`}>View Details</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
