// AdminSidebar.jsx
import React, { useState } from "react";
import {
  HomeIcon,
  UsersIcon,
  ShoppingBagIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

const sidebarLinks = [
  { name: "Dashboard", icon: HomeIcon },
  {
    name: "Users",
    icon: UsersIcon,
    submenu: ["All Users", "Add User", "Roles"],
  },
  {
    name: "Orders",
    icon: ShoppingBagIcon,
    submenu: ["All Orders", "Pending", "Completed"],
  },
  { name: "Analytics", icon: ChartBarIcon },
  {
    name: "Settings",
    icon: Cog6ToothIcon,
    submenu: ["Profile", "Preferences", "Security"],
  },
  { name: "Logout", icon: ArrowRightOnRectangleIcon },
];

export default function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState("Dashboard");
  const [dropdowns, setDropdowns] = useState({});

  const toggleDropdown = (name) => {
    setDropdowns((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <aside
      className={`h-screen bg-[var(--bg-main)] text-[var(--text-main)] shadow-2xl flex flex-col transition-all duration-500 ${
        collapsed ? "w-20" : "w-72"
      }`}
    >
      {/* Logo + Toggle */}
      <div
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center gap-4 px-6 py-6 border-b border-[var(--secondary)] cursor-pointer hover:bg-[var(--bg-soft)] transition-all duration-300"
      >
        <motion.div
          animate={{ scale: collapsed ? 0.8 : 1 }}
          className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[var(--primary)] to-[var(--accent)] flex items-center justify-center shadow-lg"
        >
          <img src="/Logo_Marvel.png" className="w-9 h-9 object-contain" />
        </motion.div>

        {!collapsed && (
          <div>
            <h1 className="text-lg font-bold text-[var(--primary)]">
              Sweet Admin
            </h1>
            <p className="text-xs text-[var(--text-muted)] tracking-wide">
              Control Panel
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-6 flex flex-col gap-1 px-3">
        {sidebarLinks.map((link) => {
          const Icon = link.icon;
          const isActive = active === link.name;
          const hasDropdown = link.submenu;
          const open = dropdowns[link.name];

          return (
            <div key={link.name} className="relative group">
              {/* Main Item */}
              <div
                onClick={() => {
                  setActive(link.name);
                  if (hasDropdown) toggleDropdown(link.name);
                }}
                className={`flex items-center justify-between px-5 py-3 rounded-xl cursor-pointer transition-all duration-300 relative ${
                  isActive
                    ? "bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white shadow-md"
                    : "hover:bg-[var(--bg-soft)]"
                }`}
              >
                {/* Active indicator */}
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 rounded-full bg-white transition-all"></span>
                )}

                <div className="flex items-center gap-4">
                  <div
                    className={`p-2 rounded-lg transition-all duration-300 ${
                      isActive ? "bg-white/20" : "bg-[var(--bg-soft)]"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  {!collapsed && (
                    <span className="font-medium tracking-wide">{link.name}</span>
                  )}
                </div>

                {!collapsed && hasDropdown && (
                  <ChevronDownIcon
                    className={`w-4 h-4 transition-transform ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                )}
              </div>

              {/* Submenu */}
              {hasDropdown && !collapsed && (
                <AnimatePresence>
                  {open && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="ml-12 mt-2 flex flex-col gap-1 overflow-hidden"
                    >
                      {link.submenu.map((sub) => (
                        <div
                          key={sub}
                          onClick={() => setActive(sub)}
                          className={`px-4 py-2 rounded-lg text-sm cursor-pointer transition-all duration-300 ${
                            active === sub
                              ? "bg-[var(--bg-soft)] text-[var(--primary)] font-medium"
                              : "text-[var(--text-muted)] hover:text-[var(--primary)] hover:bg-[var(--bg-soft)]"
                          }`}
                        >
                          {sub}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}

              {/* Tooltip for collapsed */}
              {collapsed && (
                <span className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1 text-sm rounded-lg bg-white text-[var(--primary)] shadow-md opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap z-50">
                  {link.name}
                </span>
              )}
            </div>
          );
        })}
      </nav>

   
    </aside>
  );
}
