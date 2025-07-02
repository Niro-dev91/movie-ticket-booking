import React from "react";

export default function ShowtimeForm({ formData, setFormData, handleSubmit }) {
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("pricing.")) {
      const key = name.split(".")[1];
      setFormData({
        ...formData,
        pricing: { ...formData.pricing, [key]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

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
            name="movie"
            value={formData.movie}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Movie</option>
            <option>Movie 1</option>
            <option>Movie 2</option>
            <option>Movie 3</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Location</label>
          <select
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Location</option>
            <option>Location 1</option>
            <option>Location 2</option>
            <option>Location 3</option>
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
        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
      >
        Save Showtime
      </button>
    </form>
  );
}
