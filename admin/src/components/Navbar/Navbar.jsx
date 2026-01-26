import React, { useState, useEffect } from "react";
import {
  BellIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  ChevronDownIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";
import io from "socket.io-client";

export default function AdminNavbar({ isSidebarOpen, setIsSidebarOpen }) {
  const { admin, loading, logout } = useAdminAuth();
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("adminToken")?.trim();
  const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

  // ─── FETCH NOTIFICATIONS ───
  const fetchNotifications = async () => {
    if (!token) return;
    try {
      const res = await fetch(
        `${API_BASE}/api/notifications?recipient=admin&limit=5`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (res.ok) {
        const data = await res.json();
        setNotifications(data.notifications || []);
      } else {
        console.error("Failed to fetch notifications:", res.status);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  // ─── SOCKET.IO REAL-TIME ───
  useEffect(() => {
    if (!token) return;

    fetchNotifications(); // initial fetch

    const socket = io(API_BASE, {
      withCredentials: true,
      transports: ["websocket", "polling"],
    });

    socket.on("connect", () => {
      console.log("🟢 Socket connected → ID:", socket.id);
      socket.emit("joinNotifications", "admin");
    });

    socket.on("notification", (newNotif) => {
      console.log("🔔 Realtime notification received:", newNotif);
      setNotifications((prev) => [newNotif, ...prev]);
    });

    socket.on("disconnect", (reason) =>
      console.log("Socket disconnected:", reason),
    );

    return () => socket.disconnect();
  }, [token, API_BASE]);

  const unread = notifications.filter((n) => !n.isRead).length;

  const getInitials = (name = "", email = "") => {
    if (name) {
      const parts = name.split(" ");
      return (parts[0]?.[0] + (parts[1]?.[0] || ""))?.toUpperCase() || "AD";
    }
    if (email) return email[0]?.toUpperCase() || "AD";
    return "AD";
  };

  // ─── MARK NOTIFICATION AS READ ───
  const handleMarkRead = async (id) => {
    if (!token) return;
    try {
      const res = await fetch(
        `${API_BASE}/api/notifications/${id}/read?recipient=admin`,
        {
          method: "PATCH",
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (res.ok) {
        setNotifications((prev) =>
          prev.map((n) => (n._id === id ? { ...n, isRead: true } : n)),
        );
      }
    } catch (err) {
      console.error("Mark read error:", err);
    }
  };

  const handleLogout = async () => {
    await logout();
    setProfileOpen(false);
    navigate("/admin/login");
  };

  if (loading) {
    return (
      <header
        className={`fixed top-0 z-40 h-20 transition-all
          left-0 right-0 w-full
          ${isSidebarOpen ? "lg:left-64 lg:w-[calc(100%-16rem)]" : "lg:left-0 lg:w-full"}`}
      >
        <div className="h-20 bg-[#fffaf3] backdrop-blur-xl border border-[var(--secondary)]/10 shadow-lg px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-2.5 rounded-xl bg-[var(--bg-soft)]">
              <Bars3Icon className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-gray-200 animate-pulse" />
          </div>
        </div>
      </header>
    );
  }

  return (
    <header
      className={`fixed top-0 z-40 h-20 transition-all
        left-0 right-0 w-full
        ${isSidebarOpen ? "lg:left-64 lg:w-[calc(100%-16rem)]" : "lg:left-0 lg:w-full"}`}
    >
      <div className="h-20 bg-[#fffaf3] backdrop-blur-xl border border-[var(--secondary)]/10 shadow-lg px-4 flex items-center justify-between">
        {/* LEFT: Hamburger + Search */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-[var(--bg-soft)] hover:bg-[var(--primary)]/15 transition"
          >
            <Bars3Icon className="w-5 h-5" />
          </button>

          <div className="hidden md:flex items-center gap-3 px-4 py-2 rounded-xl bg-[var(--bg-soft)] border border-[var(--secondary)]/10">
            <MagnifyingGlassIcon className="w-4 h-4 text-[var(--text-muted)]" />
            <input
              placeholder="Search dashboard..."
              className="bg-transparent text-sm outline-none w-64 text-[var(--text-main)]"
            />
            <span className="text-[10px] px-2 py-0.5 rounded-md bg-[var(--accent)]/20 text-[var(--secondary)]">
              ⌘K
            </span>
          </div>
        </div>

        {/* RIGHT: Notifications & Profile */}
        <div className="flex items-center gap-4">
          {/* NOTIFICATIONS */}
          <div className="relative">
            <button
              onClick={() => {
                setNotifOpen(!notifOpen);
                setProfileOpen(false);
              }}
              className="relative p-3 rounded-xl bg-[var(--bg-soft)] hover:bg-[var(--primary)]/15 transition shadow-sm"
            >
              <BellIcon className="w-5 h-5" />
              {unread > 0 && (
                <>
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[var(--primary)] text-white text-[11px] font-semibold flex items-center justify-center">
                    {unread}
                  </span>
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[var(--primary)] animate-ping opacity-30"></span>
                </>
              )}
            </button>

            <AnimatePresence>
              {notifOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-80 rounded-2xl bg-[var(--bg-card)] border border-[var(--secondary)]/10 shadow-xl overflow-hidden z-50"
                >
                  <div className="px-5 py-4 flex items-center justify-between border-b border-[var(--secondary)]/10">
                    <p className="font-semibold">Alerts</p>
                    <span className="text-xs px-2 py-1 rounded-full bg-[var(--accent)]/20 text-[var(--secondary)]">
                      {unread} New
                    </span>
                  </div>

                  {notifications.length > 0 ? (
                    notifications.map((n) => (
                      <div
                        key={n._id || n.id}
                        onClick={() => handleMarkRead(n._id)}
                        className={`px-5 py-3 hover:bg-[var(--bg-soft)] transition cursor-pointer ${
                          !n.isRead ? "bg-[var(--primary)]/10" : ""
                        }`}
                      >
                        <p className="text-sm font-medium">
                          {n.title || n.text}
                        </p>
                        <p className="text-xs text-[var(--text-muted)] mt-0.5">
                          {n.createdAt
                            ? new Date(n.createdAt).toLocaleString("en-IN", {
                                dateStyle: "short",
                                timeStyle: "short",
                              })
                            : n.time}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="px-5 py-3 text-sm text-[var(--text-muted)]">
                      No notifications
                    </p>
                  )}

                  {/* VIEW ALL LINK */}
                  {notifications.length > 0 && (
                    <Link
                      to="/admin/notifications"
                      className="block px-5 py-3 text-center text-sm font-medium text-[var(--primary)] hover:bg-[var(--bg-soft)] border-t border-[var(--secondary)]/10 transition"
                      onClick={() => setNotifOpen(false)}
                    >
                      View All Notifications
                    </Link>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* PROFILE */}
          <div className="relative">
            <button
              onClick={() => {
                setProfileOpen(!profileOpen);
                setNotifOpen(false);
              }}
              className="flex items-center gap-3 px-3 py-2 rounded-xl bg-[var(--bg-soft)] hover:bg-[var(--primary)]/15 transition shadow-sm"
            >
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center text-white font-bold">
                {getInitials(admin?.name, admin?.email)}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-semibold leading-4">
                  {admin ? admin.name || admin.email.split("@")[0] : "Admin"}
                </p>
                <p className="text-xs text-[var(--text-muted)]">
                  {admin?.email || "admin@gmail.com"}
                </p>
              </div>
              <ChevronDownIcon className="w-4 h-4 text-[var(--text-muted)]" />
            </button>

            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-72 rounded-2xl bg-[var(--bg-card)] border border-[var(--secondary)]/10 shadow-xl overflow-hidden z-50"
                >
                  <div className="p-5 bg-gradient-to-br from-[var(--primary)]/15 to-[var(--accent)]/20">
                    <p className="font-semibold">
                      {admin
                        ? admin.name || admin.email.split("@")[0]
                        : "Admin"}
                    </p>
                    <p className="text-sm text-[var(--text-muted)]">
                      {admin?.email || "admin@marvelcrunch.com"}
                    </p>
                  </div>

                  <ul className="py-2">
                    <li>
                      <Link
                        to="/admin/profile"
                        className="px-5 py-3 hover:bg-[var(--bg-soft)] flex items-center gap-3 cursor-pointer"
                        onClick={() => setProfileOpen(false)}
                      >
                        <UserIcon className="w-4 h-4" />
                        My Profile
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/settings/general"
                        className="px-5 py-3 hover:bg-[var(--bg-soft)] flex items-center gap-3 cursor-pointer"
                        onClick={() => setProfileOpen(false)}
                      >
                        <Cog6ToothIcon className="w-4 h-4" />
                        Settings
                      </Link>
                    </li>

                    <li className="mt-2 border-t border-[var(--secondary)]/10">
                      <Link
                        to="/admin/login"
                        onClick={async (e) => {
                          e.preventDefault();
                          await logout();
                          setProfileOpen(false);
                          navigate("/login");
                        }}
                        className="px-5 py-3 text-red-600 hover:bg-red-50 flex items-center gap-3 cursor-pointer"
                      >
                        <ArrowRightOnRectangleIcon className="w-4 h-4" />
                        Logout
                      </Link>
                    </li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}
