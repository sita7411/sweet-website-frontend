import React from "react";
import { ShoppingCart, Heart, User } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-[#FFF8E7] shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="/Logo_Marvel.png"
            alt="Marvel Crunch Chikki"
            className="h-12 w-auto mr-3"
          />
        </div>

        {/* Menu Items */}
        <div className="hidden md:flex space-x-8 items-center">
          <a
            href="/"
            className="text-[#3A2E2E] hover:text-[#C42B1C] font-semibold transition-colors duration-300"
          >
            Home
          </a>
          <a
            href="/products"
            className="text-[#3A2E2E] hover:text-[#C42B1C] font-semibold transition-colors duration-300"
          >
            Products
          </a>
          <a
            href="/about"
            className="text-[#3A2E2E] hover:text-[#C42B1C] font-semibold transition-colors duration-300"
          >
            About
          </a>
          <a
            href="/contact"
            className="text-[#3A2E2E] hover:text-[#C42B1C] font-semibold transition-colors duration-300"
          >
            Contact
          </a>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-5">
          <a
            href="/wishlist"
            className="text-[#3A2E2E] hover:text-[#C42B1C] transition-colors duration-300"
          >
            <Heart size={24} />
          </a>
          <a
            href="/cart"
            className="text-[#3A2E2E] hover:text-[#C42B1C] relative transition-colors duration-300"
          >
            <ShoppingCart size={24} />
            <span className="absolute -top-2 -right-2 bg-[#C42B1C] text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
              3
            </span>
          </a>
          <a
            href="/account"
            className="text-[#3A2E2E] hover:text-[#C42B1C] transition-colors duration-300"
          >
            <User size={24} />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button className="text-[#3A2E2E] hover:text-[#C42B1C] transition-colors duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 8h16M4 16h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
