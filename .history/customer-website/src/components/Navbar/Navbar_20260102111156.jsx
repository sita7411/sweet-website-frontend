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
  const [cartOpen, setCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([
    { id: 1, title: "Cookies Almond Biscuti 350g", size: "350g", price: 190.48, quantity: 1, img: "/images/biscuti.png" },
    { id: 2, title: "Pista Chocolate Chikki", size: "250g", price: 250.48, quantity: 1, img: "/images/pista.png" },
  ]);

  const cartSubtotal = Number(
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)
  );

  const updateQuantity = (id, change) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
      )
    );
  };

  const removeItem = (id) => setCartItems(prev => prev.filter(item => item.id !== id));

  /* SCROLL SHADOW */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* CLICK OUTSIDE MOBILE MENU */
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMobileMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* DISABLE BODY SCROLL WHEN CART OR MOBILE MENU OPEN */
  useEffect(() => {
    document.body.style.overflow = cartOpen || mobileMenuOpen ? "hidden" : "auto";
  }, [cartOpen, mobileMenuOpen]);

  return (
    <header className={`sticky top-0 z-50 transition-all ${scrolled ? "backdrop-blur bg-[var(--bg-main)]/90 shadow-md" : "bg-[var(--bg-main)]"}`}>
      <div className="max-w-7xl mx-auto px-4 h-[90px] flex items-center justify-between">
        {/* LOGO */}
        <Link to="/" className="flex items-center">
          <img src="/Logo_Marvel.png" alt="Marvel Crunch" className="w-24" />
        </Link>

        {/* DESKTOP SEARCH */}
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
          <NavLink href="/products">Products</NavLink>
          <NavLink href="/offers">Offers</NavLink>
          <NavLink href="/about">Our Story</NavLink>
          <NavLink href="/contact">Contact</NavLink>
        </nav>

        {/* DESKTOP ACTIONS */}
        <div className="hidden lg:flex items-center ml-8 gap-3">
          <Link to="/wishlist">
            <IconBtn className="relative">
              <Heart size={20} />
              <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-2 -right-1 w-5 h-5 rounded-full bg-[var(--primary)] text-white text-xs flex items-center justify-center">2</motion.span>
            </IconBtn>
          </Link>

          <IconBtn className="relative" onClick={() => setCartOpen(true)}>
            <ShoppingCart size={20} />
            <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-2 -right-1 w-5 h-5 rounded-full bg-[var(--primary)] text-white text-xs flex items-center justify-center">{cartItems.length}</motion.span>
          </IconBtn>

          {isLoggedIn ? (
            <div className="relative group">
              <button className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-[var(--bg-soft)] transition">
                <User size={20} className="text-[var(--primary)]" />
                <span className="text-sm font-medium text-[var(--text-main)]">{user.name}</span>
                <ChevronDown size={14} className="text-[var(--primary)] transition-transform group-hover:rotate-180" />
              </button>

              <div className="absolute right-0 mt-3 w-56 bg-[var(--bg-card)] rounded-xl shadow-lg border border-gray-200 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-200 z-50">
                <AccountItem label="My Orders" />
                <AccountItem label="Profile" />
                <div className="border-t border-gray-200 my-1" />
                <button className="flex items-center gap-2 px-5 py-2 text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white rounded-lg w-full transition">
                  <LogOut size={16} /> Logout
                </button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="px-5 py-2 rounded-full border border-[var(--primary)] text-[var(--primary)] text-sm font-semibold hover:bg-[var(--primary)] hover:text-white transition">
              Login / Sign Up
            </Link>
          )}
        </div>

        {/* MOBILE ACTIONS */}
        <div className="lg:hidden flex items-center gap-3">
          <Link to="/wishlist">
            <IconBtn className="relative">
              <Heart size={20} />
              <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-2 -right-1 w-5 h-5 rounded-full bg-[var(--primary)] text-white text-xs flex items-center justify-center">2</motion.span>
            </IconBtn>
          </Link>

          <IconBtn className="relative" onClick={() => setCartOpen(true)}>
            <ShoppingCart size={20} />
            <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-2 -right-1 w-5 h-5 rounded-full bg-[var(--primary)] text-white text-xs flex items-center justify-center">{cartItems.length}</motion.span>
          </IconBtn>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* MOBILE SEARCH */}
      <div className="lg:hidden px-4 pb-2">
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          <input type="text" placeholder="Search chikki, peanuts, gifts..." className="w-full pl-11 pr-4 py-3 rounded-full bg-[var(--bg-soft)] focus:ring-2 focus:ring-[var(--primary)] outline-none" />
        </div>
      </div>

      {/* ---------- MOBILE MENU ---------- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.45 }} exit={{ opacity: 0 }} onClick={() => setMobileMenuOpen(false)} className="fixed inset-0 bg-black z-40" />

            {/* Drawer */}
            <motion.div
              ref={menuRef}
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 left-0 h-full w-full sm:w-[80%] bg-[var(--bg-card)] z-50 flex flex-col"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b">
                <h2 className="text-lg font-semibold text-[var(--text-main)]">Menu</h2>
                <button aria-label="Close Menu" onClick={() => setMobileMenuOpen(false)}>
                  <X size={26} className="text-[var(--primary)]" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                <NavLink href="/" mobile>Home</NavLink>
                <NavLink href="/products" mobile>Products</NavLink>
                <NavLink href="/collections" mobile>Collections</NavLink>
                <NavLink href="/offers" mobile>Offers</NavLink>
                <NavLink href="/about" mobile>Our Story</NavLink>
                <NavLink href="/contact" mobile>Contact</NavLink>
              </div>

              <div className="px-6 py-4 border-t">
                {isLoggedIn ? (
                  <button className="w-full bg-[var(--primary)] text-white py-3 rounded-xl font-semibold hover:opacity-90 transition">Logout</button>
                ) : (
                  <Link to="/login" className="block w-full text-center bg-[var(--primary)] text-white py-3 rounded-xl font-semibold hover:opacity-90 transition">Login / Sign Up</Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ---------- CART SLIDEOVER ---------- */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="fixed inset-0 bg-black z-50"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.35 }}
              layout
              className="fixed inset-y-0 right-0 w-full max-w-md bg-[var(--bg-card)] shadow-2xl z-[9999] flex flex-col"
            >
              {/* HEADER */}
              <div className="flex items-center justify-between px-5 py-4 border-b">
                <h2 className="text-lg font-semibold text-[var(--text-main)]">Your Cart ({cartItems.length})</h2>
                <button aria-label="Close Cart" onClick={() => setCartOpen(false)}>
                  <X size={22} className="text-[var(--primary)]" />
                </button>
              </div>

              {/* ITEMS */}
              <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
                {cartItems.length === 0 && <p className="text-sm text-[var(--text-muted)]">Your cart is empty.</p>}
                {cartItems.map(item => (
                  <div key={item.id} className="flex gap-4 pb-4 border-b last:border-b-0">
                    <img src={item.img} alt={item.title} className="w-20 h-20 rounded-xl bg-[var(--bg-soft)] object-contain" />
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-[var(--text-main)]">{item.title}</h4>
                      <p className="text-xs text-[var(--text-muted)] mt-0.5">Size: {item.size}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-semibold text-[var(--text-main)]">₹ {item.price}</span>
                        <div className="flex items-center border rounded-full overflow-hidden">
                          <button onClick={() => updateQuantity(item.id, -1)} className="px-3 py-1 hover:bg-[var(--primary)] hover:text-white transition">−</button>
                          <span className="px-3 text-sm">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="px-3 py-1 hover:bg-[var(--primary)] hover:text-white transition">+</button>
                        </div>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="text-xs text-red-500 mt-2 hover:underline">Remove</button>
                    </div>
                  </div>
                ))}
              </div>

              {/* FOOTER */}
              <div className="border-t px-5 py-2 space-y-3">
                <div className="flex justify-between text-sm font-semibold text-[var(--text-main)]">
                  <span>Subtotal</span>
                  <span>₹ {cartSubtotal}</span>
                </div>

                <div className="bg-[var(--bg-soft)] rounded-xl p-2 space-y-1">
                  <div className="flex items-center gap-2 text-[var(--text-main)] font-semibold"><Truck size={18} className="text-[var(--primary)]" />Delivery Information</div>
                  <div className="flex items-start gap-2 text-sm text-[var(--text-muted)]"><Clock size={16} className="mt-0.5 text-[var(--secondary)]" /><span>Estimated delivery in <b>3–5 business days</b></span></div>
                  <div className="flex items-start gap-2 text-sm text-[var(--text-muted)]"><ShieldCheck size={16} className="mt-0.5 text-[var(--secondary)]" /><span>Free delivery on orders above <b>₹499</b></span></div>
                </div>

                <button onClick={() => { setCartOpen(false); navigate("/checkout"); }} className="w-full bg-[var(--primary)] text-white py-3 rounded-xl font-semibold hover:opacity-90 transition">Proceed to Checkout</button>
                <button onClick={() => { setCartOpen(false); navigate("/cart"); }} className="w-full border border-[var(--primary)] text-[var(--primary)] py-2 rounded-xl text-sm hover:bg-[var(--primary)] hover:text-white transition">View Full Cart</button>

                <p className="flex items-center justify-center gap-2 text-xs text-[var(--text-muted)]"><ShieldCheck size={14} className="text-[var(--primary)]" />Secure checkout · Easy returns · Trusted quality</p>
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
  <Link to={href} className={`block ${mobile ? "py-2 text-base text-[var(--text-main)]" : "relative text-[var(--text-main)] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-[var(--primary)] hover:after:w-full after:transition-all"}`}>
    {children}
  </Link>
);

const IconBtn = ({ children, className = "", onClick }) => (
  <button type="button" onClick={onClick} className={`relative p-2.5 rounded-full bg-[var(--bg-soft)] cursor-pointer group hover:bg-[var(--primary)] transition-all duration-300 flex items-center justify-center ${className}`}>
    <div className="text-[var(--text-main)] group-hover:text-white transition-colors duration-300">{children}</div>
  </button>
);

const AccountItem = ({ label }) => <button className="block w-full text-left px-5 py-2 hover:bg-[var(--bg-soft)] text-[var(--text-main)]">{label}</button>;
