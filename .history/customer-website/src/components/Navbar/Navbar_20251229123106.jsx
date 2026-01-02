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

        {/* CENTER MENU */}
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
              <div className="absolute top-12 left-1/2 -translate-x-1/2
                w-[560px] rounded-2xl bg-[var(--bg-card)]
                shadow-[0_30px_80px_rgba(58,36,22,0.18)]
                border border-[var(--bg-soft)]
                p-8 animate-dropdown">

                <div className="grid grid-cols-2 gap-6">
                  <DropdownItem
                    title="Chikki Collection"
                    desc="Traditional peanut & jaggery chikkis"
                  />
                  <DropdownItem
                    title="Organic Range"
                    desc="Pure, chemical-free ingredients"
                  />
                  <DropdownItem
                    title="Sugar Free"
                    desc="Healthy sweets without added sugar"
                  />
                  <DropdownItem
                    title="Gifting Boxes"
                    desc="Premium festive & corporate gifts"
                  />
                  <DropdownItem
                    title="Combos"
                    desc="Curated sweet bundles"
                  />
                  <DropdownItem
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

        {/* RIGHT */}
        <div className="flex items-center gap-4">

          <IconBtn><Heart size={18} /></IconBtn>

          <IconBtn>
            <ShoppingCart size={18} />
            <span className="cart-badge">3</span>
          </IconBtn>

          {/* ACCOUNT */}
          {!isLoggedIn ? (
            <a href="/login" className="btn-primary">
              Login / Signup
            </a>
          ) : (
            <div
              className="relative"
              onMouseEnter={() => setAccountOpen(true)}
              onMouseLeave={() => setAccountOpen(false)}
            >
              <button className="account-btn">
                <User size={16} />
                {user.name}
                <ChevronDown size={14} />
              </button>

              {accountOpen && (
                <div className="account-dropdown animate-dropdown">
                  <AccountItem label="My Orders" />
                  <AccountItem label="Profile" />
                  <button className="logout-btn">
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
}
