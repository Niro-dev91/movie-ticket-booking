import React from "react";

export default function ShowtimesTable({ showtimes, onEdit, onDelete }) {
  return (
    <div className="max-w-6xl mx-auto mt-12">
      <h2 className="text-2xl font-semibold mb-6">Existing Showtimes</h2>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border border-gray-300 shadow-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">Movie</th>
              <th className="p-3 border">Location</th>
              <th className="p-3 border">Date</th>
              <th className="p-3 border">Start Time</th>
              <th className="p-3 border">End Time</th>
              <th className="p-3 border">Seats</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {showtimes.length === 0 && (
              <tr>
                <td colSpan="11" className="text-center p-4 text-gray-500">
                  No showtimes added yet.
                </td>
              </tr>
            )}
            {showtimes.map((s, i) => (
              <tr key={i} className="text-center">
                <td className="p-2 border">{s.movie}</td>
                <td className="p-2 border">{s.location}</td>
                <td className="p-2 border">{s.date}</td>
                <td className="p-2 border">{s.startTime}</td>
                <td className="p-2 border">{s.endTime}</td>
                <td className="p-2 border">{s.seats}</td>
                <td className="p-2 border space-x-2">
                  <button
                    onClick={() => onEdit(i)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(i)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
