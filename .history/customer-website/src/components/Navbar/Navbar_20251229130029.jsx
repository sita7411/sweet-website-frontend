import { useState } from "react";
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

  const productCategories = [
    "Chikki Collection",
    "Organic Range",
    "Sugar Free",
    "Gifting Boxes",
    "Combos",
    "Bestsellers",
  ];

  return (
    <header className="sticky top-0 z-50 shadow-md bg-[var(--bg-main)]">
      {/* Top Announcement */}
      <div className="bg-[var(--secondary)] text-white text-center text-sm py-1 font-medium">
        Free Shipping on Orders Above ₹999 | Handcrafted with Love ❤️
      </div>

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* LOGO */}
        <a href="/" className="flex items-center">
          <img src="/Logo_Marvel.png" alt="Marvel Crunch" className="w-20" />
        </a>

        {/* SEARCH BAR */}
        <div className="hidden lg:flex flex-1 max-w-xl mx-12">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search for chikki, peanuts, gifts..."
              className="w-full pl-12 pr-5 py-3 rounded-full bg-[var(--bg-soft)] text-[var(--text-main)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
            />
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
            />
          </div>
        </div>

        {/* DESKTOP MENU */}
        <nav className="hidden lg:flex items-center gap-10 text-sm font-semibold text-[var(--text-main)] uppercase tracking-wider">
          <NavLink href="/">Home</NavLink>

          {/* Products Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-[var(--primary)] transition">
              Products <ChevronDown size={16} className="transition group-hover:rotate-180" />
            </button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-56 rounded-2xl bg-white border border-[var(--bg-soft)] shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-300">
              {productCategories.map((item) => (
                <DropdownItem key={item} title={item} />
              ))}
            </div>
          </div>

          <NavLink href="/collections">Collections</NavLink>
          <NavLink href="/offers">Offers</NavLink>
          <NavLink href="/about">Our Story</NavLink>
          <NavLink href="/contact">Contact</NavLink>
        </nav>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* Mobile Search */}
          <button className="lg:hidden p-2 rounded-full hover:bg-[var(--primary)] hover:text-white transition">
            <Search size={22} />
          </button>

          <IconBtn>
            <Heart size={20} />
          </IconBtn>

          <IconBtn className="relative">
            <ShoppingCart size={20} />
            <span className="absolute -top-2 -right-2 bg-[var(--primary)] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
              3
            </span>
          </IconBtn>

          {isLoggedIn ? (
            <div className="relative group">
              <button className="flex items-center gap-2 text-[var(--text-main)] hover:text-[var(--primary)] transition">
                <User size={20} />
                <span className="hidden md:block font-medium">{user.name}</span>
                <ChevronDown size={16} className="transition group-hover:rotate-180" />
              </button>

              <div className="absolute right-0 mt-4 w-52 rounded-2xl bg-white border border-[var(--bg-soft)] shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                {["My Orders", "Profile"].map((item) => (
                  <AccountItem key={item} label={item} />
                ))}
                <div className="h-px bg-[var(--bg-soft)] my-2 mx-4" />
                <button className="flex items-center gap-3 px-5 py-3 w-full text-left text-[var(--primary)] hover:bg-[var(--bg-soft)] transition rounded-b-2xl">
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <a
              href="/login"
              className="hidden md:block px-6 py-3 rounded-full bg-[var(--primary)] text-white font-semibold hover:opacity-90 transition"
            >
              Login / Signup
            </a>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 rounded-full hover:bg-[var(--primary)] hover:text-white transition"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-[var(--bg-soft)] shadow-md">
          <div className="px-6 py-6 space-y-4">
            <NavLink href="/" mobile>Home</NavLink>
            <div>
              <button className="w-full text-left font-semibold uppercase tracking-wider text-[var(--text-main)]">
                Products
              </button>
              <div className="mt-3 space-y-2 pl-4">
                {productCategories.map((item) => (
                  <DropdownItem key={item} title={item} mobile />
                ))}
              </div>
            </div>
            <NavLink href="/collections" mobile>Collections</NavLink>
            <NavLink href="/offers" mobile>Offers</NavLink>
            <NavLink href="/about" mobile>Our Story</NavLink>
            <NavLink href="/contact" mobile>Contact</NavLink>
            {!isLoggedIn && (
              <a
                href="/login"
                className="block w-full text-center px-6 py-3 rounded-full bg-[var(--primary)] text-white font-semibold"
              >
                Login / Signup
              </a>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

/* ---------- COMPONENTS ---------- */

const NavLink = ({ href, children, mobile }) => (
  <a
    href={href}
    className={`block ${mobile ? "py-3 text-lg font-medium" : "hover:text-[var(--primary)] transition"} text-[var(--text-main)]`}
  >
    {children}
  </a>
);

const IconBtn = ({ children, className = "" }) => (
  <div
    className={`relative p-3 rounded-full bg-[var(--bg-soft)] text-[var(--text-main)] hover:bg-[var(--primary)] hover:text-white transition cursor-pointer ${className}`}
  >
    {children}
  </div>
);

const DropdownItem = ({ title, mobile }) => (
  <a
    href={`/products/${title.toLowerCase().replace(/\s+/g, "-")}`}
    className={`block ${mobile ? "py-2 text-base" : "px-6 py-3"} text-[var(--text-main)] hover:text-[var(--primary)] hover:bg-[var(--bg-soft)] transition font-medium rounded-xl`}
  >
    {title}
  </a>
);

const AccountItem = ({ label }) => (
  <a
    href="#"
    className="block px-6 py-3 text-[var(--text-main)] hover:text-[var(--primary)] hover:bg-[var(--bg-soft)] transition font-medium rounded-xl"
  >
    {label}
  </a>
);
