import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from "../components/Navbar";

export default function Deal() {
  return (
    <>
      <Navbar />
      <div className="pt-24 px-4"> {/* Padding top to avoid overlap with fixed navbar */}
      <div>deals And exclusives</div>
      </div>
    </>
  );
}
