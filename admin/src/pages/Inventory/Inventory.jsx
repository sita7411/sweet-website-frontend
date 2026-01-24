import {
  PencilSquareIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ShoppingBagIcon,
  CurrencyRupeeIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { useState, useEffect, useMemo, useCallback } from "react";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import debounce from "lodash.debounce";
import { Link } from "react-router-dom";

const API_BASE =
  import.meta.env.VITE_API_BASE || "https://sweet-backend-nhwt.onrender.com";

const formatIndianNumber = (num) => {
  if (!num && num !== 0) return "0";
  if (isNaN(num)) return "0";

  const n = Number(num);

  if (n >= 1_00_00_000) return (n / 1_00_00_000).toFixed(1) + " Cr";
  if (n >= 1_00_000) return (n / 1_00_000).toFixed(1) + " L";

  return n.toLocaleString("en-IN");
};

const getStatus = (quantity) => {
  if (quantity > 20) return "In Stock";
  if (quantity > 0) return "Low Stock";
  return "Out of Stock";
};

const getStatusStyle = (status) => {
  switch (status) {
    case "In Stock":
      return "bg-green-100 text-green-800";
    case "Low Stock":
      return "bg-yellow-100 text-yellow-800";
    case "Out of Stock":
      return "bg-red-100 text-red-800 whitespace-nowrap";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getOverallStatus = (weights = []) => {
  if (weights.length === 0) return "Out of Stock";
  const totalStock = weights.reduce(
    (sum, w) => sum + (w.stockQuantity || 0),
    0,
  );
  const hasLow = weights.some(
    (w) => w.stockQuantity > 0 && w.stockQuantity <= 20,
  );
  if (totalStock === 0) return "Out of Stock";
  if (hasLow) return "Low Stock";
  return "In Stock";
};

export default function InventoryPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [stockFilter, setStockFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [selectedItems, setSelectedItems] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

  // Debounce search
  useEffect(() => {
    const handler = debounce((val) => {
      setDebouncedSearch(val);
      setCurrentPage(1);
    }, 400);
    handler(searchTerm);
    return () => handler.cancel();
  }, [searchTerm]);

  // Fetch products (unchanged)
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("adminToken");
      if (!token) {
        setError("Admin token not found. Please login.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_BASE}/api/products/admin/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          if (res.status === 401) {
            localStorage.removeItem("adminToken");
            throw new Error("Session expired. Please login again.");
          }
          const err = await res.json();
          throw new Error(err.message || "Failed to load products");
        }

        const { data } = await res.json();

        const formatted = data.map((p) => {
          const weights = p.weights || [];
          const totalStock = weights.reduce(
            (sum, w) => sum + (w.stockQuantity || 0),
            0,
          );
          const prices = weights
            .map((w) => w.sellingPrice || 0)
            .filter(Boolean);
          const minPrice = prices.length ? Math.min(...prices) : 0;
          const maxPrice = prices.length ? Math.max(...prices) : 0;

          return {
            id: p._id,
            name: p.name || "Unnamed Product",
            sku: p.skuCode || "N/A",
            image: p.images?.[0] || "https://via.placeholder.com/80",
            totalStock,
            minPrice,
            maxPrice,
            variantCount: weights.length,
            status: getOverallStatus(weights),
            lowStockVariants: weights.filter(
              (w) => w.stockQuantity > 0 && w.stockQuantity <= 20,
            ).length,
            outOfStockVariants: weights.filter((w) => w.stockQuantity === 0)
              .length,
            lastUpdated: p.updatedAt
              ? new Date(p.updatedAt).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
              : "—",
            fullProduct: p,
          };
        });

        setProducts(formatted);
      } catch (err) {
        console.error(err);
        setError(err.message);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Computed values (unchanged)
  const totalProducts = products.length;
  const totalStockValue = products.reduce(
    (sum, p) => sum + p.totalStock * ((p.minPrice + p.maxPrice) / 2 || 0),
    0,
  );
  const lowStockCount = products.filter((p) => p.status === "Low Stock").length;
  const outOfStockCount = products.filter(
    (p) => p.status === "Out of Stock",
  ).length;

  // Filtered + paginated (unchanged)
  const filteredProducts = useMemo(() => {
    let result = products;
    if (debouncedSearch.trim()) {
      const term = debouncedSearch.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.sku.toLowerCase().includes(term),
      );
    }
    if (stockFilter !== "all") {
      result = result.filter((p) => {
        if (stockFilter === "in") return p.status === "In Stock";
        if (stockFilter === "low") return p.status === "Low Stock";
        if (stockFilter === "out") return p.status === "Out of Stock";
        return true;
      });
    }
    return result;
  }, [products, debouncedSearch, stockFilter]);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Handlers (unchanged)
  const handleSelectAll = useCallback(
    (e) => {
      if (e.target.checked) {
        setSelectedItems(paginatedProducts.map((p) => p.id));
      } else {
        setSelectedItems([]);
      }
    },
    [paginatedProducts],
  );

  const toggleSelect = useCallback((id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  }, []);

  const openEdit = useCallback((item) => {
    setEditingProduct({ ...item.fullProduct });
    setSelectedVariantIndex(0);
    setEditModalOpen(true);
  }, []);

  const closeEdit = useCallback(() => {
    setEditModalOpen(false);
    setEditingProduct(null);
    setSelectedVariantIndex(0);
  }, []);

  const saveEdit = async () => {
    if (!editingProduct) return;

    const token = localStorage.getItem("adminToken");
    if (!token) return toast.error("No admin token found");

    try {
      const payload = {
        name: editingProduct.name?.trim() || "",
        skuCode: editingProduct.skuCode?.trim() || "",
        weights: JSON.stringify(
          (editingProduct.weights || []).map((w) => ({
            weight: w.weight || "",
            mrp: Number(w.mrp ?? 0),
            sellingPrice: Number(w.sellingPrice ?? 0),
            stockQuantity: Number(w.stockQuantity ?? 0),
          })),
        ),
      };

      console.log("Sending payload:", payload);

      const res = await fetch(
        `${API_BASE}/api/products/${editingProduct._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || "Update failed");
      }

      const { product: updated } = await res.json();
      toast.success("Updated successfully");

      setProducts((prev) =>
        prev.map((p) =>
          p.id === updated._id
            ? {
                ...p,
                name: updated.name || p.name,
                sku: updated.skuCode || "N/A",
                totalStock:
                  updated.weights?.reduce(
                    (s, w) => s + (Number(w.stockQuantity) || 0),
                    0,
                  ) || 0,
                minPrice: Math.min(
                  ...(updated.weights?.map(
                    (w) => Number(w.sellingPrice) || 0,
                  ) || [0]),
                ),
                maxPrice: Math.max(
                  ...(updated.weights?.map(
                    (w) => Number(w.sellingPrice) || 0,
                  ) || [0]),
                ),
                variantCount: updated.weights?.length || 0,
                status: getOverallStatus(updated.weights),
                lowStockVariants:
                  updated.weights?.filter(
                    (w) =>
                      Number(w.stockQuantity) > 0 &&
                      Number(w.stockQuantity) <= 20,
                  ).length || 0,
                outOfStockVariants:
                  updated.weights?.filter((w) => Number(w.stockQuantity) === 0)
                    .length || 0,
                lastUpdated: updated.updatedAt
                  ? new Date(updated.updatedAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })
                  : p.lastUpdated,
                fullProduct: updated,
              }
            : p,
        ),
      );

      closeEdit();
    } catch (err) {
      console.error("Save error:", err);
      toast.error(err.message || "Save failed – check console");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    const token = localStorage.getItem("adminToken");
    if (!token) return toast.error("No admin token");

    try {
      const res = await fetch(`${API_BASE}/api/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Delete failed");

      toast.success("Product deleted");
      setProducts((prev) => prev.filter((p) => p.id !== id));
      if (paginatedProducts.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } catch (err) {
      toast.error(err.message || "Delete failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--bg-main)] flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-medium text-[var(--text-main)]">
            Loading inventory...
          </p>
          <p className="text-sm text-[var(--text-muted)] mt-2">Please wait</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[var(--bg-main)] flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-semibold text-red-600">Error</p>
          <p className="mt-2 text-[var(--text-muted)]">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-main)] p-4 md:p-6 lg:p-8 space-y-6 text-[var(--text-main)]">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        transition={Slide}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inventory</h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">
            Manage stock levels • {totalProducts.toLocaleString("en-IN")}{" "}
            products
          </p>
        </div>

        {/* Changed to Link */}
        <Link
          to="/products/add"
          className="bg-[var(--primary)] text-white px-5 py-2.5 rounded-xl shadow-md hover:bg-[var(--secondary)] transition"
        >
          + Add Product
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
        {[
          {
            title: "Total Products",
            value: totalProducts,
            icon: <ShoppingBagIcon className="w-6 h-6 text-[var(--primary)]" />,
            color: "from-blue-50 to-blue-100",
            textColor: "text-blue-800",
            trend: "+12%",
            isCurrency: false,
          },
          {
            title: "Total Stock Value",
            value: totalStockValue,
            icon: (
              <CurrencyRupeeIcon className="w-6 h-6 text-[var(--accent)]" />
            ),
            color: "from-amber-50 to-amber-100",
            textColor: "text-amber-800",
            trend: "+8.4%",
            isCurrency: true,
          },
          {
            title: "Low Stock Items",
            value: lowStockCount,
            icon: (
              <ExclamationTriangleIcon className="w-6 h-6 text-amber-700" />
            ),
            color:
              lowStockCount > 0
                ? "from-amber-50 to-amber-100"
                : "from-gray-50 to-gray-100",
            textColor: lowStockCount > 0 ? "text-amber-800" : "text-gray-700",
            trend: lowStockCount > 0 ? `↑ ${lowStockCount}` : "—",
            isCurrency: false,
          },
          {
            title: "Out of Stock",
            value: outOfStockCount,
            icon: <XCircleIcon className="w-6 h-6 text-red-600" />,
            color:
              outOfStockCount > 0
                ? "from-red-50 to-red-100"
                : "from-gray-50 to-gray-100",
            textColor: outOfStockCount > 0 ? "text-red-800" : "text-gray-700",
            trend: outOfStockCount > 0 ? `↑ ${outOfStockCount}` : "—",
            isCurrency: false,
          },
        ].map((stat, i) => (
          <div
            key={i}
            className={`
              bg-gradient-to-br ${stat.color}
              rounded-2xl p-5 sm:p-6 border border-[var(--bg-soft)] shadow-sm
              hover:shadow-md hover:scale-[1.02] transition-all duration-200
              flex flex-col justify-between min-h-[160px]
            `}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white/80 rounded-xl shadow-sm">
                {stat.icon}
              </div>
              {stat.trend && (
                <span
                  className={`
                    text-xs font-medium px-2.5 py-1 rounded-full
                    ${stat.trend.includes("+") ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}
                  `}
                >
                  {stat.trend}
                </span>
              )}
            </div>

            <div className="space-y-1">
              <h3
                className={`
                  text-2xl sm:text-3xl lg:text-4xl font-bold ${stat.textColor}
                  truncate
                `}
                title={
                  stat.isCurrency
                    ? `₹${Number(stat.value).toLocaleString("en-IN")}`
                    : Number(stat.value).toLocaleString("en-IN")
                }
              >
                {stat.isCurrency
                  ? `₹${formatIndianNumber(Math.round(stat.value))}`
                  : formatIndianNumber(stat.value)}
              </h3>
              <p className="text-sm font-medium text-[var(--text-muted)]">
                {stat.title}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Search + Filters + Bulk Actions + Table (your existing code) */}
      <div className="bg-[var(--bg-card)] rounded-xl border border-[var(--bg-soft)] shadow overflow-hidden">
        {/* Search + Filter */}
        <div className="p-4 border-b border-[var(--bg-soft)] flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          {/* ... your search input and stock filter ... */}
        </div>

        {/* Bulk Actions Bar */}
        {selectedItems.length > 0 && (
          <div className="p-4 bg-yellow-50 border-b border-yellow-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="text-sm font-medium text-yellow-800">
              {selectedItems.length} product
              {selectedItems.length !== 1 ? "s" : ""} selected
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedItems([])}
                className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 transition"
              >
                Clear Selection
              </button>
              <button
                onClick={async () => {
                  if (
                    !window.confirm(
                      `Delete ${selectedItems.length} selected product(s)? This cannot be undone.`,
                    )
                  )
                    return;

                  const token = localStorage.getItem("adminToken");
                  if (!token) return toast.error("No admin token");

                  try {
                    const deletePromises = selectedItems.map((id) =>
                      fetch(`${API_BASE}/api/products/${id}`, {
                        method: "DELETE",
                        headers: { Authorization: `Bearer ${token}` },
                      }).then((res) => {
                        if (!res.ok)
                          throw new Error(`Failed to delete product ${id}`);
                        return id;
                      }),
                    );

                    const deletedIds = await Promise.all(deletePromises);
                    toast.success(
                      `${deletedIds.length} product(s) deleted successfully`,
                    );

                    setProducts((prev) =>
                      prev.filter((p) => !deletedIds.includes(p.id)),
                    );
                    setSelectedItems([]);
                  } catch (err) {
                    console.error("Bulk delete error:", err);
                    toast.error("Some deletes failed. Please try again.");
                  }
                }}
                className="px-5 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition flex items-center gap-2 shadow-sm"
              >
                <TrashIcon className="w-4 h-4" />
                Delete Selected
              </button>
            </div>
          </div>
        )}

        {/* Table / Cards / No Results */}
        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center text-[var(--text-muted)]">
            <p className="text-lg font-medium">
              {debouncedSearch || stockFilter !== "all"
                ? "No matching products"
                : "No products found"}
            </p>
            {(debouncedSearch || stockFilter !== "all") && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setStockFilter("all");
                }}
                className="mt-3 text-[var(--primary)] hover:underline"
              >
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="overflow-x-auto hidden md:block">
              <table className="min-w-full text-sm">
                <thead className="bg-[var(--bg-soft)] text-[var(--text-muted)] text-xs uppercase tracking-wide">
                  <tr>
                    <th className="p-4 w-10">
                      <input
                        type="checkbox"
                        checked={
                          paginatedProducts.length > 0 &&
                          selectedItems.length === paginatedProducts.length
                        }
                        onChange={handleSelectAll}
                        className="accent-[var(--primary)] h-4 w-4"
                      />
                    </th>
                    <th className="p-4 text-left">Product</th>
                    <th className="p-4 text-center">SKU</th>
                    <th className="p-4 text-center">Variants</th>
                    <th className="p-4 text-center">Total Stock</th>
                    <th className="p-4 text-center">Price Range</th>
                    <th className="p-4 text-center">Status</th>
                    <th className="p-4 text-center">Updated</th>
                    <th className="p-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedProducts.map((p) => (
                    <tr
                      key={p.id}
                      className="border-t border-[var(--bg-soft)] hover:bg-[var(--bg-soft)] transition"
                    >
                      <td className="p-4">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(p.id)}
                          onChange={() => toggleSelect(p.id)}
                          className="accent-[var(--primary)] h-4 w-4"
                        />
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-12 h-12 rounded-lg object-cover border"
                          />
                          <div className="font-medium">{p.name}</div>
                        </div>
                      </td>
                      <td className="p-4 font-mono text-center text-[var(--text-muted)]">
                        {p.sku}
                      </td>
                      <td className="p-4 text-center">{p.variantCount}</td>
                      <td className="p-4 text-center font-semibold">
                        {p.totalStock}
                      </td>
                      <td className="p-4 text-center whitespace-nowrap">
                        ₹{p.minPrice.toLocaleString("en-IN")} – ₹
                        {p.maxPrice.toLocaleString("en-IN")}
                      </td>
                      <td className="p-4 text-center">
                        <span
                          className={`px-3 py-1 text-xs font-semibold whitespace-nowrap rounded-full ${getStatusStyle(p.status)}`}
                        >
                          {p.status}
                          {p.lowStockVariants > 0 &&
                            ` (${p.lowStockVariants} low)`}
                        </span>
                      </td>
                      <td className="p-4 text-center text-sm text-[var(--text-muted)]">
                        {p.lastUpdated}
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => openEdit(p)}
                            className="p-2 hover:bg-[var(--bg-soft)] rounded-lg"
                          >
                            <PencilSquareIcon className="w-5 h-5 text-[var(--primary)]" />
                          </button>
                          <button
                            onClick={() => handleDelete(p.id)}
                            className="p-2 hover:bg-red-50 rounded-lg"
                          >
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
            <div className="md:hidden divide-y divide-[var(--bg-soft)]">
              {paginatedProducts.map((p) => (
                <div key={p.id} className="p-4 space-y-3">
                  <div className="flex gap-3">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-16 h-16 rounded-lg object-cover border"
                    />
                    <div className="flex-1">
                      <p className="font-semibold">{p.name}</p>
                      <p className="text-xs text-[var(--text-muted)] mt-0.5">
                        {p.sku}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-[var(--text-muted)] block text-xs">
                        Variants
                      </span>
                      {p.variantCount}
                    </div>
                    <div>
                      <span className="text-[var(--text-muted)] block text-xs">
                        Total Stock
                      </span>
                      {p.totalStock}
                    </div>
                    <div>
                      <span className="text-[var(--text-muted)] block text-xs">
                        Price Range
                      </span>
                      ₹{p.minPrice.toLocaleString("en-IN")}–₹
                      {p.maxPrice.toLocaleString("en-IN")}
                    </div>
                    <div>
                      <span className="text-[var(--text-muted)] block text-xs">
                        Status
                      </span>
                      <span
                        className={`inline-block px-2.5 py-0.5 text-xs rounded-full ${getStatusStyle(p.status)}`}
                      >
                        {p.status}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-end gap-4 pt-2">
                    <button onClick={() => openEdit(p)}>
                      <PencilSquareIcon className="w-5 h-5 text-[var(--primary)]" />
                    </button>
                    <button onClick={() => handleDelete(p.id)}>
                      <TrashIcon className="w-5 h-5 text-red-600" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="p-4 border-t border-[var(--bg-soft)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-[var(--text-muted)]">
                    Show:
                  </span>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="border border-[var(--bg-soft)] rounded-lg px-3 py-1.5 bg-[var(--bg-card)] focus:ring-2 focus:ring-[var(--primary)]/50"
                  >
                    {[5, 10, 15, 20, 30, 50, 100].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-1 flex-wrap justify-center">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className={`p-2 rounded-lg border ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-[var(--bg-soft)]"}`}
                  >
                    <ChevronLeftIcon className="w-5 h-5" />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(
                      (page) =>
                        page === 1 ||
                        page === totalPages ||
                        Math.abs(page - currentPage) <= 2,
                    )
                    .map((page, idx, arr) => {
                      const showEllipsis = idx > 0 && arr[idx - 1] !== page - 1;
                      return (
                        <div key={page} className="flex items-center">
                          {showEllipsis && (
                            <span className="px-3 text-[var(--text-muted)]">
                              ...
                            </span>
                          )}
                          <button
                            onClick={() => setCurrentPage(page)}
                            className={`px-3 py-1.5 text-sm rounded-lg border min-w-[2.5rem] ${
                              page === currentPage
                                ? "bg-[var(--primary)] text-white border-[var(--primary)]"
                                : "hover:bg-[var(--bg-soft)]"
                            }`}
                          >
                            {page}
                          </button>
                        </div>
                      );
                    })}

                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(p + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className={`p-2 rounded-lg border ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-[var(--bg-soft)]"}`}
                  >
                    <ChevronRightIcon className="w-5 h-5" />
                  </button>
                </div>

                <div className="text-sm text-[var(--text-muted)] text-center sm:text-right">
                  Page{" "}
                  <span className="font-medium text-[var(--text-main)]">
                    {currentPage}
                  </span>{" "}
                  of {totalPages}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Edit Modal */}
      {editModalOpen && editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[var(--bg-card)] w-full max-w-2xl rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto border border-[var(--bg-soft)]">
            <div className="p-6 border-b flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold">
                  Edit: {editingProduct.name}
                </h2>
                <p className="text-sm text-[var(--text-muted)] mt-1">
                  SKU: {editingProduct.skuCode || "—"}
                </p>
              </div>
              <button
                onClick={closeEdit}
                className="text-2xl hover:text-[var(--text-main)]"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    Product Name
                  </label>
                  <input
                    value={editingProduct.name || ""}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        name: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 border border-[var(--bg-soft)] rounded-lg focus:ring-2 focus:ring-[var(--primary)]/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    SKU Code
                  </label>
                  <input
                    value={editingProduct.skuCode || ""}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        skuCode: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 border border-[var(--bg-soft)] rounded-lg focus:ring-2 focus:ring-[var(--primary)]/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Select Variant
                </label>
                <select
                  value={selectedVariantIndex}
                  onChange={(e) =>
                    setSelectedVariantIndex(Number(e.target.value))
                  }
                  className="w-full max-w-xs px-4 py-2.5 border border-[var(--bg-soft)] rounded-lg focus:ring-2 focus:ring-[var(--primary)]/50"
                >
                  {editingProduct.weights?.map((w, idx) => (
                    <option key={idx} value={idx}>
                      {w.weight} — ₹{w.sellingPrice?.toLocaleString() || 0}{" "}
                      (Stock: {w.stockQuantity || 0})
                    </option>
                  ))}
                </select>

                {editingProduct.weights?.[selectedVariantIndex] && (
                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-5 p-5 bg-[var(--bg-soft)]/50 rounded-xl">
                    <div>
                      <label className="block text-sm font-medium mb-1.5">
                        Weight
                      </label>
                      <input
                        value={
                          editingProduct.weights[selectedVariantIndex].weight ||
                          ""
                        }
                        onChange={(e) => {
                          const newWeights = [...editingProduct.weights];
                          newWeights[selectedVariantIndex] = {
                            ...newWeights[selectedVariantIndex],
                            weight: e.target.value,
                          };
                          setEditingProduct({
                            ...editingProduct,
                            weights: newWeights,
                          });
                        }}
                        className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-[var(--primary)]/50"
                        placeholder="e.g. 500g"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5">
                        Stock Quantity
                      </label>
                      <input
                        type="number"
                        min={0}
                        value={
                          editingProduct.weights[selectedVariantIndex]
                            .stockQuantity ?? 0
                        }
                        onChange={(e) => {
                          const newWeights = [...editingProduct.weights];
                          newWeights[selectedVariantIndex] = {
                            ...newWeights[selectedVariantIndex],
                            stockQuantity: Number(e.target.value),
                          };
                          setEditingProduct({
                            ...editingProduct,
                            weights: newWeights,
                          });
                        }}
                        className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-[var(--primary)]/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5">
                        Selling Price (₹)
                      </label>
                      <input
                        type="number"
                        min={0}
                        value={
                          editingProduct.weights[selectedVariantIndex]
                            .sellingPrice ?? 0
                        }
                        onChange={(e) => {
                          const newWeights = [...editingProduct.weights];
                          newWeights[selectedVariantIndex] = {
                            ...newWeights[selectedVariantIndex],
                            sellingPrice: Number(e.target.value),
                          };
                          setEditingProduct({
                            ...editingProduct,
                            weights: newWeights,
                          });
                        }}
                        className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-[var(--primary)]/50"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 border-t bg-[var(--bg-soft)]/30 flex justify-end gap-4">
              <button
                onClick={closeEdit}
                className="px-6 py-2.5 border border-[var(--bg-soft)] rounded-xl hover:bg-[var(--bg-soft)] transition"
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                className="px-6 py-2.5 bg-[var(--primary)] text-white rounded-xl hover:bg-[var(--secondary)] transition shadow-sm"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
