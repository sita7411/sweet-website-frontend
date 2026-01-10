import { useState } from "react";
import {
  TrendingUp,
  IndianRupee,
  FileText,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

/* -------------------- STATS -------------------- */
const stats = [
  { title: "Total Revenue", value: "₹12,45,800", change: "+8.2%", icon: IndianRupee },
  { title: "Total Transactions", value: "1,248", change: "+3.4%", icon: FileText },
  { title: "Avg Order Value", value: "₹998", change: "+2.1%", icon: ShoppingCart },
];

/* -------------------- TRANSACTIONS -------------------- */
const transactions = Array.from({ length: 22 }, (_, i) => ({
  txnId: `TXN00${1245 + i}`,
  orderId: `ORD10${21 + i}`,
  product: "Premium T-Shirt",
  customer: "Rahul Sharma",
  amount: 999 + i * 20,
  status: "Success",
  date: "10 Jan 2026",
}));

export default function FinanceReports() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const totalPages = Math.ceil(transactions.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(currentPage * itemsPerPage, transactions.length);
  const currentTransactions = transactions.slice(startIndex, endIndex);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-main)] p-4 sm:p-6">

      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-main)]">Finance & Reports</h1>
          <p className="text-sm text-[var(--text-muted)]">Sales, transactions and accounting overview</p>
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
          <div key={index} className="bg-[var(--bg-card)] rounded-2xl border border-[var(--bg-soft)] p-6 shadow-sm">
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
              <span className="ml-1 text-[var(--text-muted)]">vs previous period</span>
            </div>
          </div>
        ))}
      </div>

      {/* ================= TABLE TITLE ================= */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-[var(--text-main)]">Recent Transactions</h3>
        <p className="text-sm text-[var(--text-muted)] mt-1">List of latest payments & orders</p>
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
            {currentTransactions.map((txn) => (
              <tr key={txn.txnId} className="hover:bg-[var(--bg-main)]">
                <td className="px-4 py-3 text-[var(--text-muted)]">{txn.txnId}</td>
                <td className="px-4 py-3">{txn.orderId}</td>
                <td className="px-4 py-3">{txn.product}</td>
                <td className="px-4 py-3">{txn.customer}</td>
                <td className="px-4 py-3 font-medium">₹{txn.amount.toLocaleString()}</td>
                <td className="px-4 py-3">
                  <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">{txn.status}</span>
                </td>
                <td className="px-4 py-3 text-[var(--text-muted)]">{txn.date}</td>
              </tr>
            ))}
          </tbody>

          {/* ================= TABLE PAGINATION ================= */}
          <tfoot>
            <tr>
              <td colSpan={7} className="border-t p-3">
                <div className="flex flex-wrap gap-2 justify-between items-center">
                  <span className="text-xs sm:text-sm text-[var(--text-muted)]">
                    Showing {startIndex + 1}–{endIndex} of {transactions.length}
                  </span>

                  <div className="flex gap-1 flex-wrap">
                    <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} className="p-2 border rounded-lg disabled:opacity-40 hover:bg-[var(--bg-soft)]">
                      <ChevronLeft size={16} />
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => (
                      <button key={i + 1} onClick={() => goToPage(i + 1)} className={`px-3 py-1 rounded-lg text-sm ${currentPage === i + 1 ? "bg-[var(--primary)] text-white" : "border hover:bg-[var(--bg-soft)]"}`}>
                        {i + 1}
                      </button>
                    ))}

                    <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} className="p-2 border rounded-lg disabled:opacity-40 hover:bg-[var(--bg-soft)]">
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
        {currentTransactions.map((txn) => (
          <div key={txn.txnId} className="bg-[var(--bg-card)] border border-[var(--bg-soft)] rounded-xl p-4 shadow-sm">
            <div className="flex justify-between">
              <span className="text-sm font-medium">{txn.product}</span>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">{txn.status}</span>
            </div>
            <div className="mt-2 text-sm text-[var(--text-muted)]">Order: {txn.orderId}</div>
            <div className="mt-2 flex justify-between text-sm">
              <span>{txn.customer}</span>
              <span className="font-semibold">₹{txn.amount.toLocaleString()}</span>
            </div>
            <div className="mt-2 text-xs text-[var(--text-muted)]">{txn.date}</div>
          </div>
        ))}
      </div>

      {/* ================= MOBILE PAGINATION ================= */}
      <div className="sm:hidden mt-6 flex justify-between items-center">
        <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} className="p-2 border rounded-lg disabled:opacity-40">
          <ChevronLeft size={18} />
        </button>
        <span className="text-sm">Page {currentPage} of {totalPages}</span>
        <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} className="p-2 border rounded-lg disabled:opacity-40">
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
