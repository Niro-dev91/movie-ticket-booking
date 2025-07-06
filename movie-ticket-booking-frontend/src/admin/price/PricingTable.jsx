import React, { useEffect, useState } from "react";
import axios from "axios";

export default function PricingTable({ showtimes, handleSaveAll }) {
  const [seatCategoryList, setSeatCategoryList] = useState([]);
  const [pricingData, setPricingData] = useState({});

  // Load seat categories 
  useEffect(() => {
    const fetchSeatCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/seatcategory/all");
        setSeatCategoryList(response.data);
      } catch (error) {
        console.error("Error fetching seat categories:", error);
        alert("Failed to load seat categories.");
      }
    };
    fetchSeatCategories();
  }, []);

  // Reset price state whenever showtimes change
  useEffect(() => {
    const initialPricing = {};
    showtimes.forEach(showtime => {
      initialPricing[showtime.id] = { seatCategoryId: "", price: "" };
    });
    setPricingData(initialPricing);
  }, [showtimes]);

  // Handle input/select change
  const handleFieldChange = (showtimeId, field, value) => {
    setPricingData(prev => ({
      ...prev,
      [showtimeId]: {
        ...prev[showtimeId],
        [field]: value
      }
    }));
  };

  // Save button click handler
  const handleSaveClick = () => {
    const payload = Object.entries(pricingData)
      .filter(([_, data]) => data.seatCategoryId && data.price !== "")
      .map(([showtimeId, data]) => ({
        showtimeId: Number(showtimeId),
        seatCategoryId: Number(data.seatCategoryId),
        price: Number(data.price)
      }));

    console.log("Saving pricing data:", payload);
    handleSaveAll(payload);
  };

  return (
    <div className="overflow-x-auto mt-6">
      <table className="w-full table-auto border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border hidden">Showtime ID</th>
            <th className="p-2 border">Movie</th>
            <th className="p-2 border">Location</th>
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Start Time</th>
            <th className="p-2 border">End Time</th>
            <th className="p-2 border">Seat Category</th>
            <th className="p-2 border">Price</th>
          </tr>
        </thead>
        <tbody>
          {showtimes.length === 0 && (
            <tr>
              <td colSpan="8" className="text-center p-4 text-gray-500">
                No showtimes available.
              </td>
            </tr>
          )}

          {showtimes.map(showtime => {
            const { seatCategoryId, price } = pricingData[showtime.id] || {
              seatCategoryId: "",
              price: ""
            };

            return (
              <tr key={showtime.id} className="text-center">
                <td className="border p-2 hidden">{showtime.id}</td>
                <td className="border p-2">{showtime.title}</td>
                <td className="border p-2">{showtime.locationName}</td>
                <td className="border p-2">{showtime.date}</td>
                <td className="border p-2">{showtime.startTime}</td>
                <td className="border p-2">{showtime.endTime}</td>
                <td className="border p-2">
                  <select
                    className="border p-1 w-40"
                    value={seatCategoryId}
                    onChange={e =>
                      handleFieldChange(showtime.id, "seatCategoryId", e.target.value)
                    }
                  >
                    <option value="">Select Category</option>
                    {seatCategoryList.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="border p-2">
                  <input
                    type="number"
                    className="border p-1 w-24"
                    placeholder="Price"
                    value={price}
                    onChange={e =>
                      handleFieldChange(showtime.id, "price", e.target.value)
                    }
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <button
        onClick={handleSaveClick}
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Save Ticket Price
      </button>
    </div>
  );
}
