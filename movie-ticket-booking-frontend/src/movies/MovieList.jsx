import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from "../components/Navbar";

const dummyMovies = [
  { id: '1', title: 'Inception' },
  { id: '2', title: 'Interstellar' },
];

export default function MovieList() {
  return (
    <>
      <Navbar />
      <div className="pt-24 px-4"> {/* Padding top to avoid overlap with fixed navbar */}
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
      </div>
    </>
  );
}
