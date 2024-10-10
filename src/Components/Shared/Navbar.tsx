import React from "react";
import Button from "../Shared/Button";
import SearchBar from "../SearchBar";
import { Auth } from "./Auth";
import { Link } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";
import { UserMenu } from "../UserMenu";

const Navbar: React.FC = () => {
  const { user } = useAuth();
  return (
    <nav className="fixed w-full bg-white h-[56px] py-4 px-6 flex items-center justify-between border-b border-neutral border-opacity-25">
      <div className="text-2xl font-bold text-primary">
        <Link to="/">Redd.it</Link>
      </div>
      <div className="w-[33rem] mx-auto flex">
        <SearchBar />
      </div>
      <div className="flex space-x-4 text-base">
        <Auth />
        {user && <UserMenu />}
      </div>
    </nav>
  );
};
export default Navbar;
