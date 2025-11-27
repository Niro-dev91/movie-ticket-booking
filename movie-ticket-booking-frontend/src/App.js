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
import LocationDetail from './location/LocationDetail';
import SeatBooking from './seats/SeatBooking';
import Reservation from './payment/ReservationSummary';
import { CartProvider } from './context/CartContext';
import Deal from './deal/Deal';
import DealDetails from './deal/DealDetails';
import ProtectedRoute from './components/ProtectedRoute';

//Admin pages
import AddMovie from "./admin/movie/AddMovie";
import ShowtimeAdmin from './admin/showtime/ShowtimeAdmin';
import AddLocation from "./admin/location/AddLocation";
import PricingAdmin from './admin/price/PricingAdmin';
import SeatAdmin from './admin/seats/SeatAdmin';
import CafeAdmin from './admin/cafe/FoodMenu';
import DealAdmin from './admin/deals/DealsAdmin';

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
          <Route path="/location/LocationDetail/:locationLink" element={<LocationDetail />} />
          <Route path="/deals/:id" element={<DealDetails />} />
          {/* Protected */}
          <Route
            path="/booking"
            element={
              <ProtectedRoute>
                <Booking />
              </ProtectedRoute>
            }
          />
          <Route
            path="/booking/:showtimeId"
            element={
              <ProtectedRoute>
                <SeatBooking />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment/:showtimeId"
            element={
              <ProtectedRoute>
                <CartProvider>
                  <Reservation />
                </CartProvider>
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
            <Route path="showtime" element={<ShowtimeAdmin />} />
            <Route path="location" element={<AddLocation />} />
            <Route path="pricing" element={<PricingAdmin />} />
            <Route path="seats" element={<SeatAdmin />} />
            <Route path="cafe" element={<CafeAdmin />} />
            <Route path="deals" element={<DealAdmin />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
