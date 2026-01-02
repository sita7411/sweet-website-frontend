import { useState, useRef, useEffect } from "react";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const productsRef = useRef(null);
  const userRef = useRef(null);

  const isLoggedIn = true;
  const userName = "Ajay";
  const cartCount = 3;

  const productCategories = [
    "Chikki Collection",
    "Organic Range",
    "Sugar Free",
    "Gifting Boxes",
    "Combos",
    "Bestsellers",
  ];

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Collections", href: "/collections" },
    { label: "Offers", href: "/offers" },
    { label: "Our Story", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (productsRef.current && !productsRef.current.contains(event.target)) {
        setProductsDropdownOpen(false);
      }
      if (userRef.current && !userRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on route change or resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-[var(--bg-main)] shadow-sm" aria-label="Main navigation">
      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-20 lg:h-21 flex items-center justify-between">

          {/* Logo */}
          <a href="/" className="flex items-center shrink-0" aria-label="Marvel Crunch Home">
            <img
              src="/Logo_Marvel.png"
              alt="Marvel Crunch Logo"
              className="h-12 w-auto"
            />
          </a>

          {/* Desktop Search */}
          <div className="hidden lg:flex flex-1 max-w-xl mx-10">
            <div className="relative w-full">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="search"
                placeholder="Search for chikki, peanuts, gifts..."
                aria-label="Search products"
                className="w-full pl-12 pr-6 py-3.5 rounded-full bg-[var(--bg-soft)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-shadow"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Primary navigation">
            <a href="/" className="text-sm font-semibold uppercase tracking-wide hover:text-[var(--primary)] transition-colors">
              Home
            </a>

            {/* Products Dropdown */}
            <div className="relative" ref={productsRef}>
              <button
                onClick={() => setProductsDropdownOpen(!productsDropdownOpen)}
                className="flex items-center gap-1 text-sm font-semibold uppercase tracking-wide hover:text-[var(--primary)] transition-colors"
                aria-haspopup="true"
                aria-expanded={productsDropdownOpen}
              >
                Products
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${productsDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {productsDropdownOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-4 w-64 py-3 bg-white rounded-2xl shadow-xl border border-[var(--border)]">
                  {productCategories.map((category) => (
                    <a
                      key={category}
                      href={`/products/${category.toLowerCase().replace(/\s+/g, "-")}`}
                      className="block px-6 py-3 text-sm hover:bg-[var(--bg-soft)] transition-colors"
                      onClick={() => setProductsDropdownOpen(false)}
                    >
                      {category}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {navLinks.slice(1).map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-semibold uppercase tracking-wide hover:text-[var(--primary)] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Mobile Search Icon */}
            <button
              className="lg:hidden p-2.5 rounded-full bg-[var(--bg-soft)] hover:bg-[var(--primary)] hover:text-white transition-colors"
              aria-label="Open search"
            >
              <Search size={20} />
            </button>

            {/* Wishlist */}
            <button
              className="p-2.5 rounded-full bg-[var(--bg-soft)] hover:bg-[var(--primary)] hover:text-white transition-colors"
              aria-label="Wishlist"
            >
              <Heart size={20} />
            </button>

            {/* Cart */}
            <a
              href="/cart"
              className="relative p-2.5 rounded-full bg-[var(--bg-soft)] hover:bg-[var(--primary)] hover:text-white transition-colors"
              aria-label={`Shopping cart with ${cartCount} items`}
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-5 h-5 rounded-full bg-[var(--primary)] text-white text-xs font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </a>

            {/* User Menu */}
            {isLoggedIn ? (
              <div className="relative hidden sm:block" ref={userRef}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 text-sm font-medium hover:text-[var(--primary)] transition-colors"
                  aria-haspopup="true"
                  aria-expanded={userDropdownOpen}
                >
                  <User size={20} />
                  <span>{userName}</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${userDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-4 w-60 py-3 bg-white rounded-2xl shadow-xl border border-[var(--border)]">
                    <a href="/account/orders" className="block px-6 py-3 text-sm hover:bg-[var(--bg-soft)] transition-colors">
                      My Orders
                    </a>
                    <a href="/account/profile" className="block px-6 py-3 text-sm hover:bg-[var(--bg-soft)] transition-colors">
                      Profile
                    </a>
                    <div className="border-t my-2 mx-4" />
                    <button className="w-full text-left flex items-center gap-3 px-6 py-3 text-[var(--primary)] hover:bg-[var(--bg-soft)] transition-colors text-sm font-medium">
                      <LogOut size={18} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <a
                href="/login"
                className="hidden sm:flex items-center px-6 py-3 rounded-full bg-[var(--primary)] text-white text-sm font-semibold hover:bg-[var(--primary-dark)] transition-colors"
              >
                Login / Signup
              </a>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2"
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? "max-h-96 opacity-100 border-t" : "max-h-0 opacity-0"
        } bg-white shadow-md`}
      >
        <nav className="px-6 py-6 space-y-5" aria-label="Mobile navigation">
          <a href="/" className="block text-lg font-medium hover:text-[var(--primary)] transition-colors">
            Home
          </a>

          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-[var(--text-muted)] mb-3">
              Products
            </p>
            <div className="space-y-2 pl-4">
              {productCategories.map((category) => (
                <a
                  key={category}
                  href={`/products/${category.toLowerCase().replace(/\s+/g, "-")}`}
                  className="block py-2 text-base hover:text-[var(--primary)] transition-colors"
                >
                  {category}
                </a>
              ))}
            </div>
          </div>

          {navLinks.slice(1).map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="block text-lg font-medium hover:text-[var(--primary)] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}