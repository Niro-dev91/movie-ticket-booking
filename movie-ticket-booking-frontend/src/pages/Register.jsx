import React, { useState } from 'react';
import api from '../api/axiosInstance';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/register', { username, password });

      // Optional auto-login if token is returned
      if (response.data.token) {
        login(response.data.token);
        navigate('/home');
      } else {
        alert('Registration successful! Please log in.');
        navigate('/login');
      }
    } catch (err) {
      alert('Registration failed: Username may already exist');
    }
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/movie5.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-md"></div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="backdrop-blur-lg bg-white/10 border border-white/30 rounded-xl p-8 w-full max-w-md shadow-lg text-white">
          <h2 className="text-3xl font-bold text-center mb-6">Register</h2>
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
              Register
            </button>
          </form>
          <p className="text-sm text-center mt-4">
            Already have an account?{' '}
            <a href="/login" className="text-indigo-300 hover:underline">
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
