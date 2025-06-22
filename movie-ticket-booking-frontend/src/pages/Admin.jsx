import React from 'react';
import Navbar from "../components/Navbar";

export default function Admin() {
    const stats = [
  { label: 'Total Users', value: 2345, icon: '👥' },
  { label: 'Movies Available', value: 120, icon: '🎬' },
  { label: 'Bookings Today', value: 567, icon: '🎟️' },
  { label: 'Revenue', value: '$12,345', icon: '💰' },
];
  return (
    <>
      <Navbar />
      <div className="pt-24 px-4"> {/* Padding top to avoid overlap with fixed navbar */}
      <div>Admin Page - Only accessible by Admin users</div>
      </div>
    </>
  );
}
