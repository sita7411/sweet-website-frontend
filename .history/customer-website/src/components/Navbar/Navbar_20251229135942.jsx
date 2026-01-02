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

        {/* SEARCH */}
        <div className="search-desktop">
          <Search size={16} />
          <input placeholder="Search chikki, gifts, combos..." />
        </div>

        {/* NAV LINKS */}
        <nav className="nav-links">
          <NavLink href="/">Home</NavLink>

          <div className="dropdown group">
            <button>
              Products <ChevronDown size={14} />
            </button>

            <div className="dropdown-menu glass">
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

        {/* ACTIONS */}
        <div className="actions">
          <IconBtn><Heart size={18} /></IconBtn>

          <IconBtn className="cart">
            <ShoppingCart size={18} />
            <span>3</span>
          </IconBtn>

          {isLoggedIn ? (
            <div className="account group">
              <button>
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
            <a className="cta" href="/login">Login</a>
          )}

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

/* Components */
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
  <a href="#" className="dropdown-item">{label}</a>
);
