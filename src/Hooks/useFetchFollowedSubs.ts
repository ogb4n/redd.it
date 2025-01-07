import { useState, useEffect } from "react";
import { User } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../utils/firebase";

const useFetchFollowedSubs = (
  user: User | null
): { subs: string[]; loading: boolean; error: Error | null } => {
  const [subs, setSubs] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchFollowedSubs = async () => {
      if (!user) {
        setSubs([]); 
        setLoading(false);
        return;
      }

      try {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setSubs(userData?.saved?.followedSubs || []);
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchFollowedSubs();
  }, [user]);

  return { subs, loading, error };
};

export default useFetchFollowedSubs;
