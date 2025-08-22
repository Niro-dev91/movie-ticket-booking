import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaMapMarkerAlt, FaCalendarAlt, FaClock } from "react-icons/fa";

export default function MovieDetails() {
    const { showtimeId } = useParams();
    const [details, setDetails] = useState(null);
    const [posterUrl, setPosterUrl] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!showtimeId) return;

        const fetchData = async () => {
            try {
                const detailsRes = await axios.get(
                    `http://localhost:8080/api/showtimes/${showtimeId}`
                );
                console.log("Showtime details:", detailsRes.data);
                setDetails(detailsRes.data);

                if (detailsRes.data.movieId) {
                    const posterRes = await axios.get(
                        `http://localhost:8080/api/movies/moviedetails/${detailsRes.data.movieId}`
                    );
                    console.log("Movie details:", posterRes.data);

                    if (posterRes.data.posterPath) {
                        setPosterUrl(posterRes.data.posterPath);
                    }
                }
            } catch (err) {
                console.error("Error fetching movie details:", err);
                setError(err.message);
            }
        };

        fetchData();
    }, [showtimeId]);

    if (error) return <div className="text-red-600">Error: {error}</div>;
    if (!details) return <div>Loading movie details...</div>;

    return (
        <div className="border-b pb-4 flex items-start gap-4">
            {/* Poster on left */}
            {posterUrl && (
                <img
                    src={posterUrl}
                    alt={`${details.title} poster`}
                    className="w-24 rounded shadow" // smaller image size
                />
            )}

            {/* Text content on right */}
            <div>
                <h2 className="text-2xl font-semibold">{details.title}</h2>

                <div className="text-gray-600 flex flex-col gap-2 mt-2 text-sm">
                    <span className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-red-500" /> {details.locationName}
                    </span>
                    <span className="flex items-center gap-2">
                        <FaCalendarAlt className="text-blue-500" /> {details.date}
                    </span>
                    <span className="flex items-center gap-2">
                        <span>
                            <FaClock className="text-yellow-400" />
                        </span>
                        <span className="flex items-center gap-2 bg-black text-white px-3 py-1 rounded w-fit">
                            {details.startTime}</span>
                    </span>

                </div>
            </div>
        </div>
    );
}
