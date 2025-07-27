import React from 'react';

const SummaryPage = ({ selectedSeats, goBack }) => {
  const pricePerSeat = 1500;
  const total = selectedSeats.length * pricePerSeat;

  return (
    <div className="flex flex-col items-center p-6">
      <h2 className="text-2xl font-bold mb-4">Booking Summary</h2>

      <div className="w-full max-w-md bg-gray-100 p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">Selected Seats</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {selectedSeats.map((seat) => (
            <span key={seat} className="px-3 py-1 bg-blue-500 text-white rounded">
              {seat}
            </span>
          ))}
        </div>
        <div className="text-md font-medium">
          Total Price: <span className="font-bold">LKR {total.toLocaleString()}</span>
        </div>
      </div>

      <button
        onClick={goBack}
        className="mt-6 px-6 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
      >
        Back to Seats
      </button>
    </div>
  );
};

export default SummaryPage;
