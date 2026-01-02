import React, { useState } from "react";
import { ShoppingCart, Heart, User, Menu, X } from "lucide-react";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <nav className="bg-[#FFF4E6]/95 backdrop-blur-md shadow-md sticky top-0 z-50 border-b border-[#F1D9B3]">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <div>
          <img
            src="/Logo_Marvel.png"
            alt="Marvel Crunch Chikki"
            className="h-14 w-auto"
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-12 font-medium">
          {["Home", "Products", "About", "Contact"].map((item) => (
            <a
              key={item}
              href={`/${item.toLowerCase() === "home" ? "" : item.toLowerCase()}`}
              className="secondary-link"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Icons */}
        <div className="hidden md:flex items-center space-x-6">
          <a href="/wishlist" className="secondary-icon">
            <Heart size={24} />
          </a>
          <a href="/cart" className="relative primary-icon">
            <ShoppingCart size={24} />
            <span className={styles.cartBadge}>3</span>
          </a>
          <a href="/account" className="primary-icon">
            <User size={24} />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            className="text-[#B43B2F] hover:text-[#8C2A21] transition"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenu && (
        <div className="md:hidden bg-[#FFF4E6]/95 backdrop-blur-md absolute top-full left-0 w-full shadow-lg">
          <div className="flex flex-col py-4 space-y-4 items-center font-medium">
            {["Home", "Products", "About", "Contact"].map((item) => (
              <a
                key={item}
                href={`/${item.toLowerCase() === "home" ? "" : item.toLowerCase()}`}
                className="secondary-link text-lg"
                onClick={() => setMobileMenu(false)}
              >
                {item}
              </a>
            ))}
            <div className="flex space-x-6 mt-2">
              <a href="/wishlist" className="secondary-icon">
                <Heart size={24} />
              </a>
              <a href="/cart" className="relative primary-icon">
                <ShoppingCart size={24} />
                <span className={styles.cartBadge}>3</span>
              </a>
              <a href="/account" className="primary-icon">
                <User size={24} />
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
