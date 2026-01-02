// Navbar.jsx
import React from "react";
import { ShoppingCart, Heart, User } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-yellow-400 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="/.png" // logo from public folder
            alt="Marvel Crunch Chikki"
            className="h-12 w-auto mr-3"
          />
          <span className="text-2xl font-bold text-red-700">Marvel Crunch</span>
        </div>

        {/* Menu Items */}
        <div className="hidden md:flex space-x-6 items-center">
          <a href="/" className="text-gray-900 hover:text-red-700 font-medium">
            Home
          </a>
          <a href="/products" className="text-gray-900 hover:text-red-700 font-medium">
            Products
          </a>
          <a href="/about" className="text-gray-900 hover:text-red-700 font-medium">
            About
          </a>
          <a href="/contact" className="text-gray-900 hover:text-red-700 font-medium">
            Contact
          </a>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          <a href="/wishlist" className="text-gray-900 hover:text-red-700">
            <Heart size={24} />
          </a>
          <a href="/cart" className="text-gray-900 hover:text-red-700 relative">
            <ShoppingCart size={24} />
            <span className="absolute -top-2 -right-2 bg-red-700 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
              3
            </span>
          </a>
          <a href="/account" className="text-gray-900 hover:text-red-700">
            <User size={24} />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button className="text-gray-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
