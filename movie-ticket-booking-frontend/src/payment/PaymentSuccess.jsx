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
        <div className="max-w-3xl mx-auto mt-20 p-6 text-center">
          <h2 className="text-2xl font-bold text-green-600">
            Payment Successful
          </h2>
          <p className="mt-3 text-gray-600">
            No receipt details available.
          </p>
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
    paymentIntentId,
    movieTitle,
    total,
    showtimeId,
    selectedTickets = [],
    cartItems = [],
    seats = [],
  } = state;

  const downloadReceipt = () => {
    const receiptText = `
MOVIE TICKET RECEIPT
----------------------------

Payment ID: ${paymentIntentId}
Movie: ${movieTitle}
Showtime ID: ${showtimeId}
Seats: ${seats.join(", ") || "N/A"}

Tickets:
${selectedTickets
  .map((t) => `${t.type || "Ticket"} x ${t.count} - LKR ${t.price * t.count}`)
  .join("\n")}

Food & Beverages:
${cartItems
  .map((i) => `${i.name} x ${i.qty} - LKR ${i.price * i.qty}`)
  .join("\n") || "None"}

----------------------------
Total Paid: LKR ${Number(total).toLocaleString("en-LK")}
Status: SUCCESS
----------------------------
Thank you for your booking!
`;

    const blob = new Blob([receiptText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `receipt-${paymentIntentId}.txt`;
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white shadow-lg rounded-2xl p-8 border text-center">
          <div className="text-green-600 text-5xl mb-4">✓</div>

          <h2 className="text-3xl font-bold text-green-600">
            Payment Successful
          </h2>

          <p className="text-gray-600 mt-2">
            Your movie booking has been confirmed.
          </p>

          <div className="mt-8 text-left bg-gray-50 rounded-xl p-6 border">
            <h3 className="text-xl font-bold mb-4">Receipt</h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Payment ID</span>
                <span className="font-medium">{paymentIntentId}</span>
              </div>

              <div className="flex justify-between">
                <span>Movie</span>
                <span className="font-medium">{movieTitle}</span>
              </div>

              <div className="flex justify-between">
                <span>Showtime ID</span>
                <span className="font-medium">{showtimeId}</span>
              </div>

              <div className="flex justify-between">
                <span>Seats</span>
                <span className="font-medium">
                  {seats.length > 0 ? seats.join(", ") : "N/A"}
                </span>
              </div>

              <hr />

              <div className="flex justify-between text-lg font-bold">
                <span>Total Paid</span>
                <span>LKR {Number(total).toLocaleString("en-LK")}</span>
              </div>

              <div className="flex justify-between">
                <span>Status</span>
                <span className="text-green-600 font-bold">SUCCESS</span>
              </div>
            </div>
          </div>

          <div className="flex gap-4 justify-center mt-8">
            <button
              onClick={downloadReceipt}
              className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600"
            >
              Download Receipt
            </button>

            <button
              onClick={() => navigate("/")}
              className="border px-6 py-3 rounded-lg hover:bg-gray-100"
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    </>
  );
}