// src/pages/Dashboard.jsx

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
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 gap-6">

      {/* ================= ROW 1 – TOP STATS ================= */}
      <div className="col-span-1 md:col-span-3 lg:col-span-3">
        <StatCard title="Total Sales" value="983,410" percent="+3.34%" trend="up" />
      </div>

      <div className="col-span-1 md:col-span-3 lg:col-span-3">
        <StatCard title="Total Orders" value="58,375" percent="-2.89%" trend="down" />
      </div>

      <div className="col-span-1 md:col-span-3 lg:col-span-3">
        <StatCard title="Total Visitors" value="237,782" percent="+8.02%" trend="up" />
      </div>

      {/* Donut Chart – spans 2 rows */}
      <div className="col-span-1 md:col-span-3 lg:col-span-3 md:row-span-2 lg:row-span-2 p-1">
        <DonutChart />
      </div>

      {/* ================= ROW 2 – REVENUE + TARGET ================= */}

      {/* Revenue Analytics */}
      <div className="col-span-1 md:col-span-5 lg:col-span-5 bg-[#fffaf3] rounded-xl shadow-sm p-4">
        <RevenueChart />
      </div>

      {/* Monthly Target */}
      <div className="col-span-1 md:col-span-4 lg:col-span-4 p-1 bg-[var(--bg-main)] rounded-xl shadow-sm">
        <MonthlyTargetCard />
      </div>

      {/* ================= ROW 3 – ORDER STATUS, FUNNEL, USER RETENTION ================= */}

      {/* Order Status – spans 3 rows */}
      <div className="col-span-1 md:col-span-4 lg:col-span-4 md:row-span-3 lg:row-span-3 bg-[var(--bg-main)] rounded-xl p-4 shadow-sm">
        <OrderStatusCard />
      </div>

      {/* Funnel Chart – spans 3 rows */}
      <div className="col-span-1 md:col-span-4 lg:col-span-4 md:row-span-3 lg:row-span-3 rounded-xl bg-[var(--bg-main)] shadow-sm">
        <FunnelChart />
      </div>

      {/* User Retention */}
      <div className="col-span-1 md:col-span-4 lg:col-span-4 md:row-span-3 lg:row-span-3 bg-[var(--bg-main)] rounded-xl shadow-sm">
        <UserRetention />
      </div>

      {/* ================= ROW 4 – TABLES ================= */}

      {/* Recent Orders Table */}
      <div className="col-span-1 md:col-span-8 lg:col-span-8 bg-[var(--bg-main)] rounded-xl p-6 shadow-sm">
        <RecentOrdersTable />
      </div>

      {/* Recent Activity */}
      <div className="col-span-1 md:col-span-4 lg:col-span-4 bg-[var(--bg-main)] shadow-sm rounded-xl space-y-6">
        <RecentActivity />
      </div>

    </div>
  );
}
