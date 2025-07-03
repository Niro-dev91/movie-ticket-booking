import React, { useState, useEffect } from "react";
import axios from "axios";
import PricingFilter from "./PricingFilter";
import PricingTable from "./PricingTable";


export default function PricingAdmin() {
    const [showtimes, setShowtimes] = useState([]);
    const [locations, setLocations] = useState([]);
    const [filterDate, setFilterDate] = useState("");
    const [filterLocationId, setFilterLocationId] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchLocations();
    }, []);

    // Fetch all locations for the filter
    const fetchLocations = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/api/location/all`);
            setLocations(res.data);
        } catch (err) {
            console.error(err);
            alert("Error fetching locations");
        }
    };

    // Fetch showtimes for given date & location filter
    const fetchShowtimes = async () => {
        try {
            setLoading(true);
            const params = {};
            if (filterDate) params.date = filterDate;
            if (filterLocationId) params.locationId = filterLocationId;

            const res = await axios.get(`http://localhost:8080/api/showtimes/search`, { params });

            // Add *default empty pricing* to each showtime
            const withPricingDefaults = res.data.map(s => ({
                ...s,
                pricing: {
                    normal: "",
                    vip: "",
                    couple: "",
                    child: ""
                }
            }));

            setShowtimes(withPricingDefaults);
        } catch (err) {
            console.error(err);
            alert("Error fetching showtimes");
        } finally {
            setLoading(false);
        }
    };

    // Handle in-table pricing field updates
    const handlePricingChange = (id, field, value) => {
        setShowtimes(prev =>
            prev.map(s =>
                s.id === id
                    ? {
                        ...s,
                        pricing: {
                            ...s.pricing,
                            [field]: value
                        }
                    }
                    : s
            )
        );
    };

    const handleSaveAllPricing = async () => {
        try {
            // Prepare data - just send showtime id and pricing for each showtime
            const PricingData = showtimes.map(s => ({
                id: s.id,
                pricing: s.pricing,
            }));

            await axios.put(`http://localhost:8080/api/pricing/save`, PricingData);

            alert("All pricing saved successfully");
        } catch (err) {
            console.error(err);
            alert("Failed to save");
        }
    };


    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <h1 className="text-3xl font-bold mb-6">ShowTime Pricing</h1>

            <PricingFilter
                filterDate={filterDate}
                setFilterDate={setFilterDate}
                filterLocationId={filterLocationId}
                setFilterLocationId={setFilterLocationId}
                locations={locations}
                onSearch={fetchShowtimes}
            />

            {loading && <p className="text-center text-gray-600 mt-4">Loading showtimes...</p>}

            <PricingTable
                showtimes={showtimes}
                onPricingChange={handlePricingChange}
            />
        </div>
    );
}
