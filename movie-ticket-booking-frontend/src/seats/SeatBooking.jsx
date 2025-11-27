import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import MovieDetails from "../components/MovieDetails";

const SeatBooking = ({ data }) => {
  const { showtimeId } = useParams();
  const navigate = useNavigate();

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [tempReservedSeats, setTempReservedSeats] = useState([]);
  const [ticketPrices, setTicketPrices] = useState([]);

  useEffect(() => {
    setAdults(0);
    setChildren(0);
  }, [selectedSeats]);

  // Fetch prices for this showtime
  useEffect(() => {
    fetch(`http://localhost:8080/api/ticketprice/showtime/${showtimeId}`)
      .then(res => res.json())
      .then(data => setTicketPrices(data))
      .catch(err => console.error("Error fetching ticket prices", err));
  }, [showtimeId]);

  // Fetch temp reserved seats periodically
  useEffect(() => {
    const fetchTempReservedSeats = () => {
      fetch(`http://localhost:8080/api/seats/temp-reserved/${showtimeId}`)
        .then(res => {
          if (!res.ok) {
            console.error("Failed to fetch temp reserved seats", res.status);
            return [];
          }
          return res.json();
        })
        .then(data => {
          if (Array.isArray(data)) {
            setTempReservedSeats(data);
          } else if (data && Array.isArray(data.reservedSeats)) {
            setTempReservedSeats(data.reservedSeats);
          } else {
            setTempReservedSeats([]);
          }
        })
        .catch(err => {
          console.error("Error fetching temp reserved seats:", err);
          setTempReservedSeats([]);
        });
    };

    fetchTempReservedSeats();
    const interval = setInterval(fetchTempReservedSeats, 5000);
    return () => clearInterval(interval);
  }, [showtimeId]);


  // Helper to find couple pair (assuming pairs are next to each other or encoded in seat id)
  const findCouplePair = (mapId, seatsData) => {
    // Couple seat IDs like C1A / C1B or something consecutive
    const seat = seatsData.find(s => s.mapId === mapId);
    if (!seat) return null;

    // assume pair seats have same row + seatType "Couple"
    const rowSeats = seatsData.filter(s => s.seatType === "Couple");
    const sameRow = rowSeats.filter(s => s.mapId !== mapId);

    // couple seats are adjacent in id
    const pair = sameRow.find(s => Math.abs(parseInt(s.id) - parseInt(seat.id)) === 1);
    return pair ? pair.mapId : null;
  };


  const toggleSeat = (mapId) => {
    if (tempReservedSeats.includes(mapId)) return;

    const allSeatsFlat = data.flatMap(row => row.seats);
    const clickedSeat = allSeatsFlat.find(s => s.mapId === mapId);

    let updated = [...selectedSeats];

    if (updated.includes(mapId)) {
      // deselect
      updated = updated.filter(s => s !== mapId);

      // if couple, also remove its pair
      if (clickedSeat.seatType === "Couple") {
        const pairId = findCouplePair(mapId, allSeatsFlat);
        if (pairId) updated = updated.filter(s => s !== pairId);
      }
    } else {
      // select
      updated.push(mapId);

      // if couple, also add its pair
      if (clickedSeat.seatType === "Couple") {
        const pairId = findCouplePair(mapId, allSeatsFlat);
        if (pairId && !updated.includes(pairId)) updated.push(pairId);
      }
    }

    setSelectedSeats(updated);
  };

  // get price for given seatCategory + ticketCategory
  const getPrice = (seatCategoryName, ticketCategoryName) => {
    const priceEntry = ticketPrices.find(
      (p) =>
        p.seatCategoryName === seatCategoryName &&
        p.ticketCategoryName === ticketCategoryName
    );
    return priceEntry ? priceEntry.price : 0;
  };

  const goToReservation = async () => {
    if (adults + children !== selectedSeats.length) {
      alert("Passengers and selected seats must match.");
      return;
    }

    const selectedSeatObjs = data.flatMap((row) => row.seats)
      .filter((s) => selectedSeats.includes(s.mapId));

    if (selectedSeatObjs.length === 0) {
      alert("Please select seats");
      return;
    }

    const seatTypes = [...new Set(selectedSeatObjs.map(s => s.seatType))];

    // VIP cannot be mixed
    if (seatTypes.includes("VIP") && (seatTypes.includes("Normal") || seatTypes.includes("Couple"))) {
      alert("You cannot mix VIP with Normal or Couple seats.");
      return;
    }

    // Children only allowed if Normal + at least one Adult is present
    if (children > 0) {
      if (!seatTypes.includes("Normal")) {
        alert("Children tickets are only allowed with Normal seats.");
        return;
      }
      if (adults === 0) {
        alert("At least one Adult Normal ticket is required if you add Children.");
        return;
      }
    }

    const selectedTickets = [];
    if (adults > 0) {
      selectedTickets.push({
        type: "Adult Ticket",
        seatCategory: seatTypes.join(", "),
        count: adults,
        price: getPrice(seatTypes[0], "Adult"),
      });
    }
    if (children > 0) {
      selectedTickets.push({
        type: "Child Ticket",
        seatCategory: "Normal",
        count: children,
        price: getPrice("Normal", "Child"),
      });
    }

    try {
      const res = await fetch("http://localhost:8080/api/seats/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          showtimeId,
          seats: selectedSeats,
        }),
      });

      if (!res.ok) throw new Error("Reservation failed");
      const result = await res.json();

      if (result.success) {
        navigate(`/payment/${showtimeId}`, {
          state: {
            showtimeId,
            selectedSeats,
            selectedTickets,
          },
        });
      } else {
        const takenSeats = result.takenSeats || [];
        if (takenSeats.length > 0) {
          alert(`Sorry! The following seats are already reserved: ${takenSeats.join(", ")}`);
        } else {
          alert("Sorry! Some of the seats you selected are no longer available. Please choose again.");
        }
      }
    } catch (err) {
      console.error(err);
      alert("Error reserving seats.");
    }
  };

  const goToSummary = () => {
    if (adults + children !== selectedSeats.length) {
      alert("Please ensure the number of adults and children matches the selected seats.");
      return;
    }

    alert(
      `You selected seats: ${selectedSeats.join(", ")}\n` +
      `Adults: ${adults}, Children: ${children}`
    );
  };

  if (!data) return <div>Loading seats layout...</div>;

  // Make reversed copy so don't mutate original data
  const reversedData = [...data].reverse();

  // Label rows A, B, C... from front (screen side)
  const labeledData = reversedData.map((row, index) => ({
    ...row,
    label: String.fromCharCode(65 + index), // 65 = 'A'
  }));

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6 ml-4 mt-8 text-left uppercase">
          Book Your Seat</h2>

        <div className="px-8 py-4">
          <div className="mb-8">
            <MovieDetails showtimeId={showtimeId} />
          </div>

          {/* Seats */}
          <div className="flex flex-col items-center gap-1">
            {labeledData.map(({ label, seats }) => (
              <div key={label} className="flex gap-1 items-center">
                {seats.map(({ id, status, mapId, seatType }) => {
                  if (status === "space") return <div key={id} className="w-8 h-8" />;
                  if (status === "seat") {
                    const isSelected = selectedSeats.includes(mapId);
                    const isTempReserved = tempReservedSeats.includes(mapId);

                    let baseColorClass = "bg-gray-200 hover:bg-gray-500 text-black";// Normal
                    switch (seatType) {
                      case "VIP":
                        baseColorClass = "bg-yellow-200 hover:bg-yellow-500 text-black";
                        break;
                      case "Couple":
                        baseColorClass = "bg-pink-200 hover:bg-pink-500 text-white";
                        break;
                      case "Unavailable":
                        baseColorClass = "bg-gray-700 cursor-not-allowed text-white";
                        break;
                      case "Normal":
                      default:
                        baseColorClass = "bg-gray-200 hover:bg-gray-500 text-black";
                    }

                    const seatClass = isSelected
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : isTempReserved
                        ? "bg-red-500 cursor-not-allowed text-white"
                        : baseColorClass;

                    return (
                      <button
                        key={id}
                        className={`w-8 h-8 text-xs rounded cursor-pointer ${seatClass}`}
                        onClick={() => status === "seat" && seatType !== "Unavailable" && !isTempReserved && toggleSeat(mapId)}
                        title={`${mapId} (${seatType}${isTempReserved ? " - Temp Reserved" : ""})`}
                        disabled={seatType === "Unavailable" || isTempReserved}
                      >
                        {mapId}
                      </button>
                    );
                  }
                  return null;
                })}
              </div>
            ))}
          </div>
          {/* Screen Label */}
          <div className="mt-8 flex flex-col items-center">
            <div className="font-semibold mb-2">SCREEN</div>
            <svg
              className="w-64 h-6"
              viewBox="0 0 200 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 25 Q 100 5 190 25"
                stroke="black"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div></div>

          {/* Legend */}
          <div className="flex gap-4 mb-6 items-center">
            <Legend color="bg-blue-600" label="Selected" />
            <Legend color="bg-red-500" label="Reserved" />
            <Legend color="bg-gray-400" label="Normal" />
            <Legend color="bg-yellow-400" label="VIP" />
            <Legend color="bg-pink-400" label="Couple" />
            <Legend color="bg-gray-700" label="Unavailable" />
            {/*  <Legend color="bg-transparent border border-gray-300" label="Space" />*/}
          </div>

          {/* Divider Line */}
          {selectedSeats.length > 0 && (
            <div className="w-full my-6 border-t border-gray-300" />
          )}

          {/* Passenger Selection */}
          {selectedSeats.length > 0 && (
            <div className="mt-6 space-y-4">
              <h3 className="text-lg font-semibold">Passenger Details</h3>
              <div className="flex gap-6">
                {/* Adults */}
                <div>
                  <label className="block text-sm font-medium mb-1">Adults</label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setAdults((prev) => Math.max(prev - 1, 0))}
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      −
                    </button>
                    <span className="min-w-[30px] text-center">{adults}</span>
                    <button
                      type="button"
                      onClick={() =>
                        adults + children < selectedSeats.length && setAdults((prev) => prev + 1)
                      }
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Children */}
                <div>
                  <label className="block text-sm font-medium mb-1">Children</label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setChildren((prev) => Math.max(prev - 1, 0))}
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      −
                    </button>
                    <span className="min-w-[30px] text-center">{children}</span>
                    <button
                      type="button"
                      onClick={() =>
                        adults + children < selectedSeats.length && setChildren((prev) => prev + 1)
                      }
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              {adults + children !== selectedSeats.length && (
                <p className="text-red-500 text-sm mt-2">
                  Total passengers must equal selected seats ({selectedSeats.length})
                </p>
              )}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={() => navigate(`/booking/${showtimeId}`)}
              className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:bg-gray-400"
              type="button"
            >
              Back
            </button>

            {/* Continue Button */}
            <button
              onClick={goToReservation}
              disabled={
                selectedSeats.length === 0 || adults + children !== selectedSeats.length
              }
              className={`mt-6 px-6 py-2 rounded text-white 
                ${selectedSeats.length === 0 || adults + children !== selectedSeats.length
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
                }`}
              type="button"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const Legend = ({ color, label }) => (
  <div className="flex items-center gap-2">
    <div className={`w-6 h-6 rounded ${color} border border-gray-300`} />
    <span className="text-sm">{label}</span>
  </div>
);

export default function SeatingLayoutUI() {
  const [seatLayout, setSeatLayout] = React.useState(null);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    fetch("http://localhost:8080/api/seats/layout")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch seat layout");
        return res.json();
      })
      .then((data) => setSeatLayout(data))
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;
  if (!seatLayout) return <div className="p-4">Loading seat layout...</div>;

  return <SeatBooking data={seatLayout} />;
}
