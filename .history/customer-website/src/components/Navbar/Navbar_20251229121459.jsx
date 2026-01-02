import React, { useState } from "react";
import {
  ShoppingCart,
  Heart,
  User,
  ChevronDown,
  LogOut,
  Package,
  Settings,
} from "lucide-react";
import "./navbar.css";

const Navbar = () => {
  const [productOpen, setProductOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const isLoggedIn = true; // 🔁 connect auth later
  const user = { name: "Ajay" };

  return (
    <header className="nav-glass">
      <div className="nav-container">

        {/* LOGO */}
        <a href="/" className="nav-logo">
          <img src="/Logo_Marvel.png" alt="Marvel Crunch Chikki" />
        </a>

        {/* MENU */}
        <nav className="nav-menu">

          <a href="/" className="nav-link">Home</a>

          {/* PRODUCTS DROPDOWN */}
          <div
            className="dropdown-wrapper"
            onMouseEnter={() => setProductOpen(true)}
            onMouseLeave={() => setProductOpen(false)}
          >
            <button className="nav-link dropdown-btn">
              Products <ChevronDown size={14} />
            </button>

            {productOpen && (
              <div className="dropdown-panel">
                <a href="/products/chikki">Chikki Collection</a>
                <a href="/products/sugarfree">Sugar Free</a>
                <a href="/products/combo">Combo Packs</a>
                <a href="/products/gifting">Gifting Boxes</a>
              </div>
            )}
          </div>

          <a href="/about" className="nav-link">About</a>
          <a href="/contact" className="nav-link">Contact</a>
        </nav>

        {/* RIGHT ICONS */}
        <div className="nav-actions">
          <a href="/wishlist" className="icon-btn">
            <Heart size={18} />
          </a>

          <a href="/cart" className="icon-btn relative">
            <ShoppingCart size={18} />
            <span className="cart-badge">3</span>
          </a>

          {/* ACCOUNT */}
          {!isLoggedIn ? (
            <a href="/login" className="login-btn">Login / Signup</a>
          ) : (
            <div
              className="dropdown-wrapper"
              onMouseEnter={() => setAccountOpen(true)}
              onMouseLeave={() => setAccountOpen(false)}
            >
              <button className="account-btn">
                <User size={16} />
                {user.name}
                <ChevronDown size={14} />
              </button>

              {accountOpen && (
                <div className="dropdown-panel right">
                  <a href="/orders">
                    <Package size={14} /> My Orders
                  </a>
                  <a href="/profile">
                    <Settings size={14} /> Profile
                  </a>
                  <button className="logout">
                    <LogOut size={14} /> Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
