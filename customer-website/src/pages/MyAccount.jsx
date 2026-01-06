// MyAccount.jsx
import React, { useState } from "react";
import {
  UserCog,
  MapPin,
  Lock,
  LogOut,
  Camera,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Features from "../components/Features/Features";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyAccount = () => {
  const [activeTab, setActiveTab] = useState("Personal Information");
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Personal Information
  const [profile, setProfile] = useState({
    firstName: "Bessie",
    lastName: "Cooper",
    email: "example@gmail.com",
    phone: "+0123-456-789",
    gender: "Female",
  });

  // Address Form
  const [addressForm, setAddressForm] = useState({
    firstName: "",
    lastName: "",
    company: "",
    country: "",
    state: "",
    city: "",
    street: "",
    zip: "",
    phone: "",
    email: "",
  });

  // Password Form
  const [passwordData, setPasswordData] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  // Location Data
  const locationData = {
    India: {
      Gujarat: ["Ahmedabad", "Surat", "Vadodara", "Rajkot"],
      Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik"],
    },
    USA: {
      California: ["Los Angeles", "San Francisco", "San Diego"],
      Texas: ["Houston", "Dallas", "Austin"],
      "New York": ["New York City", "Buffalo", "Rochester"],
    },
  };

  // Reusable Custom Dropdown
  const CustomDropdown = ({
    label,
    value,
    options = [],
    onSelect,
    disabled = false,
    placeholder,
  }) => {
    const [open, setOpen] = useState(false);

    return (
      <div className="relative">
        <label className="block text-sm font-medium text-[#3a2416] mb-2">
          {label} <span className="text-red-500">*</span>
        </label>
        <button
          type="button"
          disabled={disabled}
          onClick={() => setOpen(!open)}
          className={`
            w-full flex justify-between items-center px-4 py-3 
            border rounded-lg text-left transition-all
            ${disabled
              ? "bg-gray-50 text-gray-400 cursor-not-allowed border-gray-300"
              : "bg-white border-[#8a6a52] hover:border-[#6b3f26] focus:ring-2 focus:ring-[#f2b705] focus:outline-none"
            }
          `}
        >
          <span className={!value ? "text-gray-400" : ""}>
            {value || placeholder || `Select ${label}`}
          </span>
          <span className="text-[#8a6a52] ml-2">▼</span>
        </button>

        {open && !disabled && options.length > 0 && (
          <ul className="absolute z-40 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-xl max-h-60 overflow-y-auto">
            {options.map((option) => (
              <li
                key={option}
                onClick={() => {
                  onSelect(option);
                  setOpen(false);
                }}
                className={`
                  px-4 py-3 cursor-pointer transition-colors
                  ${value === option
                    ? "bg-[#f2b705] text-white font-medium"
                    : "hover:bg-[#f2b705]/10"
                  }
                `}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  // Handlers
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddressForm((prev) => {
      if (name === "country") return { ...prev, country: value, state: "", city: "" };
      if (name === "state") return { ...prev, state: value, city: "" };
      return { ...prev, [name]: value };
    });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    toast.success("Profile updated successfully!");
  };

  const handleAddAddress = (e) => {
    e.preventDefault();

    const required = ["firstName", "lastName", "country", "state", "city", "street", "phone", "email"];
    const missing = required.filter((field) => !addressForm[field]?.trim());

    if (missing.length > 0) {
      toast.error("Please fill in all required fields.");
      return;
    }

    toast.success("New address added successfully!");
    setAddressForm({
      firstName: "",
      lastName: "",
      company: "",
      country: "",
      state: "",
      city: "",
      street: "",
      zip: "",
      phone: "",
      email: "",
    });
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (!passwordData.current || !passwordData.new || !passwordData.confirm) {
      toast.error("All fields are required.");
      return;
    }
    if (passwordData.new !== passwordData.confirm) {
      toast.error("New passwords do not match!");
      return;
    }
    toast.success("Password changed successfully!");
    setPasswordData({ current: "", new: "", confirm: "" });
  };

  const handleLogout = () => {
    toast.info("You have been logged out successfully!");
    setShowLogoutModal(false);
    // Yahan actual logout logic add kar sakte ho jaise:
    // localStorage.clear();
    // navigate("/login");
  };

  const menuItems = [
    { title: "Personal Information", icon: <UserCog size={20} /> },
    { title: "Manage Address", icon: <MapPin size={20} /> },
    { title: "Password Manager", icon: <Lock size={20} /> },
    { title: "Logout", icon: <LogOut size={20} />, danger: true },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-[#3a2416]">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <img
          src="/login.png"
          alt="My Account"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#6b3f26]/40" />
        <div className="relative z-10 text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg"
          >
            My Account
          </motion.h1>
          <p className="mt-4 text-white text-lg">
            <Link to="/" className="hover:text-[var(--text-main)] hover:font-bold hover:underline transition">
              Home
            </Link>{" "}
            <span className="mx-2">\\</span>
            <span className="font-semibold">My Account</span>
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
              <h2 className="text-xl font-bold mb-6 text-[#3a2416]">Account Settings</h2>
              <nav className="space-y-2">
                {menuItems.map((item) => (
                  <button
                    key={item.title}
                    onClick={() => {
                      if (item.title === "Logout") {
                        setShowLogoutModal(true);
                      } else {
                        setActiveTab(item.title);
                      }
                    }}
                    className={`
                      w-full flex items-center gap-4 px-4 py-3 rounded-lg text-left transition-all
                      ${activeTab === item.title
                        ? "bg-[#f2b705] text-white shadow-md"
                        : "hover:bg-[#f2b705]/10"
                      }
                      ${item.danger ? "text-red-600 hover:bg-red-50" : "text-[#3a2416]"}
                    `}
                  >
                    <span className={activeTab === item.title ? "text-white" : "text-[#8a6a52]"}>
                      {item.icon}
                    </span>
                    <span className="font-medium">{item.title}</span>
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg p-8">
              {/* Personal Information */}
              {activeTab === "Personal Information" && (
                <section>
                  <h3 className="text-3xl font-bold mb-8">Personal Information</h3>
                  <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
                    <div className="relative">
                      <img
                        src="/images/profile.jpg"
                        alt="Profile"
                        className="w-36 h-36 rounded-full object-cover border-4 border-[#8a6a52] shadow-md"
                      />
                      <button
                        type="button"
                        className="absolute bottom-0 right-0 bg-[#6b3f26] text-white p-3 rounded-full shadow-lg hover:bg-[#c63b2f] transition"
                        aria-label="Change profile picture"
                      >
                        <Camera size={20} />
                      </button>
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold text-[#3a2416]">
                        {profile.firstName} {profile.lastName}
                      </h4>
                      <p className="text-[#8a6a52] text-lg">{profile.email}</p>
                    </div>
                  </div>

                  <form onSubmit={handleUpdateProfile} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {["firstName", "lastName", "email", "phone"].map((field) => (
                      <div key={field}>
                        <label className="block text-sm font-medium text-[#3a2416] mb-2">
                          {field.replace(/([A-Z])/g, " $1").trim()} <span className="text-red-500">*</span>
                        </label>
                        <input
                          type={field === "email" ? "email" : "text"}
                          name={field}
                          value={profile[field]}
                          onChange={handleProfileChange}
                          required
                          className="w-full px-4 py-3 border border-[#8a6a52] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f2b705] transition"
                        />
                      </div>
                    ))}

                    <div className="md:col-span-2">
                      <CustomDropdown
                        label="Gender"
                        value={profile.gender}
                        options={["Female", "Male", "Other"]}
                        onSelect={(val) => setProfile({ ...profile, gender: val })}
                        placeholder="Select Gender"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <button
                        type="submit"
                        className="bg-[#6b3f26] text-white px-10 py-4 rounded-lg font-semibold hover:bg-[#c63b2f] transition shadow-md"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </section>
              )}

              {/* Manage Address */}
              {activeTab === "Manage Address" && (
                <section>
                  <h3 className="text-3xl font-bold mb-8">Manage Addresses</h3>

                  {/* Saved Addresses */}
                  <div className="space-y-6 mb-12">
                    {[1, 2].map((i) => (
                      <div
                        key={i}
                        className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 bg-[#fffaf3] rounded-2xl border border-[#f2b705]/30 shadow-sm hover:shadow-md transition"
                      >
                        <div>
                          <p className="font-semibold text-lg text-[#3a2416]">Bessie Cooper</p>
                          <p className="text-[#8a6a52] mt-2 leading-relaxed">
                            2464 Royal Ln.<br />
                            Mesa, New Jersey 45463<br />
                            United States
                          </p>
                          <p className="text-[#8a6a52] mt-2">Phone: +0123-456-789</p>
                        </div>
                        <div className="flex gap-6 mt-6 sm:mt-0">
                          <button className="text-[#6b3f26] font-medium hover:underline">Edit</button>
                          <button className="text-red-600 font-medium hover:underline">Delete</button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add New Address */}
                  <div className="border-t pt-10">
                    <h4 className="text-2xl font-bold mb-8">Add New Address</h4>
                    <form onSubmit={handleAddAddress} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-[#3a2416] mb-2">
                          First Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={addressForm.firstName}
                          onChange={handleAddressChange}
                          required
                          placeholder="John"
                          className="w-full px-4 py-3 border border-[#8a6a52] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f2b705]"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#3a2416] mb-2">
                          Last Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={addressForm.lastName}
                          onChange={handleAddressChange}
                          required
                          placeholder="Doe"
                          className="w-full px-4 py-3 border border-[#8a6a52] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f2b705]"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-[#3a2416] mb-2">
                          Company Name <span className="text-gray-500">(Optional)</span>
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={addressForm.company}
                          onChange={handleAddressChange}
                          placeholder="Acme Corp"
                          className="w-full px-4 py-3 border border-[#8a6a52] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f2b705]"
                        />
                      </div>

                      <CustomDropdown
                        label="Country"
                        value={addressForm.country}
                        options={Object.keys(locationData)}
                        onSelect={(val) => setAddressForm({ ...addressForm, country: val, state: "", city: "" })}
                        placeholder="Select Country"
                      />

                      <CustomDropdown
                        label="State"
                        value={addressForm.state}
                        disabled={!addressForm.country}
                        options={addressForm.country ? Object.keys(locationData[addressForm.country] || {}) : []}
                        onSelect={(val) => setAddressForm({ ...addressForm, state: val, city: "" })}
                        placeholder="Select State"
                      />

                      <CustomDropdown
                        label="City"
                        value={addressForm.city}
                        disabled={!addressForm.state}
                        options={addressForm.state ? locationData[addressForm.country]?.[addressForm.state] || [] : []}
                        onSelect={(val) => setAddressForm({ ...addressForm, city: val })}
                        placeholder="Select City"
                      />

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-[#3a2416] mb-2">
                          Street Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="street"
                          value={addressForm.street}
                          onChange={handleAddressChange}
                          required
                          placeholder="123 Main Street"
                          className="w-full px-4 py-3 border border-[#8a6a52] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f2b705]"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#3a2416] mb-2">ZIP Code</label>
                        <input
                          type="text"
                          name="zip"
                          value={addressForm.zip}
                          onChange={handleAddressChange}
                          placeholder="12345"
                          className="w-full px-4 py-3 border border-[#8a6a52] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f2b705]"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#3a2416] mb-2">
                          Phone <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={addressForm.phone}
                          onChange={handleAddressChange}
                          required
                          placeholder="+1 234 567 8900"
                          className="w-full px-4 py-3 border border-[#8a6a52] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f2b705]"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-[#3a2416] mb-2">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={addressForm.email}
                          onChange={handleAddressChange}
                          required
                          placeholder="john@example.com"
                          className="w-full px-4 py-3 border border-[#8a6a52] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f2b705]"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <button
                          type="submit"
                          className="bg-[#6b3f26] text-white px-10 py-4 rounded-lg font-semibold hover:bg-[#c63b2f] transition shadow-md"
                        >
                          Add Address
                        </button>
                      </div>
                    </form>
                  </div>
                </section>
              )}

              {/* Password Manager */}
              {activeTab === "Password Manager" && (
                <section>
                  <h3 className="text-3xl font-bold mb-8">Change Password</h3>
                  <form onSubmit={handleChangePassword} className="max-w-lg space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-[#3a2416] mb-2">
                        Current Password <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="password"
                        name="current"
                        value={passwordData.current}
                        onChange={handlePasswordChange}
                        required
                        className="w-full px-4 py-3 border border-[#8a6a52] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f2b705]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#3a2416] mb-2">
                        New Password <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="password"
                        name="new"
                        value={passwordData.new}
                        onChange={handlePasswordChange}
                        required
                        className="w-full px-4 py-3 border border-[#8a6a52] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f2b705]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#3a2416] mb-2">
                        Confirm New Password <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="password"
                        name="confirm"
                        value={passwordData.confirm}
                        onChange={handlePasswordChange}
                        required
                        className="w-full px-4 py-3 border border-[#8a6a52] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f2b705]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-[#6b3f26] text-white px-10 py-4 rounded-lg font-semibold hover:bg-[#c63b2f] transition shadow-md"
                    >
                      Update Password
                    </button>
                  </form>
                </section>
              )}
            </div>
          </main>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {/* Logout Confirmation Modal with Blur Effect */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          {/* Backdrop Blur Layer */}
          <div className="absolute inset-0 backdrop-blur-md" />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full p-8 text-center"
          >
            <div className="mb-6">
              <div className="w-20 h-20 mx-auto bg-red-100 rounded-full flex items-center justify-center">
                <LogOut size={36} className="text-red-600" />
              </div>
            </div>

            <h3 className="text-2xl font-bold text-[#3a2416] mb-3">Logout</h3>
            <p className="text-[#8a6a52] mb-8">Are you sure you want to log out?</p>

            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-8 py-3 bg-gray-200 text-[#3a2416] rounded-lg font-medium hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-8 py-3 bg-[#6b3f26] text-white rounded-lg font-medium hover:bg-[#c63b2f] transition shadow-md"
              >
                Yes, Logout
              </button>
            </div>
          </motion.div>
        </div>
      )}
      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Slide}
        toastStyle={{
          background: "#fffaf3",
          color: "#3a2416",
          fontWeight: 600,
          borderRadius: "12px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
          padding: "16px 24px",
        }}
      />

      {/* Features Section */}
      <Features />
    </div>
  );
};

export default MyAccount;