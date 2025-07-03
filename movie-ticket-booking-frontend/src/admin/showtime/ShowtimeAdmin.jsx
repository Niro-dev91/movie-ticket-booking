import React, { useState, useEffect } from "react";
import axios from "axios";

import ShowtimeForm from "./ShowtimeForm";
import ShowtimesTable from "./ShowtimesTable";

const initialFormState = {
  movieId: "",
  locationId: "",
  startDate: "",
  endDate: "",
  startTime: "",
  endTime: "",
  seats: "",
};

// expand date range
function getDatesInRange(startDate, endDate) {
  const dateArray = [];
  let currentDate = new Date(startDate);
  const lastDate = new Date(endDate);
  while (currentDate <= lastDate) {
    dateArray.push(currentDate.toISOString().slice(0, 10));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dateArray;
}

export default function ShowtimeAdmin() {
  const [showtimes, setShowtimes] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  const [editIndex, setEditIndex] = useState(-1);

  // Load showtimes from localStorage on first render
  useEffect(() => {
    const stored = localStorage.getItem("showtimes");
    if (stored) {
      setShowtimes(JSON.parse(stored));
    }
  }, []);

  // Save showtimes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("showtimes", JSON.stringify(showtimes));
  }, [showtimes]);

  // ✅ Add / Edit form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const { movieId, locationId, startDate, endDate, startTime, endTime, seats } = formData;

    if (!movieId || !locationId || !startDate || !endDate) {
      alert("Please fill movie, location, start date, and end date.");
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      alert("Start date cannot be after end date.");
      return;
    }

    const startDateTime = new Date(`${startDate}T${startTime}`);
    const endDateTime = new Date(`${endDate}T${endTime}`);

    if (endDateTime <= startDateTime) {
      alert("End time must be after start time!");
      return;
    }

    const datesInRange = getDatesInRange(startDate, endDate);

    const newShowtimes = datesInRange.map((date) => ({
  movieId: parseInt(movieId, 10),
  locationId: parseInt(locationId, 10),
  date,
  startTime,
  endTime,
  seats: parseInt(seats, 10),
}));

    if (editIndex === -1) {
      // Add new
      setShowtimes([...showtimes, ...newShowtimes]);
    } else {
      // Replace existing
      let updated = [...showtimes];
      updated.splice(editIndex, 1, ...newShowtimes);
      setShowtimes(updated);
      setEditIndex(-1);
    }

    setFormData(initialFormState);
  };

  // ✅ Edit
  const handleEdit = (index) => {
    const showtime = showtimes[index];
    setFormData({
      movieId: showtime.movieId,
      locationId: showtime.locationId,
      startDate: showtime.date,
      endDate: showtime.date,
      startTime: showtime.startTime,
      endTime: showtime.endTime,
      seats: showtime.seats,
    });
    setEditIndex(index);
  };

  // ✅ Delete
  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this showtime?")) {
      setShowtimes(showtimes.filter((_, i) => i !== index));
      if (editIndex === index) {
        setEditIndex(-1);
        setFormData(initialFormState);
      }
    }
  };

  // ✅ Clear all
  const clearAllShowtimes = () => {
    if (window.confirm("Are you sure you want to clear all showtimes?")) {
      setShowtimes([]);
      setFormData(initialFormState);
      setEditIndex(-1);
    }
  };

  // ✅ Save All to backend
  const saveToBackend = async () => {
    if (showtimes.length === 0) {
      alert("No showtimes to save.");
      return;
    }

    try {
      console.log('Sending showtime to backend:', showtimes);
      await axios.post("http://localhost:8080/api/showtimes/save", showtimes);
      alert("Showtimes saved to backend successfully!");
      // Optional: clear local after save
      // setShowtimes([]);
    } catch (error) {
      console.error(error);
      alert("Failed to save showtimes to backend.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <ShowtimeForm
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
      />

      <ShowtimesTable
        showtimes={showtimes}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onClearAll={clearAllShowtimes}
      />

      <button
        onClick={saveToBackend}
        className="mt-2 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition block "
      >
        Save All
      </button>
    </div>
  );
}
