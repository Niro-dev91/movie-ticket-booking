import React from 'react';
import {
  MapPin,
  Film,
  CalendarDays,
  Sparkles,
  Tag,
} from 'lucide-react';

const BookingFilters = ({ locations, movies, features, filters, setFilters }) => {
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filterStyle = 'flex items-center gap-2 border rounded-xl px-3 py-2 shadow-sm min-w-[180px] bg-white hover:shadow-md transition';

  return (
    <div className="w-full">
      <div className="flex justify-center">
        <div className="flex gap-4 flex-wrap justify-center items-center p-6 bg-gray-50 rounded-2xl shadow ">
          {/* Location Filter */}
          <div className={filterStyle}>
            <MapPin size={18} />
            <select
              name="location"
              value={filters.location}
              onChange={handleChange}
              className="bg-transparent outline-none w-full"
            >
              <option value="">All Locations</option>
              {locations.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.locationName}
                </option>
              ))}
            </select>
          </div>

          {/* Movie Filter */}
          <div className={filterStyle}>
            <Film size={18} />
            <select
              name="movie"
              value={filters.movie}
              onChange={handleChange}
              className="bg-transparent outline-none w-full"
            >
              <option value="">All Movies</option>
              {movies.map((movie) => (
                <option key={movie.id} value={movie.id}>
                  {movie.title}
                </option>
              ))}
            </select>
          </div>

          {/* Date Filter */}
          <div className={filterStyle}>
            <CalendarDays size={18} />
            <input
              type="date"
              name="date"
              value={filters.date}
              onChange={handleChange}
              className="bg-transparent outline-none w-full"
            />
          </div>

          {/* feature Filter */}
          <div className={filterStyle}>
            <Sparkles size={18} />
            <select
              name="feature"
              value={filters.feature}
              onChange={handleChange}
              className="bg-transparent outline-none w-full"
            >
              <option value="">All Features</option>
              {features.map((feature) => (
                <option key={feature.id} value={feature.id}>
                  {feature.name}
                </option>
              ))}
            </select>
          </div>

          {/* Offers and deal Filter */}
          <div className={filterStyle}>
            <Tag size={18} />
            <select
              name="offer"
              value={filters.offer}
              onChange={handleChange}
              className="bg-transparent outline-none w-full"
            >
              <option value="">All Offers</option>
              <option value="Buy 1 Get 1">Buy 1 Get 1</option>
              <option value="None">None</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingFilters;
