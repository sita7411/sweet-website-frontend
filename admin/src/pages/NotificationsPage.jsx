// Updated: ChikkiNotifications.jsx (with realtime Socket.IO support)
// Full component code with all previous features + realtime notifications

import React, { useState, useEffect, useMemo } from "react";
import io from "socket.io-client";
import {
  AlertTriangle,
  ShoppingBag,
  ShieldCheck,
  Truck,
  Bell,
  Info,
  Star,
  Gift,
  Trash2,
} from "lucide-react";
import { CurrencyRupeeIcon } from "@heroicons/react/24/outline";

const iconMap = {
  // backend icons
  "alert-triangle": AlertTriangle,
  "shopping-bag": ShoppingBag,
  "shield-check": ShieldCheck,
  truck: Truck,
  "indian-rupee": CurrencyRupeeIcon,

  // semantic types
  order: ShoppingBag,
  payment: CurrencyRupeeIcon,
  star: Star,
  offer: Gift,
  system: Info,

  default: Bell,
  bell: Bell,
};

/* ---------------- ICON HELPER ---------------- */
const getIcon = (iconName) => {
  return iconMap[iconName?.toLowerCase()] || iconMap.default || Bell;
};

/* ---------------- NOTIFICATION ITEM ---------------- */
function NotificationItem({ item, onDelete, onMarkRead }) {
  const Icon = getIcon(item.icon);

  const handleClick = () => {
    if (!item.isRead) onMarkRead(item._id);
  };

  return (
    <div
      onClick={handleClick} // whole card click
      className={`flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 p-4 rounded-xl border transition cursor-pointer
        ${item.isRead ? "bg-[var(--bg-soft)] opacity-80" : "bg-[var(--bg-card)] hover:shadow"}`}
    >
      <div className="flex gap-3">
        <div
          className={`w-9 h-9 flex items-center justify-center rounded-md shrink-0 transition
            ${item.isRead ? "bg-gray-300 text-gray-600" : "bg-[var(--bg-soft)] text-[var(--primary)]"}`}
        >
          <Icon size={18} />
        </div>
        <div>
          <h3
            className={`text-sm font-semibold transition ${
              item.isRead ? "text-gray-600" : "text-[var(--text-main)]"
            }`}
          >
            {item.title}
          </h3>
          <p
            className={`text-sm mt-1 transition ${
              item.isRead ? "text-gray-500" : "text-[var(--text-muted)]"
            }`}
          >
            {item.message}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {new Date(item.createdAt).toLocaleString("en-IN", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 self-end sm:self-auto">
        {!item.isRead && (
          <span className="text-[10px] px-2 py-0.5 rounded-full text-white bg-[var(--primary)]">
            NEW
          </span>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation(); // prevent marking read when clicking delete
            onDelete(item._id);
          }}
          className="p-1.5 rounded-md text-red-500 hover:bg-red-50 transition"
          aria-label="Delete notification"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}

/* ---------------- PAGINATION ---------------- */
function Pagination({ page, totalPages, setPage }) {
  const getPages = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (page > 3) pages.push("...");
      const start = Math.max(2, page - 1);
      const end = Math.min(totalPages - 1, page + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (page < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-6 mt-12 text-sm">
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="text-[var(--primary)] hover:opacity-80 disabled:opacity-40 transition"
      >
        ‹ Previous
      </button>

      <div className="flex items-center gap-4">
        {getPages().map((p, i) =>
          p === "..." ? (
            <span key={i} className="text-[var(--primary)] opacity-60">
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`w-10 h-10 flex items-center justify-center rounded-lg font-medium transition ${
                page === p
                  ? "bg-[var(--primary)] text-white shadow"
                  : "text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white hover:shadow"
              }`}
            >
              {p}
            </button>
          ),
        )}
      </div>

      <button
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
        className="text-[var(--primary)] hover:opacity-80 disabled:opacity-40 transition"
      >
        Next ›
      </button>
    </div>
  );
}

/* ---------------- MAIN COMPONENT ---------------- */
export default function ChikkiNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [tab, setTab] = useState("all");
  const [page, setPage] = useState(1);
  const perPage = 6;

  const token = localStorage.getItem("adminToken")?.trim();
  const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

  // ─── SOCKET.IO REAL-TIME ───
  useEffect(() => {
    if (!token) {
      console.warn("No admin token → skipping socket connection");
      return;
    }

    const socket = io(API_BASE, {
      withCredentials: true,
      reconnection: true,
      autoConnect: true,
      transports: ["websocket", "polling"],
    });

    socket.on("connect", () => {
      console.log("🟢 Socket connected (notifications) → ID:", socket.id);
      socket.emit("joinNotifications", "admin");
      console.log("Emitted joinNotifications → admin");
    });

    socket.on("notification", (newNotif) => {
      console.log("🔔 Realtime notification received:", newNotif);
      // Add new notification to the top of the list
      setNotifications((prev) => [newNotif, ...prev]);
    });

    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err.message);
    });

    socket.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
    });

    // Cleanup
    return () => {
      console.log("Cleaning up socket connection");
      socket.disconnect();
    };
  }, [token, API_BASE]);

  // ─── FETCH EXISTING NOTIFICATIONS ──────────────────────────────────────
  const fetchNotifications = async () => {
    if (!token) {
      console.warn("Admin token missing → cannot fetch notifications");
      setNotifications([]);
      return;
    }

    try {
      let url = `${API_BASE}/api/notifications?recipient=admin&page=${page}&limit=${perPage}`;
      if (tab === "unread" || tab === "new") {
        url += "&unreadOnly=true";
      }

      const res = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log("Fetched notifications:", data.notifications?.length || 0);
      setNotifications(data.notifications || []);
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
      setNotifications([]);
    }
  };

  // Fetch on mount + page/tab change
  useEffect(() => {
    fetchNotifications();
  }, [page, tab, token]);

  // ─── FILTERING & PAGINATION ────────────────────────────────────────────
  const filteredNotifications = useMemo(() => {
    if (tab === "unread" || tab === "new") {
      return notifications.filter((n) => !n.isRead);
    }
    return notifications;
  }, [tab, notifications]);

  const totalPages = Math.ceil(filteredNotifications.length / perPage);
  const paginatedData = filteredNotifications.slice(
    (page - 1) * perPage,
    page * perPage,
  );

  // ─── HANDLERS ──────────────────────────────────────────────────────────
  const handleDelete = async (id) => {
    if (!token) return;

    try {
      const res = await fetch(
        `${API_BASE}/api/notifications/${id}?recipient=admin`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (res.ok) {
        setNotifications((prev) => prev.filter((n) => n._id !== id));
      } else {
        console.error("Delete failed:", res.status);
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleMarkRead = async (id) => {
    if (!token) return;

    try {
      const res = await fetch(
        `${API_BASE}/api/notifications/${id}/read?recipient=admin`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          // body: JSON.stringify({ isRead: true }), // if your backend expects body
        },
      );

      if (res.ok) {
        setNotifications((prev) =>
          prev.map((n) => (n._id === id ? { ...n, isRead: true } : n)),
        );
      } else {
        console.error("Mark read failed:", res.status);
      }
    } catch (err) {
      console.error("Mark read error:", err);
    }
  };

  // ─── RENDER ────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[var(--bg-main)] py-8 sm:py-12 px-3 sm:px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-main)] mb-6">
          Notifications
        </h1>

        <div className="flex flex-wrap gap-2 mb-6">
          {["all", "new", "unread"].map((t) => (
            <button
              key={t}
              onClick={() => {
                setTab(t);
                setPage(1);
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition flex-1 sm:flex-none ${
                tab === t
                  ? "bg-[var(--primary)] text-white"
                  : "bg-[var(--bg-soft)] text-[var(--text-main)] hover:bg-[var(--bg-soft)]/80"
              }`}
            >
              {t === "new" ? "NEW" : t.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {paginatedData.length > 0 ? (
            paginatedData.map((item) => (
              <NotificationItem
                key={item._id}
                item={item}
                onDelete={handleDelete}
                onMarkRead={handleMarkRead}
              />
            ))
          ) : (
            <div className="text-center py-16 text-[var(--text-muted)]">
              <Bell size={48} className="mx-auto mb-4 opacity-40" />
              <p>No notifications found</p>
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <Pagination page={page} totalPages={totalPages} setPage={setPage} />
        )}
      </div>
    </div>
  );
}
