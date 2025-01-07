import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";
import { useAuth } from "../../utils/AuthContext";

const FillLayout: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!user) {
    navigate("/");
  }

  return (
    <div className="h-screen flex flex-col">
      <Navbar />


      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default FillLayout;
