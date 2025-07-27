import React, { useState, useEffect } from "react";

const SeatBooking = ({ data }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const toggleSeat = (mapId) => {
    setSelectedSeats((prev) =>
      prev.includes(mapId) ? prev.filter((s) => s !== mapId) : [...prev, mapId]
    );
  };

  const goToSummary = () => {
    alert(`You selected seats: ${selectedSeats.join(", ")}`);
  };

  if (!data) return <div>Loading seats layout...</div>;

  return (
    <div className="flex flex-col items-center p-6">
      <h2 className="text-2xl font-bold mb-4">Book Your Seat</h2>

      {/* Legend */}
      <div className="flex gap-4 mb-6">
        <Legend color="bg-blue-500" label="Selected" />
        <Legend color="bg-gray-200" label="Available" />
        <Legend color="bg-transparent border border-gray-300" label="Space" />
      </div>

      {/* Seats */}
      <div className="flex flex-col items-center gap-1">
        {data.map(({ label, seats }) => (
          <div key={label} className="flex gap-1">
            {seats.map(({ id, status, mapId }) => {
              if (status === "space") {
                return <div key={id} className="w-8 h-8" />;
              }
              if (status === "seat") {
                const isSelected = selectedSeats.includes(mapId);
                return (
                  <button
                    key={id}
                    className={`w-8 h-8 text-xs rounded cursor-pointer ${isSelected ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-400"
                      }`}
                    type="button"
                    onClick={() => toggleSeat(mapId)}
                    title={mapId}
                  >
                    {mapId}
                  </button>
                );
              }
              return null;
            })}
          </div>
        ))}
      </div>

      {/* Screen Label */}
      <div className="mt-8 flex flex-col items-center">
        <div className="font-semibold mb-2">SCREEN</div>
        <svg
          className="w-64 h-6"
          viewBox="0 0 200 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 25 Q 100 5 190 25" stroke="black" strokeWidth="3" fill="none" strokeLinecap="round" />
        </svg>
      </div>

      {/* Continue Button */}
      <button
        onClick={goToSummary}
        disabled={selectedSeats.length === 0}
        className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:bg-gray-400"
        type="button"
      >
        Next
      </button>
    </div>
  );
};

const Legend = ({ color, label }) => (
  <div className="flex items-center gap-2">
    <div className={`w-6 h-6 rounded ${color} border border-gray-300`} />
    <span className="text-sm">{label}</span>
  </div>
);

export default function SeatingLayoutUI() {
  const [seatLayout, setseatLayout] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/seats/layout")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch seat layout");
        return res.json();
      })
      .then((data) => setseatLayout(data))
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;
  if (!seatLayout) return <div className="p-4">Loading seat layout...</div>;

  return <SeatBooking data={seatLayout} />;
}
