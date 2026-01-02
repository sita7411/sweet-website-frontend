import { useState } from "react";
import {
  Heart,
  ShoppingCart,
  User,
  ChevronDown,
  Package,
  Gift,
  Leaf,
  Star,
  LogOut,
} from "lucide-react";

export default function Navbar() {
  const [productOpen, setProductOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const isLoggedIn = true;
  const user = { name: "Ajay" };

  return (
    <header className="sticky top-0 z-50 bg-[var(--bg-soft)]/80 backdrop-blur-xl shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <a href="/" className="flex items-center">
          <img src="/Logo_Marvel.png" alt="Logo" className="h-12" />
        </a>

        {/* CENTER MENU */}
        <nav className="hidden lg:flex items-center gap-10 text-[15px] font-medium text-[var(--text-main)]">

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
                              w-[520px] rounded-2xl bg-white
                              shadow-[0_20px_50px_rgba(0,0,0,0.15)]
                              p-6 animate-dropdown">

                <div className="grid grid-cols-3 gap-5">
                  <DropdownItem icon={<Package />} label="Chikki" />
                  <DropdownItem icon={<Leaf />} label="Organic" />
                  <DropdownItem icon={<Gift />} label="Gifting" />
                  <DropdownItem icon={<ShoppingCart />} label="Combos" />
                  <DropdownItem icon={<Star />} label="Bestsellers" />
                  <DropdownItem icon={<Heart />} label="Sugar Free" />
                </div>
              </div>
            )}
          </div>

          <NavLink href="/collections">Collections</NavLink>
          <NavLink href="/offers">Offers</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/contact">Contact</NavLink>
        </nav>

        {/* RIGHT */}
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
              <button className="flex items-center gap-2 px-4 py-2 rounded-full
                                 bg-white shadow-sm hover:shadow-md
                                 text-sm transition">
                <User size={16} />
                {user.name}
                <ChevronDown size={14} />
              </button>

              {accountOpen && (
                <div className="absolute right-0 mt-3 w-48 rounded-xl bg-white
                                shadow-[0_20px_40px_rgba(0,0,0,0.15)]
                                p-2 animate-dropdown">
                  <AccountItem label="My Orders" />
                  <AccountItem label="Profile" />
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg
                                     text-sm text-[var(--primary)]
                                     hover:bg-[var(--bg-soft)] w-full">
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

/* -------- COMPONENTS -------- */

const NavLink = ({ href, children }) => (
  <a
    href={href}
    className="relative hover:text-[var(--primary)] transition"
  >
    {children}
  </a>
);

const IconBtn = ({ children }) => (
  <div className="relative p-3 rounded-full bg-white shadow-sm
                  hover:shadow-md cursor-pointer transition text-[var(--secondary)]">
    {children}
  </div>
);

const DropdownItem = ({ icon, label }) => (
  <a
    href={`/products/${label.toLowerCase()}`}
    className="group flex flex-col items-center gap-3 p-4 rounded-xl
               hover:bg-[var(--bg-soft)] transition"
  >
    <div className="p-3 rounded-full bg-[var(--bg-soft)]
                    text-[var(--primary)]
                    group-hover:bg-[var(--primary)]
                    group-hover:text-white transition">
      {icon}
    </div>
    <span className="text-sm font-medium text-[var(--text-main)]">
      {label}
    </span>
  </a>
);

const AccountItem = ({ label }) => (
  <a
    href="#"
    className="flex items-center px-4 py-2 rounded-lg text-sm
               hover:bg-[var(--bg-soft)] w-full"
  >
    {label}
  </a>
);
