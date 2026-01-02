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
    <header className="sticky top-0 z-50 bg-[var(--bg-main)] shadow-sm">

      {/* MAIN NAV */}
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[84px] flex items-center justify-between gap-10">
        
        {/* LOGO */}
        <a href="/" className="flex items-center shrink-0">
          <img src="/Logo_Marvel.png" alt="Marvel Crunch" className="w-20" />
        </a>

        {/* SEARCH */}
        <div className="hidden lg:flex flex-1 max-w-xl mx-10">
          <div className="relative w-full">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
            />
            <input
              type="text"
              placeholder="Search for chikki, peanuts, gifts..."
              className="w-full pl-11 pr-5 py-3 rounded-full bg-[var(--bg-soft)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />
          </div>
        </div>

        {/* DESKTOP LINKS */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold uppercase tracking-wide">
          <NavLink href="/">Home</NavLink>

          {/* PRODUCTS */}
          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-[var(--primary)] transition">
              PRODUCTS
              <ChevronDown size={14} className="group-hover:rotate-180 transition" />
            </button>

            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-4 w-56 rounded-xl bg-white shadow-lg border border-[var(--bg-soft)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
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
        <div className="flex items-center gap-3 sm:gap-4">
          <IconBtn className="lg:hidden">
            <Search size={20} />
          </IconBtn>

          <IconBtn>
            <Heart size={20} />
          </IconBtn>

          <IconBtn className="relative">
            <ShoppingCart size={20} />
            <span className="absolute -top-1 -right-1 bg-[var(--primary)] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
              3
            </span>
          </IconBtn>

          {/* USER */}
          {isLoggedIn ? (
            <div className="relative group hidden sm:block">
              <button className="flex items-center gap-2">
                <User size={20} />
                <span className="text-sm font-medium">{user.name}</span>
                <ChevronDown size={14} />
              </button>

              <div className="absolute right-0 mt-4 w-52 bg-white rounded-xl shadow-lg border border-[var(--bg-soft)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <AccountItem label="My Orders" />
                <AccountItem label="Profile" />
                <div className="border-t my-2" />
                <button className="flex items-center gap-2 px-5 py-3 text-[var(--primary)] w-full hover:bg-[var(--bg-soft)]">
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <a
              href="/login"
              className="hidden sm:block px-5 py-2 rounded-full bg-[var(--primary)] text-white text-sm font-semibold"
            >
              Login / Signup
            </a>
          )}

          {/* MOBILE MENU */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t shadow-sm">
          <div className="px-6 py-6 space-y-4">
            <NavLink href="/" mobile>Home</NavLink>

            <div>
              <p className="font-semibold uppercase text-sm">Products</p>
              <div className="mt-2 space-y-2 pl-3">
                {productCategories.map((item) => (
                  <DropdownItem key={item} title={item} mobile />
                ))}
              </div>
            </div>

            <NavLink href="/collections" mobile>Collections</NavLink>
            <NavLink href="/offers" mobile>Offers</NavLink>
            <NavLink href="/about" mobile>Our Story</NavLink>
            <NavLink href="/contact" mobile>Contact</NavLink>
          </div>
        </div>
      )}
    </header>
  );
}

/* ---------- SMALL COMPONENTS ---------- */

const NavLink = ({ href, children, mobile }) => (
  <a
    href={href}
    className={`block ${
      mobile
        ? "py-2 text-base font-medium"
        : "hover:text-[var(--primary)] transition"
    }`}
  >
    {children}
  </a>
);

const IconBtn = ({ children, className = "" }) => (
  <div
    className={`p-2.5 rounded-full bg-[var(--bg-soft)] hover:bg-[var(--primary)] hover:text-white transition cursor-pointer ${className}`}
  >
    {children}
  </div>
);

const DropdownItem = ({ title, mobile }) => (
  <a
    href={`/products/${title.toLowerCase().replace(/\s+/g, "-")}`}
    className={`block ${
      mobile ? "py-1.5 text-sm" : "px-5 py-2.5"
    } hover:bg-[var(--bg-soft)] rounded-lg`}
  >
    {title}
  </a>
);

const AccountItem = ({ label }) => (
  <a
    href="#"
    className="block px-5 py-2.5 hover:bg-[var(--bg-soft)]"
  >
    {label}
  </a>
);
