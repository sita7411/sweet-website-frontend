"use client";

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
import { useAuth } from "../../context/AuthContext";
import { useShop } from "../../context/ShopContext";
import "./Navbar.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  const isLoggedIn = !!user;

  const {
    cartItems,
    updateQty,
    removeFromCart,
    getCartCount,
    getCartTotal,
    wishlistItems,
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const menuRef = useRef(null);
  const navigate = useNavigate();

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Click outside to close mobile menu
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = cartOpen || mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [cartOpen, mobileMenuOpen]);

  const cartSubtotal = getCartTotal?.() ?? 0;
  const wishlistCount = wishlistItems?.length ?? 0;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur bg-[var(--bg-main)]/90 shadow-md"
          : "bg-[var(--bg-main)]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 h-[90px] flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src="/Logo_Marvel.png" alt="Marvel Crunch" className="w-24" />
        </Link>

        {/* Desktop Search */}
        <div className="hidden lg:flex flex-1 max-w-xl mx-10">
          <div className="relative w-full">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
              size={18}
            />
            <input
              placeholder="Search chikki, peanuts, gifts..."
              className="w-full pl-11 pr-5 py-3 rounded-full bg-[var(--bg-soft)] focus:ring-2 focus:ring-[var(--primary)] outline-none"
            />
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex gap-8 text-sm font-semibold uppercase">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/shop">Products</NavLink>
          <NavLink href="/about">Our Story</NavLink>
          <NavLink href="/contact">Contact</NavLink>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center ml-8 gap-3">
          <Link to="/wishlist">
            <IconBtn className="relative">
              <Heart size={20} />
              {wishlistCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-1 w-5 h-5 rounded-full bg-[var(--primary)] text-white text-xs flex items-center justify-center"
                >
                  {wishlistCount}
                </motion.span>
              )}
            </IconBtn>
          </Link>

          <IconBtn className="relative" onClick={() => setCartOpen(true)}>
            <ShoppingCart size={20} />
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: getCartCount() > 0 ? 1 : 0 }}
              className="absolute -top-2 -right-1 w-5 h-5 rounded-full bg-[var(--primary)] text-white text-xs flex items-center justify-center"
            >
              {getCartCount()}
            </motion.span>
          </IconBtn>

          {isLoggedIn ? (
            <div className="relative group">
              <button className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-[var(--bg-soft)] transition">
                <User size={20} className="text-[var(--primary)]" />
                <span className="text-sm font-medium text-[var(--text-main)]">
                  Hello, {user?.firstName || "User"}
                </span>
                <ChevronDown
                  size={14}
                  className="text-[var(--primary)] transition-transform group-hover:rotate-180"
                />
              </button>

              <div className="absolute right-0 mt-3 w-56 bg-[var(--bg-card)] rounded-xl shadow-lg border border-gray-200 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-200 z-50">
                <Link to="/myorder">
                  <AccountItem label="My Orders" />
                </Link>
                <Link to="/myaccount">
                  <AccountItem label="Profile" />
                </Link>
                <div className="border-t border-gray-200 my-1" />
                <button
                  onClick={() => {
                    logout();
                    navigate("/auth");
                  }}
                  className="flex items-center gap-2 px-5 py-2 text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white rounded-lg w-full transition"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            </div>
          ) : (
            <Link
              to="/auth"
              className="px-5 py-2 rounded-full border border-[var(--primary)] text-[var(--primary)] text-sm font-semibold hover:bg-[var(--primary)] hover:text-white transition"
            >
              Login / Sign Up
            </Link>
          )}
        </div>

        {/* Mobile Actions */}
        <div className="lg:hidden flex items-center gap-3">
          <Link to="/wishlist">
            <IconBtn className="relative">
              <Heart size={20} />
              {wishlistCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-1 w-5 h-5 rounded-full bg-[var(--primary)] text-white text-xs flex items-center justify-center"
                >
                  {wishlistCount}
                </motion.span>
              )}
            </IconBtn>
          </Link>

          <IconBtn className="relative" onClick={() => setCartOpen(true)}>
            <ShoppingCart size={20} />
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: getCartCount() > 0 ? 1 : 0 }}
              className="absolute -top-2 -right-1 w-5 h-5 rounded-full bg-[var(--primary)] text-white text-xs flex items-center justify-center"
            >
              {getCartCount()}
            </motion.span>
          </IconBtn>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="lg:hidden px-4 pb-2">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
          />
          <input
            type="text"
            placeholder="Search chikki, peanuts, gifts..."
            className="w-full pl-11 pr-4 py-3 rounded-full bg-[var(--bg-soft)] focus:ring-2 focus:ring-[var(--primary)] outline-none"
          />
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.45 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black z-40"
            />
            <motion.div
              ref={menuRef}
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 left-0 h-screen w-full sm:w-[80%] bg-[var(--bg-card)] z-50 flex flex-col"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b">
                <h2 className="text-lg font-semibold text-[var(--text-main)]">
                  Menu
                </h2>
                <button
                  aria-label="Close Menu"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X size={26} className="text-[var(--primary)]" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                <NavLink href="/" mobile>
                  Home
                </NavLink>
                <NavLink href="/shop" mobile>
                  Products
                </NavLink>
                <NavLink href="/collections" mobile>
                  Collections
                </NavLink>
                <NavLink href="/offers" mobile>
                  Offers
                </NavLink>
                <NavLink href="/about" mobile>
                  Our Story
                </NavLink>
                <NavLink href="/contact" mobile>
                  Contact
                </NavLink>
              </div>
              <div className="px-6 py-4 border-t">
                {isLoggedIn ? (
                  <button
                    onClick={() => {
                      logout();
                      navigate("/auth");
                    }}
                    className="w-full bg-[var(--primary)] text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/auth"
                    className="block w-full text-center bg-[var(--primary)] text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
                  >
                    Login / Sign Up
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Cart Slideover */}
      {/* Cart Slideover */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="fixed inset-0 bg-black z-[9999]"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.35 }}
              className="fixed top-0 right-0 h-screen w-full md:max-w-md bg-[var(--bg-card)] shadow-2xl z-[10000] flex flex-col"
            >
              <div className="flex items-center justify-between px-5 py-5 border-b md:py-4">
                <h2 className="text-xl md:text-lg font-semibold text-[var(--text-main)]">
                  Your Cart ({getCartCount()})
                </h2>
                <button
                  aria-label="Close Cart"
                  onClick={() => setCartOpen(false)}
                >
                  <X size={26} className="text-[var(--primary)]" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-5 py-8 md:py-6">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center gap-6 px-4">
                    <img
                      src="/empty-cart.png"
                      alt="Empty Cart"
                      className="w-40 h-40 sm:w-48 sm:h-48 object-contain opacity-90"
                    />
                    <div>
                      <p className="text-xl sm:text-2xl font-semibold text-[var(--text-main)]">
                        Your cart is empty
                      </p>
                      <p className="text-sm sm:text-base text-[var(--text-muted)] mt-3 max-w-xs">
                        Looks like you haven't added any chikkis yet. Let's find
                        something delicious!
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setCartOpen(false);
                        navigate("/shop");
                      }}
                      className="mt-4 px-10 py-3.5 bg-[var(--primary)] text-white rounded-xl font-semibold shadow-md hover:brightness-110 transition active:scale-95"
                    >
                      Shop Chikkis Now
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6 md:space-y-5">
                    {cartItems.map((item) => (
                      <div
                        key={`${item.productId}-${item.weight}`}
                        className="flex gap-4 pb-5 border-b last:border-b-0 last:pb-0"
                      >
                        <img
                          src={item.image || "/placeholder-product.jpg"}
                          alt={item.name}
                          className="w-20 h-20 md:w-18 md:h-18 rounded-xl bg-[var(--bg-soft)] object-contain flex-shrink-0"
                        />
                        <div className="flex-1">
                          <h4 className="text-base md:text-sm font-semibold text-[var(--text-main)] line-clamp-2">
                            {item.name}
                          </h4>
                          <p className="text-sm md:text-xs text-[var(--text-muted)] mt-1">
                            {item.weight}
                          </p>

                          <div className="flex items-center justify-between mt-3">
                            <span className="text-lg md:text-base font-semibold text-[var(--text-main)]">
                              ₹{(item.price * item.qty).toFixed(0)}
                            </span>
                            <div className="flex items-center border rounded-full overflow-hidden bg-white">
                              <button
                                onClick={() =>
                                  updateQty(
                                    item.productId,
                                    item.weight,
                                    item.qty - 1,
                                  )
                                }
                                className="px-4 py-2 md:px-3 md:py-1.5 text-lg md:text-base hover:bg-[var(--primary)] hover:text-white transition"
                              >
                                −
                              </button>
                              <span className="px-5 md:px-4 text-base md:text-sm font-medium min-w-[2.5rem] text-center">
                                {item.qty}
                              </span>
                              <button
                                onClick={() =>
                                  updateQty(
                                    item.productId,
                                    item.weight,
                                    item.qty + 1,
                                  )
                                }
                                className="px-4 py-2 md:px-3 md:py-1.5 text-lg md:text-base hover:bg-[var(--primary)] hover:text-white transition"
                              >
                                +
                              </button>
                            </div>
                          </div>

                          <button
                            onClick={() =>
                              removeFromCart(item.productId, item.weight)
                            }
                            className="text-sm text-red-600 mt-2 hover:underline block"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="border-t px-5 py-6 md:py-5 space-y-5">
                  <div className="flex justify-between text-lg md:text-base font-semibold text-[var(--text-main)]">
                    <span>Subtotal</span>
                    <span>₹{cartSubtotal.toFixed(0)}</span>
                  </div>

                  {/* Optional: keep your delivery info block if you like it */}
                  <div className="bg-[var(--bg-soft)] rounded-xl p-4 space-y-2.5 text-sm">
                    <div className="flex items-center gap-2 font-semibold text-[var(--text-main)]">
                      <Truck size={18} className="text-[var(--primary)]" />
                      Delivery Information
                    </div>
                    <div className="flex items-start gap-2 text-[var(--text-muted)]">
                      <Clock
                        size={16}
                        className="mt-1 text-[var(--secondary)]"
                      />
                      <span>
                        Estimated delivery in <b>3–5 business days</b>
                      </span>
                    </div>
                    <div className="flex items-start gap-2 text-[var(--text-muted)]">
                      <ShieldCheck
                        size={16}
                        className="mt-1 text-[var(--secondary)]"
                      />
                      <span>
                        Free delivery on orders above <b>₹499</b>
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setCartOpen(false);
                      navigate("/checkout");
                    }}
                    className="w-full bg-[var(--primary)] text-white py-4 rounded-xl font-semibold hover:brightness-110 transition text-base shadow-md"
                  >
                    Proceed to Checkout
                  </button>

                  <button
                    onClick={() => {
                      setCartOpen(false);
                      navigate("/cart");
                    }}
                    className="w-full border border-[var(--primary)] text-[var(--primary)] py-3.5 rounded-xl font-medium hover:bg-[var(--primary)] hover:text-white transition"
                  >
                    View Full Cart
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ── Small Components ── */
const NavLink = ({ href, children, mobile }) => (
  <Link
    to={href}
    className={`block ${
      mobile
        ? "py-2 text-base text-[var(--text-main)]"
        : "relative text-[var(--text-main)] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-[var(--primary)] hover:after:w-full after:transition-all"
    }`}
  >
    {children}
  </Link>
);

const IconBtn = ({ children, className = "", onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`relative p-2.5 rounded-full bg-[var(--bg-soft)] cursor-pointer group hover:bg-[var(--primary)] transition-all duration-300 flex items-center justify-center ${className}`}
  >
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
