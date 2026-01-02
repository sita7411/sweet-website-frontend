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
          <button className={styles.iconBtn}>
            <Heart size={20} />
          </button>
        </div>

        {/* Center Logo */}
        <div className={styles.logo}>
          <img src="/Logo_Marvel.png" alt="Marvel Crunch Chikki" />
        </div>

        {/* Right Icons */}
        <div className={styles.rightIcons}>
          <button className={styles.iconBtn}>
            <User size={20} />
          </button>

          <button className={`${styles.iconBtn} ${styles.cart}`}>
            <ShoppingCart size={20} />
            <span className={styles.badge}>3</span>
          </button>

          <button
            className={`${styles.iconBtn} ${styles.menuBtn}`}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Desktop Menu */}
      <div className={styles.menu}>
        {["Home", "Products", "About", "Contact"].map((item) => (
          <a key={item} href={`/${item.toLowerCase() === "home" ? "" : item.toLowerCase()}`}>
            {item}
          </a>
        ))}
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className={styles.mobileMenu}>
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
      )}
    </nav>
  );
};

export default Navbar;
