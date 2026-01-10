// src/components/admin/ChikkiAdminPanel.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DEFAULT_LEFT_CONTENT = {
  heading: 'Crafted With Care,<br />Chikki You Truly Love',
  description:
    'Experience the authentic taste of handcrafted chikki made with premium nuts, seeds, and natural jaggery. A perfect balance of tradition, purity, and delightful flavors.',
  buttonText: 'Explore Our Chikki',
};

export default function ChikkiAdminPanel() {
  const [leftContent, setLeftContent] = useState(() => {
    const saved = localStorage.getItem('leftContent');
    return saved ? JSON.parse(saved) : DEFAULT_LEFT_CONTENT;
  });

  const [chikkis, setChikkis] = useState(() => {
    const saved = localStorage.getItem('chikkiVariants');
    return saved ? JSON.parse(saved) : [];
  });

  const [editingLeft, setEditingLeft] = useState(false);
  const [editingChikkiId, setEditingChikkiId] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, index: null });

  const [form, setForm] = useState({
    name: '',
    description: '',
    mainImage: '',
    icon: '',
    floatTop: '',
    floatLeft: 'nuts.png',
  });

  const [imagePreviews, setImagePreviews] = useState({});
  const IMAGE_BASE_PATH = '/images/';

  useEffect(() => {
    localStorage.setItem('leftContent', JSON.stringify(leftContent));
  }, [leftContent]);

  useEffect(() => {
    localStorage.setItem('chikkiVariants', JSON.stringify(chikkis));
  }, [chikkis]);

  // ── Left Content Handlers ───────────────────────────────────────
  const handleLeftChange = (e) => {
    const { name, value } = e.target;
    setLeftContent((prev) => ({ ...prev, [name]: value }));
  };

  const saveLeftContent = () => {
    setEditingLeft(false);
    toast.success('Hero left content saved successfully!');
  };

  // ── Chikki Form Handlers ────────────────────────────────────────
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageSelect = (e, field) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreviews((prev) => ({
        ...prev,
        [`${editingChikkiId}-${field}`]: reader.result,
      }));
    };
    reader.readAsDataURL(file);

    setForm((prev) => ({ ...prev, [field]: file.name }));
  };

  const resetForm = () => {
    setForm({
      name: '',
      description: '',
      mainImage: '',
      icon: '',
      floatTop: '',
      floatLeft: 'nuts.png',
    });
    setImagePreviews({});
    setEditingChikkiId(null);
  };

  const startAddNew = () => {
    resetForm();
    setEditingChikkiId(-1);
  };

  const startEdit = (index) => {
    setEditingChikkiId(index);
    setForm(chikkis[index]);
    setImagePreviews({});
  };

  const openDeleteConfirm = (index) => {
    setDeleteConfirm({ open: true, index });
  };

  const confirmDelete = () => {
    if (deleteConfirm.index !== null) {
      setChikkis((prev) => prev.filter((_, i) => i !== deleteConfirm.index));
      if (editingChikkiId === deleteConfirm.index) resetForm();
      toast.success('Variant deleted successfully!');
    }
    setDeleteConfirm({ open: false, index: null });
  };

  const cancelDelete = () => {
    setDeleteConfirm({ open: false, index: null });
  };

  const handleSaveChikki = (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      toast.error('Variant Name is required!');
      return;
    }

    if (!form.mainImage.trim()) {
      toast.error('Main Product Image is required!');
      return;
    }

    const newChikki = { ...form };

    if (editingChikkiId === -1) {
      setChikkis((prev) => [...prev, newChikki]);
      toast.success('New variant created successfully!');
    } else {
      setChikkis((prev) => {
        const updated = [...prev];
        updated[editingChikkiId] = newChikki;
        return updated;
      });
      toast.success('Variant updated successfully!');
    }

    resetForm();
  };

  const getImageUrl = (filename) => {
    if (!filename) return null;
    if (filename.startsWith('http') || filename.startsWith('data:')) return filename;
    return `${IMAGE_BASE_PATH}${filename}`;
  };

  return (
    <div className="min-h-screen bg-[var(--bg-main)] py-6 px-4 sm:px-6 lg:px-8">
      <ToastContainer position="top-right" autoClose={2000} />

      <div className="max-w-7xl mx-auto space-y-12">

        {/* Header */}
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

        {/* LEFT CONTENT CARD */}
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
                  Heading <span className="text-xs">(HTML &lt;br&gt; supported)</span>
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

        {/* FORM - Add / Edit Chikki */}
        {editingChikkiId !== null && (
          <div className="bg-white rounded-xl shadow-sm border border-[var(--bg-soft)] overflow-hidden">
            <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-[var(--bg-soft)]">
              <h2 className="text-xl font-semibold text-[var(--text-main)]">
                {editingChikkiId === -1 ? 'Create New Variant' : 'Edit Variant'}
              </h2>
            </div>

            <form onSubmit={handleSaveChikki} className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* Name */}
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

              {/* Image Fields */}
              {[
                { key: 'mainImage', label: 'Main Product Image', required: true },
                { key: 'icon', label: 'Tab Icon' },
                { key: 'floatTop', label: 'Floating Top Decoration' },
                { key: 'floatLeft', label: 'Floating Left Element' },
              ].map(({ key, label, required }) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-[var(--text-muted)] mb-1.5">
                    {label}
                    {required && <span className="text-red-500">*</span>}
                  </label>
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden">
                      {imagePreviews[`${editingChikkiId}-${key}`] ? (
                        <img
                          src={imagePreviews[`${editingChikkiId}-${key}`]}
                          alt="preview"
                          className="w-full h-full object-cover"
                        />
                      ) : form[key] ? (
                        <img
                          src={getImageUrl(form[key])}
                          alt={form[key]}
                          className="w-full h-full object-contain p-2"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/96?text=No+Image';
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

              {/* Description */}
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

              {/* Actions */}
              <div className="md:col-span-2 flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  type="submit"
                  className="px-8 py-2.5 bg-[var(--primary)] text-white rounded-lg font-medium hover:brightness-105 transition w-full sm:w-auto"
                >
                  {editingChikkiId === -1 ? 'Create Variant' : 'Update Variant'}
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

        {/* VARIANTS LIST */}
        {chikkis.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {chikkis.map((chikki, index) => (
              <div
                key={chikki.name + index}
                className="bg-white rounded-xl shadow-sm border border-[var(--bg-soft)] overflow-hidden hover:shadow-md transition"
              >
                <div className="h-48 bg-gradient-to-br from-[var(--bg-soft)] to-white relative">
                  {chikki.mainImage && (
                    <img
                      src={getImageUrl(chikki.mainImage)}
                      alt={chikki.name}
                      className="absolute inset-0 w-full h-full object-contain p-6"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/180?text=Image+Not+Found';
                        e.target.onerror = null;
                      }}
                    />
                  )}
                </div>
                <div className="p-4 sm:p-5">
                  <h3 className="font-semibold text-lg text-[var(--text-main)] mb-1">
                    {chikki.name}
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] line-clamp-2 mb-4">
                    {chikki.description || 'No description provided'}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => startEdit(index)}
                      className="flex-1 py-2 bg-[var(--accent)]/10 text-[var(--accent)] rounded-lg text-sm font-medium hover:bg-[var(--accent)]/20 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => openDeleteConfirm(index)}
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

      {/* Delete Confirmation Modal */}
      {deleteConfirm.open && (
        <div className="fixed inset-0 bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 max-w-md w-full mx-4"
          >
            <h3 className="text-xl font-semibold text-[var(--text-main)] mb-4">
              Confirm Deletion
            </h3>
            <p className="text-[var(--text-muted)] mb-6 text-sm sm:text-base">
              Are you sure you want to delete "{chikkis[deleteConfirm.index]?.name}"?
              <br />
              This action cannot be undone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <button
                onClick={cancelDelete}
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
