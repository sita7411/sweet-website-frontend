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

          {/* PRODUCTS DROPDOWN */}
          <div className="relative group">
            <button className="flex items-center gap-1 font-medium text-[var(--text-main)] hover:text-[var(--primary)] transition">
              Products <ChevronDown size={14} className="transition group-hover:rotate-180" />
            </button>

            <div
              className="absolute top-12 left-1/2 -translate-x-1/2
              w-44 rounded-xl bg-[var(--bg-card)]
              border border-[var(--bg-soft)]
              shadow-[0_20px_40px_rgba(0,0,0,0.15)]
              opacity-0 invisible
              group-hover:opacity-100 group-hover:visible
              translate-y-2 group-hover:translate-y-0
              transition-all duration-200 z-50"
            >
              {["Chikki Collection","Organic Range","Sugar Free","Gifting Boxes","Combos","Bestsellers"].map((item) => (
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
        <div className="flex items-center gap-4">

          <IconBtn>
            <Heart size={18} />
          </IconBtn>

          <IconBtn>
            <ShoppingCart size={18} />
            <span className="absolute -top-1 -right-1 bg-[var(--primary)] text-white
              text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
              3
            </span>
          </IconBtn>

          {!isLoggedIn ? (
            <a
              href="/login"
              className="px-5 py-2 rounded-full bg-[var(--primary)]
              text-white text-sm font-medium hover:opacity-90 transition"
            >
              Login / Signup
            </a>
          ) : (
            <div className="relative group">

              {/* ACCOUNT BUTTON */}
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-full
                bg-[var(--bg-card)] text-sm font-medium
                border border-transparent
                hover:border-[var(--primary)]
                hover:bg-[var(--bg-soft)]
                transition-all duration-200"
              >
                <User size={16} />
                {user.name}
                <ChevronDown size={14} className="transition group-hover:rotate-180" />
              </button>

              {/* DROPDOWN */}
              <div
                className="absolute right-0 mt-3 w-48 rounded-xl
                bg-[var(--bg-card)]
                border border-[var(--bg-soft)]
                shadow-[0_20px_40px_rgba(0,0,0,0.15)]
                opacity-0 invisible
                group-hover:opacity-100 group-hover:visible
                translate-y-2 group-hover:translate-y-0
                transition-all duration-200 z-50"
              >
                {["My Orders","Profile"].map((item) => (
                  <AccountItem key={item} label={item} />
                ))}

                <div className="h-px bg-[var(--bg-soft)] my-1" />

                <button
                  className="flex items-center gap-2 px-4 py-2 w-full
                  rounded-xl text-sm font-medium
                  text-[var(--primary)]
                  hover:bg-[rgba(198,59,47,0.08)]
                  transition"
                >
                  <LogOut size={14} />
                  Logout
                </button>
              </div>
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
    className="relative transition font-medium text-[var(--text-main)]
    hover:text-[var(--primary)]
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

const DropdownItem = ({ title }) => (
  <a
    href={`/products/${title.toLowerCase().replace(/\s+/g, "-")}`}
    className="block px-4 py-2 rounded-lg text-[var(--text-main)]
    hover:text-[var(--primary)]
    hover:bg-[var(--bg-soft)]
    transition font-medium"
  >
    {title}
  </a>
);

const AccountItem = ({ label }) => (
  <a
    href="#"
    className="block px-4 py-2 rounded-lg text-[var(--text-main)]
    hover:text-[var(--primary)]
    hover:bg-[var(--bg-soft)]
    transition font-medium"
  >
    {label}
  </a>
);
