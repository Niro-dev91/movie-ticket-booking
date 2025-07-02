import React, { useState } from "react";
import ShowtimeForm from "./ShowtimeForm";
import ShowtimesTable from "./ShowtimesTable";

const initialFormState = {
  movie: "",
  screen: "",
  startDate: "",
  endDate: "",
  startTime: "",
  endTime: "",
  seats: "",
  pricing: {
    normal: "",
    vip: "",
    couple: "",
    child: "",
  },
};

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      movie,
      screen,
      startDate,
      endDate,
      startTime,
      endTime,
      seats,
      pricing,
    } = formData;

    if (!movie || !screen || !startDate || !endDate) {
      alert("Please fill movie, screen, start date, and end date.");
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      alert("Start date cannot be after end date.");
      return;
    }

    // Validate time: end time must be after start time
    const startDateTime = new Date(`${startDate}T${startTime}`);
    const endDateTime = new Date(`${endDate}T${endTime}`);

    if (endDateTime <= startDateTime) {
      alert("End time must be after start time!");
      return;
    }

    const datesInRange = getDatesInRange(startDate, endDate);

    const newShowtimes = datesInRange.map((date) => ({
      movie,
      screen,
      date,
      startTime,
      endTime,
      seats,
      pricing,
    }));

    if (editIndex === -1) {
      // Add new showtimes
      setShowtimes([...showtimes, ...newShowtimes]);
    } else {
      // Replace the edited showtime with all new dates
      let updated = [...showtimes];
      updated.splice(editIndex, 1, ...newShowtimes);
      setShowtimes(updated);
      setEditIndex(-1);
    }

    setFormData(initialFormState);
  };

  const handleEdit = (index) => {
    const showtime = showtimes[index];
    setFormData({
      movie: showtime.movie,
      screen: showtime.screen,
      startDate: showtime.date,
      endDate: showtime.date,
      startTime: showtime.startTime,
      endTime: showtime.endTime,
      seats: showtime.seats,
      pricing: { ...showtime.pricing },
    });
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this showtime?")) {
      setShowtimes(showtimes.filter((_, i) => i !== index));
      if (editIndex === index) {
        setEditIndex(-1);
        setFormData(initialFormState);
      }
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
      />
    </div>
  );
}
