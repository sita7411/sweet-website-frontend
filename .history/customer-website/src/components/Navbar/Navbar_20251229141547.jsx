import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  ShoppingCart,
  User,
  ChevronDown,
  LogOut,
  Search,
  Menu,
  X,
} from "lucide-react";
import "./Navbar.css";

export default function Navbar() {
  const isLoggedIn = false;
  const user = { name: "Ajay" };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);

  const productCategories = [
    "Chikki Collection",
    "Organic Range",
    "Sugar Free",
    "Gifting Boxes",
    "Combos",
    "Bestsellers",
  ];

  /* ---------- SCROLL SHADOW ---------- */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ---------- CLICK OUTSIDE ---------- */
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all ${
        scrolled ? "backdrop-blur bg-white/90 shadow-md" : "bg-[var(--bg-main)]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 h-[84px] flex items-center justify-between">

        {/* LOGO */}
        <a href="/" className="flex items-center">
          <img src="/Logo_Marvel.png" alt="Marvel Crunch" className="w-20" />
        </a>

        {/* SEARCH */}
        <div className="hidden lg:flex flex-1 max-w-xl mx-10">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
            <input
              placeholder="Search chikki, peanuts, gifts..."
              className="w-full pl-11 pr-5 py-3 rounded-full bg-[var(--bg-soft)] focus:ring-2 focus:ring-[var(--primary)] outline-none"
            />
          </div>
        </div>

        {/* DESKTOP LINKS */}
        <nav className="hidden lg:flex gap-8 text-sm font-semibold uppercase">
          <NavLink href="/">Home</NavLink>

          {/* PRODUCTS */}
          <div className="relative group">
            <button className="flex items-center gap-1">
              Products <ChevronDown size={14} />
            </button>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileHover={{ opacity: 1, y: 0 }}
              className="absolute top-full mt-4 w-60 rounded-xl bg-white shadow-xl border p-2 invisible group-hover:visible"
            >
              {productCategories.map((item) => (
                <DropdownItem key={item} title={item} />
              ))}
            </motion.div>
          </div>

          <NavLink href="/collections">Collections</NavLink>
          <NavLink href="/offers">Offers</NavLink>
          <NavLink href="/about">Our Story</NavLink>
          <NavLink href="/contact">Contact</NavLink>
        </nav>

        {/* ACTIONS */}
        <div className="flex items-center ml-8 gap-3">
          <IconBtn className="lg:hidden"><Search size={20} /></IconBtn>
          <IconBtn><Heart size={20} /></IconBtn>

          <IconBtn className="relative">
            <ShoppingCart size={20} />
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[var(--primary)] text-white text-xs flex items-center justify-center"
            >
              3
            </motion.span>
          </IconBtn>

          {/* USER */}
          {isLoggedIn && (
            <div className="relative hidden sm:block group">
              <button className="flex items-center gap-2">
                <User size={20} />
                {user.name}
                <ChevronDown size={14} />
              </button>

              <div className="absolute right-0 mt-4 w-52 bg-white rounded-xl shadow-xl border invisible group-hover:visible">
                <AccountItem label="My Orders" />
                <AccountItem label="Profile" />
                <div className="border-t my-2" />
                <AccountItem label="Logout" danger />
              </div>
            </div>
          )}

          {/* MOBILE */}
          <button className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            ref={menuRef}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-white shadow-md"
          >
            <div className="px-6 py-6 space-y-4">
              <NavLink href="/" mobile>Home</NavLink>
              <p className="text-sm font-semibold">Products</p>
              {productCategories.map((item) => (
                <DropdownItem key={item} title={item} mobile />
              ))}
              <NavLink href="/collections" mobile>Collections</NavLink>
              <NavLink href="/offers" mobile>Offers</NavLink>
              <NavLink href="/about" mobile>Our Story</NavLink>
              <NavLink href="/contact" mobile>Contact</NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* SMALL COMPONENTS */

const NavLink = ({ href, children, mobile }) => (
  <a
    href={href}
    className={`block ${
      mobile
        ? "py-2 text-base"
        : "relative after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-[var(--primary)] hover:after:w-full after:transition-all"
    }`}
  >
    {children}
  </a>
);

const IconBtn = ({ children, className = "" }) => (
  <div className={`p-2.5 rounded-full bg-[var(--bg-soft)] hover:bg-[var(--primary)] hover:text-white transition ${className}`}>
    {children}
  </div>
);

const DropdownItem = ({ title, mobile }) => (
  <a
    href={`/products/${title.toLowerCase().replace(/\s+/g, "-")}`}
    className={`block px-4 py-2 rounded-lg hover:bg-[var(--bg-soft)] ${
      mobile && "text-sm"
    }`}
  >
    {title}
  </a>
);

const AccountItem = ({ label, danger }) => (
  <button
    className={`block w-full text-left px-5 py-2 hover:bg-[var(--bg-soft)] ${
      danger && "text-[var(--primary)]"
    }`}
  >
    {label}
  </button>
);
