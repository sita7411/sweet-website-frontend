import React, { useState, useEffect, useMemo } from "react";
import {
  Trash2,
  AlertTriangle,
  MessageCircle,
  Dumbbell,
  Bell,
  Crown,
  ShoppingCart,
  Activity,
  Calendar,
} from "lucide-react";

/* ---------------- ICON MAP ---------------- */
const iconMap = {
  workout: Dumbbell,
  membership: Crown,
  error: AlertTriangle,
  activity: Activity,
  purchase: ShoppingCart,
  calendar: Calendar,
  neutral: MessageCircle,
};

/* ---------------- NOTIFICATION ITEM ---------------- */
function NotificationItem({ item, onDelete, onMarkRead }) {
  const Icon = iconMap[item.icon] || Bell;

  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 p-4 rounded-xl border bg-[var(--bg-card)] hover:shadow transition">
      <div className="flex gap-3">
        <div className="w-9 h-9 flex items-center justify-center rounded-md bg-[var(--bg-soft)] text-[var(--primary)] shrink-0">
          <Icon size={16} />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-[var(--text-main)]">
            {item.title}
          </h3>
          <p className="text-sm text-[var(--text-muted)] mt-1">
            {item.message}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {new Date(item.createdAt).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 self-end sm:self-auto">
        {!item.isRead && (
          <button
            onClick={() => onMarkRead(item._id)}
            className="text-[10px] px-2 py-0.5 rounded-full text-white bg-[var(--primary)] hover:opacity-80 transition"
          >
            NEW
          </button>
        )}
        <button
          onClick={() => onDelete(item._id)}
          className="p-1.5 rounded-md text-red-500 hover:bg-red-50 transition"
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
  const perPage = 4;

  const token = localStorage.getItem("adminToken")?.trim();
  const API_BASE = import.meta.env.VITE_API_BASE;

  /* -------- FETCH NOTIFICATIONS -------- */
  const fetchNotifications = async () => {
    if (!token) return console.error("Admin token missing");

    try {
      // ← यहाँ ?recipient=admin जोड़ना है
      const res = await fetch(`${API_BASE}/api/notifications?recipient=admin`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.error("Failed to fetch notifications:", res.status, errorData);
        setNotifications([]);
        return;
      }

      const data = await res.json();
      setNotifications(data.notifications || []);
    } catch (err) {
      console.error("Error fetching notifications:", err);
      setNotifications([]);
    }
  };

  /* -------- DELETE NOTIFICATION -------- */
  const handleDelete = async (id) => {
    if (!token) return;
    try {
      const res = await fetch(`${API_BASE}/api/notifications/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        const text = await res.text();
        console.error("Failed to delete:", res.status, text);
        return;
      }
      setNotifications((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      console.error("Error deleting notification:", err);
    }
  };

  /* -------- MARK AS READ -------- */
  const handleMarkRead = async (id) => {
    if (!token) return;
    try {
      const res = await fetch(`${API_BASE}/api/notifications/${id}/read`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        const text = await res.text();
        console.error("Failed to mark as read:", res.status, text);
        return;
      }
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n)),
      );
    } catch (err) {
      console.error("Error marking as read:", err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [page, tab]);

  /* -------- FILTER & PAGINATION -------- */
  const filteredNotifications = useMemo(() => {
    if (!Array.isArray(notifications)) return [];
    if (tab === "unread" || tab === "new")
      return notifications.filter((n) => !n.isRead);
    return notifications;
  }, [tab, notifications]);

  const totalPages = Math.ceil(filteredNotifications.length / perPage);
  const paginatedData = filteredNotifications.slice(
    (page - 1) * perPage,
    page * perPage,
  );

  return (
    <div className="min-h-screen bg-[var(--bg-main)] py-8 sm:py-12 px-3 sm:px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-main)]">
            Notifications
          </h1>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {["all", "new", "unread"].map((t) => (
            <button
              key={t}
              onClick={() => {
                setTab(t);
                setPage(1);
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition w-full sm:w-auto ${
                tab === t
                  ? "bg-[var(--primary)] text-white"
                  : "bg-[var(--bg-soft)] text-[var(--text-main)]"
              }`}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {paginatedData.length ? (
            paginatedData.map((item) => (
              <NotificationItem
                key={item._id}
                item={item}
                onDelete={handleDelete}
                onMarkRead={handleMarkRead}
              />
            ))
          ) : (
            <p className="text-center text-[var(--text-muted)] py-10">
              No notifications found.
            </p>
          )}
        </div>

        {totalPages > 1 && (
          <Pagination page={page} totalPages={totalPages} setPage={setPage} />
        )}
      </div>
    </div>
  );
}
