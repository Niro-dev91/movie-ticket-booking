import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-3 py-4 bg-transparent text-white">
      <div className="flex justify-between items-center w-full">
        {/* Left side */}
        <h1 className="text-2xl font-bold">🎬 BuyMe</h1>

        {/* Center side */}
        <div className="flex items-center gap-6">
          <Link to="/" className="hover:text-red-400 transition duration-300">Home</Link>
          <Link to="/movies" className="hover:text-red-400 transition duration-300">Movies</Link>
          <Link to="/locations" className="hover:text-indigo-400">Locations</Link>
          <Link to="/deals" className="hover:text-indigo-400">Deals And Exclusives</Link>
        </div>
        {/* Right side */}
        <div className="flex items-center gap-6">
          <Link to="/booking" className="hover:text-indigo-400">Booking</Link>
          <button className="bg-indigo-600 hover:bg-indigo-700 px-3 py-2 rounded">
            Login
          </button>
        </div>
      </div>
    </nav>
  );
}
