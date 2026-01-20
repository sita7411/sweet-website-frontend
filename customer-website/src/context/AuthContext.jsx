// context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

const API = `${import.meta.env.VITE_API_BASE}/api/auth`;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔁 Load user on page refresh
  const loadUser = async () => {
    try {
      const res = await axios.get(`${API}/profile`, {
        withCredentials: true,
      });
      setUser(res.data.user);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  // 🟢 SIGNUP
  const signup = async (formData) => {
    try {
      const res = await axios.post(`${API}/register`, formData, {
        withCredentials: true,
      });
      return res.data; // ✅ no toast here
    } catch (err) {
      throw err; // error will be handled in the page
    }
  };

  // 🔵 LOGIN
  const login = async (formData) => {
    try {
      const res = await axios.post(`${API}/login`, formData, {
        withCredentials: true,
      });
      setUser(res.data.user);
      return res.data; // ✅ no toast here
    } catch (err) {
      throw err; // error will be handled in the page
    }
  };

  // 🔴 LOGOUT
  const logout = async () => {
    try {
      await axios.post(`${API}/logout`, {}, { withCredentials: true });
      setUser(null);
    } catch (err) {
      throw err; // error will be handled in the page
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn: !!user, loading, signup, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
