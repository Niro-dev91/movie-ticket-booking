import React from 'react';
import Navbar from "../components/Navbar";
import { Link, Outlet, useLocation } from "react-router-dom";

export default function Admin() {
    const stats = [
        { label: 'Total Users', value: 2345, icon: '👥' },
        { label: 'Movies Available', value: 120, icon: '🎬' },
        { label: 'Bookings Today', value: 567, icon: '🎟️' },
        { label: 'Revenue', value: '$12,345', icon: '💰' },
    ];

    const location = useLocation();
    const isDashboard = location.pathname === '/admin' || location.pathname === '/admin/';

    return (
        <>
            <Navbar />
            <div className="pt-24 px-4">
                <div className="min-h-screen bg-gray-100 flex">
                    {/* Sidebar */}
                    <aside className="w-64 bg-indigo-900 text-white flex flex-col">
                        <div className="p-6 text-2xl font-bold border-b border-indigo-800">Hello Admin</div>
                        <nav className="flex-grow p-6 space-y-4">
                            <Link to="/admin" className="block py-2 px-4 rounded hover:bg-indigo-700">Dashboard</Link>
                            <Link to="/admin/users" className="block py-2 px-4 rounded hover:bg-indigo-700">Users</Link>
                            <Link to="/admin/movie/add" className="block py-2 px-4 rounded hover:bg-indigo-700">Update Movie</Link>
                            <Link to="/admin/bookings" className="block py-2 px-4 rounded hover:bg-indigo-700">Bookings</Link>
                            <Link to="/admin/settings" className="block py-2 px-4 rounded hover:bg-indigo-700">Settings</Link>
                        </nav>
                        <div className="p-6 border-t border-indigo-800">
                            <button className="w-full bg-red-600 py-2 rounded hover:bg-red-700 transition">Logout</button>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 p-10">
                        {/* Show dashboard if on /admin, otherwise show nested page */}
                        {isDashboard ? (
                            <>
                                <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {stats.map(({ label, value, icon }) => (
                                        <div key={label} className="bg-white shadow rounded-lg p-6 flex items-center space-x-4">
                                            <div className="text-4xl">{icon}</div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">{label}</p>
                                                <p className="text-2xl font-semibold">{value}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <Outlet />  // Nested route like AddMovie shows here
                        )}
                    </main>
                </div>
            </div>
        </>
    );
}
