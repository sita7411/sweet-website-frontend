import React from "react";
import { ShoppingCart, Heart, User, Menu } from "lucide-react";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className="bg-white/90 backdrop-blur-sm shadow-md sticky top-0 z-50 border-b border-gray-200">
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
        <div className="hidden md:flex items-center space-x-12">
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

        {/* Mobile Menu */}
        <div className="md:hidden">
          <button className="text-gray-700 hover:text-primary transition">
            <Menu size={28} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
