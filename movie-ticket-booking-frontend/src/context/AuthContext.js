import React, { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [roles, setRoles] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken) {
      setToken(savedToken);
      try {
        const decoded = jwtDecode(savedToken);
        setRoles(decoded.roles || []);
      } catch (err) {
        console.error("Invalid token", err);
      }
    }

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (err) {
        console.error("Invalid user in localStorage", err);
        localStorage.removeItem("user"); // remove invalid entry
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
    localStorage.removeItem("user");
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
