import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieList from "./movies/MovieList";
import MovieDetail from "./movies/MovieDetail";
import TrailerPlayer from "./trailer/TrailerPlayer";
import BookingPage from "./booking/BookingPage";

function App() {
  return (
    <Router>
      <div style={{ padding: 20 }}>
        <h1>🎬 Movie Ticket Booking App</h1>
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/movie/:id/trailer" element={<TrailerPlayer />} />
          <Route path="/movie/:id/book" element={<BookingPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
