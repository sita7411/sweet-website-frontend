import {
  PencilSquareIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  StarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* -------------------- DATA -------------------- */
const stats = [
  { title: "Total Products", value: "250", change: "+8%", changePositive: true },
  { title: "Product Revenue", value: "$15,490", change: "+8%", changePositive: true },
  { title: "Products Sold", value: "2,355", change: "+7%", changePositive: true },
  { title: "Avg. Monthly Sales", value: "890", change: "+5%", changePositive: true },
];

const allProducts = [
  { id: 1, img: "https://via.placeholder.com/80", name: "Uxflow T-Shirt #10 – White", price: "$1.35", sales: "471 pcs", revenue: "$635.85", stock: 100, status: "In Stock", rating: 5.0, active: true },
  { id: 2, img: "https://via.placeholder.com/80", name: "Uxflow T-Shirt #10 – Black", price: "$1.35", sales: "402 pcs", revenue: "$544.05", stock: 0, status: "Out of Stock", rating: 5.0, active: false },
  { id: 3, img: "https://via.placeholder.com/80", name: "Uxflow T-Shirt #19 – White", price: "$1.35", sales: "455 pcs", revenue: "$615.25", stock: 20, status: "Restock", rating: 4.9, active: false },
];

/* -------------------- COMPONENT -------------------- */
export default function ProductPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [selectedItems, setSelectedItems] = useState([]);
  const [products, setProducts] = useState(allProducts);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSelectAll = (e) => {
    setSelectedItems(e.target.checked ? paginatedProducts.map((p) => p.id) : []);
  };

  const handleSelectItem = (id) => {
    setSelectedItems((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  const handleAdd = () => toast.success("Product added successfully");
  const handleEdit = () => toast.info("Product updated");
  const handleDelete = () => toast.error("Product deleted");

  return (
    <div className="min-h-screen bg-[var(--bg-main)] p-4 md:p-6 lg:p-8 space-y-6 text-[#3a2416]">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-main)] tracking-tight">Products</h1>
          <p className="text-sm text-[#8a6a52] mt-1">
            Monitor inventory, sales performance & availability
          </p>
        </div>
        <button
          onClick={handleAdd}
          className="bg-[#c63b2f] text-white px-4 py-2 rounded-lg shadow hover:bg-[#b23328] transition"
        >
          + Add Product
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-xl p-5 border border-[#fff1db] shadow hover:shadow-xl transition flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <p className="text-xs text-[#8a6a52] uppercase tracking-wide">{stat.title}</p>
              <div className={`text-sm font-semibold ${stat.changePositive ? "text-green-600" : "text-red-600"}`}>
                {stat.change}
              </div>
            </div>
            <h3 className="text-2xl font-bold mt-3">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-[#fff1db] shadow overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 flex flex-col lg:flex-row justify-between gap-3 border-b border-[#fff1db]">
          <div className="relative w-full lg:w-72">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8a6a52]" />
            <input
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              placeholder="Search products..."
              className="w-full pl-10 pr-3 py-2 text-sm sm:text-base rounded-lg bg-[#fff1db] focus:outline-none focus:ring-2 focus:ring-[#c63b2f]"
            />
          </div>
        </div>

        {/* Desktop Table */}
        <div className="overflow-x-auto hidden md:block">
          <table className="min-w-full text-sm">
            <thead className="bg-[#fff1db] uppercase text-[#8a6a52] text-xs tracking-wide">
              <tr>
                <th className="p-3">
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={paginatedProducts.length > 0 && selectedItems.length === paginatedProducts.length}
                    className="accent-[#c63b2f]"
                  />
                </th>
                <th className="p-3 text-left">Product</th>
                <th className="p-3 text-center">Price</th>
                <th className="p-3 text-center">Sales</th>
                <th className="p-3 text-center">Revenue</th>
                <th className="p-3 text-center">Stock</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-center">Active</th>
                <th className="p-3 text-center">Rating</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.map((p) => (
                <tr key={p.id} className="border-t hover:bg-[#fff6ec] transition">
                  <td className="p-3">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(p.id)}
                      onChange={() => handleSelectItem(p.id)}
                      className="accent-[#c63b2f]"
                    />
                  </td>
                  <td className="p-3 flex items-center gap-3">
                    <img src={p.img} className="w-12 h-12 rounded-lg border object-cover" />
                    <span className="font-medium">{p.name}</span>
                  </td>
                  <td className="p-3 text-center font-semibold">{p.price}</td>
                  <td className="p-3 text-center">{p.sales}</td>
                  <td className="p-3 text-center font-semibold">{p.revenue}</td>
                  <td className="p-3 text-center">{p.stock}</td>
                  <td className="p-3 text-center">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full
                      ${p.status === "In Stock" && "bg-green-100 text-green-800"}
                      ${p.status === "Out of Stock" && "bg-red-100 text-red-800 whitespace-nowrap"}
                      ${p.status === "Restock" && "bg-yellow-100 text-yellow-800"}`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={p.active}
                        onChange={() => setProducts(prev => prev.map(prod => prod.id === p.id ? { ...prod, active: !prod.active } : prod))}
                      />
                      <div className="
                        w-12 h-6 rounded-full bg-gray-300 peer-checked:bg-[#c63b2f]
                        flex items-center px-0.5 transition-colors duration-300
                        peer-checked:justify-end justify-start
                      ">
                        <div className="w-5 h-5 bg-white rounded-full shadow transition-all duration-300" />
                      </div>
                    </label>
                  </td>
                  <td className="p-3 text-center">
                    <div className="flex items-center justify-center gap-1 font-semibold">
                      <StarIcon className="w-4 h-4 text-[#f2b705]" />
                      <span>{p.rating}</span>
                    </div>
                  </td>
                  <td className="p-3 text-center">
                    <div className="flex justify-center gap-2">
                      <button onClick={handleEdit} className="p-2 rounded-lg hover:bg-[#fff1db] transition">
                        <PencilSquareIcon className="w-5 h-5 text-[#c63b2f]" />
                      </button>
                      <button onClick={handleDelete} className="p-2 rounded-lg hover:bg-red-50 transition">
                        <TrashIcon className="w-5 h-5 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden divide-y">
          {paginatedProducts.map((p) => (
            <div key={p.id} className="p-4 space-y-3 bg-white shadow mb-3">
              <div className="flex gap-3">
                <img src={p.img} className="w-14 h-14 rounded-lg border object-cover" />
                <div>
                  <p className="font-semibold text-sm">{p.name}</p>
                  <p className="text-xs text-[#8a6a52]">{p.price}</p>
                </div>
              </div>
              <div className="flex justify-between text-xs">
                <span>Sales: {p.sales}</span>
                <span>Stock: {p.stock}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-sm">{p.revenue}</span>
                <span className={`px-2 py-0.5 text-xs rounded-full
                  ${p.status === "In Stock" && "bg-green-100 text-green-800"}
                  ${p.status === "Out of Stock" && "bg-red-100 text-red-800"}
                  ${p.status === "Restock" && "bg-yellow-100 text-yellow-800"}`}
                >
                  {p.status}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <div className="flex gap-3">
                  <button onClick={handleEdit}>
                    <PencilSquareIcon className="w-5 h-5 text-[#c63b2f]" />
                  </button>
                  <button onClick={handleDelete}>
                    <TrashIcon className="w-5 h-5 text-red-600" />
                  </button>
                </div>
                <span className="flex items-center gap-1 text-sm">
                  <StarIcon className="w-4 h-4 text-[#f2b705]" />
                  {p.rating}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-[#fff1db] flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Items per page */}
          <div className="flex items-center gap-2">
            <span className="text-sm">Items per page:</span>
            <select
              className="border rounded-lg px-2 py-1"
              value={itemsPerPage}
              onChange={(e) => { setCurrentPage(1); setItemsPerPage(Number(e.target.value)); }}
            >
              {[3, 5, 10, 25, 50, 100].map((num) => <option key={num} value={num}>{num}</option>)}
            </select>
          </div>

          {/* Page buttons */}
          <div className="flex items-center gap-1 flex-wrap">
            <button
              onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border bg-white hover:bg-[#fff1db] disabled:opacity-50 transition"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              if (page === 1 || page === totalPages || Math.abs(page - currentPage) <= 2) {
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1.5 text-sm rounded-lg border transition
                      ${page === currentPage ? "bg-[#c63b2f] text-white" : "bg-white hover:bg-[#fff1db]"}`
                    }
                  >
                    {page}
                  </button>
                );
              } else if ((page === 2 && currentPage > 4) || (page === totalPages - 1 && currentPage < totalPages - 3)) {
                return <span key={page}>...</span>;
              } else return null;
            })}

            <button
              onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border bg-white hover:bg-[#fff1db] disabled:opacity-50 transition"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Go to page */}
          <div className="flex items-center gap-2">
            <span className="text-sm">Go to page:</span>
            <input
              type="number"
              min={1}
              max={totalPages}
              value={currentPage}
              onChange={(e) => { const val = Number(e.target.value); if (val >= 1 && val <= totalPages) setCurrentPage(val); }}
              className="border rounded-lg px-2 py-1 w-16"
            />
            <button
              onClick={() => setCurrentPage(Math.min(Math.max(currentPage, 1), totalPages))}
              className="px-3 py-1 bg-[#c63b2f] text-white rounded-lg transition hover:bg-[#b23328]"
            >
              Go
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
