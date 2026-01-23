import {
  PencilSquareIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  StarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const API_BASE = "https://sweet-backend-nhwt.onrender.com/api/products/";

export default function AllproductPage() {
  const navigate = useNavigate();
  const adminToken = localStorage.getItem("adminToken");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  const [showEditModal, setShowEditModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    shortDescription: "",
    fullDescription: "",
    category: "",
    shippingCharge: "0",
    status: true,
    skuCode: "",
    selectedWeight: "500g",
    weights: [],
    ingredients: [],
    tags: [],
    images: [],
  });

  const [imagePreviews, setImagePreviews] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Redirect if no token
  useEffect(() => {
    if (!adminToken) {
      toast.error("Admin login required. Redirecting...");
      navigate("/admin/login");
    }
  }, [adminToken, navigate]);

  // Fetch products with auth
  useEffect(() => {
    if (!adminToken) return;

    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({
          page: currentPage,
          limit: itemsPerPage,
        });

        if (searchTerm.trim()) params.append("search", searchTerm.trim());

        const res = await fetch(`${API_BASE}?${params.toString()}`, {
          headers: { Authorization: `Bearer ${adminToken}` },
        });

        if (!res.ok) throw new Error(await res.text());

        const json = await res.json();
        setProducts(json.data || []);
        setTotalItems(json.pagination?.total || json.data?.length || 0);
      } catch (err) {
        setError(err.message);
        toast.error("Could not load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, itemsPerPage, searchTerm, adminToken]);

  useEffect(() => setCurrentPage(1), [searchTerm]);

  const openEditModal = (product) => {
    setCurrentProduct(product);
    setFormData({
      name: product.name || "",
      shortDescription: product.shortDescription || "",
      fullDescription: product.fullDescription || "",
      category: product.category || "",
      shippingCharge: product.shippingCharge?.toString() || "0",
      status: product.status ?? true,
      skuCode: product.skuCode || "",
      selectedWeight: product.selectedWeight || "500g",
      weights: product.weights?.length
        ? product.weights.map((w) => ({
            weight: w.weight || "",
            mrp: w.mrp?.toString() || "",
            sellingPrice: w.sellingPrice?.toString() || "",
            stockQuantity: w.stockQuantity?.toString() || "",
          }))
        : [{ weight: "200g", mrp: "", sellingPrice: "", stockQuantity: "" }],
      ingredients: product.ingredients || [],
      tags: product.tags || [],
      images: [],
    });
    setImagePreviews([]);
    setExistingImages(product.images || []);
    setShowEditModal(true);
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setFormData((prev) => ({ ...prev, images: files }));
    setImagePreviews(files.map((file) => URL.createObjectURL(file)));
  };

  const addWeight = () => {
    setFormData((prev) => ({
      ...prev,
      weights: [
        ...prev.weights,
        { weight: "", mrp: "", sellingPrice: "", stockQuantity: "" },
      ],
    }));
  };

  const removeWeight = (index) => {
    setFormData((prev) => ({
      ...prev,
      weights: prev.weights.filter((_, i) => i !== index),
    }));
  };

  const updateWeightField = (index, field, value) => {
    setFormData((prev) => {
      const weights = [...prev.weights];
      weights[index][field] = value;
      return { ...prev, weights };
    });
  };

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      e.preventDefault();
      const tag = e.target.value.trim();
      if (!formData.tags.includes(tag)) {
        setFormData((prev) => ({ ...prev, tags: [...prev.tags, tag] }));
      }
      e.target.value = "";
    }
  };

  const removeTag = (tag) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  const handleIngredientKeyDown = (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      e.preventDefault();
      const ing = e.target.value.trim();
      if (!formData.ingredients.includes(ing)) {
        setFormData((prev) => ({
          ...prev,
          ingredients: [...prev.ingredients, ing],
        }));
      }
      e.target.value = "";
    }
  };

  const removeIngredient = (ing) => {
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((i) => i !== ing),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (formData.images.length > 0 && formData.images.length < 4) {
      return toast.error("New images upload kar rahe ho to exactly 4 chahiye");
    }

    if (formData.weights.some((w) => !w.stockQuantity.trim())) {
      return toast.error("Sab weights ka stock quantity bharo");
    }

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("shortDescription", formData.shortDescription);
      data.append("fullDescription", formData.fullDescription);
      data.append("category", formData.category);
      data.append("shippingCharge", formData.shippingCharge);
      data.append("status", formData.status);
      data.append("skuCode", formData.skuCode);
      data.append("selectedWeight", formData.selectedWeight);
      data.append("weights", JSON.stringify(formData.weights));
      data.append("ingredients", JSON.stringify(formData.ingredients));
      data.append("tags", JSON.stringify(formData.tags));
      data.append("existingImages", JSON.stringify(existingImages));

      formData.images.forEach((file) => data.append("images", file));

      const res = await fetch(`${API_BASE}${currentProduct._id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
        body: data,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Update failed");
      }

      const result = await res.json();
      toast.success("Product updated successfully");

      // Update list without reload
      setProducts((prev) =>
        prev.map((p) =>
          p._id === currentProduct._id ? result.product || p : p,
        ),
      );

      setShowEditModal(false);
    } catch (err) {
      toast.error(err.message || "Update failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      const res = await fetch(`${API_BASE}${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      if (!res.ok) throw new Error("Delete failed");
      toast.success("Product deleted");
      setProducts((prev) => prev.filter((p) => p._id !== id));
      if (products.length === 1 && currentPage > 1)
        setCurrentPage(currentPage - 1);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const fd = new FormData();
      fd.append("status", !currentStatus);
      const res = await fetch(`${API_BASE}${id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${adminToken}` },
        body: fd,
      });
      if (!res.ok) throw new Error("Status update failed");
      const { product } = await res.json();
      setProducts((prev) =>
        prev.map((p) => (p._id === id ? { ...p, status: product.status } : p)),
      );
      toast.info(`Product ${product.status ? "activated" : "deactivated"}`);
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading && products.length === 0) {
    return (
      <div className="min-h-screen bg-[var(--bg-main)] p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c63b2f] mx-auto"></div>
          <p className="mt-4 text-[#8a6a52]">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-main)] p-4 md:p-6 lg:p-8 space-y-6 text-[#3a2416]">
      {/* Header – same */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-main)] tracking-tight">
            Products
          </h1>
          <p className="text-sm text-[#8a6a52] mt-1">
            Manage your inventory, prices, stock & visibility
          </p>
        </div>
        <button
          onClick={() => navigate("/products/add")}
          className="bg-[#c63b2f] text-white px-5 py-2.5 rounded-lg shadow hover:bg-[#b23328] transition flex items-center gap-2"
        >
          <PlusIcon className="w-5 h-5" /> Add Product
        </button>
      </div>

      {/* Search & content */}
      <div className="bg-white rounded-xl border border-[#fff1db] shadow overflow-hidden">
        <div className="p-4 border-b border-[#fff1db]">
          <div className="relative max-w-md">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8a6a52]" />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by product name..."
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg bg-[#fff1db] focus:outline-none focus:ring-2 focus:ring-[#c63b2f]"
            />
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-50 text-red-700 border-b border-red-200">
            {error}
          </div>
        )}

        {/* Desktop Table – same */}
        <div className="overflow-x-auto hidden md:block">
          <table className="min-w-full text-sm">
            <thead className="bg-[#fff1db] uppercase text-[#8a6a52] text-xs tracking-wide">
              <tr>
                <th className="p-4 text-left">Product</th>
                <th className="p-4 text-center">Category</th>
                <th className="p-4 text-center">Price/Shipping</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-center">Active</th>
                <th className="p-4 text-center">Rating</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-gray-500">
                    No products found
                  </td>
                </tr>
              ) : (
                products.map((p) => (
                  <tr
                    key={p._id}
                    className="border-t hover:bg-[#fff6ec] transition"
                  >
                    <td className="p-4 flex items-center gap-3">
                      <img
                        src={
                          p.images?.[0] ||
                          "https://via.placeholder.com/64?text=No+Image"
                        }
                        alt={p.name}
                        className="w-14 h-14 rounded-lg object-cover border"
                      />
                      <div>
                        <div className="font-medium">{p.name}</div>
                        <div className="text-xs text-[#8a6a52]">
                          {p.shortDescription?.slice(0, 60) || "..."}
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-center">{p.category || "—"}</td>
                    <td className="p-4 text-center">
                      <div>₹{p.shippingCharge || 0} shipping</div>
                    </td>
                    <td className="p-4 text-center">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          p.status
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {p.status ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={p.status}
                          onChange={() => handleToggleStatus(p._id, p.status)}
                        />
                        <div className="w-11 h-6 rounded-full bg-gray-300 peer-checked:bg-[#c63b2f] flex items-center px-0.5 transition-colors peer-checked:justify-end justify-start">
                          <div className="w-4 h-4 bg-white rounded-full shadow transition-all" />
                        </div>
                      </label>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <StarIcon className="w-4 h-4 text-[#f2b705]" />
                        <span>{p.rating?.toFixed(1) || "—"}</span>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => openEditModal(p)}
                          className="p-2 rounded hover:bg-[#fff1db] transition"
                        >
                          <PencilSquareIcon className="w-5 h-5 text-[#c63b2f]" />
                        </button>
                        <button
                          onClick={() => handleDelete(p._id)}
                          className="p-2 rounded hover:bg-red-50 transition"
                        >
                          <TrashIcon className="w-5 h-5 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards – same */}
        <div className="md:hidden divide-y divide-[#fff1db]">
          {products.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No products found
            </div>
          ) : (
            products.map((p) => (
              <div key={p._id} className="p-4 space-y-3">
                <div className="flex gap-3">
                  <img
                    src={
                      p.images?.[0] ||
                      "https://via.placeholder.com/64?text=No+Image"
                    }
                    alt={p.name}
                    className="w-16 h-16 rounded-lg object-cover border"
                  />
                  <div className="flex-1">
                    <p className="font-semibold">{p.name}</p>
                    <p className="text-sm text-[#8a6a52]">
                      {p.category || "—"}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping: ₹{p.shippingCharge || 0}</span>
                  <span className="flex items-center gap-1">
                    <StarIcon className="w-4 h-4 text-[#f2b705]" />
                    {p.rating?.toFixed(1) || "—"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      p.status
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {p.status ? "Active" : "Inactive"}
                  </span>
                  <div className="flex gap-3">
                    <button onClick={() => openEditModal(p)}>
                      <PencilSquareIcon className="w-5 h-5 text-[#c63b2f]" />
                    </button>
                    <button onClick={() => handleDelete(p._id)}>
                      <TrashIcon className="w-5 h-5 text-red-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination – same */}
        <div className="p-4 border-t border-[#fff1db] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-sm whitespace-nowrap">Items per page:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border rounded px-3 py-1.5 text-sm"
            >
              {[5, 10, 20, 50].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 flex-wrap justify-center">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded border disabled:opacity-40"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>

            {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
              let page = currentPage - 3 + i;
              if (page < 1) page = 1;
              if (page > totalPages) page = totalPages;
              return page;
            }).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1.5 rounded border text-sm min-w-[38px] ${
                  page === currentPage
                    ? "bg-[#c63b2f] text-white border-[#c63b2f]"
                    : "hover:bg-[#fff1db]"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 rounded border disabled:opacity-40"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>

          <div className="text-sm text-center sm:text-right">
            Showing {products.length} of {totalItems}
          </div>
        </div>
      </div>

      {/* ============================================== */}
      {/*       PROFESSIONAL + BEAUTIFUL EDIT MODAL      */}
      {/* ============================================== */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Blurred + darkened backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-lg"
            onClick={() => setShowEditModal(false)}
          />

          {/* Modal */}
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[92vh] overflow-y-auto border border-gray-200/70">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-gradient-to-r from-white to-gray-50 px-6 py-5 border-b flex justify-between items-center shadow-sm">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Edit Product
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Update product details & variants
                </p>
              </div>
              <button
                onClick={() => setShowEditModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition"
              >
                <XMarkIcon className="w-7 h-7 text-gray-600 hover:text-gray-900" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-10">
              {/* Section 1: Basic Info */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">
                  Basic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Name *
                    </label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c63b2f] focus:border-transparent shadow-sm transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <input
                      name="category"
                      value={formData.category}
                      onChange={handleFormChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c63b2f] focus:border-transparent shadow-sm transition"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Short Description
                    </label>
                    <input
                      name="shortDescription"
                      value={formData.shortDescription}
                      onChange={handleFormChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c63b2f] focus:border-transparent shadow-sm transition"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Description
                    </label>
                    <textarea
                      name="fullDescription"
                      value={formData.fullDescription}
                      onChange={handleFormChange}
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c63b2f] focus:border-transparent shadow-sm transition resize-y"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Pricing & SKU */}
              <div className="space-y-6 border-t pt-8">
                <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">
                  Pricing & Identifiers
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      SKU Code
                    </label>
                    <input
                      name="skuCode"
                      value={formData.skuCode}
                      onChange={handleFormChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c63b2f] focus:border-transparent shadow-sm transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Shipping Charge (₹)
                    </label>
                    <input
                      name="shippingCharge"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.shippingCharge}
                      onChange={handleFormChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c63b2f] focus:border-transparent shadow-sm transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Default Weight
                    </label>
                    <input
                      name="selectedWeight"
                      value={formData.selectedWeight}
                      onChange={handleFormChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c63b2f] focus:border-transparent shadow-sm transition"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Weights */}
              <div className="space-y-6 border-t pt-8">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-gray-800">
                    Weight Variants
                  </h3>
                  <button
                    type="button"
                    onClick={addWeight}
                    className="px-5 py-2.5 bg-[#fff1db] text-[#c63b2f] rounded-xl hover:bg-[#ffe8d1] transition font-medium shadow-sm"
                  >
                    + Add Variant
                  </button>
                </div>

                <div className="space-y-5">
                  {formData.weights.map((w, idx) => (
                    <div
                      key={idx}
                      className="grid grid-cols-2 sm:grid-cols-5 gap-4 p-5 bg-gray-50/70 rounded-xl border border-gray-100 hover:border-gray-200 transition"
                    >
                      <div>
                        <label className="block text-xs text-gray-600 mb-1.5">
                          Weight
                        </label>
                        <input
                          value={w.weight}
                          onChange={(e) =>
                            updateWeightField(idx, "weight", e.target.value)
                          }
                          className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#c63b2f] shadow-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1.5">
                          MRP
                        </label>
                        <input
                          type="number"
                          value={w.mrp}
                          onChange={(e) =>
                            updateWeightField(idx, "mrp", e.target.value)
                          }
                          className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#c63b2f] shadow-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1.5">
                          Selling Price
                        </label>
                        <input
                          type="number"
                          value={w.sellingPrice}
                          onChange={(e) =>
                            updateWeightField(
                              idx,
                              "sellingPrice",
                              e.target.value,
                            )
                          }
                          className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#c63b2f] shadow-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1.5">
                          Stock
                        </label>
                        <input
                          type="number"
                          value={w.stockQuantity}
                          onChange={(e) =>
                            updateWeightField(
                              idx,
                              "stockQuantity",
                              e.target.value,
                            )
                          }
                          className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#c63b2f] shadow-sm"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeWeight(idx)}
                        className="text-red-600 hover:text-red-800 text-sm self-end mb-2 font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 4: Images */}
              <div className="space-y-6 border-t pt-8">
                <h3 className="text-xl font-semibold text-gray-800">
                  Product Images
                </h3>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:bg-[#fff1db] file:text-[#c63b2f] hover:file:bg-[#ffe8d1] transition cursor-pointer shadow-sm"
                />

                <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-5">
                  {existingImages.map((url, i) => (
                    <div
                      key={i}
                      className="relative group rounded-xl overflow-hidden shadow-md hover:shadow-lg transition"
                    >
                      <img
                        src={url}
                        alt="existing"
                        className="w-full h-40 object-cover"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setExistingImages((prev) =>
                            prev.filter((_, idx) => idx !== i),
                          )
                        }
                        className="absolute top-3 right-3 bg-red-600/90 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition backdrop-blur-sm"
                      >
                        <XMarkIcon className="w-5 h-5" />
                      </button>
                    </div>
                  ))}

                  {imagePreviews.map((src, i) => (
                    <div
                      key={i}
                      className="relative group rounded-xl overflow-hidden shadow-md hover:shadow-lg transition"
                    >
                      <img
                        src={src}
                        alt="preview"
                        className="w-full h-40 object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreviews((prev) =>
                            prev.filter((_, idx) => idx !== i),
                          );
                          setFormData((prev) => ({
                            ...prev,
                            images: prev.images.filter((_, idx) => idx !== i),
                          }));
                        }}
                        className="absolute top-3 right-3 bg-red-600/90 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition backdrop-blur-sm"
                      >
                        <XMarkIcon className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 5: Ingredients & Tags */}
              <div className="grid md:grid-cols-2 gap-10 border-t pt-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    Ingredients
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {formData.ingredients.map((ing) => (
                      <div
                        key={ing}
                        className="px-4 py-2 bg-gray-100/80 rounded-full text-sm flex items-center gap-2 shadow-sm hover:bg-gray-200 transition"
                      >
                        {ing}
                        <button
                          type="button"
                          onClick={() => removeIngredient(ing)}
                        >
                          <XMarkIcon className="w-5 h-5 text-gray-500 hover:text-red-600" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <input
                    type="text"
                    placeholder="Add ingredient (press Enter)"
                    onKeyDown={handleIngredientKeyDown}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c63b2f] transition shadow-sm"
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-800">Tags</h3>
                  <div className="flex flex-wrap gap-3">
                    {formData.tags.map((tag) => (
                      <div
                        key={tag}
                        className="px-4 py-2 bg-[#c63b2f]/10 text-[#c63b2f] rounded-full text-sm flex items-center gap-2 shadow-sm hover:bg-[#c63b2f]/20 transition"
                      >
                        {tag}
                        <button type="button" onClick={() => removeTag(tag)}>
                          <XMarkIcon className="w-5 h-5 hover:text-red-600" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <input
                    type="text"
                    placeholder="Add tag (press Enter)"
                    onKeyDown={handleTagKeyDown}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c63b2f] transition shadow-sm"
                  />
                </div>
              </div>

              {/* Status & Actions */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 pt-10 border-t">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="status"
                    checked={formData.status}
                    onChange={handleFormChange}
                    className="w-6 h-6 accent-[#c63b2f] rounded focus:ring-[#c63b2f]"
                  />
                  <span className="text-lg font-medium text-gray-700">
                    Active / Visible in Store
                  </span>
                </label>

                <div className="flex gap-5 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="flex-1 sm:flex-none px-10 py-3.5 border border-gray-300 rounded-xl hover:bg-gray-50 transition font-medium text-gray-700 shadow-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 sm:flex-none px-10 py-3.5 bg-[#c63b2f] text-white rounded-xl hover:bg-[#b23328] transition font-medium shadow-lg"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
