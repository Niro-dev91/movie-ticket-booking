import React from "react";

export default function PricingFilter({
    filterDate,
    setFilterDate,
    filterLocationId,
    setFilterLocationId,
    locations,
    onSearch
}) {
    return (
        <div className="bg-white p-4 rounded shadow max-w-4xl mx-auto flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
            <div className="flex-1">
                <label className="block text-sm font-medium mb-1">Date</label>
                <input
                    type="date"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                    className="border p-2 rounded w-full"
                />
            </div>

            <div className="flex-1">
                <label className="block text-sm font-medium mb-1">Location</label>
                <select
                    value={filterLocationId}
                    onChange={(e) => setFilterLocationId(e.target.value)}
                    className="border p-2 rounded w-full"
                >
                    <option value="">All Locations</option>
                    {locations.map((loc) => (
                        <option key={loc.id} value={loc.id}>
                            {loc.locationName}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex-shrink-0">
                <button
                    onClick={onSearch}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
                >
                    Search
                </button>
            </div>
        </div>
    );
}
