// Layout.jsx
import React from "react";
import TopBar from "./Navbar/TopBar";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <TopBar />
      <Navbar />
      <main>
        <Outlet />   {/* This renders the page inside Layout */}
      </main>
      <Footer />
    </div>
  );
}
