'use client';

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  Heart,
  ShoppingCart,
  User,
  ChevronDown,
  LogOut,
  Search,
  Menu,
  X,
  Truck,
  ShieldCheck,
  Clock,
} from "lucide-react";
import "./Navbar.css";

export default function Navbar() {
  const isLoggedIn = true;
  const user = { name: "Ajay" };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const menuRef = useRef(null);
  const navigate = useNavigate();

  /* ---------------- CART DATA ---------------- */
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "Cookies Almond Biscuti 350g",
      size: "350g",
      price: 190.48,
      quantity: 1,
      img: "/images/biscuti.png",
    },
    {
      id: 2,
      title: "Pista Chocolate Chikki",
      size: "250g",
      price: 250.48,
      quantity: 1,
      img: "/images/pista.png",
    },
  ]);

  const cartSubtotal = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  const updateQuantity = (id, change) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  /* ---------------- EFFECTS ---------------- */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = cartOpen ? "hidden" : "auto";
  }, [cartOpen]);

  useEffect(() => {
    if (mobileMenuOpen) setMobileSearchOpen(false);
  }, [mobileMenuOpen]);

  /* ---------------- JSX ---------------- */
  return (
    <header
      className={`sticky top-0 z-50 transition-all ${
        scrolled
          ? "backdrop-blur bg-[var(--bg-main)]/90 shadow-md"
          : "bg-[var(--bg-main)]"
      }`}
    >
      {/* TOP BAR */}
      <div className="max-w-7xl mx-auto px-4 h-[90px] flex items-center justify-between">

        {/* LOGO */}
        <a href="/" className="flex items-center">
          <img
            src="/Logo_Marvel.png"
            alt="Marvel Crunch"
            className="w-24 shrink-0"
          />
        </a>

        {/* DESKTOP SEARCH */}
        <div className="hidden lg:flex flex-1 max-w-xl mx-10">
          <div className="relative w-full">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
            />
            <input
              placeholder="Search chikki, peanuts, gifts..."
              className="w-full pl-11 pr-5 py-3 rounded-full bg-[var(--bg-soft)]
              focus:ring-2 focus:ring-[var(--primary)] outline-none"
            />
          </div>
        </div>

        {/* DESKTOP NAV */}
        <nav className="hidden lg:flex gap-8 text-sm font-semibold uppercase">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/products">Products</NavLink>
          <NavLink href="/offers">Offers</NavLink>
          <NavLink href="/about">Our Story</NavLink>
          <NavLink href="/contact">Contact</NavLink>
        </nav>

        {/* ACTIONS */}
        <div className="flex items-center gap-3">

          {/* MOBILE SEARCH ICON */}
          <IconBtn
            className="lg:hidden"
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
          >
            <Search size={20} />
          </IconBtn>

          {/* WISHLIST */}
          <Link to="/wishlist">
            <IconBtn className="relative">
              <Heart size={20} />
              <span className="absolute -top-2 -right-1 w-5 h-5 rounded-full
              bg-[var(--primary)] text-white text-xs flex items-center justify-center">
                2
              </span>
            </IconBtn>
          </Link>

          {/* CART */}
          <IconBtn onClick={() => setCartOpen(true)} className="relative">
            <ShoppingCart size={20} />
            <span className="absolute -top-2 -right-1 w-5 h-5 rounded-full
            bg-[var(--primary)] text-white text-xs flex items-center justify-center">
              {cartItems.length}
            </span>
          </IconBtn>

          {/* MOBILE MENU */}
          <button
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* 🔥 AMAZON STYLE MOBILE SEARCH (ONLY MOBILE) */}
      <AnimatePresence>
        {mobileSearchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-[#232f3e]"
          >
            <div className="px-3 py-3">
              <div className="flex items-center bg-white rounded-lg overflow-hidden">
                <input
                  type="text"
                  placeholder="Search Amazon.in"
                  className="flex-1 px-4 py-3 text-sm outline-none"
                />
                <button className="px-4 py-3 bg-[#febd69]">
                  <Search size={20} className="text-black" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            ref={menuRef}
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="lg:hidden bg-[var(--bg-card)] shadow-md"
          >
            <div className="px-6 py-6 space-y-4">
              <NavLink href="/" mobile>Home</NavLink>
              <NavLink href="/products" mobile>Products</NavLink>
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

/* ---------------- SMALL COMPONENTS ---------------- */
const NavLink = ({ href, children, mobile }) => (
  <a
    href={href}
    className={`block ${
      mobile
        ? "py-2 text-base text-[var(--text-main)]"
        : "relative text-[var(--text-main)] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-[var(--primary)] hover:after:w-full after:transition-all"
    }`}
  >
    {children}
  </a>
);

const IconBtn = ({ children, className = "", onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`p-2.5 rounded-full bg-[var(--bg-soft)]
    hover:bg-[var(--primary)] transition ${className}`}
  >
    <div className="group-hover:text-white">{children}</div>
  </button>
);
