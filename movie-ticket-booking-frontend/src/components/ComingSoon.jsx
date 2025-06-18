import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

export default function ComingSoon() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/movies/upcoming?page=0&size=10') // 10 movies
            .then(res => res.json())
            .then(data => {
                setMovies(data.content);  // <-- Use data.content here!
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to load movies:", err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="w-full mx-auto p-4">
            <h2 className="text-3xl font-bold mb-6 text-center text-pink-400 uppercase tracking-wider">
                Coming Soon
            </h2>

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
                {movies.map((movie) => {
                    console.log(movie);  // log here, outside JSX return

                    return (
                        <SwiperSlide key={movie.id}>
                            <div className="rounded-lg overflow-hidden shadow-lg bg-gray-900">
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
                                    alt={movie.title || "No Title"}
                                    className="w-full h-56 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="text-gray-400 text-sm">{movie.id}</h3>
                                    <h3 className="text-white text-lg font-semibold">{movie.title || "No Title"}</h3>
                                    <p className="text-gray-400 text-sm">{movie.releaseDate}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    );
                })}

            </Swiper>
        </div>
    );
}
