import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ExploreIcon from "@mui/icons-material/Explore";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <aside className="w-[17rem] bg-[#ffffff] border-r text-base text-neutral border-neutral border-opacity-30 p-4">
      <ul className="space-y-2">
        <li>
          <Link
            to="/?feed=home"
            className="block px-4 py-2 rounded hover:bg-gray-200"
          >
            <SearchIcon className="mr-2" />
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/r/popular"
            className="block px-4 py-2 rounded hover:bg-gray-200"
          >
            <TrendingUpIcon className="mr-2" />
            Popular
          </Link>
        </li>
        <li>
          <Link
            to="/explore"
            className="block px-4 py-2 rounded hover:bg-gray-200"
          >
            <ExploreIcon className="mr-2" />
            Explore
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
