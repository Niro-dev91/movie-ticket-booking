import { useState, useEffect } from 'react';
import { FaPlay, FaInfoCircle, FaTicketAlt } from 'react-icons/fa';

export default function MovieBannerSlider({ movies }) {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % movies.length);
        }, 5000); // Change every 5 seconds

        return () => clearInterval(interval);
    }, [movies.length]);

    return (

        <div className="relative h-screen w-full overflow-hidden">
            {movies.map((movie, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
                        }`}
                    style={{
                        backgroundImage: `url(${movie.imageUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80 backdrop-blur-sm"></div>

                    {/* Text Content */}
                    <div className="absolute bottom-20 left-10 text-white max-w-xl">
                        <h1 className="text-4xl font-bold drop-shadow">{movie.title}</h1>
                        <p className="mt-2 text-lg drop-shadow">{movie.tagline}</p>
                        <div className="flex gap-4">
                            <a href={movie.trailer || "#"}>
                                <button className="mt-4 bg-red-600 px-5 py-2 rounded-lg text-sm hover:bg-red-700 transition w-40 flex items-center justify-center gap-2">
                                    <FaPlay /> Trailer
                                </button>
                            </a>
                            <a href={movie.bookNow || "#"}>
                                <button className="mt-4 bg-green-600 px-5 py-2 rounded-lg text-sm hover:bg-green-600 transition w-40 flex items-center justify-center gap-2">
                                    <FaTicketAlt /> Book Now
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
