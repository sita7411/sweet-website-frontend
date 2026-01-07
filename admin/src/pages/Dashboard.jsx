// src/pages/Dashboard.jsx

import StatCard from "../components/cards/StatCard";
import RevenueChart from "../components/charts/RevenueAnalytics";
import DonutChart from "../components/charts/DonutChart";
import MonthlyTargetCard from "../components/cards/MonthlyTargetCard";
// import TrafficSources from "../components/charts/TrafficSources"; 
import OrderStatusCard from "../components/cards/OrderStatusCard";
// import FunnelChart from "../components/charts/FunnelChart";
// import RecentOrdersTable from "../components/tables/RecentOrdersTable";
// import RecentActivity from "../components/lists/RecentActivity";
export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

      {/* ================= ROW 1 – TOP STATS ================= */}
      <div className="xl:col-span-3">
        <StatCard title="Total Sales" value="983,410" percent="+3.34%" trend="up" />
      </div>

      <div className="xl:col-span-3">
        <StatCard title="Total Orders" value="58,375" percent="-2.89%" trend="down" />
      </div>

      <div className="xl:col-span-3">
        <StatCard title="Total Visitors" value="237,782" percent="+8.02%" trend="up" />
      </div>

      {/* Donut Chart – spans 2 rows */}
      <div className="xl:col-span-3 xl:row-span-2 p-1">
        <DonutChart />
      </div>

      {/* ================= ROW 2 – REVENUE + TARGET ================= */}

      {/* Revenue Analytics */}
      <div className="xl:col-span-5  bg-[#fffaf3] rounded-xl shadow-sm p-4">
        <RevenueChart />
      </div>

      {/* Monthly Target */}
      <div className="xl:col-span-4 p-1">
        <MonthlyTargetCard />
      </div>

   <div className="xl:col-span-3 bg-[var(--bg-main)] rounded-xl p-6 shadow-sm xl:w-[113%]">
  <OrderStatusCard />
</div>

{/* ================= ACTIVE USERS + CONVERSION FUNNEL ================= */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
   
        {/* Conversion Funnel */}
        {/* <div className="xl:col-span-8 bg-white rounded-xl p-6 shadow-sm">
          <FunnelChart />
        </div> */}
      </div>

      {/* ================= RECENT ORDERS + RIGHT SIDE ================= */}
      {/* <div className="grid grid-cols-1 xl:grid-cols-12 gap-6"> */}
        {/* Recent Orders Table */}
        {/* <div className="xl:col-span-8 bg-white rounded-xl p-6 shadow-sm">
          <RecentOrdersTable />
        </div> */}

        {/* Traffic Sources + Recent Activity */}
        {/* <div className="xl:col-span-4 space-y-6">
          <TrafficSources />  
          <RecentActivity />
        </div> */}
      {/* </div> */}
    </div>
  );
}
