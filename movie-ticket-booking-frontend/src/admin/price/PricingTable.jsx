import React, { useEffect, useState } from "react";
import axios from "axios";

export default function PricingTable({ showtimes, handleSaveAll }) {
  const [seatCategories, setSeatCategories] = useState([]);
  const [ticketCategories, setTicketCategories] = useState([]);
  const [pricingData, setPricingData] = useState({});

  // Fetch seat & ticket categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const seatRes = await axios.get("http://localhost:8080/api/seatcategory/all");
        setSeatCategories(seatRes.data);

        const ticketRes = await axios.get("http://localhost:8080/api/ticketcategory/all");
        setTicketCategories(ticketRes.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load categories.");
      }
    };
    fetchCategories();
  }, []);

  // Initialize pricingData
  useEffect(() => {
    const initialData = {};
    showtimes.forEach(showtime => {
      initialData[showtime.id] = {};
      seatCategories.forEach(seat => {
        initialData[showtime.id][seat.id] = {};
        ticketCategories.forEach(ticket => {
          // Only allow Child for Normal seats
          if (ticket.name === "Child" && seat.name !== "Normal") return;
          initialData[showtime.id][seat.id][ticket.id] = "";
        });
      });
    });
    setPricingData(initialData);
  }, [showtimes, seatCategories, ticketCategories]);

  const handlePriceChange = (showtimeId, seatId, ticketId, value) => {
    setPricingData(prev => ({
      ...prev,
      [showtimeId]: {
        ...prev[showtimeId],
        [seatId]: {
          ...prev[showtimeId][seatId],
          [ticketId]: value
        }
      }
    }));
  };

  const handleSaveClick = () => {
    const payload = [];
    Object.entries(pricingData).forEach(([showtimeId, seats]) => {
      Object.entries(seats).forEach(([seatId, tickets]) => {
        Object.entries(tickets).forEach(([ticketId, price]) => {
          if (price !== "") {
            payload.push({
              showtimeId: Number(showtimeId),
              seatCategoryId: Number(seatId),
              ticketCategoryId: Number(ticketId),
              price: Number(price)
            });
          }
        });
      });
    });
    console.log("Saving pricing data:", payload);
    handleSaveAll(payload);
  };

  return (
    <div className="overflow-x-auto mt-6">
      <table className="w-full table-auto border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Movie</th>
            <th className="p-2 border">Location</th>
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Start Time</th>
            <th className="p-2 border">End Time</th>
            <th className="p-2 border">Seat Category</th>
            <th className="p-2 border">Ticket Category</th>
            <th className="p-2 border">Price</th>
          </tr>
        </thead>
        <tbody>
          {showtimes.map(showtime =>
            seatCategories.map(seat =>
              ticketCategories
                .filter(ticket => !(ticket.name === "Child" && seat.name !== "Normal")) // enforce child rule
                .map(ticket => (
                  <tr key={`${showtime.id}-${seat.id}-${ticket.id}`} className="text-center">
                    <td className="border p-2">{showtime.title}</td>
                    <td className="border p-2">{showtime.locationName}</td>
                    <td className="border p-2">{showtime.date}</td>
                    <td className="border p-2">{showtime.startTime}</td>
                    <td className="border p-2">{showtime.endTime}</td>
                    <td className="border p-2">{seat.name}</td>
                    <td className="border p-2">{ticket.name}</td>
                    <td className="border p-2">
                      <input
                        type="number"
                        className="border p-1 w-24"
                        placeholder="Price"
                        value={pricingData[showtime.id]?.[seat.id]?.[ticket.id] || ""}
                        onChange={e =>
                          handlePriceChange(showtime.id, seat.id, ticket.id, e.target.value)
                        }
                      />
                    </td>
                  </tr>
                ))
            )
          )}
        </tbody>
      </table>

      <button
        onClick={handleSaveClick}
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Save Ticket Prices
      </button>
    </div>
  );
}
