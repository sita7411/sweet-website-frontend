import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import Spinner from "../components/Spinner/Spinner"; 
import ToastProvider from "../components/ToastProvider";
const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Show spinner on route change
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1000); // minimum 1 sec
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // If loading, show ONLY spinner
  if (loading) return <Spinner />;

  // Else render admin layout
  return (
    <div className="relative min-h-screen bg-[var(--bg-main)]/30 ">
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      <div className="lg:ml-64 min-h-screen flex flex-col">
        <Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

        <main className="flex-1 p-4 md:p-7 pt-28 sm:pt-22 md:pt-28 lg:pt-26 xl:pt-30 ">
          <Outlet />
        </main>
      </div>
      <ToastProvider />
    </div>
  );
};

export default AdminLayout;
