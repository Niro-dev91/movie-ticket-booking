import React from "react";

export default function MovieDetails() {
    return (
        <div className="border-b pb-4">
            <h2 className="text-2xl font-semibold">Lilo & Stitch</h2>
            <div className="text-gray-600 flex flex-wrap gap-4 mt-2 text-sm">
                <span>📍 CINEMAS MULTIPLEX - Havelock City Mall</span>
                <span>📅 Thu, 31 Jul</span>
                <span className="font-bold text-black">IMAX 3D</span>
                <span className="bg-black text-white px-3 py-1 rounded">05:00 PM</span>
            </div>
        </div>
    );
}
