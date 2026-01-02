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

  /* ---------------- CART ITEMS ---------------- */
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
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  /* ---------------- EFFECTS ---------------- */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = cartOpen ? "hidden" : "auto";
  }, [cartOpen]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all ${
        scrolled
          ? "backdrop-blur bg-[var(--bg-main)]/90 shadow-md"
          : "bg-[var(--bg-main)]"
      }`}
    >
      {/* ================= MAIN BAR ================= */}
      <div className="max-w-7xl mx-auto px-4 h-[90px] flex items-center justify-between">
        {/* LOGO */}
        <Link to="/" className="flex items-center">
          <img src="/Logo_Marvel.png" alt="Marvel Crunch" className="w-24" />
        </Link>

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

        {/* DESKTOP LINKS */}
        <nav className="hidden lg:flex gap-8 text-sm font-semibold uppercase">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/offers">Offers</NavLink>
          <NavLink to="/about">Our Story</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>

        {/* ACTIONS */}
        <div className="flex items-center gap-3 ml-6">
          {/* MOBILE SEARCH */}
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
              <Badge count={2} />
            </IconBtn>
          </Link>

          {/* CART */}
          <IconBtn className="relative" onClick={() => setCartOpen(true)}>
            <ShoppingCart size={20} />
            <Badge count={cartItems.length} />
          </IconBtn>

          {/* USER */}
          {isLoggedIn && (
            <div className="relative hidden sm:block group">
              <button className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-[var(--bg-soft)]">
                <User size={20} className="text-[var(--primary)]" />
                <span className="text-sm font-medium">{user.name}</span>
                <ChevronDown size={14} />
              </button>

              <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-lg opacity-0 invisible group-hover:visible group-hover:opacity-100 transition">
                <Link to="/orders"><AccountItem label="My Orders" /></Link>
                <Link to="/profile"><AccountItem label="Profile" /></Link>
                <div className="border-t my-1" />
                <button className="flex items-center gap-2 px-5 py-2 text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white w-full">
                  <LogOut size={16} /> Logout
                </button>
              </div>
            </div>
          )}

          {/* MOBILE MENU */}
          <button
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* ================= MOBILE SEARCH BAR ================= */}
      <AnimatePresence>
        {mobileSearchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden px-4 pb-4"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2" size={18} />
              <input
                autoFocus
                placeholder="Search products..."
                className="w-full pl-11 pr-10 py-3 rounded-full bg-[var(--bg-soft)]"
              />
              <button
                onClick={() => setMobileSearchOpen(false)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <X size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= CART DRAWER ================= */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.45 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="fixed inset-0 bg-black z-40"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              className="fixed right-0 top-0 h-full w-full sm:w-[400px] bg-white z-[9999] flex flex-col"
            >
              <div className="flex justify-between px-5 py-4 border-b">
                <h2>Your Cart ({cartItems.length})</h2>
                <X onClick={() => setCartOpen(false)} />
              </div>

              <div className="flex-1 overflow-y-auto px-5 py-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 border-b pb-4 mb-4">
                    <img src={item.img} className="w-20 h-20 object-contain" />
                    <div className="flex-1">
                      <h4>{item.title}</h4>
                      <p>₹ {item.price}</p>
                      <div className="flex gap-2 mt-2">
                        <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 text-xs mt-2"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t px-5 py-4 space-y-3">
                <div className="flex justify-between font-semibold">
                  <span>Subtotal</span>
                  <span>₹ {cartSubtotal}</span>
                </div>

                <button
                  onClick={() => {
                    setCartOpen(false);
                    navigate("/checkout");
                  }}
                  className="w-full bg-[var(--primary)] text-white py-3 rounded-xl"
                >
                  Proceed to Checkout
                </button>

                <button
                  onClick={() => {
                    setCartOpen(false);
                    navigate("/cart");
                  }}
                  className="w-full border py-2 rounded-xl"
                >
                  View Full Cart
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ================= SMALL COMPONENTS ================= */

const NavLink = ({ to, children }) => (
  <Link
    to={to}
    className="relative text-[var(--text-main)] after:absolute after:left-0 after:-bottom-1
    after:w-0 after:h-[2px] after:bg-[var(--primary)] hover:after:w-full transition"
  >
    {children}
  </Link>
);

const IconBtn = ({ children, className = "", onClick }) => (
  <button
    onClick={onClick}
    className={`p-2.5 rounded-full bg-[var(--bg-soft)] hover:bg-[var(--primary)]
    transition ${className}`}
  >
    <div className="group-hover:text-white">{children}</div>
  </button>
);

const Badge = ({ count }) => (
  <motion.span
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    className="absolute -top-2 -right-1 w-5 h-5 rounded-full bg-[var(--primary)]
    text-white text-xs flex items-center justify-center"
  >
    {count}
  </motion.span>
);

const AccountItem = ({ label }) => (
  <div className="px-5 py-2 hover:bg-[var(--bg-soft)]">{label}</div>
);
