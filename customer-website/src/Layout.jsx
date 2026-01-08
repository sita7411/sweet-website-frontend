import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import TopBar from "./components/Navbar/TopBar";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Spinner from "./components/Spinner/Spinner"; 
export default function Layout() {
  const location = useLocation();
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => setLoading(false), 3000);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (loading) return <Spinner />;

  return (
    <div className="relative">
      <TopBar />
      <Navbar />

      <main className="min-h-[80vh] relative">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
