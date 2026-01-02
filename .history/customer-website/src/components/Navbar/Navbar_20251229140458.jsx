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
    <header className="navbar">
      <div className="navbar-inner">

        {/* LOGO */}
        <a href="/" className="logo">
          <img src="/Logo_Marvel.png" alt="Marvel Crunch" />
        </a>

        {/* CENTER NAV */}
        <div className="nav-center">
          <nav className="nav-links">

            <NavLink href="/">Home</NavLink>

            {/* PRODUCTS DROPDOWN */}
            <div className="dropdown group">
              <button className="dropdown-trigger">
                Products <ChevronDown size={14} />
              </button>

              <div className="dropdown-menu mega glass">
                <div className="dropdown-col">
                  <p className="dropdown-title">Shop By Category</p>
                  {productCategories.map((item) => (
                    <DropdownItem key={item} title={item} />
                  ))}
                </div>

                <div className="dropdown-divider"></div>

                <div className="dropdown-col highlight">
                  <p className="dropdown-title">Featured</p>

                  <a className="featured-card" href="/products/bestsellers">
                    ⭐ Bestsellers
                    <span>Most loved chikkis</span>
                  </a>

                  <a className="featured-card" href="/products/gifting-boxes">
                    🎁 Gifting Boxes
                    <span>Perfect for festivals</span>
                  </a>
                </div>
              </div>
            </div>

            <NavLink href="/collections">Collections</NavLink>
            <NavLink href="/offers">Offers</NavLink>
            <NavLink href="/about">Our Story</NavLink>
            <NavLink href="/contact">Contact</NavLink>

          </nav>
        </div>

        {/* RIGHT ACTIONS */}
        <div className="actions">

          <IconBtn><Heart size={18} /></IconBtn>

          <IconBtn className="cart">
            <ShoppingCart size={18} />
            <span>3</span>
          </IconBtn>

          {isLoggedIn ? (
            <div className="account group">
              <button className="account-trigger">
                <User size={18} />
                <span>{user.name}</span>
                <ChevronDown size={14} />
              </button>

              <div className="dropdown-menu glass right">
                <AccountItem label="My Orders" />
                <AccountItem label="Profile" />
                <button className="logout">
                  <LogOut size={16} /> Logout
                </button>
              </div>
            </div>
          ) : (
            <a href="/login" className="cta">Login</a>
          )}

          {/* MOBILE TOGGLE */}
          <button
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </header>
  );
}

/* SMALL COMPONENTS */

const NavLink = ({ href, children }) => (
  <a href={href} className="nav-link">
    {children}
  </a>
);

const IconBtn = ({ children, className = "" }) => (
  <button className={`icon-btn ${className}`}>
    {children}
  </button>
);

const DropdownItem = ({ title }) => (
  <a
    href={`/products/${title.toLowerCase().replace(/\s+/g, "-")}`}
    className="dropdown-item"
  >
    {title}
  </a>
);

const AccountItem = ({ label }) => (
  <a href="#" className="dropdown-item">
    {label}
  </a>
);
