// src/Layout/AdminLayout.jsx
import React from "react";
import Sidebar from "./components/Sidebar/Sidebar";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 p-6 min-h-screen">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
