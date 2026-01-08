import React, { useEffect, useState } from "react";
import {
  HomeIcon,
  UsersIcon,
  ShoppingBagIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  ChevronDownIcon,
  CubeIcon,
  MegaphoneIcon,
  DocumentTextIcon,
  InboxIcon,
  TruckIcon,
  BanknotesIcon,
} from "@heroicons/react/24/outline";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

/* ---------------- MENU CONFIG ---------------- */
const sidebarLinks = [
  { name: "Dashboard", icon: HomeIcon, path: "/dashboard" },
  {
    name: "Products",
    icon: CubeIcon,
    path: "/products",
    submenu: [
      { name: "All Products", path: "/products/all" },
      { name: "Add Product", path: "/products/add" },
      { name: "Categories", path: "/products/categories" },
      { name: "Brands", path: "/products/brands" },
      { name: "Attributes", path: "/products/attributes" },
    ],
  },
  {
    name: "Orders",
    icon: ShoppingBagIcon,
    path: "/orders",
    submenu: [
      { name: "All Orders", path: "/orders" },
      { name: "Pending", path: "/orders/pending" },
      { name: "Processing", path: "/orders/processing" },
      { name: "Shipped", path: "/orders/shipped" },
      { name: "Completed", path: "/orders/completed" },
      { name: "Cancelled", path: "/orders/cancelled" },
    ],
  },
  {
    name: "Customers",
    icon: UsersIcon,
    path: "/customers",
    submenu: [
      { name: "All Customers", path: "/customers" },
      { name: "Add Customer", path: "/customers/add" },
      { name: "Customer Groups", path: "/customers/groups" },
    ],
  },
  {
    name: "Marketing",
    icon: MegaphoneIcon,
    path: "/marketing",
    submenu: [
      { name: "Coupons", path: "/marketing/coupons" },
      { name: "Discounts", path: "/marketing/discounts" },
      { name: "Banners", path: "/marketing/banners" },
      { name: "Email Campaigns", path: "/marketing/email" },
    ],
  },
  {
    name: "Content",
    icon: DocumentTextIcon,
    path: "/content",
    submenu: [
      { name: "Pages", path: "/content/pages" },
      { name: "Blog Posts", path: "/content/blogs" },
      { name: "Reviews", path: "/content/reviews" },
      { name: "FAQs", path: "/content/faqs" },
    ],
  },
  {
    name: "Inventory",
    icon: InboxIcon,
    path: "/inventory",
    submenu: [
      { name: "Stock Overview", path: "/inventory/stock" },
      { name: "Suppliers", path: "/inventory/suppliers" },
      { name: "Purchase Orders", path: "/inventory/purchase-orders" },
    ],
  },
  {
    name: "Shipping",
    icon: TruckIcon,
    path: "/shipping",
    submenu: [
      { name: "Shipping Methods", path: "/shipping/methods" },
      { name: "Zones & Rates", path: "/shipping/zones" },
      { name: "Tracking", path: "/shipping/tracking" },
    ],
  },
  {
    name: "Analytics",
    icon: ChartBarIcon,
    path: "/analytics",
    submenu: [
      { name: "Reports", path: "/analytics/reports" },
      { name: "Sales Analytics", path: "/analytics/sales" },
      { name: "Traffic Sources", path: "/analytics/traffic" },
    ],
  },
  {
    name: "Finance",
    icon: BanknotesIcon,
    path: "/finance",
    submenu: [
      { name: "Transactions", path: "/finance/transactions" },
      { name: "Payouts", path: "/finance/payouts" },
      { name: "Refunds", path: "/finance/refunds" },
      { name: "Taxes", path: "/finance/taxes" },
    ],
  },
  {
    name: "Settings",
    icon: Cog6ToothIcon,
    path: "/settings",
    submenu: [
      { name: "General", path: "/settings/general" },
      { name: "Store Profile", path: "/settings/store" },
      { name: "Payment Gateways", path: "/settings/payments" },
      { name: "Security", path: "/settings/security" },
      { name: "SEO", path: "/settings/seo" },
    ],
  },
  { name: "Logout", icon: ArrowRightOnRectangleIcon, path: "/logout", isLogout: true },
];

