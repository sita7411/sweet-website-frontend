// MyAccount.jsx
import React, { useState } from "react";
import {
  UserCog,
  MapPin,
  Lock,
  LogOut,
} from "lucide-react";
import Features from "../components/Features/Features";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MyAccount = () => {
  const [activeTab, setActiveTab] = useState("Manage Address");

  const [formData, setFormData] = useState({
    firstName: "Bessie",
    lastName: "Cooper",
    email: "example@gmail.com",
    phone: "+0123-456-789",
    gender: "Female",
  });

  const [address, setAddress] = useState({
    line1: "123 Street Name",
    line2: "",
    city: "City",
    state: "State",
    zip: "123456",
    country: "Country",
  });

  const [passwordData, setPasswordData] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAddressChange = (e) =>
    setAddress({ ...address, [e.target.name]: e.target.value });

  const handlePasswordChange = (e) =>
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    alert("Profile Updated Successfully!");
  };

  const handleUpdateAddress = (e) => {
    e.preventDefault();
    alert("Address Updated Successfully!");
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (passwordData.new !== passwordData.confirm) {
      alert("Passwords do not match!");
      return;
    }
    alert("Password Updated Successfully!");
  };

  const menuItems = [
    { title: "Personal Information", icon: <UserCog /> },
    { title: "Manage Address", icon: <MapPin /> },
    { title: "Password Manager", icon: <Lock /> },
    { title: "Logout", icon: <LogOut /> },
  ];

  return (
    <div className="min-h-screen  text-[#3a2416]">

      {/* HERO Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <img src="/login.png" alt="Hero" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[var(--secondary)]/30"></div>
        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white"
          >
            My Account
          </motion.h1>
          <p className="mt-4 text-white text-sm sm:text-base">
            <Link
              to="/"
              className="hover:text-[var(--secondary)] hover:underline hover:font-bold transition-all duration-200"
            >
              Home
            </Link>{" "}
            \\ <span className="font-semibold">My Account</span>
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col lg:flex-row gap-8">

        {/* Sidebar / Left */}
        <aside className="w-full lg:w-64 flex-shrink-0 bg-white shadow rounded-lg p-6 self-start">
          <ul className="flex flex-col gap-3">
            {menuItems.map((item) => (
              <li
                key={item.title}
                onClick={() => {
                  if (item.title === "Logout") {
                    alert("You are logged out!");
                  } else {
                    setActiveTab(item.title);
                  }
                }}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 cursor-pointer
                  ${
                    activeTab === item.title
                      ? "bg-[#f2b705] text-white font-semibold shadow-lg"
                      : "text-[#3a2416] hover:bg-[#f2b705]/20 hover:text-[#3a2416]"
                  }`}
              >
                <span className="text-[#8a6a52]">
                  {React.cloneElement(item.icon, { size: 20 })}
                </span>
                <span className="text-sm md:text-base">{item.title}</span>
              </li>
            ))}
          </ul>
        </aside>

        {/* Content Area / Right */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow border-l border-gray-200">

          {/* Personal Information Tab */}
          {activeTab === "Personal Information" && (
            <div>
              <h3 className="text-2xl font-semibold mb-4">Personal Information</h3>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleUpdateProfile}>
                <div className="md:col-span-2 flex items-center gap-6 mb-4">
                  <div className="relative">
                    <img
                      src="/images/profile.jpg"
                      alt="Profile"
                      className="w-32 h-32 rounded-full object-cover border-4 border-[#8a6a52]"
                    />
                    <button
                      type="button"
                      className="absolute bottom-0 right-0 bg-[#6b3f26] text-white p-3 rounded-full border-2 border-white hover:bg-[#c63b2f] transition"
                      title="Edit Profile Picture"
                    >
                      <UserCog size={18} />
                    </button>
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-[#3a2416]">{formData.firstName} {formData.lastName}</p>
                    <p className="text-[#8a6a52]">{formData.email}</p>
                  </div>
                </div>

                {["firstName", "lastName", "email", "phone"].map((field) => (
                  <div key={field}>
                    <label className="block mb-1 font-medium text-[#3a2416]">
                      {field.charAt(0).toUpperCase() + field.slice(1)} *
                    </label>
                    <input
                      type={field === "email" ? "email" : "text"}
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      className="w-full border border-[#8a6a52] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#f2b705]"
                    />
                  </div>
                ))}

                <div>
                  <label className="block mb-1 font-medium text-[#3a2416]">Gender *</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full border border-[#8a6a52] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#f2b705]"
                  >
                    <option>Female</option>
                    <option>Male</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="bg-[#6b3f26] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#c63b2f] transition"
                  >
                    Update Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Manage Address Tab */}
          {activeTab === "Manage Address" && (
            <div>
              <h3 className="text-2xl font-semibold mb-4">Manage Address</h3>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleUpdateAddress}>
                {["line1", "line2", "city", "state", "zip", "country"].map((field) => (
                  <div key={field}>
                    <label className="block mb-1 font-medium text-[#3a2416]">
                      {field === "line1"
                        ? "Address Line 1 *"
                        : field === "line2"
                          ? "Address Line 2"
                          : field.charAt(0).toUpperCase() + field.slice(1) + " *"}
                    </label>
                    <input
                      type="text"
                      name={field}
                      value={address[field]}
                      onChange={handleAddressChange}
                      placeholder={field === "line2" ? "Optional" : ""}
                      className="w-full border border-[#8a6a52] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#f2b705]"
                    />
                  </div>
                ))}
                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="bg-[#6b3f26] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#c63b2f] transition"
                  >
                    Update Address
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Password Manager Tab */}
          {activeTab === "Password Manager" && (
            <div>
              <h3 className="text-2xl font-semibold mb-4">Change Password</h3>
              <form className="max-w-lg grid gap-4" onSubmit={handleChangePassword}>
                {["current", "new", "confirm"].map((field) => (
                  <div key={field}>
                    <label className="block mb-1 font-medium text-[#3a2416]">
                      {field === "current"
                        ? "Current Password *"
                        : field === "new"
                          ? "New Password *"
                          : "Confirm New Password *"}
                    </label>
                    <input
                      type="password"
                      name={field}
                      value={passwordData[field]}
                      onChange={handlePasswordChange}
                      className="w-full border border-[#8a6a52] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#f2b705]"
                    />
                  </div>
                ))}
                <div>
                  <button
                    type="submit"
                    className="bg-[#6b3f26] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#c63b2f] transition"
                  >
                    Change Password
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>
      </div>

      {/* Features Section */}
      <Features />
    </div>
  );
};

export default MyAccount;
