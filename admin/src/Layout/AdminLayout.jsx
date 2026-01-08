import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative min-h-screen bg-[var(--bg-main)]/30 flex">

      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      {/* Main content area */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300
          ${isSidebarOpen ? "lg:ml-64" : "lg:ml-0"}
        `}
      >
        {/* Navbar */}
        <Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

        {/* Main */}
        <main
          className="
            flex-1
            p-4 sm:p-5 md:p-6 lg:p-7
            pt-[calc(90px+1rem)] sm:pt-[calc(72px+1.25rem)] md:pt-[calc(80px+1.5rem)] lg:pt-[calc(96px+1.75rem)]
            overflow-auto
          "
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
