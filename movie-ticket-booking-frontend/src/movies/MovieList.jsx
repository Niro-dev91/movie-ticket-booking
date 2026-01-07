import React, { useEffect, useState } from 'react';
import Navbar from "../components/Navbar";
import axios from 'axios';
import { FaPlay, FaInfoCircle, FaTicketAlt, FaCreditCard } from 'react-icons/fa';

export default function MovieList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/api/movies/allmovies')
      .then(res => {
        setMovies(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError("Failed to load movies");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="text-center py-20 text-xl text-white bg-gray-100 min-h-screen">
          Loading movies...
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="text-center py-20 text-xl text-white bg-gray-100 min-h-screen">
          {error}
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen px-4 py-12">
        <h2 className="max-w-6xl mx-auto text-3xl font-bold mb-8 mt-8 text-left uppercase text-gray-900">
          Now Showing
        </h2>


        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
          {movies.map(movie => (
            <div key={movie.id} className="relative group rounded-lg overflow-hidden shadow-lg cursor-pointer bg-white">


              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-full h-[400px] object-cover transition-transform duration-300 group-hover:scale-105 group-hover:blur-sm"
              />


              <div className="absolute inset-0 flex flex-col justify-end pb-14 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-y-2">
                <a className="flex items-center px-4 py-3 text-white hover:bg-black hover:bg-opacity-40 transition">
                  <FaInfoCircle size={24} />
                  <span className="ml-3 text-sm font-semibold">View Details</span>
                </a>

                <a
                  className="flex items-center px-4 py-3 text-white hover:bg-black hover:bg-opacity-40 transition"
                  href={movie.videoLink && movie.videoLink !== 'not available' ? movie.videoLink : '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaPlay size={24} />
                  <span className="ml-3 text-sm font-semibold">
                    {movie.videoLink && movie.videoLink !== 'not available' ? "Watch Trailer" : "Trailer N/A"}
                  </span>
                </a>

                <a className="flex items-center px-4 py-3 text-white hover:bg-black hover:bg-opacity-40 transition">
                  <FaTicketAlt size={24} />
                  <span className="ml-3 text-sm font-semibold">Book Now</span>
                </a>

              </div>


              <div className="mt-4 px-2">
                <h3 className="text-xl font-bold text-gray-900 text-left uppercase">{movie.title}</h3>
                <h5 className="text-sm font-semibold text-gray-700 text-left">NOW SCREENING</h5>

              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
