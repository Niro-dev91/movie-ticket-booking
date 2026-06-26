import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function PaymentSuccess() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <>
        <Navbar />
        <div className="max-w-3xl mx-auto mt-20 text-center">
          <h2 className="text-green-600 text-2xl font-bold">
            Payment Successful
          </h2>
          <button
            onClick={() => navigate("/")}
            className="mt-6 bg-pink-500 text-white px-6 py-3 rounded-lg"
          >
            Go Home
          </button>
        </div>
      </>
    );
  }

  const {
    bookingId,
    movieTitle,
    total,
    showtimeId,
    seats = [],
  } = state;

  const downloadReceipt = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/receipts/booking/${bookingId}`
      );

      if (!response.ok) {
        throw new Error("Failed to download receipt");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `receipt-${bookingId}.pdf`;
      link.click();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <div className="bg-white shadow-lg rounded-2xl p-8 border">

          <h2 className="text-3xl font-bold text-green-600">
            Payment Successful ✓
          </h2>

          <p className="text-gray-600 mt-2">
            Your booking is confirmed
          </p>

          <div className="mt-6 text-left space-y-3 text-sm">
            <p><b>Booking ID:</b> {bookingId}</p>
            <p><b>Movie:</b> {movieTitle}</p>
            <p><b>Showtime:</b> {showtimeId}</p>
            <p><b>Seats:</b> {seats.join(", ")}</p>
            <p><b>Total:</b> LKR {total}</p>
          </div>

          <div className="mt-8 flex gap-4 justify-center">
            <button
              onClick={downloadReceipt}
              className="bg-pink-500 text-white px-6 py-3 rounded-lg"
            >
              Download PDF Receipt
            </button>

            <button
              onClick={() => navigate("/")}
              className="border px-6 py-3 rounded-lg"
            >
              Go Home
            </button>
          </div>

        </div>
      </div>
    </>
  );
}