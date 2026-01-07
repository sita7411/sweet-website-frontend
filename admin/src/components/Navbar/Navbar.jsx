import React, { useState } from "react";
import {
  BellIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  ChevronDownIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminNavbar({ isSidebarOpen, setIsSidebarOpen }) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const notifications = [
    { id: 1, text: "New order placed (#2451)", time: "2m", unread: true },
    { id: 2, text: "Stock low: Chocolate Chikki", time: "12m", unread: true },
    { id: 3, text: "Payment settled successfully", time: "1h", unread: false },
  ];

  const unread = notifications.filter((n) => n.unread).length;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-20 transition-all ${
        isSidebarOpen ? "lg:left-64" : "lg:left-0"
      }`}
    >
      <div className="h-20  bg-[#fffaf3] backdrop-blur-xl border border-[var(--secondary)]/10 shadow-lg px-4 flex items-center justify-between">

        {/* LEFT: Hamburger + Search */}
        <div className="flex items-center gap-4">
          {/* Hamburger */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-[var(--bg-soft)] hover:bg-[var(--primary)]/15 transition"
          >
            <Bars3Icon className="w-5 h-5" />
          </button>

          {/* Search */}
          <div className="hidden md:flex items-center gap-3 px-4 py-2 rounded-xl bg-[var(--bg-soft)] border border-[var(--secondary)]/10">
            <MagnifyingGlassIcon className="w-4 h-4 text-[var(--text-muted)]" />
            <input
              placeholder="Search dashboard..."
              className="bg-transparent text-sm outline-none w-64 text-[var(--text-main)]"
            />
            <span className="text-[10px] px-2 py-0.5 rounded-md bg-[var(--accent)]/20 text-[var(--secondary)]">
              ⌘K
            </span>
          </div>
        </div>

        {/* RIGHT: Notifications & Profile */}
        <div className="flex items-center gap-4">

          {/* NOTIFICATIONS */}
          <div className="relative">
            <button
              onClick={() => {
                setNotifOpen(!notifOpen);
                setProfileOpen(false);
              }}
              className="relative p-3 rounded-xl bg-[var(--bg-soft)] hover:bg-[var(--primary)]/15 transition shadow-sm"
            >
              <BellIcon className="w-5 h-5" />
              {unread > 0 && (
                <>
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[var(--primary)] text-white text-[11px] font-semibold flex items-center justify-center">
                    {unread}
                  </span>
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[var(--primary)] animate-ping opacity-30"></span>
                </>
              )}
            </button>

            {/* Notification Dropdown */}
            <AnimatePresence>
              {notifOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-80 rounded-2xl bg-[var(--bg-card)] border border-[var(--secondary)]/10 shadow-xl overflow-hidden z-50"
                >
                  <div className="px-5 py-4 flex items-center justify-between border-b border-[var(--secondary)]/10">
                    <p className="font-semibold">Alerts</p>
                    <span className="text-xs px-2 py-1 rounded-full bg-[var(--accent)]/20 text-[var(--secondary)]">
                      {unread} New
                    </span>
                  </div>

                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`px-5 py-3 hover:bg-[var(--bg-soft)] transition ${
                        n.unread ? "bg-[var(--primary)]/10" : ""
                      }`}
                    >
                      <p className="text-sm font-medium">{n.text}</p>
                      <p className="text-xs text-[var(--text-muted)] mt-0.5">
                        {n.time} ago
                      </p>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* PROFILE */}
          <div className="relative">
            <button
              onClick={() => {
                setProfileOpen(!profileOpen);
                setNotifOpen(false);
              }}
              className="flex items-center gap-3 px-3 py-2 rounded-xl bg-[var(--bg-soft)] hover:bg-[var(--primary)]/15 transition shadow-sm"
            >
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center text-white font-bold">
                JD
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-semibold leading-4">John Doe</p>
                <p className="text-xs text-[var(--text-muted)]">Admin</p>
              </div>
              <ChevronDownIcon className="w-4 h-4 text-[var(--text-muted)]" />
            </button>

            {/* Profile Dropdown */}
            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-72 rounded-2xl bg-[var(--bg-card)] border border-[var(--secondary)]/10 shadow-xl overflow-hidden z-50"
                >
                  <div className="p-5 bg-gradient-to-br from-[var(--primary)]/15 to-[var(--accent)]/20">
                    <p className="font-semibold">John Doe</p>
                    <p className="text-sm text-[var(--text-muted)]">
                      admin@marvelcrunch.com
                    </p>
                  </div>

                  <ul className="py-2">
                    <li className="px-5 py-3 hover:bg-[var(--bg-soft)] flex items-center gap-3 cursor-pointer">
                      <UserIcon className="w-4 h-4" /> My Profile
                    </li>
                    <li className="px-5 py-3 hover:bg-[var(--bg-soft)] flex items-center gap-3 cursor-pointer">
                      <Cog6ToothIcon className="w-4 h-4" /> Settings
                    </li>
                    <li className="mt-2 border-t border-[var(--secondary)]/10 px-5 py-3 text-red-600 hover:bg-red-50 flex items-center gap-3 cursor-pointer">
                      <ArrowRightOnRectangleIcon className="w-4 h-4" /> Logout
                    </li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}
