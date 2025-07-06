import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ShowtimeForm({ formData, setFormData, handleSubmit }) {
  const [movies, setMovies] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const moviesRes = await axios.get("http://localhost:8080/api/movies/allmovies");
      setMovies(moviesRes.data);

      const locationsRes = await axios.get("http://localhost:8080/api/location/all");
      setLocations(locationsRes.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load movie or location details.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow space-y-4 max-w-4xl mx-auto"
    >
      <h2 className="text-2xl font-semibold mb-4">Add / Edit Showtime</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-1 font-medium">Movie</label>
          <select
            name="movieId"
            className="border p-2 rounded w-full"
            value={formData.movieId}
            onChange={handleChange}
            required
          >
            <option value="">Select a movie</option>
            {movies.map((m) => (
              <option key={m.id} value={m.id}>{m.title}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Location</label>
          <select
            name="locationId"
            value={formData.locationId}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select a location</option>
            {locations.map((l) => (
              <option key={l.id} value={l.id}>{l.locationName}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">End Date</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Start Time</label>
          <input
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">End Time</label>
          <input
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Total Seats</label>
          <input
            type="number"
            name="seats"
            min="1"
            value={formData.seats}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
      >
        Save Showtime
      </button>
    </form>
  );
}
