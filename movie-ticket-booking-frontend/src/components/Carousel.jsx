import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';

import { Pagination, Navigation, Autoplay, EffectCoverflow } from 'swiper/modules';
import { FaPlay, FaInfoCircle, FaTicketAlt } from 'react-icons/fa';

const movies = [
    {
        title: "Lilo and Stitch",
        img: "/assets/movie1.jpg",
        trailer: "https://www.youtube.com/watch?v=XXXXX",
        viewMore: "/movies/Lilo_and_Stitch",
        bookNow: "/book/Lilo_and_Stitch"
    },
    {
        title: "How to Train Your Dragon",
        img: "/assets/movie2.jpg",
        trailer: "https://www.youtube.com/watch?v=YYYYY",
        viewMore: "/movies/How_to_Train_Your_Dragon",
        bookNow: "/book/How_to_Train_Your_Dragon"
    },
    {
        title: "The Witcher",
        img: "/assets/movie3.jpg",
        trailer: "https://www.youtube.com/watch?v=ZZZZZ",
        viewMore: "/movies/The_Witcher",
        bookNow: "/book/The_Witcher"
    },
    {
        title: "How to Train Your Dragon",
        img: "/assets/movie2.jpg",
        trailer: "https://www.youtube.com/watch?v=YYYYY",
        viewMore: "/movies/How_to_Train_Your_Dragon",
        bookNow: "/book/How_to_Train_Your_Dragon"
    },
    {
        title: "The Witcher",
        img: "/assets/movie3.jpg",
        trailer: "https://www.youtube.com/watch?v=ZZZZZ",
        viewMore: "/movies/The_Witcher",
        bookNow: "/book/The_Witcher"
    },
    {
        title: "Alien",
        img: "/assets/movie4.jpg",
        trailer: "https://www.youtube.com/watch?v=YYYYY",
        viewMore: "/movies/Alien",
        bookNow: "/book/Alien"
    },
    {
        title: "Mission Impossible",
        img: "/assets/movie5.jpg",
        trailer: "https://www.youtube.com/watch?v=ZZZZZ",
        viewMore: "/movies/Mission_Impossible",
        bookNow: "/book/Mission_Impossible"
    },
];

export default function Carousel() {
    return (
        <div className="relative w-full min-h-screen overflow-hidden">
            {/* Blurred background */}
            <img
                src="/assets/movie1.jpg"
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover opacity-30 blur-md -z-10"
            />
            <div className="absolute inset-0 bg-black/70 -z-10 backdrop-blur-sm"></div>
            <h2
                className="
        mt-12
        justify-center 
        flex
        items-center
        gap-4
        text-4xl 
        font-semibold
        bg-gradient-to-r 
        from-purple-400 
        via-pink-500 
        to-red-500 
        bg-clip-text 
        text-transparent 
        drop-shadow-lg 
        animate-pulse
        select-none
        tracking-wide
        uppercase
      "
                style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
                Now Showing
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
            {/* Carousel */}
            <div className="relative z-10 w-full max-w-screen-xl mx-auto py-12 px-4">
                <Swiper
                    modules={[Pagination, Navigation, Autoplay, EffectCoverflow]}
                    effect="coverflow"
                    grabCursor
                    centeredSlides
                    loop
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                    }}
                    slidesPerView={1.5} // Show one large, one partial
                    spaceBetween={0}    // No gap
                    pagination={{ clickable: true }}
                    navigation
                    coverflowEffect={{
                        rotate: 15,
                        stretch: 0,
                        depth: 200,
                        modifier: 2,
                        slideShadows: true,
                    }}
                >
                    {movies.map((movie, idx) => (
                        <SwiperSlide key={idx} className="rounded-xl overflow-hidden">
                            <div className="relative group">
                                <img
                                    src={movie.img}
                                    alt={movie.title}
                                    className="w-full h-[500px] object-cover rounded-xl"
                                />
                                <div className="absolute bottom-6 left-6 text-white">
                                    <h2 className="text-xl font-bold drop-shadow">{movie.title}</h2>
                                    <div className="flex flex-wrap gap-3 mt-2">
                                        <a href={movie.trailer} target="_blank" rel="noreferrer">
                                            <button className="flex items-center gap-2 bg-red-600 bg-opacity-90 px-4 py-2 rounded-lg hover:bg-red-700 transition text-sm shadow-md">
                                                <FaPlay /> Trailer
                                            </button>
                                        </a>
                                        <a href={movie.viewMore}>
                                            <button className="flex items-center gap-2 bg-blue-600 bg-opacity-90 px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm shadow-md">
                                                <FaInfoCircle /> View More
                                            </button>
                                        </a>
                                        <a href={movie.bookNow}>
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
