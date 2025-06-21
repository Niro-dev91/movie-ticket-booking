import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar"; 

const Booking = () => {
  const { id } = useParams();

 return (
    <>
      <Navbar /> 
      <div className="pt-24 px-4"> {/* Padding top to avoid overlap with fixed navbar */}
        <h2 className="text-2xl font-bold mb-4">Booking for Movie ID: {id}</h2>
        <p>Seat selection and booking functionality coming soon!</p>
      </div>
    </>
  );
};

export default Booking;
