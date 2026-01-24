// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import StatCard from "../components/cards/StatCard";
import RevenueChart from "../components/charts/RevenueAnalytics";
import DonutChart from "../components/charts/DonutChart";
import MonthlyTargetCard from "../components/cards/MonthlyTargetCard";
import UserRetention from "../components/charts/UserRetention";
import OrderStatusCard from "../components/cards/OrderStatusCard";
import FunnelChart from "../components/charts/FunnelChart";
import RecentOrdersTable from "../components/tables/RecentOrdersTable";
import RecentActivity from "../components/RecentActivity/RecentActivity";

export default function Dashboard() {
  const [stats, setStats] = useState({
    "Total Sales": { value: "—", percent: "0%", trend: "up" },
    "Total Orders": { value: "—", percent: "0%", trend: "up" },
    "Total Customers": {
      value: "—",
      percent: "—",
      trend: "up",
    },
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem("adminToken") || "";
        console.log(
          "[DASHBOARD] Using token:",
          token ? token.slice(0, 10) + "..." : "NO TOKEN",
        );

        // ───────────── 1. Fetch Revenue & Orders Stats ─────────────
        const statsRes = await axios.get(
          `${import.meta.env.VITE_API_BASE}/api/orders/admin/stats`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        let revenueValue = "—";
        let revenuePercent = "+0%";
        let ordersValue = "—";
        let ordersPercent = "+0%";

        if (statsRes.data?.success && Array.isArray(statsRes.data.stats)) {
          const apiStats = statsRes.data.stats;

          // Debug log
          apiStats.forEach((item, i) => {
            console.log(
              `[DASHBOARD] Stat ${i}: "${item.title}" → value: ${item.value}, change: ${item.change}`,
            );
          });

          const revenueStat = apiStats.find((s) => s.title === "Total Revenue");
          if (revenueStat) {
            revenueValue = revenueStat.value?.replace(/[₹,]/g, "") || "—";
            revenuePercent = revenueStat.change || "+0%";
          }

          const ordersStat = apiStats.find(
            (s) => s.title === "Total Transactions",
          );
          if (ordersStat) {
            ordersValue = ordersStat.value || "—";
            ordersPercent = ordersStat.change || "+0%";
          }
        } else {
          console.log(
            "[DASHBOARD] Revenue/Orders stats not successful:",
            statsRes.data,
          );
        }

        // ───────────── 2. Fetch Total Customers (using existing /customers route) ─────────────
        let customersValue = "—";
        let customersPercent = "+8.02%"; // fallback
        let customersTrend = "up";

        try {
          const customersRes = await axios.get(
            `${import.meta.env.VITE_API_BASE}/api/admin/customers`, // adjust prefix if needed (e.g. /api/customers)
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );

          if (Array.isArray(customersRes.data)) {
            const count = customersRes.data.length;
            customersValue = count.toLocaleString("en-IN");
            // Optional: you can make a rough estimate or leave static percent for now
            // Real % change needs backend support (createdAt comparison)
            customersPercent = count > 100000 ? "+8.02%" : "+12.4%"; // placeholder
            customersTrend = customersPercent.startsWith("+") ? "up" : "down";

            console.log(`[DASHBOARD] Total Customers from API: ${count}`);
          } else {
            console.log(
              "[DASHBOARD] Customers response is not array:",
              customersRes.data,
            );
          }
        } catch (custErr) {
          console.error("[DASHBOARD] Customers fetch failed:", custErr.message);
          if (custErr.response) {
            console.error("Status:", custErr.response.status);
            console.error("Data:", custErr.response.data);
          }
        }

        // ───────────── Update state with all values ─────────────
        setStats({
          "Total Sales": {
            value: revenueValue,
            percent: revenuePercent,
            trend: revenuePercent.startsWith("+") ? "up" : "down",
          },
          "Total Orders": {
            value: ordersValue,
            percent: ordersPercent,
            trend: ordersPercent.startsWith("+") ? "up" : "down",
          },
          "Total Customers": {
            value: customersValue,
            percent: customersPercent,
            trend: customersTrend,
          },
        });
      } catch (err) {
        console.error("[DASHBOARD] Main fetch error:", err.message);
        if (err.response) {
          console.error("[DASHBOARD] Response status:", err.response.status);
          console.error("[DASHBOARD] Response data:", err.response.data);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 gap-6">
      {/* ================= ROW 1 – TOP STATS ================= */}
      <div className="col-span-1 md:col-span-3 lg:col-span-3">
        <StatCard
          title="Total Sales"
          value={stats["Total Sales"].value}
          percent={stats["Total Sales"].percent}
          trend={stats["Total Sales"].trend}
          loading={loading}
        />
      </div>

      <div className="col-span-1 md:col-span-3 lg:col-span-3">
        <StatCard
          title="Total Orders"
          value={stats["Total Orders"].value}
          percent={stats["Total Orders"].percent}
          trend={stats["Total Orders"].trend}
          loading={loading}
        />
      </div>

      <div className="col-span-1 md:col-span-3 lg:col-span-3">
        <StatCard
          title="Total Customers"
          value={stats["Total Customers"].value}
          percent={stats["Total Customers"].percent}
          trend={stats["Total Customers"].trend}
          loading={loading}
        />
      </div>

      {/* Donut Chart – spans 2 rows */}
      <div className="col-span-1 md:col-span-3 lg:col-span-3 md:row-span-2 lg:row-span-2 p-1">
        <DonutChart />
      </div>

      {/* ================= ROW 2 – REVENUE + TARGET ================= */}
      <div className="col-span-1 md:col-span-5 lg:col-span-5 bg-[#fffaf3] rounded-xl shadow-sm p-4">
        <RevenueChart />
      </div>

      <div className="col-span-1 md:col-span-4 lg:col-span-4 p-1 bg-[var(--bg-main)] rounded-xl shadow-sm">
        <MonthlyTargetCard />
      </div>

      {/* ================= ROW 3 – ORDER STATUS, FUNNEL, USER RETENTION ================= */}
      <div className="col-span-1 md:col-span-4 lg:col-span-4 md:row-span-3 lg:row-span-3 bg-[var(--bg-main)] rounded-xl p-4 shadow-sm">
        <OrderStatusCard />
      </div>

      <div className="col-span-1 md:col-span-4 lg:col-span-4 md:row-span-3 lg:row-span-3 rounded-xl bg-[var(--bg-main)] shadow-sm">
        <FunnelChart />
      </div>

      <div className="col-span-1 md:col-span-4 lg:col-span-4 md:row-span-3 lg:row-span-3 bg-[var(--bg-main)] rounded-xl shadow-sm">
        <UserRetention />
      </div>

      {/* ================= ROW 4 – TABLES ================= */}
      <div className="col-span-1 md:col-span-8 lg:col-span-8 bg-[var(--bg-main)] rounded-xl p-6 shadow-sm">
        <RecentOrdersTable />
      </div>

      <div className="col-span-1 md:col-span-4 lg:col-span-4 bg-[var(--bg-main)] shadow-sm rounded-xl space-y-6">
        <RecentActivity />
      </div>
    </div>
  );
}
