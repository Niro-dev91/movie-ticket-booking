import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
//import { FaMapMarkerAlt, FaCalendarAlt, FaClock } from "react-icons/fa";
import {
    Film,
    MapPin,
    Calendar1,
    Clock,
} from 'lucide-react';

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
                <div className="text-gray-800 font-bold text-lg flex items-center gap-2 mb-1">
                    <Film size={18} /> {details.title}
                </div>
                <div className="text-gray-600 flex flex-col gap-2 mt-2 text-sm">
                    <span className="flex items-center gap-2">
                        <MapPin size={18} /> {details.locationName}
                    </span>
                    <span className="flex items-center gap-2">
                        <Calendar1 size={18} /> {details.date}
                    </span>
                    <span className="flex items-center gap-2">
                        <span>
                            <Clock size={18} />
                        </span>
                        <span className="flex items-center gap-2 bg-black text-white px-3 py-1 rounded w-fit">
                            {new Date(`${details.date}T${details.startTime}`).toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true,
                            }).toUpperCase()}
                        </span>
                    </span>
                </div>
            </div>
        </div>
    );
}
