// src/pages/ProfilePage.jsx
import { useState, useEffect } from "react";
import { Camera, Mail, Phone, MapPin, Pencil, Check, X, Lock, Eye, EyeOff } from "lucide-react";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState(null);
  const [originalData, setOriginalData] = useState(null);

  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const { logout } = useAdminAuth();
  const navigate = useNavigate();

  const API_BASE = import.meta.env.VITE_API_BASE || "";

  const getToken = () => localStorage.getItem("adminToken");

  const fetchAdmin = async () => {
    const token = getToken();
    if (!token) {
      toast.error("Session expired. Please login again.");
      navigate("/admin/login");
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/admin/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem("adminToken");
          toast.error("Session expired or unauthorized. Please login.");
          navigate("/admin/login");
        }
        throw new Error(data.message || "Failed to fetch profile");
      }

      const adminData = data.admin;
      setFormData(adminData);
      setOriginalData(adminData);
    } catch (err) {
      console.error("Fetch admin error:", err);
      toast.error(err.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmin();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
    setPasswordError("");
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setFormData((prev) => ({ ...prev, avatar: previewUrl }));

    const token = getToken();
    if (!token) {
      toast.error("Session expired. Please login.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("avatar", file);

    setSaving(true);

    try {
      const res = await fetch(`${API_BASE}/api/admin/upload-avatar`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Upload failed");
      }

      toast.success("Avatar uploaded successfully!");
      await fetchAdmin();
    } catch (err) {
      console.error("Avatar upload error:", err);
      toast.error(err.message || "Failed to upload avatar");
      if (originalData) {
        setFormData((prev) => ({ ...prev, avatar: originalData.avatar }));
      }
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    setPasswordSaving(true);
    setPasswordError("");

    if (passwordForm.newPassword !== passwordForm.confirmNewPassword) {
      setPasswordError("New password and confirmation do not match");
      setPasswordSaving(false);
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      setPasswordError("New password must be at least 8 characters");
      setPasswordSaving(false);
      return;
    }

    const token = getToken();
    if (!token) {
      toast.error("Session expired. Please login.");
      setPasswordSaving(false);
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/admin/change-password`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
          confirmNewPassword: passwordForm.confirmNewPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to change password");
      }

      toast.success("Password changed successfully! Logging you out...");

      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });

      await logout();

      setTimeout(() => {
        navigate("/login"); // ← usually /admin/login — adjust if needed
      }, 1800);
    } catch (err) {
      console.error("Password change error:", err);
      const msg = err.message || "Failed to change password";
      setPasswordError(msg);
      toast.error(msg);
    } finally {
      setPasswordSaving(false);
    }
  };

  const togglePassword = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSave = async () => {
    const token = getToken();
    if (!token) {
      toast.error("Session expired. Please login.");
      return;
    }

    setSaving(true);

    try {
      const res = await fetch(`${API_BASE}/api/admin/profile`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          bio: formData.bio,
          phone: formData.phone,
          location: formData.location,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Update failed");

      toast.success("Profile updated successfully!");
      setIsEditing(false);
      await fetchAdmin();
    } catch (err) {
      console.error("Profile save error:", err);
      toast.error(err.message || "Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (originalData) {
      setFormData(originalData);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <p className="text-[#3a2416] font-semibold text-lg sm:text-xl">Loading profile...</p>
      </div>
    );
  }

  if (!formData) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <p className="text-red-600 font-semibold text-lg sm:text-xl text-center">
          Unable to load profile. Please login again.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-main)] px-4 py-6 sm:p-8 flex flex-col items-center">
      <ToastContainer position="top-right" transition={Slide} autoClose={4000} />

      {/* Avatar */}
      <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-white shadow-xl mx-auto">
        <img
          key={formData.avatar}
          src={`${formData.avatar}?t=${Date.now()}`}
          alt="Profile avatar"
          className="w-full h-full object-cover"
          onError={(e) => (e.target.src = "https://i.pravatar.cc/300?img=47")}
        />

        <label
          className={`absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer transition
            ${saving ? "opacity-50 cursor-not-allowed" : "hover:bg-black/60"}`}
        >
          <Camera size={28} className="text-white" />
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleAvatarChange}
            disabled={saving || !isEditing}
          />
        </label>
      </div>

      {/* Name & Role */}
      <div className="mt-5 sm:mt-6 text-center w-full max-w-2xl">
        {isEditing ? (
          <div className="flex flex-col items-center gap-2 px-2">
            <input
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-center border-b-2 border-[#f2b705] bg-transparent focus:outline-none w-full max-w-md"
              placeholder="Your name"
            />
            <p className="text-base sm:text-lg text-[#c63b2f] font-medium">
              {formData.role || "Administrator"}
            </p>
          </div>
        ) : (
          <>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#3a2416] break-words">
              {formData.name}
            </h1>
            <p className="text-base sm:text-lg text-[#c63b2f] font-medium mt-1">
              {formData.role}
            </p>
            {formData.bio && (
              <p className="mt-3 sm:mt-4 text-[#3a2416] text-sm sm:text-base max-w-2xl mx-auto px-2">
                {formData.bio}
              </p>
            )}
          </>
        )}
      </div>

      {/* Main Content */}
      <div className="mt-8 sm:mt-10 w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
        <GlassCard title="Contact Information">
          <InfoField
            icon={Mail}
            label="Email"
            value={formData.email}
            editing={isEditing}
            name="email"
            onChange={handleChange}
            disabled
          />
          <InfoField
            icon={Phone}
            label="Phone"
            value={formData.phone}
            editing={isEditing}
            name="phone"
            onChange={handleChange}
          />
          <InfoField
            icon={MapPin}
            label="Location"
            value={formData.location}
            editing={isEditing}
            name="location"
            onChange={handleChange}
          />
        </GlassCard>

        <GlassCard title="Change Password">
          <div className="space-y-4">
            {["currentPassword", "newPassword", "confirmNewPassword"].map((field, i) => {
              const labels = ["Current Password", "New Password", "Confirm New Password"];
              return (
                <div key={field}>
                  <label className="block text-sm font-medium text-[#3a2416] mb-1.5">
                    {labels[i]}
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword[field] ? "text" : "password"}
                      name={field}
                      value={passwordForm[field]}
                      onChange={handlePasswordChange}
                      disabled={!isEditing || passwordSaving}
                      placeholder="••••••••"
                      className="w-full p-3 pr-11 rounded-lg border border-[#f2b705]/70
                        focus:border-[#f2b705] focus:ring-1 focus:ring-[#f2b705]/40
                        outline-none transition bg-white/60 disabled:opacity-60 text-base"
                    />
                    <button
                      type="button"
                      onClick={() => togglePassword(field)}
                      disabled={!isEditing}
                      className="absolute right-3 top-1/2 -translate-y-1/2
                        text-[#3a2416]/60 hover:text-[#3a2416] disabled:opacity-40"
                    >
                      {showPassword[field] ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
              );
            })}

            {passwordError && (
              <p className="text-red-600 text-sm mt-1">{passwordError}</p>
            )}

            <button
              onClick={handleChangePassword}
              disabled={!isEditing || passwordSaving}
              className="mt-5 w-full py-3 rounded-lg bg-[#c63b2f] text-white font-medium
                hover:brightness-110 transition disabled:opacity-50 disabled:cursor-not-allowed
                flex items-center justify-center gap-2 text-base sm:text-lg"
            >
              <Lock size={18} />
              {passwordSaving ? "Updating..." : "Update Password"}
            </button>
          </div>
        </GlassCard>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10 w-full max-w-md">
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="px-8 py-3.5 rounded-full bg-[#f2b705] text-[#3a2416] font-semibold
              hover:scale-105 active:scale-100 transition flex items-center justify-center gap-2 shadow-md
              text-base sm:text-lg w-full sm:w-auto"
          >
            <Pencil size={18} /> Edit Profile
          </button>
        ) : (
          <>
            <button
              onClick={handleCancel}
              className="px-8 py-3.5 rounded-full bg-gray-600 text-white font-medium
                hover:bg-gray-700 transition flex items-center justify-center gap-2
                text-base sm:text-lg w-full sm:w-auto"
            >
              <X size={18} /> Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-8 py-3.5 rounded-full bg-[#c63b2f] text-white font-medium
                hover:brightness-110 transition flex items-center justify-center gap-2
                disabled:opacity-60 text-base sm:text-lg w-full sm:w-auto"
            >
              <Check size={18} /> {saving ? "Saving..." : "Save Changes"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function GlassCard({ title, children }) {
  return (
    <div className="bg-white/60 backdrop-blur-lg shadow-xl rounded-2xl p-5 sm:p-6 md:p-7 space-y-4 border border-white/30">
      <h3 className="text-lg sm:text-xl font-semibold text-[#3a2416] border-b border-[#f2b705]/30 pb-2">
        {title}
      </h3>
      {children}
    </div>
  );
}

function InfoField({ icon: Icon, label, value, editing, name, onChange, disabled = false }) {
  return (
    <div className="flex items-center gap-3 p-3 sm:p-4 bg-white/50 rounded-xl border border-white/40">
      <div className="p-2.5 rounded-lg bg-[#f2b705]/20 shrink-0">
        <Icon size={20} className="text-[#c63b2f]" />
      </div>
      <div className="flex-1 min-w-0">
        <label className="block text-xs sm:text-sm text-[#3a2416]/80">{label}</label>
        {editing && !disabled ? (
          <input
            type="text"
            name={name}
            value={value || ""}
            onChange={onChange}
            disabled={disabled}
            className="w-full bg-transparent border-b border-[#f2b705]/50 focus:border-[#f2b705] outline-none text-[#3a2416] text-base sm:text-lg py-1"
          />
        ) : (
          <p className="text-[#3a2416] font-medium text-base sm:text-lg break-words">
            {value || "Not set"}
          </p>
        )}
      </div>
    </div>
  );
}