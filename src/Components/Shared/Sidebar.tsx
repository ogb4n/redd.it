import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ExploreIcon from "@mui/icons-material/Explore";
import { Link } from "react-router-dom";
import { Divider } from "@mui/material";
import { useAuth } from "../../utils/AuthContext";
import { db } from "../../utils/firebase";
import { collection, doc, getDoc } from "firebase/firestore";

const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const [followedSubs, setFollowedSubs] = useState<string[]>([]);

  useEffect(() => {
    const fetchFollowedSubs = async () => {
      if (user) {
        try {
          const userDocRef = doc(db, "users", user.uid); // Utilisez l'UID comme ID du document
          const snapshot = await getDoc(userDocRef);

          if (snapshot.exists()) {
            const userData = snapshot.data();
            setFollowedSubs(userData.followedSubs || []); // Assurez-vous que followedSubs existe
          } else {
            console.log("No document found for UID:", user.uid);
          }
        } catch (error) {
          console.error("Error fetching followedSubs:", error);
        }
      }
    };

    fetchFollowedSubs();
  }, [user]);
  return (
    <aside className="fixed mt-[3.5rem] w-[17rem] h-full bg-[#ffffff] border-r text-base text-neutral border-neutral border-opacity-30 p-4">
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
      <Divider className="my-4" />
      {user && followedSubs.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-2">Communautés</h2>
          <ul className="space-y-2">
            {followedSubs.map((sub) => (
              <li key={sub}>
                <Link
                  to={`/r/${sub}`}
                  className="block px-4 py-2 rounded hover:bg-gray-200"
                >
                  {sub}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
