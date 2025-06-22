import React, { createContext, useContext, useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';  // default import

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
      const decoded = jwtDecode(savedToken);  // Use jwtDecode here
      setRoles(decoded.roles || []);
    }
    setLoading(false);
  }, []);

  const login = (tok) => {
    localStorage.setItem('token', tok);
    setToken(tok);
    const decoded = jwtDecode(tok);
    setRoles(decoded.roles || []);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setRoles([]);
  };

  return (
    <AuthContext.Provider value={{ token, roles, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
