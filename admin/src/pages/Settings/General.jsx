// src/pages/admin/AdminContactPage.jsx
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Save,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Upload,
  Loader2,
} from "lucide-react";

const API_BASE = "https://sweet-backend-nhwt.onrender.com/api/contact/";
const BASE_URL = "https://sweet-backend-nhwt.onrender.com"; 

const defaultContactData = {
  logo: "/logo-placeholder.png",
  phone: "+91 99461 37919",
  whatsapp: "+91 99461 37919",
  email: "Info@MarvelCrunch.com",
  address:
    "Plot No. 133, Shreeji Textile Velenja Sayan Road, Nr.Ramvatika Velenja – 394150",
  googleMapEmbedUrl:
    "https://www.google.com/maps?q=Plot+No.+133,+Shreeji+Textile+Velenja+Sayan+Road,+Nr.Ramvatika+Velenja+–+394150&output=embed",
};

const AdminContactPage = () => {
  const [formData, setFormData] = useState(defaultContactData);
  const [logoFile, setLogoFile] = useState(null); // NEW: separate state for file
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  const [logoPreview, setLogoPreview] = useState(defaultContactData.logo);
  const fileInputRef = useRef(null);

  const adminToken = localStorage.getItem("adminToken");

  // Fetch existing contact info
  useEffect(() => {
    const fetchContactInfo = async () => {
      if (!adminToken) {
        console.warn("Admin token missing. Cannot fetch contact info.");
        return;
      }

      try {
        const res = await fetch(API_BASE, {
          headers: { Authorization: `Bearer ${adminToken}` },
        });

        if (res.status === 401) {
          console.error("Unauthorized. Admin token invalid/expired.");
          return;
        }

        if (!res.ok) throw new Error("Failed to fetch contact info");

        const contact = await res.json();

        // Make logo URL absolute
        const logoPath = contact.logo || defaultContactData.logo;
        const fullLogoUrl = logoPath.startsWith("http")
          ? logoPath
          : `${BASE_URL}${logoPath.startsWith("/") ? "" : "/"}${logoPath}`;

        setFormData({
          logo: fullLogoUrl,
          phone: contact.phone || "",
          whatsapp: contact.whatsapp || "",
          email: contact.email || "",
          address: contact.address || "",
          googleMapEmbedUrl: contact.googleMapEmbedUrl || "",
        });
        setLogoPreview(fullLogoUrl);
      } catch (err) {
        console.error("Fetch Contact Info Error:", err);
        setFormData(defaultContactData);
        setLogoPreview(defaultContactData.logo);
      }
    };

    fetchContactInfo();
  }, [adminToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSaveStatus(null);
  };

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoPreview(reader.result); // data URL for preview
      setLogoFile(file); // store actual File object
      // IMPORTANT: do NOT set formData.logo = file anymore
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveStatus(null);

    if (!adminToken) {
      alert("Admin not logged in. Cannot update contact info.");
      setIsSaving(false);
      return;
    }

    try {
      const data = new FormData();
      data.append("phone", formData.phone);
      data.append("whatsapp", formData.whatsapp);
      data.append("email", formData.email);
      data.append("address", formData.address);
      data.append("googleMapEmbedUrl", formData.googleMapEmbedUrl);

      // Append logo only if a new file was selected
      if (logoFile) {
        data.append("logo", logoFile);
      }

      const res = await fetch(API_BASE, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
        body: data,
      });

      if (res.status === 401) {
        alert(
          "Unauthorized. Your session may have expired. Please login again.",
        );
        setSaveStatus("error");
        setIsSaving(false);
        return;
      }

      if (!res.ok) throw new Error("Failed to update contact info");

      const updatedData = await res.json();

      // ── Handle logo URL safely ──
      let fullLogoUrl = logoPreview; // fallback to current preview

      if (updatedData.logo && typeof updatedData.logo === "string") {
        fullLogoUrl =
          updatedData.logo.startsWith("http") ||
          updatedData.logo.startsWith("//")
            ? updatedData.logo
            : `${BASE_URL}${updatedData.logo.startsWith("/") ? "" : "/"}${updatedData.logo}`;
      }

      // Update form data (logo is always string)
      setFormData({
        ...formData,
        logo: fullLogoUrl,
        phone: updatedData.phone || formData.phone,
        whatsapp: updatedData.whatsapp || formData.whatsapp,
        email: updatedData.email || formData.email,
        address: updatedData.address || formData.address,
        googleMapEmbedUrl:
          updatedData.googleMapEmbedUrl || formData.googleMapEmbedUrl,
      });

      setLogoPreview(fullLogoUrl);
      setLogoFile(null); // clear file after success

      // Reset file input visually
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      setSaveStatus("success");
    } catch (err) {
      console.error("Update Error:", err);
      setSaveStatus("error");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-main)] py-6 px-4 sm:px-6 lg:px-10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--text-main)]">
            Contact & Branding Settings
          </h1>
          <p className="mt-2 text-[var(--text-muted)] text-sm sm:text-base">
            Manage contact info, address, map, and website logo
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-8 sm:space-y-10">
          {/* ================== LOGO SECTION ================== */}
          <div className="bg-[var(--bg-card)] shadow-md rounded-2xl border border-[var(--bg-soft)] p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-semibold mb-5 text-[var(--text-main)] flex items-center gap-2 sm:gap-3">
              <Upload className="text-[var(--primary)]" size={20} />
              Website Logo
            </h2>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8">
              <div className="shrink-0">
                <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-xl border-2 border-dashed border-[var(--text-muted)] overflow-hidden bg-white flex items-center justify-center">
                  {logoPreview ? (
                    <img
                      src={logoPreview}
                      alt="Logo preview"
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.currentTarget.src = "/logo-placeholder.png";
                        e.currentTarget.onerror = null;
                      }}
                    />
                  ) : (
                    <span className="text-[var(--text-muted)] text-xs sm:text-sm">
                      No logo
                    </span>
                  )}
                </div>
              </div>

              <div className="flex-1">
                <label className="block text-xs sm:text-sm font-medium text-[var(--text-main)] mb-1 sm:mb-2">
                  Upload New Logo
                </label>
                <p className="text-xs sm:text-sm text-[var(--text-muted)] mb-3 sm:mb-4">
                  Recommended: PNG/SVG, min 200×200px, transparent background
                </p>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-5 py-2 sm:px-6 sm:py-3 bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-white rounded-lg font-medium transition-all duration-200 flex items-center gap-2 shadow-sm text-sm sm:text-base"
                >
                  <Upload size={16} />
                  Choose Logo
                </button>
              </div>
            </div>
          </div>

          {/* ================== CONTACT DETAILS ================== */}
          <div className="bg-[var(--bg-card)] shadow-md rounded-2xl border border-[var(--bg-soft)] p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-[var(--text-main)] flex items-center gap-2 sm:gap-3">
              <Phone className="text-[var(--primary)]" size={20} />
              Contact Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-[var(--text-main)] mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-[var(--text-muted)]" />
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-10 sm:pl-12 pr-3 py-2 sm:py-3 border border-[var(--bg-soft)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition-all bg-white text-sm sm:text-base"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-[var(--text-main)] mb-1">
                  WhatsApp Number
                </label>
                <div className="relative">
                  <MessageCircle className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-[var(--text-muted)]" />
                  <input
                    type="text"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    className="w-full pl-10 sm:pl-12 pr-3 py-2 sm:py-3 border border-[var(--bg-soft)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition-all bg-white text-sm sm:text-base"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs sm:text-sm font-medium text-[var(--text-main)] mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-[var(--text-muted)]" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 sm:pl-12 pr-3 py-2 sm:py-3 border border-[var(--bg-soft)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition-all bg-white text-sm sm:text-base"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs sm:text-sm font-medium text-[var(--text-main)] mb-1">
                  Full Address
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 sm:left-4 top-3 h-4 w-4 sm:h-5 sm:w-5 text-[var(--text-muted)]" />
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows={3}
                    className="w-full pl-10 sm:pl-12 pr-3 py-2 sm:py-3 border border-[var(--bg-soft)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition-all resize-y bg-white text-sm sm:text-base"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ================== GOOGLE MAP ================== */}
          <div className="bg-[var(--bg-card)] shadow-md rounded-2xl border border-[var(--bg-soft)] p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-semibold mb-5 text-[var(--text-main)] flex items-center gap-2 sm:gap-3">
              <MapPin className="text-[var(--primary)]" size={20} />
              Google Maps Embed
            </h2>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-[var(--text-main)] mb-1">
                Embed URL (only src value of iframe)
              </label>
              <input
                type="text"
                name="googleMapEmbedUrl"
                value={formData.googleMapEmbedUrl}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-[var(--bg-soft)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition-all bg-white text-sm sm:text-base"
                placeholder="https://www.google.com/maps?q=..."
              />
              <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-[var(--text-muted)]">
                Tip: Google Maps → Share → Embed a map → Copy only the{" "}
                <code>src</code> value
              </p>
            </div>
          </div>

          {/* Save Area */}
          <div className="flex flex-col sm:flex-row justify-end items-center gap-4 sm:gap-6 pt-4 sm:pt-6">
            <button
              type="submit"
              disabled={isSaving}
              className={`flex items-center justify-center gap-2 px-8 sm:px-10 py-2.5 sm:py-3 rounded-xl font-medium text-white text-base sm:text-lg shadow-lg transition-all duration-200 min-w-[160px]
                ${isSaving ? "bg-gray-400 cursor-not-allowed" : "bg-[var(--primary)] hover:bg-[var(--primary)]/90 active:scale-98"}`}
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-5 w-5 sm:h-6 sm:w-6 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Save Changes
                </>
              )}
            </button>

            {saveStatus === "success" && (
              <div className="text-green-700 bg-green-50 px-4 py-2 sm:px-6 sm:py-3 rounded-xl border border-green-200 text-sm sm:text-base">
                ✓ Settings updated successfully!
              </div>
            )}

            {saveStatus === "error" && (
              <div className="text-red-700 bg-red-50 px-4 py-2 sm:px-6 sm:py-3 rounded-xl border border-red-200 text-sm sm:text-base">
                × Failed to save. Please try again.
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminContactPage;
