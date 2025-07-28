import React, { useState } from "react";

export default function SeatLayout({ seatData, setSeatData }) {
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [newRowLabel, setNewRowLabel] = useState("");
  const [newRowSeatCount, setNewRowSeatCount] = useState(10);

  const addRow = () => {
    const label = newRowLabel.trim().toUpperCase();
    if (!label) {
      alert("Row label is required");
      return;
    }
    if (seatData.find((r) => r.label === label)) {
      alert("Row label must be unique");
      return;
    }
    if (newRowSeatCount < 1) {
      alert("Seat count must be at least 1");
      return;
    }
    const seats = Array(newRowSeatCount)
      .fill(null)
      .map((_, i) => ({ id: i + 1, status: "seat", seatType: "Normal" }));

    setSeatData([...seatData, { label, seats }]);
    setNewRowLabel("");
    setNewRowSeatCount(10);
    setSelectedRowIndex(seatData.length);
  };

  const removeRow = () => {
    if (selectedRowIndex === null) return;
    const newData = [...seatData];
    newData.splice(selectedRowIndex, 1);
    setSeatData(newData);
    setSelectedRowIndex(null);
  };

  const updateSeatCount = (count) => {
    if (selectedRowIndex === null) return;
    count = Math.max(1, count);
    const newData = [...seatData];
    const row = { ...newData[selectedRowIndex] };
    let seats = [...row.seats];
    const currentCount = seats.length;

    if (count > currentCount) {
      const seatsToAdd = Array(count - currentCount)
        .fill(null)
        .map((_, i) => ({ id: currentCount + i + 1, status: "seat", seatType: "Normal" }));
      seats = [...seats, ...seatsToAdd];
    } else if (count < currentCount) {
      seats = seats.slice(0, count);
    }

    row.seats = seats;
    newData[selectedRowIndex] = row;
    setSeatData(newData);
  };

  const toggleSeatStatus = (seatIndex) => {
    if (selectedRowIndex === null) return;
    const newData = [...seatData];
    const row = { ...newData[selectedRowIndex] };
    const seats = [...row.seats];
    const seat = { ...seats[seatIndex] };

    // Not allow toggling Unavailable seats
    if (seat.seatType === "Unavailable") return;

    seat.status = seat.status === "seat" ? "space" : "seat";

    if (seat.status === "space") {
      delete seat.seatType;
    } else {
      if (!seat.seatType) seat.seatType = "Normal";
    }

    seats[seatIndex] = seat;
    row.seats = seats;
    newData[selectedRowIndex] = row;

    setSeatData(newData);
  };

  const saveLayout = async () => {
    const mapped = seatData.map((row) => {
      let seatNumber = 0;
      const seats = row.seats.map((seat) => {
        if (seat.status === "seat") {
          seatNumber++;
          return {
            seatNumber,
            status: seat.status,
            seatType: seat.seatType || "Normal",
            mapId: `${row.label}${seatNumber}`,
          };
        } else {
          return {
            status: seat.status,
          };
        }
      });

      return {
        label: row.label,
        seats,
      };
    });

    try {
      const response = await fetch("/api/seats/layout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mapped),
      });

      if (!response.ok) throw new Error(`Failed: ${response.statusText}`);

      const result = await response.json();
      alert("Layout saved successfully!");
      console.log("Response from backend:", result);
    } catch (error) {
      alert("Failed to save seat layout: " + error.message);
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Add Row */}
      <div className="flex space-x-3 items-center">
        <input
          type="text"
          maxLength={2}
          placeholder="Row label (e.g. A)"
          className="border rounded px-3 py-1 w-20 text-center"
          value={newRowLabel}
          onChange={(e) => setNewRowLabel(e.target.value.toUpperCase())}
        />
        <input
          type="number"
          min={1}
          placeholder="Seat count"
          className="border rounded px-3 py-1 w-24 text-center"
          value={newRowSeatCount}
          onChange={(e) => {
            const val = Number(e.target.value);
            setNewRowSeatCount(isNaN(val) ? 1 : val);
          }}
        />
        <button
          onClick={addRow}
          className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
        >
          Add Row
        </button>
      </div>

      {/* Row selector */}
      <div className="flex space-x-2 overflow-x-auto">
        {seatData.map((row, idx) => (
          <button
            key={row.label}
            onClick={() => setSelectedRowIndex(idx)}
            className={`px-4 py-2 rounded whitespace-nowrap border ${idx === selectedRowIndex
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-gray-200 hover:bg-gray-300"
              }`}
          >
            Row {row.label} ({row.seats.length})
          </button>
        ))}
        {selectedRowIndex !== null && (
          <button
            onClick={removeRow}
            className="ml-auto bg-red-600 text-white px-4 rounded hover:bg-red-700"
          >
            Remove Selected Row
          </button>
        )}
      </div>

      {/* Seat count and seat toggling + seat type */}
      {selectedRowIndex !== null && (
        <div>
          <h3 className="text-lg font-semibold mb-3">
            Configure Row {seatData[selectedRowIndex].label}
          </h3>

          <label className="mb-3 block">
            Seats count:{" "}
            <input
              type="number"
              min={1}
              className="border rounded px-2 py-1 w-20 text-center"
              value={seatData[selectedRowIndex].seats.length}
              onChange={(e) => updateSeatCount(Number(e.target.value))}
            />
          </label>

          <div className="flex flex-wrap gap-4 max-w-full overflow-auto">
            {seatData[selectedRowIndex].seats.map((seat, idx) => (
              <div
                key={`${seatData[selectedRowIndex].label}-${seat.id}`}
                className="flex flex-col items-center"
              >
                <button
                  onClick={() => toggleSeatStatus(idx)}
                  className={`w-10 h-10 rounded border select-none mb-1
                    ${seat.status === "seat"
                      ? seat.seatType === "VIP"
                        ? "bg-red-600 text-white hover:bg-red-700"
                        : seat.seatType === "Normal"
                          ? "bg-green-500 text-white hover:bg-green-600"
                          : seat.seatType === "Couple"
                            ? "bg-purple-600 text-white hover:bg-purple-700"
                            : seat.seatType === "Unavailable"
                              ? "bg-gray-600 text-white cursor-not-allowed"
                              : "bg-gray-500 text-white"
                      : "bg-transparent cursor-default"
                    }
                  `}
                  title={`Seat ${seat.id} is ${seat.status} (${seat.seatType || "None"})`}
                  disabled={seat.seatType === "Unavailable"}
                >
                  {seat.status === "seat" ? seat.id : ""}
                </button>

                {seat.status === "seat" && (
                  <select
                    value={seat.seatType}
                    onChange={(e) => {
                      const newData = [...seatData];
                      newData[selectedRowIndex] = { ...newData[selectedRowIndex] };
                      newData[selectedRowIndex].seats = [...newData[selectedRowIndex].seats];
                      newData[selectedRowIndex].seats[idx] = {
                        ...newData[selectedRowIndex].seats[idx],
                        seatType: e.target.value,
                      };
                      setSeatData(newData);
                    }}
                    className="text-xs rounded border p-1 w-full"
                    disabled={seat.seatType === "Unavailable"}
                  >
                    <option value="Normal">Normal</option>
                    <option value="VIP">VIP</option>
                    <option value="Couple">Couple</option>
                    <option value="Unavailable">Unavailable</option>
                  </select>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="text-center mt-6">
        <button
          onClick={saveLayout}
          className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800"
        >
          Save Layout
        </button>
      </div>
    </div>
  );
}
