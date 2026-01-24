import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function ConversionRateCard() {
  const [stats, setStats] = useState(null);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchConversionStats();
  }, []);

  const fetchConversionStats = async () => {
    try {
      const adminToken = localStorage.getItem("adminToken");
      console.log("Admin token:", adminToken);

      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE}/api/stats/conversion`,
        {
          headers: { Authorization: `Bearer ${adminToken}` },
        },
      );

      console.log("API Response:", res.data);

      // ✅ directly set stats, no success check
      setStats(res.data);
      setChartData(res.data.chartData || []);
    } catch (err) {
      console.error(
        "Failed to fetch conversion stats:",
        err.response || err.message,
      );
    }
  };

  if (!stats) {
    return (
      <div className="p-5 max-w-sm w-full bg-[var(--bg-card)] rounded-xl shadow">
        Loading...
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-sm">
      {/* Card */}
      <div className="p-5   ">
        {/* Header */}
        <div className="flex justify-between items-start mb-4 mt-2">
          <div>
            <p className="text-xs uppercase tracking-wide font-semibold text-[var(--text-main)]">
              Conversion Rate
            </p>

            <div className="flex items-center gap-2 mt-1">
              <h2 className="text-3xl font-semibold text-[var(--text-main)]">
                {stats.conversionRate}%
              </h2>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                +{stats.changeRate}%
              </span>
            </div>
          </div>

          <button className="text-xs px-3 py-1 rounded-lg border border-black/10 text-[var(--text-muted)] hover:bg-[var(--bg-soft)] transition">
            Details
          </button>
        </div>

        {/* Stats */}
        <div className="space-y-3 mb-4 text-sm">
          <Stat
            label="Added to Cart"
            value={stats.stats.addedToCart.value.toLocaleString("en-IN")}
            change={`+${stats.stats.addedToCart.change}%`}
            positive
          />
          <Stat
            label="Reached Checkout"
            value={stats.stats.reachedCheckout.value.toLocaleString("en-IN")}
            change={`${stats.stats.reachedCheckout.change > 0 ? "+" : ""}${stats.stats.reachedCheckout.change}%`}
            positive={stats.stats.reachedCheckout.change >= 0}
          />
          <Stat
            label="Purchased"
            value={stats.stats.purchased.value.toLocaleString("en-IN")}
            change={`+${stats.stats.purchased.change}%`}
            positive
          />
        </div>

        {/* Chart Container */}
        <div className="bg-[var(--bg-soft)] rounded-xl p-3 border border-black/5">
          <ResponsiveContainer width="100%" height={150}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="orangeFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f2b705" stopOpacity={0.65} />
                  <stop offset="100%" stopColor="#f2b705" stopOpacity={0.05} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e7dccf"
              />

              <XAxis
                dataKey="month"
                tick={{ fontSize: 10, fill: "#8a6a52" }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis hide />

              <Tooltip
                cursor={{ stroke: "#f2b705", strokeWidth: 1 }}
                contentStyle={{
                  backgroundColor: "#ffffff",
                  borderRadius: "10px",
                  border: "1px solid #f0e4d5",
                  boxShadow: "0 12px 25px rgba(0,0,0,0.12)",
                }}
                labelStyle={{ fontSize: 11, color: "#8a6a52" }}
              />

              <Area
                type="monotone"
                dataKey="value"
                stroke="#f2b705"
                strokeWidth={2.5}
                fill="url(#orangeFill)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

/* Small Stat Component */
function Stat({ label, value, change, positive }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-[var(--text-muted)]">{label}</span>
      <span className="text-[var(--text-main)] font-medium">
        {value}{" "}
        <span
          className={`text-xs ${positive ? "text-green-600" : "text-red-500"}`}
        >
          {change}
        </span>
      </span>
    </div>
  );
}
