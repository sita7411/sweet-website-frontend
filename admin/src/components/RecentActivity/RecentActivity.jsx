// src/components/RecentActivity.jsx
import React from "react";
import { ShoppingCart, Star, Tag, Box } from "lucide-react";

const activities = [
  {
    icon: <ShoppingCart className="text-white w-4 h-4" />,
    title: "Maureen Steel purchased 2 items totaling $120.",
    time: "10:30 AM",
    bg: "bg-primary",
  },
  {
    icon: <Tag className="text-white w-4 h-4" />,
    title: 'The price of "Smart TV" was updated from $500 to $450.',
    time: "9:45 AM",
    bg: "bg-secondary",
  },
  {
    icon: <Star className="text-white w-4 h-4" />,
    title: 'Vincent Laurent left a 5-star review for "Wireless Headphones."',
    time: "8:20 AM",
    bg: "bg-accent",
  },
  {
    icon: <Box className="text-white w-4 h-4" />,
    title: '"Running Shoes" stock is below 10 units.',
    time: "7:50 AM",
    bg: "bg-secondary",
  },
  {
    icon: <Tag className="text-white w-4 h-4" />,
    title: 'Damian Ugo\'s order status changed from "Pending" to "Processing."',
    time: "7:00 AM",
    bg: "bg-primary",
  },
];

export default function RecentActivity() {
  return (
    <div
      className="rounded-xl p-4 shadow-md w-full max-w-md"
    >
      <h2
        className="font-semibold text-lg mb-4"
        style={{ color: "var(--text-main)" }}
      >
        Recent Activity
      </h2>
      <div className="flex flex-col space-y-4">
        {activities.map((item, index) => (
          <div key={index} className="flex items-start space-x-3">
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
              {item.icon}
            </div>
            <div className="flex flex-col">
              <p
                className="text-sm"
                style={{ color: "var(--text-main)" }}
              >
                {item.title}
              </p>
              <span
                className="text-xs mt-1"
                style={{ color: "var(--text-muted)" }}
              >
                {item.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
