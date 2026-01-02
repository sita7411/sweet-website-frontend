// Layout.jsx
import React from "react";
import TopBar from "./components/Navbar/TopBar";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

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
