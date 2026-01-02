import React, { useState } from "react";
import { ShoppingCart, Heart, User, Menu, X } from "lucide-react";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.wrapper}>

        {/* Left Icons */}
        <div className={styles.leftIcons}>
          <a href="/wishlist" className={styles.iconBtn} aria-label="Wishlist">
            <Heart size={20} />
          </a>
        </div>

        {/* Center Logo */}
        <div className={styles.logo}>
          <a href="/">
            <img src="/Logo_Marvel.png" alt="Marvel Crunch Chikki" />
          </a>
        </div>

        {/* Right Icons */}
        <div className={styles.rightIcons}>
          <a href="/account" className={styles.iconBtn} aria-label="Account">
            <User size={20} />
          </a>

          <a
            href="/cart"
            className={`${styles.iconBtn} ${styles.cart}`}
            aria-label="Cart"
          >
            <ShoppingCart size={20} />
            <span className={styles.badge}>3</span>
          </a>

          <button
            className={`${styles.iconBtn} ${styles.menuBtn}`}
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Desktop Menu */}
      <div className={styles.menu}>
        {["Home", "Products", "About", "Contact"].map((item) => (
          <a
            key={item}
            href={`/${item.toLowerCase() === "home" ? "" : item.toLowerCase()}`}
          >
            {item}
          </a>
        ))}
      </div>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${open ? styles.show : ""}`}>
        {["Home", "Products", "About", "Contact"].map((item) => (
          <a
            key={item}
            href={`/${item.toLowerCase() === "home" ? "" : item.toLowerCase()}`}
            onClick={() => setOpen(false)}
          >
            {item}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
 