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
    <header className="navbar">
      <div className="container">

        {/* LOGO */}
        <a href="/" className="logo">
          <img src="/Logo_Marvel.png" alt="Marvel Crunch" />
        </a>

        {/* MENU */}
        <nav className="menu">
          <NavLink href="/">Home</NavLink>

          {/* PRODUCTS DROPDOWN */}
          <div className="dropdown">
            <button className="dropdown-btn">
              Products <ChevronDown size={16} className="icon" />
            </button>

            <div className="dropdown-menu">
              {["Chikki Collection","Organic Range","Sugar Free","Gifting Boxes","Combos","Bestsellers"].map(item => (
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
        <div className="actions">
          <IconBtn><Heart size={18} /></IconBtn>

          <IconBtn>
            <ShoppingCart size={18} />
            <span className="badge">3</span>
          </IconBtn>

          {!isLoggedIn ? (
            <a href="/login" className="login-btn">Login / Signup</a>
          ) : (
            <div className="account dropdown">
              <button className="dropdown-btn">
                <User size={18} /> {user.name} <ChevronDown size={16} className="icon" />
              </button>

              <div className="dropdown-menu account-menu">
                {["My Orders","Profile"].map(item => (
                  <AccountItem key={item} label={item} />
                ))}

                <div className="divider" />

                <button className="logout-btn">
                  <LogOut size={16} /> Logout
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
  <a href={href} className="nav-link">{children}</a>
);

const IconBtn = ({ children }) => (
  <div className="icon-btn">{children}</div>
);

const DropdownItem = ({ title }) => (
  <a href={`/products/${title.toLowerCase().replace(/\s+/g, "-")}`} className="dropdown-item">{title}</a>
);

const AccountItem = ({ label }) => (
  <a href="#" className="account-item">{label}</a>
);
