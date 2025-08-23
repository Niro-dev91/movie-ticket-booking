import React, { useState, useEffect } from "react";
import axios from "axios";
import PricingFilter from "./PricingFilter";
import PricingTable from "./PricingTable";

export default function PricingAdmin() {
  const [showtimes, setShowtimes] = useState([]);
  const [locations, setLocations] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const [filterLocationId, setFilterLocationId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchLocations();
  }, []);

  // Fetch all locations for the filter
  const fetchLocations = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/location/all`);
      setLocations(res.data);
    } catch (err) {
      console.error(err);
      alert("Error fetching locations");
    }
  };

  // Fetch showtimes for given date & location filter
  const fetchShowtimes = async () => {
    try {
      setLoading(true);
      const params = {};
      if (filterDate) params.date = filterDate;
      if (filterLocationId) params.locationId = filterLocationId;

      const res = await axios.get(`http://localhost:8080/api/showtimes/search`, { params });
      setShowtimes(res.data);
    } catch (err) {
      console.error(err);
      alert("Error fetching showtimes");
    } finally {
      setLoading(false);
    }
  };


  const handleSaveAll = async (pricingData) => {
    try {
      // Prepare data - send showtime id and pricing  and seat category id for each showtime
      const validData = pricingData
        .filter(item =>
          item.showtimeId && item.seatCategoryId && item.ticketCategoryId && item.price && Number(item.price) > 0
        )
        .map(item => ({
          showtimeId: item.showtimeId,
          seatCategoryId: item.seatCategoryId,
          ticketCategoryId: item.ticketCategoryId,
          price: Number(item.price)
        }));

      if (validData.length === 0) {
        alert("No valid pricing data to save");
        return;
      }

      console.log("Sending data:", validData);


      await axios.put(`http://localhost:8080/api/ticketprice/save`, validData);

      alert("All pricing saved successfully");
      fetchShowtimes();
    } catch (err) {
      console.error(err);
      alert("Failed to save price");
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6">Ticket Price</h1>

      <PricingFilter
        filterDate={filterDate}
        setFilterDate={setFilterDate}
        filterLocationId={filterLocationId}
        setFilterLocationId={setFilterLocationId}
        locations={locations}
        onSearch={fetchShowtimes}
      />

      {loading && <p className="text-center text-gray-600 mt-4">Loading showtimes...</p>}

      <PricingTable
        showtimes={showtimes}
        handleSaveAll={handleSaveAll}
      />
    </div>
  );
}
