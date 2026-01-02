'use client';

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
  const isLoggedIn = true;
  const user = { name: "Ajay" };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);

  // Cart Items
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

  /* ---------- DISABLE BODY SCROLL WHEN CART OPEN ---------- */
  useEffect(() => {
    document.body.style.overflow = cartOpen ? "hidden" : "auto";
  }, [cartOpen]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all ${scrolled
          ? "backdrop-blur bg-[var(--bg-main)]/90 shadow-md"
          : "bg-[var(--bg-main)]"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 h-[90px] flex items-center justify-between">
        {/* LOGO */}
        <a href="/" className="flex items-center">
          <img src="/Logo_Marvel.png" alt="Marvel Crunch" className="w-24" />
        </a>

        {/* SEARCH */}
        <div className="hidden lg:flex flex-1 max-w-xl mx-10">
          <div className="relative w-full">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
              size={18}
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
          <NavLink href="/">Home</NavLink>
          <NavLink href="/products">Products</NavLink>
          <NavLink href="/offers">Offers</NavLink>
          <NavLink href="/about">Our Story</NavLink>
          <NavLink href="/contact">Contact</NavLink>
        </nav>

        {/* ACTIONS */}
        <div className="flex items-center ml-8 gap-3">
          <IconBtn className="lg:hidden">
            <Search size={20} />
          </IconBtn>

          {/* WISHLIST */}
          <IconBtn className="relative">
            <Heart size={20} className="" />
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-1 w-5 h-5 rounded-full
              bg-[var(--primary)] text-white text-xs
              flex items-center justify-center"
            >
              2
            </motion.span>
          </IconBtn>

          {/* CART */}
          <IconBtn
            className="relative"
            onClick={() => setCartOpen(true)}
          >
            <ShoppingCart size={20} />
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-1 w-5 h-5 rounded-full
              bg-[var(--primary)] text-white text-xs
              flex items-center justify-center"
            >
              {cartItems.length}
            </motion.span>
          </IconBtn>

          {/* USER AUTH */}
          {isLoggedIn ? (
            <div className="relative hidden sm:block group">
              <button className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-[var(--bg-soft)] transition">
                <User size={20} className="text-[var(--primary)]" />
                <span className="text-sm font-medium text-[var(--text-main)]">{user.name}</span>
                <ChevronDown
                  size={14}
                  className="text-[var(--primary)] transition-transform group-hover:rotate-180"
                />
              </button>

              <div className="absolute right-0 mt-3 w-56 bg-[var(--bg-card)] rounded-xl
                shadow-lg border border-gray-200 opacity-0 invisible group-hover:visible group-hover:opacity-100
                transition-all duration-200 z-50"
              >
                <AccountItem label="My Orders" />
                <AccountItem label="Profile" />
                <div className="border-t border-gray-200 my-1" />
                <button className="flex items-center gap-2 px-5 py-2
                  text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white rounded-lg w-full
                  transition"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="hidden sm:flex">
              <a
                href="/login"
                className="px-5 py-2 rounded-full border
                  border-[var(--primary)] text-[var(--primary)]
                  text-sm font-semibold hover:bg-[var(--primary)]
                  hover:text-white transition"
              >
                Login / Sign Up
              </a>
            </div>
          )}

          {/* MOBILE MENU BUTTON */}
          <button
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
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
            className="lg:hidden bg-[var(--bg-card)] shadow-md"
          >
            <div className="px-6 py-6 space-y-4">
              <NavLink href="/" mobile>Home</NavLink>
              <NavLink href="/products" mobile>Products</NavLink>
              <NavLink href="/collections" mobile>Collections</NavLink>
              <NavLink href="/offers" mobile>Offers</NavLink>
              <NavLink href="/about" mobile>Our Story</NavLink>
              <NavLink href="/contact" mobile>Contact</NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CART SLIDEOVER */}
      <AnimatePresence>
        {cartOpen && (
          <>
            {/* Background Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="fixed inset-0 bg-black z-40"
            />

            {/* Cart Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween" }}
              className="fixed right-0 top-0 h-full w-96 
    bg-[var(--bg-card)] shadow-xl z-[9999] flex flex-col"
            >

              {/* Header */}
              <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-[var(--text-main)]">Shopping Cart</h2>
                <button onClick={() => setCartOpen(false)}>
                  <X size={24} className="text-[var(--primary)]" />
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {cartItems.length === 0 && (
                  <p className="text-sm text-gray-500">Your cart is empty.</p>
                )}
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3 items-start">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-[var(--text-main)]">{item.title}</h4>
                      <p className="text-xs text-[var(--text-muted)]">Size: {item.size}</p>
                      <p className="text-sm font-medium mt-1 text-[var(--text-main)]">₹ {item.price}</p>
                      <div className="flex items-center mt-2 gap-2">
                        <button
                          className="px-2 py-1 bg-[var(--bg-soft)] rounded hover:bg-[var(--primary)] hover:text-white transition"
                          onClick={() => updateQuantity(item.id, -1)}
                        >
                          −
                        </button>
                        <span className="text-[var(--text-main)]">{item.quantity}</span>
                        <button
                          className="px-2 py-1 bg-[var(--bg-soft)] rounded hover:bg-[var(--primary)] hover:text-white transition"
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          +
                        </button>
                        <button
                          className="text-red-500 text-xs ml-2 hover:underline"
                          onClick={() => removeItem(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex justify-between font-semibold mb-3 text-[var(--text-main)]">
                  <span>Subtotal</span>
                  <span>₹ {cartSubtotal}</span>
                </div>
                <button className="w-full bg-[var(--primary)] text-white py-2 rounded-lg mb-2 hover:opacity-90 transition">
                  Check Out
                </button>
                <button className="w-full border border-[var(--primary)] text-[var(--primary)] py-2 rounded-lg text-sm hover:bg-[var(--primary)] hover:text-white transition">
                  View Cart
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ---------- SMALL COMPONENTS ---------- */
const NavLink = ({ href, children, mobile }) => (
  <a
    href={href}
    className={`block ${mobile
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
    className={`
      relative p-2.5 rounded-full
      bg-[var(--bg-soft)]
      cursor-pointer
      group
      hover:bg-[var(--primary)]
      transition-all duration-300
      flex items-center justify-center
      ${className}
    `}
  >
    {/* Icon ka color direct control karo */}
    <div className="text-[var(--text-main)] group-hover:text-white transition-colors duration-300">
      {children}
    </div>
  </button>
);

const AccountItem = ({ label }) => (
  <button className="block w-full text-left px-5 py-2 hover:bg-[var(--bg-soft)] text-[var(--text-main)]">
    {label}
  </button>
);
