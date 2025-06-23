import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Admin from './admin/Admin';  // no file extension needed if it's .js or .jsx
import Trailer from './trailer/TrailerPlayer';
import Booking from './booking/Booking';
import MovieList from './movies/MovieList';
import Location from './location/Location';
import Deal from './deal/Deal';
import ProtectedRoute from './components/ProtectedRoute';

//Admin pages
import AddMovie from "./admin/movie/AddMovie";

/* 🔒 ProtectedRoute logic
function ProtectedRoute({ children }) {
  const { token, loading } = useAuth();
  if (loading) return <p>Loading...</p>;
  return token ? children : <Navigate to="/login" replace />;
}*/

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/trailer" element={<Trailer />} />
          <Route path="/movies" element={<MovieList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/location" element={<Location />} />
          <Route path="/deal" element={<Deal />} />
          {/* Protected */}
          <Route
            path="/booking"
            element={
              <ProtectedRoute>
                <Booking />
              </ProtectedRoute>
            }
          />

          {/* Admin only */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute roles={['ROLE_ADMIN']}>
                <Admin />
              </ProtectedRoute>
            }
          >
          <Route path="movie/add" element={<AddMovie />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
