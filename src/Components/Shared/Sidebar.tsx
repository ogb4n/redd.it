import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ExploreIcon from "@mui/icons-material/Explore";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import { Divider } from "@mui/material";
import { useAuth } from "../../utils/AuthContext";
import useFetchFollowedSubs from "../../Hooks/useFetchFollowedSubs";

import { BasicModal } from "./BasicModal";

const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const { subs: followedSubs, loading, error } = useFetchFollowedSubs(user);

  const followedSubsList: React.ReactNode =
    followedSubs.length > 0 ? (
      <ul className="space-y-2">
        {followedSubs.map((sub) => (
          <li key={sub}>
            <Link
              to={`/r/${sub}`}
              className="block px-4 py-2 my-2 rounded hover:bg-gray-200"
            >
              {sub}
            </Link>
            <BasicModal
              bgcolor="#10b981"
              hoverBgcolor="#059669"
              labelButton="Create yours"
              icon={<AddIcon />}
            >
              <AddIcon />
            </BasicModal>
          </li>
        ))}
      </ul>
    ) : (
      <div>
        <p>No followed communities.</p>
        <BasicModal
          bgcolor="#10b981"
          hoverBgcolor="#059669"
          labelButton="Create yours"
          icon={<AddIcon />}
        >
          <AddIcon />
        </BasicModal>
      </div>
    );

  return (
    <aside className="fixed mt-[3.5rem] w-[17rem] h-full bg-[#ffffff] border-r text-base text-neutral border-neutral border-opacity-30 p-4">
      <ul className="space-y-2 my-2">
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
      <Divider className="my-4" />
      {user && (
        <div>
          <h2 className="text-lg font-semibold my-2">Communautés</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>{error ? <p>Error loading communities.</p> : followedSubsList}</>
          )}
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
