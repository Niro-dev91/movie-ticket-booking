import React, { useState } from "react";
import UserScore from "../components/UserScore";
import Navbar from "../components/Navbar";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper/modules';

export default function MovieDetails({ movie }) {
  const [showTrailer, setShowTrailer] = useState(false);
  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const backdropUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
  const directors = movie.credits.crew.filter(c => c.job === "Director");
  const writers = movie.credits.crew.filter(c => c.job === "Screenplay" || c.job === "Story");

  const language = new Intl.DisplayNames(['en'], { type: 'language' }).of(movie.original_language);

  // Find YouTube trailer video
  const trailer = movie.videos?.results?.find(
    vid => vid.type === "Trailer" && vid.site === "YouTube"
  );
  const trailerUrl = trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;

  return (
    <>
      <Navbar />
      <div
        className="relative bg-cover bg-center text-white min-h-screen "
        style={{ backgroundImage: `url(${backdropUrl})` }}//,marginTop: '64px' 
      >
        <div className="bg-black bg-opacity-80 min-h-screen pt-10">
          <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row gap-8">
            {/* Left Side Poster */}
            <div className="w-full md:w-1/3">
              <img src={posterUrl} alt={movie.title} className="rounded-xl shadow-lg" />
            </div>

            {/* Right Side Content */}
            <div className="w-full md:w-2/3">
              <h1 className="text-4xl font-bold mb-2">
                {movie.title}{" "}
                <span className="text-gray-300">({movie.release_date?.slice(0, 4)})</span>
              </h1>

              <p className="mb-4 text-gray-400">
                {movie.release_date} • {language} • {movie.genres.map(g => g.name).join(", ")} •{" "}
                {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
              </p>

              {/* User Score and Play Trailer */}
              <div className="flex items-center gap-4 mb-6 font-bold">
                <UserScore score={movie.vote_average} />
                {trailer && (
                  <button
                    onClick={() => setShowTrailer(true)}
                    className="bg-red-600 text-white px-4 py-2 rounded"
                  >
                    ▶ Play Trailer
                  </button>
                )}

                {showTrailer && (
                  <div className="mt-6 relative w-full" style={{ paddingTop: '56.25%' }}>
                    <button
                      onClick={() => setShowTrailer(false)}
                      className="absolute top-2 right-2 z-10 bg-black bg-opacity-50 text-white px-3 py-1 rounded hover:bg-opacity-80"
                    >
                      Close
                    </button>

                    <iframe
                      className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                      src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
                      title="Trailer"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                )}

              </div>

              {/* Overview and tagline */}
              {movie.tagline && (
                <p className="italic text-gray-300 mb-2">"{movie.tagline}"</p>
              )}
              <h3 className="text-xl font-semibold mt-4">Overview</h3>
              <p className="text-gray-200 mb-6 whitespace-pre-line">{movie.overview}</p>

              {/* Crew: Directors and Writers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-6">
                {directors.map(d => (
                  <div key={d.id}>
                    <p className="font-bold">{d.name}</p>
                    <p className="text-sm text-gray-400">Director</p>
                  </div>
                ))}
                {writers.map(w => (
                  <div key={w.id}>
                    <p className="font-bold">{w.name}</p>
                    <p className="text-sm text-gray-400">{w.job}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Cast Section */}
      <section className="relative py-12 text-white overflow-hidden">
        {/* Background image with blur */}
        <div
          className="absolute inset-0 bg-cover bg-center blur-sm scale-105 z-0"
          style={{ backgroundImage: `url(${backdropUrl})` }}
        ></div>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-70 z-10"></div>

        {/* Content */}
        <div className="relative z-20 max-w-6xl mx-auto px-6">
          <h3 className="text-2xl font-semibold mb-6 text-white">Top Cast</h3>

          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={20}
            slidesPerView={5}
            navigation
            autoplay={{ delay: 3500 }}
            breakpoints={{
              320: { slidesPerView: 2 },
              640: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 5 },
            }}
          >
            {movie.credits.cast.slice(0, 12).map((actor) => (
              <SwiperSlide key={actor.id}>
                <div className="bg-gray-800 rounded-xl shadow-md">
                  <img
                    src={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
                        : "/assets/placeholder-profile.png"
                    }
                    alt={actor.name}
                    className="w-full h-44 object-cover rounded-t-xl"
                  />
                  <div className="p-2 text-white">
                    <p className="text-sm font-semibold truncate">{actor.name}</p>
                    <p className="text-xs text-gray-400 truncate">as {actor.character}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
}
