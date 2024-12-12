import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <div className="h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Content Wrapper */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