/* ---------------- COMPONENT ---------------- */
export default function AdminSidebar({ isSidebarOpen, setIsSidebarOpen }) {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState({});

  // Auto-open submenu based on current path
  useEffect(() => {
    const newOpenMenus = {};
    sidebarLinks.forEach((link) => {
      if (link.submenu?.some((sub) => sub.path === location.pathname)) {
        newOpenMenus[link.name] = true;
      }
    });
    setOpenMenus(newOpenMenus);
  }, [location.pathname]);

  const toggleMenu = (name) => {
    setOpenMenus((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleMobileClose = () => {
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isSidebarOpen && window.innerWidth < 1024 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: isSidebarOpen ? 0 : -256 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="
          fixed inset-y-0 left-0 z-60
          w-56 md:w-60 lg:w-64 xl:w-64
          bg-[var(--bg-main)] border-r border-[var(--secondary)]/10
          flex flex-col
          lg:fixed lg:inset-y-0 lg:z-auto lg:translate-x-0
        "
      >
        {/* LOGO */}
        <div className="px-4 lg:px-6 py-4 border-b border-[var(--secondary)]/10">
          <div className="flex items-center gap-2">
            <img
              src="/Logo_Marvel.png"
              alt="Logo"
              className="
                w-16 h-16           
                xl:w-25 xl:h-25   
                object-cover
                -mt-2 -mb-2
                xl:-mt-4 xl:-mb-4 xl:-ml-2
              "
            />
            <div className="leading-tight">
              <h1 className="font-semibold text-[var(--text-main)] text-[17px] lg:text-[15px] xl:text-[17px] whitespace-nowrap">
                Marvel Crunch
              </h1>
              <p className="text-[14px] xl:block text-[var(--text-muted)] tracking-wide">
                Admin Panel
              </p>
            </div>
          </div>
        </div>

        {/* MENU */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto scrollbar-hide">
          <LayoutGroup>
            <ul className="space-y-1">
              {sidebarLinks.map((link) => {
                const Icon = link.icon;
                const isActive =
                  location.pathname === link.path ||
                  link.submenu?.some((s) => s.path === location.pathname) ||
                  (link.path === "/dashboard" && location.pathname === "/");

                const isOpen = openMenus[link.name];

                // Common styles for both button and Link
                const itemClasses = `relative flex items-center w-full px-4 py-2.5 rounded-xl transition-all
                  ${isActive ? "text-[var(--primary)]" : "text-[var(--text-main)] hover:bg-[var(--bg-soft)]"}
                  ${link.isLogout ? "text-red-600 hover:bg-red-50" : ""}
                `;

                return (
                  <li key={link.name} className={link.isLogout ? "mt-8" : ""}>
                    <div>
                      {/* MAIN ITEM - Conditional rendering */}
                      {link.submenu ? (
                        // Has submenu → Button to toggle
                        <button
                          onClick={() => toggleMenu(link.name)}
                          className={`${itemClasses} justify-between`}
                        >
                          {isActive && (
                            <motion.div
                              layoutId="sidebar-active"
                              className="absolute inset-0 rounded-xl bg-[var(--primary)]/10 shadow-[0_0_0_1px_var(--primary)]/20"
                            />
                          )}

                          <div className="flex items-center gap-3 relative z-10">
                            <div
                              className={`w-9 h-9 rounded-lg flex items-center justify-center
                                ${isActive ? "bg-[var(--primary)]/15" : "bg-[var(--bg-soft)]"}
                              `}
                            >
                              <Icon className="w-5 h-5" />
                            </div>
                            <span className="text-sm font-medium">{link.name}</span>
                          </div>

                          <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="relative z-10"
                          >
                            <ChevronDownIcon className="w-4 h-4" />
                          </motion.div>
                        </button>
                      ) : (
                        // No submenu → Link to navigate
                        <Link
                          to={link.path}
                          onClick={handleMobileClose}
                          className={itemClasses}
                        >
                          {isActive && (
                            <motion.div
                              layoutId="sidebar-active"
                              className="absolute inset-0 rounded-xl bg-[var(--primary)]/10 shadow-[0_0_0_1px_var(--primary)]/20"
                            />
                          )}

                          <div className="flex items-center gap-3 relative z-10">
                            <div
                              className={`w-9 h-9 rounded-lg flex items-center justify-center
                                ${isActive ? "bg-[var(--primary)]/15" : "bg-[var(--bg-soft)]"}
                              `}
                            >
                              <Icon className="w-5 h-5" />
                            </div>
                            <span className="text-sm font-medium">{link.name}</span>
                          </div>
                        </Link>
                      )}

                      {/* SUBMENU */}
                      <AnimatePresence>
                        {link.submenu && isOpen && (
                          <motion.ul
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="ml-8 mt-2 space-y-1 border-l border-[var(--secondary)]/20 pl-4 overflow-hidden"
                          >
                            {link.submenu.map((sub) => (
                              <li key={sub.name}>
                                <Link
                                  to={sub.path}
                                  onClick={handleMobileClose}
                                  className={`block px-3 py-2 rounded-lg text-sm transition
                                    ${location.pathname === sub.path
                                      ? "bg-[var(--primary)]/15 text-[var(--primary)] font-medium"
                                      : "text-[var(--text-muted)] hover:bg-[var(--bg-soft)] hover:text-[var(--text-main)]"
                                    }`}
                                >
                                  {sub.name}
                                </Link>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>
                  </li>
                );
              })}
            </ul>
          </LayoutGroup>
        </nav>

        {/* FOOTER */}
        <div className="px-6 py-4 border-t border-[var(--secondary)]/10">
          <p className="text-[11px] text-center text-[var(--text-muted)] tracking-wide">
            © 2026 Marvel Crunch Admin
          </p>
        </div>
      </motion.aside>
    </>
  );
}