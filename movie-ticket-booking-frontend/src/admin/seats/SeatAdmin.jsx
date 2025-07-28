import React, { useState } from "react";
import SeatLayout from "./SeatLayout";

export default function SeatAdmin() {
  const [seatData, setSeatData] = useState([]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Seating Layout Designer Panel</h1>
      <SeatLayout seatData={seatData} setSeatData={setSeatData} />
    </div>
  );
}
