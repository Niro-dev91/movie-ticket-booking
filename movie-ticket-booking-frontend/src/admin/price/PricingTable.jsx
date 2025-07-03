import React, { useState } from "react";

export default function PricingTable({ showtimes, handleSaveAllPricing }) {
    const [localPrices, setLocalPrices] = useState(() =>
        showtimes.map(s => ({
            id: s.id,
            normal: s.pricing?.normal || "",
            vip: s.pricing?.vip || "",
            couple: s.pricing?.couple || "",
            child: s.pricing?.child || ""
        }))
    );

    React.useEffect(() => {
        setLocalPrices(
            showtimes.map(s => ({
                id: s.id,
                normal: s.pricing?.normal || "",
                vip: s.pricing?.vip || "",
                couple: s.pricing?.couple || "",
                child: s.pricing?.child || ""
            }))
        );
    }, [showtimes]);

    const handleChange = (id, field, value) => {
        setLocalPrices(prices =>
            prices.map(p =>
                p.id === id ? { ...p, [field]: value } : p
            )
        );
    };

    return (
        <div className="overflow-x-auto mt-6">
            <table className="w-full table-auto border">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-2 border hidden">ShowtimeId</th>
                        <th className="p-2 border">Movie</th>
                        <th className="p-2 border">Location</th>
                        <th className="p-2 border">Date</th>
                        <th className="p-2 border">Start Time</th>
                        <th className="p-2 border">End Time</th>
                        <th className="p-2 border">Normal</th>
                        <th className="p-2 border">VIP</th>
                        <th className="p-2 border">Couple</th>
                        <th className="p-2 border">Child</th>
                    </tr>
                </thead>
                <tbody>
                    {showtimes.length === 0 && (
                        <tr>
                            <td colSpan="8" className="text-center p-4 text-gray-500">
                                No showtimes found.
                            </td>
                        </tr>
                    )}
                    {showtimes.map((s, i) => {
                        const price = localPrices.find(p => p.id === s.id) || {};
                        return (
                            <tr key={s.id} className="text-center">
                                <td className="border p-2 hidden">{s.id}</td>
                                <td className="border p-2">{s.title}</td>
                                <td className="border p-2">{s.locationName}</td>
                                <td className="border p-2">{s.date}</td>
                                <td className="border p-2">{s.startTime}</td>
                                <td className="border p-2">{s.endTime}</td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        value={price.normal}
                                        onChange={(e) => handleChange(s.id, "normal", e.target.value)}
                                        className="border p-1 w-20"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        value={price.vip}
                                        onChange={(e) => handleChange(s.id, "vip", e.target.value)}
                                        className="border p-1 w-20"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        value={price.couple}
                                        onChange={(e) => handleChange(s.id, "couple", e.target.value)}
                                        className="border p-1 w-20"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        value={price.child}
                                        onChange={(e) => handleChange(s.id, "child", e.target.value)}
                                        className="border p-1 w-20"
                                    />
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <button
                onClick={handleSaveAllPricing}
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
                Save All Pricing
            </button>

        </div>
    );
}
