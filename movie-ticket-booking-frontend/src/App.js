import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TrailerPage from './trailer/TrailerPlayer';
import BookingPage from './booking/BookingPage';
import MovieList from './movies/MovieList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trailer" element={<TrailerPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/movies" element={<MovieList />} />
      </Routes>
    </Router>
  );
}

export default App;
