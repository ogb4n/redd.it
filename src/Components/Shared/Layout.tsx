import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <div className="h-full flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Content Wrapper */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex ml-[18rem] mt-[4rem]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
