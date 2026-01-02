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
    <header className="sticky top-0 z-50 bg-[var(--bg-main)] border-b border-gray-100">
      {/* ===== MAIN NAV ===== */}
      <div className="max-w-7xl mx-auto h-[80px] px-4 lg:px-8 flex items-center justify-between">

        {/* LOGO */}
        <a href="/" className="flex items-center gap-2">
          <img src="/Logo_Marvel.png" alt="Marvel Crunch" className="w-20" />
        </a>

        {/* SEARCH */}
        <div className="hidden lg:flex flex-1 max-w-[520px] mx-12">
          <div className="relative w-full">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search chikki, peanuts, gift boxes..."
              className="w-full h-[44px] pl-11 pr-4 rounded-full bg-[var(--bg-soft)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />
          </div>
        </div>

        {/* NAV LINKS */}
        <nav className="hidden lg:flex items-center gap-8 text-[13px] font-semibold uppercase tracking-wider">
          <NavLink href="/">Home</NavLink>

          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-[var(--primary)]">
              Products
              <ChevronDown size={14} className="transition group-hover:rotate-180" />
            </button>

            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-60 rounded-xl bg-white shadow-xl border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <div className="p-2">
                {productCategories.map((item) => (
                  <DropdownItem key={item} title={item} />
                ))}
              </div>
            </div>
          </div>

          <NavLink href="/collections">Collections</NavLink>
          <NavLink href="/offers">Offers</NavLink>
          <NavLink href="/about">Our Story</NavLink>
          <NavLink href="/contact">Contact</NavLink>
        </nav>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-3">
          <IconBtn className="lg:hidden"><Search size={20} /></IconBtn>
          <IconBtn><Heart size={20} /></IconBtn>

          <IconBtn className="relative">
            <ShoppingCart size={20} />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[var(--primary)] text-white text-[10px] rounded-full flex items-center justify-center">
              3
            </span>
          </IconBtn>

          {isLoggedIn ? (
            <div className="relative hidden sm:block group">
              <button className="flex items-center gap-2 text-sm font-medium">
                <User size={18} />
                {user.name}
                <ChevronDown size={14} />
              </button>

              <div className="absolute right-0 mt-3 w-52 bg-white rounded-xl shadow-xl border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
                <AccountItem label="My Orders" />
                <AccountItem label="Profile" />
                <div className="border-t my-1" />
                <button className="flex items-center gap-2 px-5 py-3 text-[var(--primary)] hover:bg-[var(--bg-soft)] w-full">
                  <LogOut size={16} /> Logout
                </button>
              </div>
            </div>
          ) : (
            <a href="/login" className="hidden sm:inline-flex h-[40px] px-6 items-center rounded-full bg-[var(--primary)] text-white text-sm font-semibold">
              Login
            </a>
          )}

          <button className="lg:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* ===== MOBILE MENU ===== */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t">
          <div className="px-6 py-6 space-y-4">
            <NavLink href="/" mobile>Home</NavLink>

            <div>
              <p className="text-xs font-semibold uppercase text-gray-500 mb-2">Products</p>
              <div className="space-y-2 pl-2">
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

/* ===== SMALL COMPONENTS ===== */

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
    className={`w-10 h-10 flex items-center justify-center rounded-full bg-[var(--bg-soft)] hover:bg-[var(--primary)] hover:text-white transition cursor-pointer ${className}`}
  >
    {children}
  </div>
);

const DropdownItem = ({ title, mobile }) => (
  <a
    href={`/products/${title.toLowerCase().replace(/\s+/g, "-")}`}
    className={`block ${
      mobile ? "py-1.5 text-sm" : "px-4 py-2 text-sm"
    } rounded-lg hover:bg-[var(--bg-soft)]`}
  >
    {title}
  </a>
);

const AccountItem = ({ label }) => (
  <a href="#" className="block px-5 py-2.5 text-sm hover:bg-[var(--bg-soft)]">
    {label}
  </a>
);
    