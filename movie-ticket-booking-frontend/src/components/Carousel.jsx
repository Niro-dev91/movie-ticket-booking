import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useNavigate } from "react-router-dom";

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';

import { Pagination, Navigation, Autoplay, EffectCoverflow } from 'swiper/modules';
import { FaPlay, FaInfoCircle, FaTicketAlt } from 'react-icons/fa';

export default function Carousel() {
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:8080/api/movies/allmovies')
            .then(res => res.json())
            .then(data => setMovies(data))
            .catch(err => console.error("Error loading featured movies", err));
    }, []);

    return (
        <div className="relative w-full min-h-screen overflow-hidden">
            {/* Background */}
            <img
                src="/assets/movie1.jpg"
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover opacity-30 blur-md -z-10"
            />
            <div className="absolute inset-0 bg-black/70 -z-10 backdrop-blur-sm"></div>

            {/* Title */}
            <h2 className="mt-12 justify-center flex items-center gap-4 text-4xl font-semibold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent drop-shadow-lg animate-pulse select-none tracking-wide uppercase"
                style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Now Showing
                <svg className="w-8 h-8 text-pink-500 animate-bounce" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
            </h2>

            {/* Carousel */}
            <div className="relative z-10 w-full max-w-screen-xl mx-auto py-12 px-4">
                <Swiper
                    modules={[Pagination, Navigation, Autoplay, EffectCoverflow]}
                    effect="coverflow"
                    grabCursor
                    centeredSlides
                    loop
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    slidesPerView={1.5}
                    spaceBetween={0}
                    pagination={{ clickable: true }}
                    navigation
                    coverflowEffect={{ rotate: 15, stretch: 0, depth: 200, modifier: 2, slideShadows: true }}
                >
                    {movies.map((movie, idx) => (
                        <SwiperSlide key={idx} className="rounded-xl overflow-hidden">
                            <div className="relative group">
                                <img
                                    src={movie.imageUrl || movie.backdropUrl}
                                    alt={movie.title}
                                    className="w-full h-[500px] object-contain rounded-xl"
                                />
                                <div className="absolute bottom-6 left-6 text-white">
                                    <h2 className="text-xl font-bold drop-shadow">{movie.title}</h2>
                                    <p className="italic text-gray-300 mb-2">{movie.tagline}</p>
                                    <div className="flex flex-wrap gap-3 mt-2">
                                        <a href={movie.videoLink} target="_blank" rel="noreferrer">
                                            <button className="flex items-center gap-2 bg-red-600 bg-opacity-90 px-4 py-2 rounded-lg hover:bg-red-700 transition text-sm shadow-md">
                                                <FaPlay /> Trailer
                                            </button>
                                        </a>
                                        <button
                                            onClick={() => navigate(`/movies/${movie.tmdbId}`)}

                                            className="flex items-center gap-2 bg-blue-600 bg-opacity-90 px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm shadow-md"
                                        >
                                            <FaInfoCircle /> View More
                                        </button>

                                        <a href={movie.bookNow || "/booking"}>
                                            <button className="flex items-center gap-2 bg-green-600 bg-opacity-90 px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm shadow-md">
                                                <FaTicketAlt /> Book Now
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
function handleViewMore(movieId) {
    window.location.href = '/movies/${movieId}';
}