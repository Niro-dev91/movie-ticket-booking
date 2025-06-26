import React, { useState } from "react";
import axios from "axios";

export default function AddMovie() {
  const [mode, setMode] = useState("search");
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    releaseDate: "",
    posterUrl: "",
    posterFile: null,
    tmdbId: null,
    rating: "",
    voteCount: null,
    genres: [],
    trailer: "",
    tagline: "",
    backdropUrl: "",
    backdropFile: null,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const allGenres = [
    "Action", "Adventure", "Comedy", "Drama", "Horror",
    "Sci-Fi", "Thriller", "Fantasy", "Animation"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleGenre = (genre) => {
    setFormData(prev => {
      const genres = prev.genres.includes(genre)
        ? prev.genres.filter(g => g !== genre)
        : [...prev.genres, genre];
      return { ...prev, genres };
    });
  };

  const handlePosterFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        posterFile: file,
        posterUrl: URL.createObjectURL(file),
      }));
    }
  };
  const handleBackdropFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        backdropFile: file,
        backdropUrl: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const data = new FormData();

      data.append("title", formData.title);
      data.append("overview", formData.description); 
      data.append("releaseDate", formData.releaseDate); 
      data.append("tmdbId", formData.tmdbId || "");
      data.append("rate", formData.rating || "");
      data.append("videoLink", formData.trailer || "");
      data.append("tagline", formData.tagline || "");
      data.append("genres", JSON.stringify(formData.genres));

      if (formData.posterFile) {
        data.append("posterFile", formData.posterFile);
      } else {
        data.append("posterUrl", formData.posterUrl || "");
      }

      if (formData.backdropFile) {
        data.append("backdropFile", formData.backdropFile);
      } else {
        data.append("backdropUrl", formData.backdropUrl || "");
      }

      await axios.post("http://localhost:8080/api/movies/save", data);


      setMessage("Movie added successfully!");
      setTimeout(() => {
        resetFormData();
      }, 6000);
      
    } catch (error) {
      console.error("Error saving movie:", error);
      setMessage("Failed to add movie.");
    } finally {
      setLoading(false);
    }
  };


  const searchMovies = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {

      const res = await axios.get("http://localhost:8080/api/movies/search", {
        params: { query },
      });
      setSearchResults(res.data);
      setMessage("");
    } catch (error) {
      console.error("Error searching movies:", error);
      setMessage("Failed to fetch search results");
    } finally {
      setLoading(false);
    }
  };

  const selectMovie = (movie) => {
    setFormData({
      title: movie.title || "",
      description: movie.overview || "",
      releaseDate: movie.releaseDate || "",
      posterUrl: movie.posterUrl || "",
      posterFile: null,
      tmdbId: movie.id || "",
      rating: movie.vote_average || "",
      voteCount: movie.voteCount || null,
      genres: movie.genres || [],
      trailer: movie.video || "",
      tagline: movie.tagline || "",
      backdropUrl: movie.backdropUrl || "",
    });
    setSearchResults([]);
    setQuery("");
    setMessage("");
  };

  const resetFormData = () => {
    setFormData({
      title: "",
      description: "",
      releaseDate: "",
      posterUrl: "",
      posterFile: null,
      tmdbId: null,
      rating: "",
      voteCount: null,
      genres: [],
      trailer: "",
      tagline: "",
      backdropUrl: "",
      backdropFile: null,
    });
    setQuery("");
    setSearchResults([]);
    setMessage("");
  };
  return (

    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Add New Movie</h2>

      <div className="mb-4">
        <button
          className={`mr-2 px-4 py-2 rounded ${mode === "search" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          onClick={() => {
            setMode("search");
            resetFormData(); // clear data on toggle
          }}
        >
          Search from TMDB
        </button>
        <button
          className={`px-4 py-2 rounded ${mode === "manual" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          onClick={() => {
            setMode("manual");
            resetFormData(); // clear data on toggle
          }}
        >
          Add Manually
        </button>
      </div>

      {mode === "search" && (
        <>
          <div className="mb-4 flex gap-2">
            <input
              type="text"
              placeholder="Search movies..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && searchMovies()}
              className="flex-grow border rounded px-3 py-2"
            />
            <button
              onClick={searchMovies}
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Search
            </button>
          </div>

          {searchResults.length > 0 && (
            <ul className="max-h-64 overflow-y-auto border rounded mb-4">
              {searchResults.map((movie) => (
                <li
                  key={movie.id}
                  onClick={() => selectMovie(movie)}
                  className="cursor-pointer hover:bg-gray-100 p-2 border-b"
                >
                  <strong>{movie.title}</strong> ({movie.releaseDate?.slice(0, 4) || "N/A"})
                  <br />
                  Genres: {movie.genres?.join(", ") || "No genres"}
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />
        <input
          type="hidden"
          name="tmdbId"
          value={formData.tmdbId || ""}
        />

        <textarea
          name="description"
          placeholder="Description"
          rows="3"
          value={formData.description}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
        <textarea
          name="tagline"
          placeholder="Tagline"
          rows="2"
          value={formData.tagline}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
        <input
          type="date"
          name="releaseDate"
          value={formData.releaseDate}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />

        {mode === "search" && (
          <input
            type="text"
            name="posterUrl"
            placeholder="Poster URL"
            value={formData.posterUrl}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />

        )

        }
        {formData.posterUrl && (
          <img src={formData.posterUrl} alt="poster" className="w-32 rounded shadow mt-2" />
        )}
        {mode === "search" && (
          <input
            type="text"
            name="backdropUrl"
            placeholder="Backdrop URL "
            value={formData.backdropUrl}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        )}
        {formData.backdropUrl && (
          <img src={formData.backdropUrl} alt="backdrop" className="w-32 rounded shadow mt-2" />
        )}
        {mode === "manual" && (
          <div>
            <label className="block mb-1 font-semibold">Upload Poster Image</label>
            <input type="file" accept="image/*" onChange={handlePosterFileChange} />

            {formData.posterUrl && (
              <img src={formData.posterUrl} alt="poster preview" className="w-32 rounded shadow mt-2" />
            )}

            <label className="block mt-4 mb-1 font-semibold">Upload Backdrop Image</label>
            <input type="file" accept="image/*" onChange={handleBackdropFileChange} />

            {formData.backdropUrl && (
              <img src={formData.backdropUrl} alt="backdrop preview" className="w-64 rounded shadow mt-2" />
            )}
          </div>
        )}



        <div className="mb-4">
          <label className="block mb-1 font-semibold">Genres</label>
          {mode === "manual" ? (
            <div className="flex flex-wrap gap-2">
              {allGenres.map(genre => (
                <button
                  key={genre}
                  type="button"
                  onClick={() => toggleGenre(genre)}
                  className={`px-3 py-1 mb-4 rounded border ${formData.genres.includes(genre)
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700"
                    }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          ) : (
            <p className="mb-4" >{formData.genres.length > 0 ? formData.genres.join(", ") : "No genres selected"}</p>
          )}
          <div className="mb-4">
            <input
              type="text"
              name="rating"
              placeholder="Rating (e.g., 7.5)"
              value={formData.rating || ""}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"></input>
          </div>
          <div className="mb-4">
            {mode === "search" ? (
              <input
                type="text"
                name="trailer"
                placeholder="Trailer URL"
                value={formData.trailer || ""}
                readOnly
                className="w-full border rounded px-3 py-2"
              />
            ) : (
              <input
                type="text"
                name="trailer"
                placeholder="Trailer URL"
                value={formData.trailer || ""}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            )}
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {loading ? "Saving..." : "Submit Movie"}
        </button>
      </form>

      {message && <p className="mt-4 text-green-600 font-semibold">{message}</p>}
    </div>
  );
}
