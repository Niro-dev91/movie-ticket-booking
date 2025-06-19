import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { FaPlay, FaInfoCircle, FaTicketAlt } from 'react-icons/fa';

export default function ComingSoon() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/movies/upcoming?page=0&size=20')
            .then(res => res.json())
            .then(data => {
                setMovies(data.content);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to load movies:", err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="relative w-full min-h-screen overflow-hidden">
            {/* Blurred background */}
            <img
                src="/assets/movie1.jpg"
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover opacity-30 blur-md -z-10"
            />
            <div className="absolute inset-0 bg-black/70 -z-10 backdrop-blur-sm"></div>

            {/* Heading */}
            <h2
                className="
    mt-12 mb-6
    flex justify-center items-center gap-4
    text-4xl font-semibold
    bg-gradient-to-r from-purple-400 via-pink-500 to-red-500
    bg-clip-text text-transparent drop-shadow-lg
    animate-pulse select-none tracking-wide uppercase
  "
                style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
                Coming Soon
                <svg
                    className="w-8 h-8 text-pink-500 animate-bounce"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
            </h2>


            {/* Swiper Section */}
            <div className="flex justify-center items-start px-4">
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={20}
                    slidesPerView={3}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    breakpoints={{
                        320: { slidesPerView: 1 },
                        480: { slidesPerView: 1 },
                        640: { slidesPerView: 2 },
                        768: { slidesPerView: 3 },
                        1024: { slidesPerView: 4 },
                        1280: { slidesPerView: 5 },
                        1536: { slidesPerView: 6 },
                    }}
                >
                    {movies.map((movie) => (
                        <SwiperSlide key={movie.id}>
                            <div className="rounded-lg overflow-hidden shadow-lg bg-gray-900">
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
                                    alt={movie.title || "No Title"}
                                    className="w-full h-72 object-cover"
                                />
                                <div className="p-5 flex flex-col gap-3">
                                    <h3 className="text-white text-xl font-bold truncate" title={movie.title || "No Title"}>
                                        {movie.title || "No Title"}
                                    </h3>
                                    <p className="text-gray-400 text-sm">{new Date(movie.releaseDate).toLocaleDateString()}</p>
                                    <div className="mt-auto flex gap-3">
                                       <a href={movie.trailer} target="_blank" rel="noreferrer">
                                            <button className="flex items-center gap-2 bg-red-600 bg-opacity-90 px-4 py-2 rounded-lg hover:bg-red-700 transition text-sm shadow-md">
                                                <FaPlay /> Trailer
                                            </button>
                                        </a>
                                        <a href={movie.viewMore}>
                                            <button className="flex items-center gap-2 bg-blue-600 bg-opacity-90 px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm shadow-md">
                                                <FaInfoCircle /> View
                                            </button>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}
