import React, { useState } from "react";
import { ShoppingCart, Heart, User, Menu, X } from "lucide-react";
import "./navbar.css";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const links = ["Home", "Products", "About", "Contact"];

  return (
    <header className="navbar-glass">
      <div className="navbar-container">

        {/* LEFT - Logo */}
        <a href="/" className="navbar-logo">
          <img src="/Logo_Marvel.png" alt="Marvel Crunch Chikki" />
        </a>

        {/* CENTER - Desktop Menu */}
        <nav className="navbar-menu">
          {links.map((item) => (
            <a
              key={item}
              href={`/${item === "Home" ? "" : item.toLowerCase()}`}
              className="nav-link"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* RIGHT - Icons */}
        <div className="navbar-icons">
          <a href="/wishlist" className="icon-btn">
            <Heart size={18} />
          </a>

          <a href="/account" className="icon-btn">
            <User size={18} />
          </a>

          <a href="/cart" className="icon-btn relative">
            <ShoppingCart size={18} />
            <span className="cart-badge">3</span>
          </a>

          {/* Mobile Toggle */}
          <button
            className="icon-btn mobile-only"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div className={`mobile-drawer ${open ? "open" : ""}`}>
        {links.map((item) => (
          <a
            key={item}
            href={`/${item === "Home" ? "" : item.toLowerCase()}`}
            onClick={() => setOpen(false)}
          >
            {item}
          </a>
        ))}
      </div>
    </header>
  );
};

export default Navbar;
