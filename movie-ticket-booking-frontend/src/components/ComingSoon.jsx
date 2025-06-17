import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

const comingSoonMovies = [
    {
        title: 'Elio',
        image: '/assets/coming_soon/movie1.jpg',
        releaseDate: 'August 2025',
    },
    {
        title: '28 Years Later',
        image: '/assets/coming_soon/movie2.jpg',
        releaseDate: 'September 2025',
    },
    {
        title: 'Deep Cover',
        image: '/assets/coming_soon/movie3.jpg',
        releaseDate: 'October 2025',
    },
    {
        title: 'Final Destination',
        image: '/assets/coming_soon/movie4.jpg',
        releaseDate: 'November 2025',
    },
    {
        title: 'The Amateur',
        image: '/assets/coming_soon/movie5.jpg',
        releaseDate: 'December 2025',
    },
    {
        title: 'Elio',
        image: '/assets/coming_soon/movie1.jpg',
        releaseDate: 'August 2025',
    },
    {
        title: '28 Years Later',
        image: '/assets/coming_soon/movie2.jpg',
        releaseDate: 'September 2025',
    },
    {
        title: 'Deep Cover',
        image: '/assets/coming_soon/movie3.jpg',
        releaseDate: 'October 2025',
    },
    {
        title: 'Final Destination',
        image: '/assets/coming_soon/movie4.jpg',
        releaseDate: 'November 2025',
    },
    {
        title: 'The Amateur',
        image: '/assets/coming_soon/movie5.jpg',
        releaseDate: 'December 2025',
    },
];

export default function ComingSoon() {
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
                {comingSoonMovies.map((movie, idx) => (
                    <SwiperSlide key={idx}>
                        <div className="rounded-lg overflow-hidden shadow-lg bg-gray-900">
                            <img
                                src={movie.image}
                                alt={movie.title}
                                className="w-full h-56 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-white text-lg font-semibold">{movie.title}</h3>
                                <p className="text-gray-400 text-sm">{movie.releaseDate}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
