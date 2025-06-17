import React from "react";
import { useParams } from "react-router-dom";

const BookingPage = () => {
  const { id } = useParams();

  return (
    <div>
      <h2>Booking for Movie ID: {id}</h2>
      <p>Seat selection and booking functionality coming soon!</p>
    </div>
  );
};

export default BookingPage;
