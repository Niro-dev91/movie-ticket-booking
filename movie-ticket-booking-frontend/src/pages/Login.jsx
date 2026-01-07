import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", { username, password });

      // Pass both token and user object to login
      login(response.data.token, response.data.user);
      navigate("/booking");
    } catch (err) {
      console.error(err);
      alert("Login failed: Invalid credentials");
    }
  };

  return (
    <>
      <Navbar />
      <div
        className="relative min-h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/movie4.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-md"></div>

        <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
          <div className="backdrop-blur-lg bg-white/10 border border-white/30 rounded-xl p-8 w-full max-w-md shadow-lg text-white">
            <h2 className="text-3xl font-bold text-center mb-6">
              Login to CineWorld
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 bg-white/20 text-white placeholder-white rounded-md border border-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-white/20 text-white placeholder-white rounded-md border border-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              />
              <button
                type="submit"
                className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-md transition duration-300"
              >
                Login
              </button>
            </form>
            <p className="text-sm text-center mt-4">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="text-indigo-300 hover:underline"
              >
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
