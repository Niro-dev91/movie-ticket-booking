import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleAuthAction = () => {
    if (token) {
      logout();             // Clear token
      navigate('/login');   // Redirect to login
    } else {
      navigate('/login');   // Just go to login
    }
  };

  return (
  //  <nav className="fixed top-0 left-0 w-full z-50 px-3 py-4 bg-transparent text-white">// removed transparent for now
  
  <nav className="fixed top-0 left-0 w-full z-50 px-3 py-4 bg-black bg-opacity-80 text-white">

      <div className="flex justify-between items-center w-full">
        {/* Left side */}
        <h1 className="text-2xl font-bold">CineWorld</h1>

        {/* Center side */}
        <div className="flex items-center gap-6">
          <Link to="/" className="hover:text-red-400 transition duration-300">Home</Link>
          <Link to="/movies" className="hover:text-red-400 transition duration-300">Movies</Link>
          <Link to="/locations" className="hover:text-indigo-400">Locations</Link>
          <Link to="/deals" className="hover:text-indigo-400">Deals And Exclusives</Link>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-6">
          <Link to="/booking" className="hover:text-indigo-400">Book Now</Link>
          <button 
            onClick={handleAuthAction}
            className="bg-transparent hover:text-indigo-700 px-3 py-2 rounded"
          >
            {token ? 'Logout' : 'Login'}
          </button>
        </div>
      </div>
    </nav>
  );
  
}
