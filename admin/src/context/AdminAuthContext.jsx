import { createContext, useContext, useState, useEffect } from "react";

const AdminAuthContext = createContext();
export const useAdminAuth = () => useContext(AdminAuthContext);

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  // Base URL from .env (keep it flexible)
  const API_BASE = import.meta.env.VITE_API_BASE || "";

  // Safety check
  useEffect(() => {
    if (!API_BASE && import.meta.env.MODE !== "development") {
      console.error(
        "❌ VITE_API_BASE is not defined!\n" +
        "Please set VITE_API_BASE in your .env file or hosting platform.\n" +
        "Example: VITE_API_BASE=https://sweet-backend-ukfd.onrender.com"
      );
    }
  }, [API_BASE]);

  const getToken = () => localStorage.getItem("adminToken");

  const checkAdmin = async () => {
    const token = getToken();
    if (!token) {
      setAdmin(null);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/admin/me`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        // If 401/403 → clear invalid token
        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem("adminToken");
        }
        throw new Error("Not authenticated");
      }

      const data = await res.json();
      setAdmin(data.admin || null);
    } catch (err) {
      console.error("Error checking admin:", err);
      localStorage.removeItem("adminToken");
      setAdmin(null);
    } finally {
      setLoading(false);
    }
  };

  // Run check on mount
  useEffect(() => {
    checkAdmin();
  }, []);

  const login = async (email, password) => {
    if (!API_BASE && import.meta.env.MODE !== "development") {
      return { success: false, message: "Backend URL not configured" };
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Store JWT token
      if (data.token) {
        localStorage.setItem("adminToken", data.token);
      } else {
        console.warn("No token received from login response");
      }

      // Refresh admin state
      await checkAdmin();

      return { success: true, admin: data.admin };
    } catch (err) {
      console.error("Login error:", err);
      return { success: false, message: err.message || "Something went wrong" };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    const token = getToken();
    if (!token) {
      setAdmin(null);
      return;
    }

    setLoading(true);

    try {
      // Optional: call logout endpoint (can be skipped if you don't invalidate server-side)
      await fetch(`${API_BASE}/api/admin/logout`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
      console.error("Logout request failed:", err);
    } finally {
      // Always clear local token & state
      localStorage.removeItem("adminToken");
      setAdmin(null);
      setLoading(false);
    }
  };

  return (
    <AdminAuthContext.Provider value={{ admin, loading, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};