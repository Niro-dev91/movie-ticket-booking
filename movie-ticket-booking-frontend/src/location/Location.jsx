import React from 'react';
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar"; 

const locations = [
  {
    id: 1,
    name: "CINEWORLD MULTIPLEX - Havelock City Mall",
    image: "/images/havelock.jpg",
    features: ["DIGITAL 3D", "DIGITAL 2D", "7.1", "5.1"],
    link: "/locations/havelock"
  },
  {
    id: 2,
    name: "CINEWORLD MULTIPLEX - Colombo City Centre",
    image: "/images/colombo.jpg",
    features: ["DIGITAL 3D", "DIGITAL 2D", "7.1", "5.1"],
    link: "/locations/colombo"
  },
  {
    id: 3,
    name: "CINEWORLD CINEMAS - Colpetty",
    image: "/images/colpetty.jpg",
    features: ["DIGITAL 2D", "5.1"],
    link: "/locations/colpetty"
  },
  {
    id: 4,
    name: "CINEWORLD CINEMAS - Kiribathgoda",
    image: "/images/kiribathgoda.jpg",
    features: ["DIGITAL 2D", "5.1"],
    link: "/locations/kiribathgoda"
  },
];

export default function LocationsPage() {
  return (
    <>
          <Navbar /> 
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-6 ml-4 mt-8 text-left uppercase">
  Our Locations
</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {locations.map(location => (
          <div key={location.id} className="flex flex-col border rounded-lg overflow-hidden shadow hover:shadow-lg transition">
            <img src={location.image} alt={location.name} className="w-full h-64 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{location.name}</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {location.features.map((feature, idx) => (
                  <span key={idx} className="bg-black text-white text-xs px-2 py-1 rounded">{feature}</span>
                ))}
              </div>
              <a
                href={location.link}
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                VIEW LOCATION
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
