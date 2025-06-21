import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Trailer from './trailer/TrailerPlayer';
import Booking from './booking/Booking';
import MovieList from './movies/MovieList';

// 🔒 ProtectedRoute logic
function ProtectedRoute({ children }) {
  const { token, loading } = useAuth();
  if (loading) return <p>Loading...</p>;
  return token ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/trailer" element={<Trailer />} />
          <Route path="/movies" element={<MovieList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected route */}
          <Route
          //path="/booking/:id"
            path="/booking"
            element={
              <ProtectedRoute>
                <Booking />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
