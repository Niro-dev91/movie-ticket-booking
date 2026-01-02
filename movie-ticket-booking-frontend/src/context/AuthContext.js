import React, { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; // named import

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [roles, setRoles] = useState([]);
  const [user, setUser] = useState(null); // store user object
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      try {
        const decoded = jwtDecode(savedToken);
        setRoles(decoded.roles || []);
        setUser({
          username: decoded.username,
          email: decoded.email,
          contactNumber: decoded.contactNumber,
        });
      } catch (err) {
        console.error("Invalid token", err);
      }
    }
    setLoading(false);
  }, []);

  const login = (tok, userObj) => {
    localStorage.setItem("token", tok);
    localStorage.setItem("user", JSON.stringify(userObj));
    setToken(tok);
    setUser(userObj);
    setRoles(userObj.roles || []);
  };


  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setRoles([]);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, roles, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
