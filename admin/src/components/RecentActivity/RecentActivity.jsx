import React, { useEffect, useState } from "react";
import { ShoppingBag, Star, Tag, Box, Bell, Info, Gift, AlertTriangle,ShieldCheck,Truck  } from "lucide-react";
import { Link } from "react-router-dom";
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

const getIcon = (iconName) => {
  return iconMap[iconName?.toLowerCase()] || iconMap.default || Bell;
};

export default function RecentActivity() {
  const [activities, setActivities] = useState([]);
  const token = localStorage.getItem("adminToken")?.trim();
  const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

  useEffect(() => {
    const fetchActivities = async () => {
      if (!token) return;

      try {
        const res = await fetch(
          `${API_BASE}/api/notifications?recipient=admin&limit=5`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        if (!res.ok) throw new Error("Failed to fetch activity");

        const data = await res.json();

        const formatted = data.notifications.map((n) => {
  return {
    type: n.icon || "default", // <-- use icon, not type
    title: n.title,
    message: n.message,
    link: n.link,
    time: new Date(n.createdAt).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    }),
    bg: n.isRead ? "bg-secondary" : "bg-primary",
    _id: n._id,
  };
});

        setActivities(formatted);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchActivities();
  }, [token, API_BASE]);

  return (
    <div className="rounded-xl p-4 shadow-md w-full max-w-md">
      <h2
        className="font-semibold text-lg mb-4"
        style={{ color: "var(--text-main)" }}
      >
        Recent Activity
      </h2>

      <div className="flex flex-col space-y-4">
        {activities.length > 0 ? (
          activities.map((item) => {
            const Icon = getIcon(item.type);

            return (
              <div key={item._id} className="flex items-start space-x-3">
                <div
                  className="p-2 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor:
                      item.bg === "bg-primary"
                        ? "var(--primary)"
                        : item.bg === "bg-secondary"
                          ? "var(--secondary)"
                          : "var(--accent)",
                  }}
                >
                  <Icon className="text-white w-4 h-4" />
                </div>

                <div className="flex flex-col">
                  {item.link ? (
                    <Link
                      to={item.link}
                      className="text-sm font-medium text-[var(--primary)] hover:underline"
                    >
                      {item.title}
                    </Link>
                  ) : (
                    <p
                      className="text-sm"
                      style={{ color: "var(--text-main)" }}
                    >
                      {item.title}
                    </p>
                  )}
                  {item.message && (
                    <p className="text-xs text-[var(--text-muted)]">
                      {item.message}
                    </p>
                  )}
                  <span className="text-xs mt-1 text-[var(--text-muted)]">
                    {item.time}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-[var(--text-muted)] py-8">
            No recent activity
          </p>
        )}
      </div>
    </div>
  );
}
