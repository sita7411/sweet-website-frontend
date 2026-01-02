import { useState } from "react";
import {
  Heart,
  ShoppingCart,
  User,
  ChevronDown,
  LogOut,
} from "lucide-react";
import "./Navbar.css";

export default function Navbar() {
  const [productOpen, setProductOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const isLoggedIn = true;
  const user = { name: "Ajay" };

  return (
    <header className="sticky top-0 z-50 bg-[var(--bg-main)]/95 backdrop-blur-xl border-b border-[var(--bg-soft)]">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <a href="/" className="flex items-center">
          <img src="/Logo_Marvel.png" alt="Marvel Crunch" className="h-12" />
        </a>

        {/* MENU */}
        <nav className="hidden lg:flex items-center gap-12 text-[15px] font-medium text-[var(--text-main)] tracking-wide">

          <NavLink href="/">Home</NavLink>

          {/* PRODUCTS */}
          <div
            className="relative"
            onMouseEnter={() => setProductOpen(true)}
            onMouseLeave={() => setProductOpen(false)}
          >
            <button className="flex items-center gap-1 hover:text-[var(--primary)] transition">
              Products <ChevronDown size={14} />
            </button>

            {productOpen && (
              <div
                className="absolute top-14 left-1/2 -translate-x-1/2
                w-[580px] rounded-2xl bg-[var(--bg-card)]
                border border-[var(--bg-soft)]
                shadow-[0_40px_100px_rgba(58,36,22,0.18)]
                p-8 animate-dropdown"
              >
                <div className="grid grid-cols-2 gap-6">
                  <DropdownText
                    title="Chikki Collection"
                    desc="Authentic peanut & jaggery chikkis"
                  />
                  <DropdownText
                    title="Organic Range"
                    desc="Pure, chemical-free ingredients"
                  />
                  <DropdownText
                    title="Sugar Free"
                    desc="Healthy sweets without added sugar"
                  />
                  <DropdownText
                    title="Gifting Boxes"
                    desc="Premium festive & corporate gifting"
                  />
                  <DropdownText
                    title="Combos"
                    desc="Curated sweet bundles"
                  />
                  <DropdownText
                    title="Bestsellers"
                    desc="Most loved by our customers"
                  />
                </div>
              </div>
            )}
          </div>

          <NavLink href="/collections">Collections</NavLink>
          <NavLink href="/offers">Offers</NavLink>
          <NavLink href="/about">Our Story</NavLink>
          <NavLink href="/contact">Contact</NavLink>
        </nav>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-4">

          {/* Wishlist */}
          <IconBtn>
            <Heart size={18} />
          </IconBtn>

          {/* Cart */}
          <IconBtn>
            <ShoppingCart size={18} />
            <span className="absolute -top-1 -right-1 bg-[var(--primary)] text-white
              text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
              3
            </span>
          </IconBtn>

          {/* ACCOUNT */}
          {!isLoggedIn ? (
            <a
              href="/login"
              className="px-5 py-2 rounded-full bg-[var(--primary)]
              text-white text-sm font-medium hover:opacity-90 transition"
            >
              Login / Signup
            </a>
          ) : (
            <div
              className="relative"
              onMouseEnter={() => setAccountOpen(true)}
              onMouseLeave={() => setAccountOpen(false)}
            >
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-full
                bg-[var(--bg-card)] text-sm shadow-md hover:shadow-lg transition"
              >
                <User size={16} />
                {user.name}
                <ChevronDown size={14} />
              </button>

              {accountOpen && (
                <div
                  className="absolute right-0 mt-3 w-52 rounded-2xl
                  bg-[var(--bg-card)] border border-[var(--bg-soft)]
                  shadow-[0_30px_60px_rgba(0,0,0,0.18)]
                  p-2 animate-dropdown"
                >
                  <AccountItem label="My Orders" />
                  <AccountItem label="Profile" />
                  <button
                    className="flex items-center gap-2 px-4 py-2 rounded-xl
                    text-sm text-[var(--primary)] hover:bg-[var(--bg-soft)] w-full"
                  >
                    <LogOut size={14} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </header>
  );
}

/* ---------- COMPONENTS ---------- */

const NavLink = ({ href, children }) => (
  <a
    href={href}
    className="relative transition hover:text-[var(--primary)]
    after:absolute after:left-0 after:-bottom-2
    after:h-[2px] after:w-0 after:bg-[var(--primary)]
    after:transition-all after:duration-300
    hover:after:w-full"
  >
    {children}
  </a>
);

const IconBtn = ({ children }) => (
  <div
    className="relative p-3 rounded-full bg-[var(--bg-card)]
    text-[var(--secondary)]
    shadow-[0_8px_20px_rgba(107,63,38,0.15)]
    hover:bg-[var(--bg-soft)]
    hover:text-[var(--primary)]
    transition cursor-pointer"
  >
    {children}
  </div>
);

const DropdownText = ({ title, desc }) => (
  <a
    href={`/products/${title.toLowerCase().replace(/\s+/g, "-")}`}
    className="block p-5 rounded-xl hover:bg-[var(--bg-soft)] transition"
  >
    <h4 className="text-[15px] font-semibold text-[var(--text-main)]">
      {title}
    </h4>
    <p className="mt-1 text-[13px] text-[var(--text-muted)] leading-relaxed">
      {desc}
    </p>
  </a>
);

const AccountItem = ({ label }) => (
  <a
    href="#"
    className="block px-4 py-2 rounded-xl text-sm hover:bg-[var(--bg-soft)]"
  >
    {label}
  </a>
);
