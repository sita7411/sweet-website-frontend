// src/components/admin/ChikkiAdminPanel.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DEFAULT_LEFT_CONTENT = {
  heading: "Crafted With Care,<br />Chikki You Truly Love",
  description:
    "Experience the authentic taste of handcrafted chikki made with premium nuts, seeds, and natural jaggery. A perfect balance of tradition, purity, and delightful flavors.",
  buttonText: "Explore Our Chikki",
};

const API_BASE = "https://sweet-backend-nhwt.onrender.com/api/hero";
const BASE_URL = "https://sweet-backend-nhwt.onrender.com";

export default function ChikkiAdminPanel() {
  const [leftContent, setLeftContent] = useState(DEFAULT_LEFT_CONTENT);
  const [chikkis, setChikkis] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingLeft, setEditingLeft] = useState(false);
  const [editingChikkiId, setEditingChikkiId] = useState(null); // _id string or -1 for new
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, id: null });
  // helper to generate consistent preview key
  const previewKey = (field) =>
    `${editingChikkiId === -1 ? "new" : editingChikkiId}-${field}`;

  const [form, setForm] = useState({
    name: "",
    description: "",
    mainImage: null, // will be File | string (path)
    icon: null,
    floatTop: null,
    floatLeft: null,
  });

  const [imagePreviews, setImagePreviews] = useState({});

  const adminToken = localStorage.getItem("adminToken");

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      if (!adminToken) {
        toast.error("Admin login required");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const res = await fetch(API_BASE, {
          headers: { Authorization: `Bearer ${adminToken}` },
        });

        if (res.status === 401) {
          toast.error("Session expired. Please login again.");
          return;
        }

        if (!res.ok) throw new Error("Failed to load hero content");

        const data = await res.json();

        // Left content
        setLeftContent({
          heading: data?.leftContent?.heading || DEFAULT_LEFT_CONTENT.heading,
          description:
            data?.leftContent?.description || DEFAULT_LEFT_CONTENT.description,
          buttonText:
            data?.leftContent?.buttonText || DEFAULT_LEFT_CONTENT.buttonText,
        });

        // Variants – convert image paths to full URLs
        const variants = (data?.variants || []).map((v) => ({
          ...v,
          mainImage: v.mainImage
            ? v.mainImage.startsWith("http")
              ? v.mainImage
              : `${BASE_URL}${v.mainImage.startsWith("/") ? "" : "/"}${v.mainImage}`
            : "",
          icon: v.icon
            ? v.icon.startsWith("http")
              ? v.icon
              : `${BASE_URL}${v.icon.startsWith("/") ? "" : "/"}${v.icon}`
            : "",
          floatTop: v.floatTop
            ? v.floatTop.startsWith("http")
              ? v.floatTop
              : `${BASE_URL}${v.floatTop.startsWith("/") ? "" : "/"}${v.floatTop}`
            : "",
          floatLeft: v.floatLeft
            ? v.floatLeft.startsWith("http")
              ? v.floatLeft
              : `${BASE_URL}${v.floatLeft.startsWith("/") ? "" : "/"}${v.floatLeft}`
            : "",
        }));

        setChikkis(variants);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load content");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [adminToken]);

  // ── Left Content Handlers ───────────────────────────────────────
  const handleLeftChange = (e) => {
    const { name, value } = e.target;
    setLeftContent((prev) => ({ ...prev, [name]: value }));
  };

  const saveLeftContent = async () => {
    if (!adminToken) return toast.error("Admin login required");

    try {
      const res = await fetch(API_BASE, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({ leftContent }),
      });

      if (!res.ok) throw new Error("Update failed");

      setEditingLeft(false);
      toast.success("Hero left content saved successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Could not save left content");
    }
  };

  // ── Chikki Form Handlers ────────────────────────────────────────
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleImageSelect = (e, field) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreviews((prev) => ({
        ...prev,
        [previewKey(field)]: reader.result,
      }));
    };
    reader.readAsDataURL(file);

    setForm((prev) => ({ ...prev, [field]: file }));
  };

  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      mainImage: null,
      icon: null,
      floatTop: null,
      floatLeft: null,
    });
    setImagePreviews({});
    setEditingChikkiId(null);
  };

  const startAddNew = () => {
    resetForm();
    setEditingChikkiId(-1);
  };

  const startEdit = (chikki) => {
    setEditingChikkiId(chikki._id);
    setForm({
      name: chikki.name || "",
      description: chikki.description || "",
      mainImage: chikki.mainImage || null, // full URL string
      icon: chikki.icon || null,
      floatTop: chikki.floatTop || null,
      floatLeft: chikki.floatLeft || null,
    });

    // Populate image previews for existing images
    setImagePreviews({
      [`${chikki._id}-mainImage`]: chikki.mainImage || null,
      [`${chikki._id}-icon`]: chikki.icon || null,
      [`${chikki._id}-floatTop`]: chikki.floatTop || null,
      [`${chikki._id}-floatLeft`]: chikki.floatLeft || null,
    });
  };

  const openDeleteConfirm = (id) => {
    setDeleteConfirm({ open: true, id });
  };

  const confirmDelete = async () => {
    if (!deleteConfirm.id || !adminToken) return;

    try {
      const res = await fetch(`${API_BASE}/variant/${deleteConfirm.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${adminToken}` },
      });

      if (!res.ok) throw new Error("Delete failed");

      setChikkis((prev) => prev.filter((v) => v._id !== deleteConfirm.id));
      if (editingChikkiId === deleteConfirm.id) resetForm();
      toast.success("Variant deleted successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete");
    } finally {
      setDeleteConfirm({ open: false, id: null });
    }
  };

  const handleSaveChikki = async (e) => {
    e.preventDefault();

    if (!form.name?.trim()) return toast.error("Variant Name is required!");
    if (!form.mainImage) return toast.error("Main Product Image is required!");

    if (!adminToken) return toast.error("Admin login required");

    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("description", form.description || "");

      if (form.mainImage instanceof File)
        fd.append("mainImage", form.mainImage);
      if (form.icon instanceof File) fd.append("icon", form.icon);
      if (form.floatTop instanceof File) fd.append("floatTop", form.floatTop);
      if (form.floatLeft instanceof File)
        fd.append("floatLeft", form.floatLeft);

      let res;
      let successMessage;

      if (editingChikkiId === -1) {
        // Create
        res = await fetch(`${API_BASE}/variant`, {
          method: "POST",
          headers: { Authorization: `Bearer ${adminToken}` },
          body: fd,
        });
        successMessage = "New variant created successfully!";
      } else {
        // Update
        res = await fetch(`${API_BASE}/variant/${editingChikkiId}`, {
          method: "PUT",
          headers: { Authorization: `Bearer ${adminToken}` },
          body: fd,
        });
        successMessage = "Variant updated successfully!";
      }

      if (!res.ok) throw new Error("Save failed");

      const saved = await res.json();

      // Normalize image URLs
      const updated = {
        ...saved,
        mainImage: saved.mainImage
          ? `${BASE_URL}${saved.mainImage.startsWith("/") ? "" : "/"}${saved.mainImage}`
          : "",
        icon: saved.icon
          ? `${BASE_URL}${saved.icon.startsWith("/") ? "" : "/"}${saved.icon}`
          : "",
        floatTop: saved.floatTop
          ? `${BASE_URL}${saved.floatTop.startsWith("/") ? "" : "/"}${saved.floatTop}`
          : "",
        floatLeft: saved.floatLeft
          ? `${BASE_URL}${saved.floatLeft.startsWith("/") ? "" : "/"}${saved.floatLeft}`
          : "",
      };

      if (editingChikkiId === -1) {
        setChikkis((prev) => [...prev, updated]);
      } else {
        setChikkis((prev) =>
          prev.map((v) => (v._id === editingChikkiId ? updated : v)),
        );
      }

      toast.success(successMessage);
      resetForm();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save variant");
    }
  };

  const getImageUrl = (value) => {
    if (!value) return null;
    if (typeof value === "string") return value; // already full URL after fetch
    if (value instanceof File) return null; // preview uses data URL
    return null;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-main)]">
        <div className="text-lg text-[var(--text-muted)]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-main)] py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header - unchanged */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-main)] tracking-tight">
              Hero Banner Management
            </h1>
            <p className="mt-1.5 text-[var(--text-muted)] text-sm sm:text-base">
              Manage homepage hero content and product variants
            </p>
          </div>
          <button
            onClick={startAddNew}
            disabled={editingChikkiId !== null}
            className="w-full sm:w-auto px-6 py-2.5 bg-[var(--accent)] text-[var(--secondary)] font-medium rounded-lg shadow-sm hover:brightness-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            + New Variant
          </button>
        </div>

        {/* LEFT CONTENT CARD - unchanged except save handler */}
        <div className="bg-white rounded-xl shadow-sm border border-[var(--bg-soft)] overflow-hidden">
          <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-[var(--bg-soft)] flex justify-between items-center">
            <h2 className="text-xl font-semibold text-[var(--text-main)]">
              Hero Section - Left Content
            </h2>
            {!editingLeft && (
              <button
                onClick={() => setEditingLeft(true)}
                className="text-[var(--accent)] hover:text-[var(--accent)]/80 font-medium text-sm sm:text-base"
              >
                Edit
              </button>
            )}
          </div>

          {editingLeft ? (
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              <div>
                <label className="block text-sm font-medium text-[var(--text-muted)] mb-1.5">
                  Heading{" "}
                  <span className="text-xs">(HTML &lt;br&gt; supported)</span>
                </label>
                <textarea
                  name="heading"
                  value={leftContent.heading}
                  onChange={handleLeftChange}
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-muted)] mb-1.5">
                  Description
                </label>
                <textarea
                  name="description"
                  value={leftContent.description}
                  onChange={handleLeftChange}
                  rows={4}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-muted)] mb-1.5">
                  Button Label
                </label>
                <input
                  name="buttonText"
                  value={leftContent.buttonText}
                  onChange={handleLeftChange}
                  className="w-full sm:w-80 px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] outline-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={saveLeftContent}
                  className="px-6 py-2.5 bg-[var(--primary)] text-white rounded-lg font-medium hover:brightness-105 transition w-full sm:w-auto"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setEditingLeft(false)}
                  className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition w-full sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="p-4 sm:p-6 prose prose-[var(--text-main)] max-w-none">
              <h3
                className="text-2xl font-bold mb-3"
                dangerouslySetInnerHTML={{ __html: leftContent.heading }}
              />
              <p className="text-[var(--text-muted)] leading-relaxed">
                {leftContent.description}
              </p>
              <div className="mt-6 w-full sm:w-auto inline-block px-8 py-3 bg-[var(--accent)] text-[var(--secondary)] rounded-full font-medium text-center">
                {leftContent.buttonText}
              </div>
            </div>
          )}
        </div>

        {/* FORM - Add / Edit Chikki - UI unchanged */}
        {editingChikkiId !== null && (
          <div className="bg-white rounded-xl shadow-sm border border-[var(--bg-soft)] overflow-hidden">
            <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-[var(--bg-soft)]">
              <h2 className="text-xl font-semibold text-[var(--text-main)]">
                {editingChikkiId === -1 ? "Create New Variant" : "Edit Variant"}
              </h2>
            </div>

            <form
              onSubmit={handleSaveChikki}
              className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
            >
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[var(--text-muted)] mb-1.5">
                  Variant Name <span className="text-red-500">*</span>
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] outline-none"
                  placeholder="Classic Pista Chikki"
                />
              </div>

              {[
                {
                  key: "mainImage",
                  label: "Main Product Image",
                  required: true,
                },
                { key: "icon", label: "Tab Icon" },
                { key: "floatTop", label: "Floating Top Decoration" },
                { key: "floatLeft", label: "Floating Left Element" },
              ].map(({ key, label, required }) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-[var(--text-muted)] mb-1.5">
                    {label}
                    {required && <span className="text-red-500">*</span>}
                  </label>
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden">
                      {imagePreviews[previewKey(key)] ? (
                        <img
                          src={imagePreviews[previewKey(key)]}
                          alt="preview"
                          className="w-full h-full object-cover"
                        />
                      ) : getImageUrl(form[key]) ? (
                        <img
                          src={getImageUrl(form[key])}
                          alt={key}
                          className="w-full h-full object-contain p-2"
                          onError={(e) => {
                            e.target.src =
                              "https://via.placeholder.com/96?text=No+Image";
                            e.target.onerror = null;
                          }}
                        />
                      ) : (
                        <span className="text-gray-400 text-xs">No image</span>
                      )}
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageSelect(e, key)}
                      className="text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-[var(--accent)]/10 file:text-[var(--accent)] hover:file:bg-[var(--accent)]/20 transition mt-2 sm:mt-0"
                    />
                  </div>
                </div>
              ))}

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[var(--text-muted)] mb-1.5">
                  Short Description
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleFormChange}
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] outline-none"
                  placeholder="Traditional jaggery & peanut chikki with rich pista flavor..."
                />
              </div>

              <div className="md:col-span-2 flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  type="submit"
                  className="px-8 py-2.5 bg-[var(--primary)] text-white rounded-lg font-medium hover:brightness-105 transition w-full sm:w-auto"
                >
                  {editingChikkiId === -1 ? "Create Variant" : "Update Variant"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-8 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition w-full sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* VARIANTS LIST - updated key & edit handler */}
        {chikkis.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {chikkis.map((chikki) => (
              <div
                key={chikki._id}
                className="bg-white rounded-xl shadow-sm border border-[var(--bg-soft)] overflow-hidden hover:shadow-md transition"
              >
                <div className="h-48 bg-gradient-to-br from-[var(--bg-soft)] to-white relative">
                  {chikki.mainImage && (
                    <img
                      src={chikki.mainImage}
                      alt={chikki.name}
                      className="absolute inset-0 w-full h-full object-contain p-6"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/180?text=Image+Not+Found";
                        e.target.onerror = null;
                      }}
                    />
                  )}
                </div>
                <div className="p-4 sm:p-5">
                  <h3 className="font-semibold text-lg text-[var(--text-main)] mb-1">
                    {chikki.name}
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] mb-4">
                    {chikki.description || "No description provided"}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => startEdit(chikki)}
                      className="flex-1 py-2 bg-[var(--accent)]/10 text-[var(--accent)] rounded-lg text-sm font-medium hover:bg-[var(--accent)]/20 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => openDeleteConfirm(chikki._id)}
                      className="flex-1 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-[var(--text-muted)] bg-white rounded-xl border border-[var(--bg-soft)]">
            <p className="text-lg font-medium">No variants added yet</p>
            <p className="mt-1 text-sm">Click "New Variant" to get started</p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal - updated */}
      {deleteConfirm.open && (
        <div className="fixed inset-0 bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 max-w-md w-full mx-4"
          >
            <h3 className="text-xl font-semibold text-[var(--text-main)] mb-4">
              Confirm Deletion
            </h3>
            <p className="text-[var(--text-muted)] mb-6 text-sm sm:text-base">
              Are you sure you want to delete "
              {chikkis.find((c) => c._id === deleteConfirm.id)?.name ||
                "this variant"}
              "?
              <br />
              This action cannot be undone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <button
                onClick={() => setDeleteConfirm({ open: false, id: null })}
                className="px-6 py-2.5 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition w-full sm:w-auto"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-6 py-2.5 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition w-full sm:w-auto"
              >
                Delete Variant
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
