import React from "react";
import { ShoppingCart, Heart, User, Menu } from "lucide-react";
import styles from "./Navbar.module.css";  // ← Ye sahi tarika

const Navbar = () => {
  return (
    <nav className="bg-[#FFFBF0]/95 backdrop-blur-lg shadow-lg sticky top-0 z-50 border-b border-[#E8D9C2]">
      <div className="container mx-auto px-6 py-5 flex justify-between items-center">
        
        {/* Logo */}
        <div>
          <img
            src="/Logo_Marvel.png"
            alt="Marvel Crunch Chikki"
            className={`h-16 w-auto drop-shadow-md ${styles.float}`}
          />
        </div>

        {/* Menu */}
        <div className="hidden md:flex items-center space-x-12">
          {["Home", "Products", "About", "Contact"].map((item) => (
            <a
              key={item}
              href={`/${item.toLowerCase() === "home" ? "" : item.toLowerCase()}`}
              className={`${styles.menuItem} group`}
            >
              <span className="relative z-10 text-[#3F2F1A] font-medium text-lg tracking-wide transition-colors duration-500 group-hover:text-white">
                {item}
              </span>
              <span className={styles.menuBackground} />
              <span className={styles.shineEffect} />
            </a>
          ))}
        </div>

        {/* Icons */}
        <div className="hidden md:flex items-center space-x-7">
          <a href="/wishlist" className="p-2"><Heart size={26} className="text-[#4A3C2A] hover:text-[#C44536] transition" /></a>
          
          <a href="/cart" className="relative p-2">
            <ShoppingCart size={26} className="text-[#4A3C2A] hover:text-[#C44536] transition hover:rotate-12" />
            <span className={`${styles.cartBadge} ${styles.pulseSlow} absolute -top-2 -right-2 text-white text-xs font-bold rounded-full w-7 h-7 flex items-center justify-center`}>
              3
            </span>
          </a>
          
          <a href="/account" className="p-2"><User size={26} className="text-[#4A3C2A] hover:text-[#C44536] transition" /></a>
        </div>

        {/* Mobile */}
        <div className="md:hidden">
          <button className="p-2">
            <Menu size={32} className="text-[#4A3C2A] hover:text-[#C44536] transition hover:rotate-90" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;