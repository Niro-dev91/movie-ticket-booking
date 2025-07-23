import React, { useEffect, useState } from 'react';
import BookingFilters from './BookingFilters';
import BookingView from './BookingView';
import Navbar from "../components/Navbar";
import axios from 'axios';

const Booking = () => {
  const today = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"

  const [locations, setLocations] = useState([]);
  const [movies, setMovies] = useState([]);
  const [features, setFeatures] = useState([]);
  const [filters, setFilters] = useState({
    location: '',
    movie: '',
    date: today,
    feature: '',
    offer: '',
  });

  const [showtimes, setShowtimes] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch locations, movies and features on mount
  useEffect(() => {
    const fetchLocationsAndMovies = async () => {
      try {
        const [locRes, movRes, feaRes] = await Promise.all([
          axios.get('http://localhost:8080/api/location/all'),
          axios.get('http://localhost:8080/api/movies/allmovies'),
          axios.get('http://localhost:8080/api/location/allFeatures'),
        ]);
        setLocations(locRes.data);
        setMovies(movRes.data);
        setFeatures(feaRes.data)

        setFilters((prev) => ({
          ...prev,
          location: '', // all locations selected by default
          movie: '',    // all movies selected by default
          // date already set on initialization
          feature: '',
        }));
      } catch (error) {
        console.error('Failed to fetch locations or movies or features', error);
      }
    };
    fetchLocationsAndMovies();
  }, []);

  // Fetch movie showtimes whenever filters change
  useEffect(() => {
    const fetchShowtimes = async () => {
      setLoading(true);
      try {
        const res = await axios.get('http://localhost:8080/api/showtimes/all', {
          params: {
            locationId: filters.location || null,
            movieId: filters.movie || null,
            date: filters.date || null,
            featureId: filters.feature || null,
            offer: filters.offer || null,
          },
        });
        setShowtimes(res.data);
      } catch (error) {
        console.error('Failed to fetch showtimes', error);
      } finally {
        setLoading(false);
      }
    };

    fetchShowtimes();
  }, [filters]);


  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6 ml-4 mt-8 text-left uppercase">
          BUY TICKETS
        </h2>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <BookingFilters
              locations={locations}
              movies={movies}
              features={features}
              filters={filters}
              setFilters={setFilters}
            />
          </div>

          <div className="md:w-2/3">
            {loading ? (
              <p className="text-center text-gray-500">Loading showtimes...</p>
            ) : (
              <BookingView showtimes={showtimes} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Booking;
