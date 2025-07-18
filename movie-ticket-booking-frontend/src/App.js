import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import ViewMore from './pages/ViewMore';
import Admin from './admin/Admin';
import Trailer from './trailer/TrailerPlayer';
import Booking from './booking/Booking';
import MovieList from './movies/MovieList';
import Location from './location/Location';
import Deal from './deal/Deal';
import ProtectedRoute from './components/ProtectedRoute';

//Admin pages
import AddMovie from "./admin/movie/AddMovie";
import AddLocation from "./admin/location/AddLocation";

/* ProtectedRoute logic
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
          <Route path="/movies/:movieId" element={<ViewMore />} />
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
            <Route path="movie" element={<AddMovie />} />
            <Route path="location" element={<AddLocation />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
