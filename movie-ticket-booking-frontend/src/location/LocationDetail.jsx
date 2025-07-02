import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from "../components/Navbar";
import { FiMapPin, FiPhone, FiMail } from 'react-icons/fi';

export default function LocationDetail() {
  const { locationLink } = useParams();
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/location/${locationLink}`);
        setLocation(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load location details.");
      } finally {
        setLoading(false);
      }
    };

    fetchLocation();
  }, [locationLink]);

  return (
    <>
      <Navbar />

      <div className="flex flex-col min-h-screen bg-white text-gray-800">

        {loading && (
          <div className="flex justify-center items-center flex-1">
            <p className="text-gray-500 text-lg">Loading location details...</p>
          </div>
        )}

        {error && (
          <div className="flex justify-center items-center flex-1">
            <p className="text-red-600 text-lg">{error}</p>
          </div>
        )}

        {!loading && location && (
          <>
            {/* Header Image with Features Overlay */}
            <div className="w-full max-h-[400px] relative overflow-hidden">
              <img
                src={location.imageUrl ? location.imageUrl : "/images/placeholder.jpg"}
                alt={location.locationName}
                className="w-full h-[400px] object-cover"
              />

              {/* Features Overlay */}
              {location.features && location.features.length > 0 && (
                <div className="absolute bottom-0 w-full bg-black bg-opacity-80 py-4 px-6 flex flex-wrap gap-3 justify-center">
                  {location.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="text-white text-sm px-4 py-2 rounded-full border border-white"
                    >
                      {feature.name}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Details Section */}
            <div className="flex flex-col px-4 py-8 max-w-3xl mx-auto">
              <h1 className="text-3xl font-bold mb-6 text-center text-indigo-800">
                {location.theaterName} - {location.locationName}
              </h1>
              {/* Description Card */}
              {location.description && (
                <div className="bg-white shadow-md rounded-lg p-6 text-gray-700 border mb-8">
                  <p className="font-medium">{location.description}</p>
                </div>
              )}

              <div className="bg-white shadow-md rounded-lg p-6 space-y-4 text-gray-700 border">
                <div className="flex items-center gap-3">
                  <FiMapPin className="text-indigo-600 text-xl" />
                  <span className="font-medium">{location.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <FiPhone className="text-indigo-600 text-xl" />
                  <span className="font-medium">{location.phoneNo}</span>
                </div>
                <div className="flex items-center gap-3">
                  <FiMail className="text-indigo-600 text-xl" />
                  <span className="font-medium">{location.email}</span>
                </div>
              </div>

              <div className="mt-8 flex justify-center">
                <a
                  href="#"
                  className="inline-block px-6 py-3 bg-indigo-700 text-white rounded hover:bg-indigo-800 transition shadow"
                >
                  BUY TICKETS
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
