import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";


export default function LocationsPage() {

  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/location/all');
        setLocations(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load locations.");
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6 ml-4 mt-8 text-left uppercase">
          Our Locations
        </h2>

        {loading && <p className="text-center text-gray-500">Loading locations...</p>}
        {error && <p className="text-center text-red-600">{error}</p>}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {locations.map(location => (
              <div key={location.id} className="flex flex-col border rounded-lg overflow-hidden shadow hover:shadow-lg transition">
                <img
                  src={location.imageUrl ? `${location.imageUrl}` : "/images/placeholder.jpg"}
                  alt={location.locationName}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{location.theaterName} - {location.locationName}</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {location.features && location.features.map((feature, idx) => (
                      <span key={idx} className="bg-black text-white text-xs px-2 py-1 rounded">{feature.name}</span>
                    ))}
                  </div>
                  <Link
                    to={`/location/LocationDetail/${location.locationLink}`}
                    className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                  >
                    VIEW LOCATION
                  </Link>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
