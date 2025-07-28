import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Film,
  MapPin,
  Clock,
  Sparkles,
  Tag,
} from 'lucide-react';

const BookingView = ({ showtimes }) => {
  const navigate = useNavigate();
  return (
    <div className="p-6 bg-gray-50 rounded-2xl shadow-inner min-h-[300px]">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">
        Available Showtimes
      </h2>

      {showtimes.length === 0 ? (
        <p className="text-gray-500 mt-6">No showtimes available for selected filters.</p>
      ) : (
        <ul className="space-y-4">
          {showtimes.map((s) => {
            const posterUrl = s.movie?.posterPath || s.movie?.poster_path || '';

            return (
              <li
                key={s.id}
                className="bg-white rounded-lg p-4 shadow hover:shadow-md transition flex gap-4"
              >
                {/* Left: Movie Poster */}
                <div className="w-24 h-36 rounded overflow-hidden flex-shrink-0">
                  <img
                    src={posterUrl}
                    alt={s.movie?.title || 'Movie poster'}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Right: Movie Details */}
                <div className="flex flex-col flex-grow">
                  <div className="mb-2">
                    <div className="text-gray-800 font-bold text-lg flex items-center gap-2 mb-1">
                      <Film size={18} /> {s.movie?.title}
                    </div>
                    <div className="text-gray-600 flex items-center gap-2">
                      <MapPin size={18} /> {s.location?.locationName} - {s.location?.theaterName}
                    </div>
                    <div className="text-gray-600 flex items-center gap-2">
                      <Clock size={18} />
                      {new Date(`${s.date}T${s.startTime}`).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                      }).toUpperCase()}
                    </div>

                    <div className="text-gray-600 flex items-center gap-2 flex-wrap">
                      <Sparkles size={18} />
                      {s.location?.features && s.location.features.length > 0 ? (
                        s.location.features.map((feature, index) => (
                          <span
                            key={feature.id || index}
                            className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full"
                          >
                            {feature.name}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-500">Standard</span>
                      )}

                    </div>
                    <div className="text-gray-600 flex items-center gap-2">
                      <Tag size={18} /> {s.offer || 'None'}
                    </div>
                  </div>
                  {/* Book button bottom-right */}
                  <div className="mt-auto flex justify-end">
                    <button
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                      onClick={() => navigate(`/booking/${s.id}`)}
                    >
                      Book
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default BookingView;
