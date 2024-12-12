import React from "react";
import Button from "../Shared/Button";
import SearchBar from "../SearchBar";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="w-full bg-white h-[56px] py-4 px-6 flex items-center justify-between border-b border-neutral border-opacity-25">
      <div className="text-2xl font-bold text-primary">
        <Link to="/">Redd.it</Link>
      </div>
      <div className="w-[33rem] flex">
        <SearchBar />
      </div>
      <div className="flex space-x-4 text-base">
        <Button
          label="Login"
          color="bg-primary hover:bg-accent"
          onClick={() => {}}
        />
        <Button
          label="Sign Up"
          color="bg-primary hover:bg-accent"
          onClick={() => {}}
        />
      </div>
    </nav>
  );
};

export default Navbar;
