import { useState, useEffect } from "react";
import {
  TrendingUp,
  IndianRupee,
  FileText,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const API_BASE = "https://sweet-backend-nhwt.onrender.com"; // ← change if using env variable

export default function FinanceReports() {
  const [stats, setStats] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const itemsPerPage = 15;

  useEffect(() => {
  const fetchFinanceData = async () => {
    setLoading(true);
    setError(null);

    const token = localStorage.getItem("adminToken");

    if (!token) {
      setError("Please login first");
      setLoading(false);
      return;
    }

    try {
      // Fetch stats
      const statsRes = await fetch(`${API_BASE}/api/orders/admin/stats`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!statsRes.ok) {
        console.log("Stats failed with status:", statsRes.status);
        throw new Error(`Stats failed: ${statsRes.status}`);
      }

      const statsJson = await statsRes.json();
      console.log("Stats response:", statsJson);

      if (statsJson.success && Array.isArray(statsJson.stats)) {
        const iconMap = {
          "Total Revenue": IndianRupee,
          "Total Transactions": FileText,
          "Avg Order Value": ShoppingCart,
        };

        const enrichedStats = statsJson.stats.map(item => ({
          ...item,
          icon: iconMap[item.title] || IndianRupee // safe fallback
        }));

        setStats(enrichedStats);
      } else {
        console.warn("Stats format invalid:", statsJson);
      }

      // Fetch transactions (your existing code)
      const txnRes = await fetch(
        `${API_BASE}/api/orders/admin/transactions?page=${currentPage}&limit=${itemsPerPage}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!txnRes.ok) {
        console.log("Transactions failed with status:", txnRes.status);
        throw new Error(`Transactions failed: ${txnRes.status}`);
      }

      const txnJson = await txnRes.json();
      console.log("Transactions response:", txnJson);

      if (txnJson.success) {
        setTransactions(txnJson.transactions || []);
        setTotalPages(txnJson.pagination?.totalPages || 1);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to load data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  fetchFinanceData();
}, [currentPage]);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(currentPage * itemsPerPage, transactions.length);

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--bg-main)] p-4 sm:p-6 flex items-center justify-center">
        <div className="text-[var(--text-main)]">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[var(--bg-main)] p-4 sm:p-6 flex items-center justify-center">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-main)] p-4 sm:p-6">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-main)]">
            Finance & Reports
          </h1>
          <p className="text-sm text-[var(--text-muted)]">
            Sales, transactions and accounting overview
          </p>
        </div>

        <select className="w-full md:w-auto px-4 py-2 rounded-lg bg-[var(--bg-card)] border border-[var(--bg-soft)] text-sm">
          <option>This Month</option>
          <option>Last Month</option>
          <option>Last 7 Days</option>
        </select>
      </div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-[var(--bg-card)] rounded-2xl border border-[var(--bg-soft)] p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--text-muted)]">{item.title}</p>
                <h2 className="text-2xl font-semibold mt-1">{item.value}</h2>
              </div>
              <div className="p-3 rounded-full bg-[var(--bg-soft)] text-[var(--primary)]">
                <item.icon size={22} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <TrendingUp size={16} className="mr-1" />
              {item.change}
              <span className="ml-1 text-[var(--text-muted)]">
                vs previous period
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ================= TABLE TITLE ================= */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-[var(--text-main)]">
          Recent Transactions
        </h3>
        <p className="text-sm text-[var(--text-muted)] mt-1">
          List of latest payments & orders
        </p>
      </div>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden sm:block bg-[var(--bg-card)] rounded-2xl border border-[var(--bg-soft)] shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[var(--bg-soft)] text-[var(--text-muted)]">
            <tr>
              <th className="px-4 py-3 text-left">Transaction ID</th>
              <th className="px-4 py-3 text-left">Order ID</th>
              <th className="px-4 py-3 text-left">Product</th>
              <th className="px-4 py-3 text-left">Customer</th>
              <th className="px-4 py-3 text-left">Amount</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Date</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {transactions.map((txn) => (
              <tr key={txn.txnId} className="hover:bg-[var(--bg-main)]">
                <td className="px-4 py-3 text-[var(--text-muted)]">
                  {txn.txnId}
                </td>
                <td className="px-4 py-3">{txn.orderId}</td>
                <td className="px-4 py-3">{txn.product}</td>
                <td className="px-4 py-3">{txn.customer}</td>
                <td className="px-4 py-3 font-medium">
                  ₹{Number(txn.amount || 0).toLocaleString()}
                </td>
                <td className="px-4 py-3">
                  <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
                    {txn.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-[var(--text-muted)]">
                  {txn.date}
                </td>
              </tr>
            ))}
          </tbody>

          {/* ================= TABLE PAGINATION ================= */}
          <tfoot>
            <tr>
              <td colSpan={7} className="border-t p-3">
                <div className="flex flex-wrap gap-2 justify-between items-center">
                  <span className="text-xs sm:text-sm text-[var(--text-muted)]">
                    Showing {startIndex + 1}–{endIndex} of{" "}
                    {transactions.length * totalPages}
                  </span>

                  <div className="flex gap-1 flex-wrap">
                    <button
                      onClick={() => goToPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="p-2 border rounded-lg disabled:opacity-40 hover:bg-[var(--bg-soft)]"
                    >
                      <ChevronLeft size={16} />
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => goToPage(i + 1)}
                        className={`px-3 py-1 rounded-lg text-sm ${currentPage === i + 1 ? "bg-[var(--primary)] text-white" : "border hover:bg-[var(--bg-soft)]"}`}
                      >
                        {i + 1}
                      </button>
                    ))}

                    <button
                      onClick={() => goToPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="p-2 border rounded-lg disabled:opacity-40 hover:bg-[var(--bg-soft)]"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="sm:hidden space-y-2 mt-4">
        {transactions.map((txn) => (
          <div
            key={txn.txnId}
            className="bg-[var(--bg-card)] border border-[var(--bg-soft)] rounded-xl p-4 shadow-sm"
          >
            <div className="flex justify-between">
              <span className="text-sm font-medium">{txn.product}</span>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                {txn.status}
              </span>
            </div>
            <div className="mt-2 text-sm text-[var(--text-muted)]">
              Order: {txn.orderId}
            </div>
            <div className="mt-2 flex justify-between text-sm">
              <span>{txn.customer}</span>
              <span className="font-semibold">
                ₹{Number(txn.amount || 0).toLocaleString()}
              </span>
            </div>
            <div className="mt-2 text-xs text-[var(--text-muted)]">
              {txn.date}
            </div>
          </div>
        ))}
      </div>

      {/* ================= MOBILE PAGINATION ================= */}
      <div className="sm:hidden mt-6 flex justify-between items-center">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 border rounded-lg disabled:opacity-40"
        >
          <ChevronLeft size={18} />
        </button>
        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 border rounded-lg disabled:opacity-40"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
