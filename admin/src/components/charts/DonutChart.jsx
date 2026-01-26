import { useEffect, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Crown, Activity } from "lucide-react";

const COLORS = [
  "var(--primary)",
  "var(--accent)",
  "var(--secondary)",
  "var(--text-muted)",
];

export default function TopProducts() {
  const [data, setData] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [revenueChange, setRevenueChange] = useState("0");
  const [bestSeller, setBestSeller] = useState("—");
  const [avgOrderValue, setAvgOrderValue] = useState(540); // fallback
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem("adminToken");
        if (!token) {
          console.warn("No admin token found");
          setLoading(false);
          return;
        }

        const response = await fetch(
          `${import.meta.env.VITE_API_BASE}/api/stats/overview`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );

        if (!response.ok) throw new Error("Failed to fetch");

        const result = await response.json();

        if (result.success) {
          // Top products array (now directly from result.data)
          setData(result.data || []);

          // All other stats are nested under overview
          const overview = result.overview || {};

          setTotalRevenue(Math.round(overview.revenue?.thisMonth || 0));

          // Revenue change (format to 1 decimal if needed)
          setRevenueChange(overview.revenue?.change?.toFixed(1) || "0");

          setBestSeller(overview.bestSellerThisMonth || "—");

          setAvgOrderValue(overview.avgOrderValue?.value || 540);
        }
      } catch (err) {
        console.error("Top products fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopProducts();
  }, []);

  // Format number → 32450 → 32,450
  const formatCurrency = (num) => {
    return num.toLocaleString("en-IN");
  };

  if (loading) {
    return (
      <div className="bg-[var(--bg-card)] rounded-xl shadow p-5 w-full bg-[var(--bg-main)] max-w-[550px] mx-auto text-center py-10 text-gray-500">
        Loading...
      </div>
    );
  }

  // Fallback if no data
  if (data.length === 0) {
    return (
      <div className="bg-[var(--bg-card)] rounded-xl shadow p-5 w-full bg-[var(--bg-main)] max-w-[550px] mx-auto text-center py-10 text-gray-500">
        No data available this month
      </div>
    );
  }

  return (
    <div className="bg-[var(--bg-card)] rounded-xl shadow p-5 w-full bg-[var(--bg-main)] max-w-[550px] mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <div>
          <h3 className="text-sm font-semibold text-[var(--text-main)]">
            Top Products
          </h3>
          <p className="text-xs text-gray-400">This Month</p>
        </div>
        <span
          className={`flex items-center gap-1 text-xs ${Number(revenueChange) >= 0 ? "text-green-600" : "text-red-600"}`}
        >
          <TrendingUp size={14} /> {revenueChange}%
        </span>
      </div>

      {/* Donut */}
      <div className="relative flex justify-center my-3">
        <PieChart width={175} height={175}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={76}
            dataKey="value"
            startAngle={90}
            endAngle={-270}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>

        {/* Center */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <p className="text-xs text-gray-400">Revenue</p>
          <p className="text-xl font-bold text-[var(--text-main)]">
            ₹{formatCurrency(totalRevenue)}
          </p>
          <p className="text-[11px] text-green-600 mt-0.5">
            +9.3%
            {/* 
              ↑ You can replace this static +9.3% with another dynamic value 
              from API if you add centerChange field later
            */}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 my-4" />

      {/* Best Product */}
      <div className="flex items-center justify-between bg-[var(--bg-soft)] rounded-lg px-3 py-2 mb-3">
        <div className="flex items-center gap-2 text-xs text-[var(--text-main)]">
          <Crown size={14} className="text-[var(--primary)]" />
          Best Seller
        </div>
        <span className="text-xs font-semibold text-[var(--text-main)]">
          {bestSeller}
        </span>
      </div>

      {/* Legend */}
      <div className="space-y-2 text-[10px]  mb-4">
        {data.map((item, index) => (
          <div key={index} className="flex justify-between">
            <span className="flex items-center gap-2 mb-1 text-[var(--text-muted)]">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              {item.name}
            </span>
            <span className="font-medium text-[var(--text-main)]">
              {item.value}%
            </span>
          </div>
        ))}
      </div>

      {/* Footer Metric */}
      <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
        <span className="flex items-center gap-2">
          <Activity size={13} />
          Avg Order Value
        </span>
        <span className="font-semibold text-[var(--text-main)]">
          ₹{formatCurrency(avgOrderValue)}
        </span>
      </div>
    </div>
  );
}
