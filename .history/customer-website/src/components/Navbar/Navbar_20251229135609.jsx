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

const PRODUCT_CATEGORIES = [
  "Chikki Collection",
  "Organic Range",
  "Sugar Free",
  "Gifting Boxes",
  "Combos",
  "Bestsellers",
];

export default function Navbar() {
  const isLoggedIn = true;
  const user = { name: "Ajay" };
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[var(--bg-main)] backdrop-blur border-b border-[var(--bg-soft)]">
      <div className="max-w-7xl mx-auto h-[84px] px-4 sm:px-6 lg:px-8 flex items-center justify-between">

        {/* LOGO */}
        <a href="/" className="flex items-center gap-2">
          <img src="/Logo_Marvel.png" alt="Marvel Crunch" className="w-20" />
        </a>

        {/* SEARCH – DESKTOP */}
        <div className="hidden lg:flex flex-1 max-w-xl mx-10">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
            <input
              type="text"
              placeholder="Search chikki, peanuts, gifts..."
              className="w-full pl-11 pr-5 py-3 rounded-full bg-[var(--bg-soft)] text-sm focus:ring-2 focus:ring-[var(--primary)] outline-none"
            />
          </div>
        </div>

        {/* DESKTOP NAV */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold uppercase tracking-wide">
          <NavItem href="/">Home</NavItem>

          {/* PRODUCTS */}
          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-[var(--primary)] transition">
              Products
              <ChevronDown size={14} className="transition group-hover:rotate-180" />
            </button>

            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-4 w-60 bg-white rounded-2xl shadow-xl border opacity-0 invisible group-hover:visible group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-200">
              <ul className="p-2">
                {PRODUCT_CATEGORIES.map((item) => (
                  <DropdownLink key={item} label={item} />
                ))}
              </ul>
            </div>
          </div>

          <NavItem href="/collections">Collections</NavItem>
          <NavItem href="/offers">Offers</NavItem>
          <NavItem href="/about">Our Story</NavItem>
          <NavItem href="/contact">Contact</NavItem>
        </nav>

        {/* ACTIONS */}
        <div className="flex items-center gap-3">
          <IconButton className="lg:hidden">
            <Search size={20} />
          </IconButton>

          <IconButton>
            <Heart size={20} />
          </IconButton>

          <IconButton className="relative">
            <ShoppingCart size={20} />
            <span className="absolute -top-1 -right-1 w-5 h-5 text-[10px] bg-[var(--primary)] text-white rounded-full flex items-center justify-center font-bold">
              3
            </span>
          </IconButton>

          {/* USER */}
          {isLoggedIn ? (
            <div className="relative group hidden sm:block">
              <button className="flex items-center gap-2">
                <User size={20} />
                <span className="text-sm font-medium">{user.name}</span>
                <ChevronDown size={14} />
              </button>

              <div className="absolute right-0 mt-4 w-52 bg-white rounded-xl shadow-xl border opacity-0 invisible group-hover:visible group-hover:opacity-100 transition">
                <AccountLink label="My Orders" />
                <AccountLink label="Profile" />
                <div className="border-t my-1" />
                <button className="w-full flex items-center gap-2 px-5 py-3 text-[var(--primary)] hover:bg-[var(--bg-soft)]">
                  <LogOut size={16} /> Logout
                </button>
              </div>
            </div>
          ) : (
            <a href="/login" className="hidden sm:block px-5 py-2 rounded-full bg-[var(--primary)] text-white text-sm font-semibold">
              Login / Signup
            </a>
          )}

          {/* MOBILE MENU TOGGLE */}
          <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="lg:hidden p-2">
            {isMobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMobileOpen && (
        <div className="lg:hidden bg-white border-t shadow-sm">
          <div className="px-6 py-6 space-y-4">
            <MobileLink href="/">Home</MobileLink>

            <div>
              <p className="text-xs font-semibold uppercase text-[var(--text-muted)]">Products</p>
              <div className="mt-2 space-y-2 pl-3">
                {PRODUCT_CATEGORIES.map((item) => (
                  <DropdownLink key={item} label={item} mobile />
                ))}
              </div>
            </div>

            <MobileLink href="/collections">Collections</MobileLink>
            <MobileLink href="/offers">Offers</MobileLink>
            <MobileLink href="/about">Our Story</MobileLink>
            <MobileLink href="/contact">Contact</MobileLink>
          </div>
        </div>
      )}
    </header>
  );
}

/* ================= REUSABLE COMPONENTS ================= */

const NavItem = ({ href, children }) => (
  <a href={href} className="hover:text-[var(--primary)] transition">
    {children}
  </a>
);

const MobileLink = ({ href, children }) => (
  <a href={href} className="block py-2 text-base font-medium">
    {children}
  </a>
);

const IconButton = ({ children, className = "" }) => (
  <div className={`p-2.5 rounded-full bg-[var(--bg-soft)] hover:bg-[var(--primary)] hover:text-white transition cursor-pointer ${className}`}>
    {children}
  </div>
);

const DropdownLink = ({ label, mobile }) => (
  <a
    href={`/products/${label.toLowerCase().replace(/\s+/g, "-")}`}
    className={`block ${mobile ? "py-1.5 text-sm" : "px-4 py-2.5"} rounded-lg hover:bg-[var(--bg-soft)]`}
  >
    {label}
  </a>
);

const AccountLink = ({ label }) => (
  <a href="#" className="block px-5 py-2.5 hover:bg-[var(--bg-soft)]">
    {label}
  </a>
);
