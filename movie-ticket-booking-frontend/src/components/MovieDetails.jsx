import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function MovieDetails() {
    const { showtimeId } = useParams();
    const [details, setDetails] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!showtimeId) return;

        fetch(`http://localhost:8080/api/showtimes/${showtimeId}`)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch showtime details");
                return res.json();
            })
            .then((data) => setDetails(data))
            .catch((err) => setError(err.message));
    }, [showtimeId]);

    if (error) return <div className="text-red-600">Error: {error}</div>;
    if (!details) return <div>Loading movie details...</div>;

    return (
        <div className="border-b pb-4">
            <h2 className="text-2xl font-semibold">{details.title}</h2>
            <div className="text-gray-600 flex flex-wrap gap-4 mt-2 text-sm">
                <span>{details.locationName}</span>
                <span>{details.date}</span>
                <span className="bg-black text-white px-3 py-1 rounded">
                    {details.startTime}
                </span>
            </div>
        </div>
    );
}
