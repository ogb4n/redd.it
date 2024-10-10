import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import { db } from "../utils/firebase";
import { ISub } from "../types";

export const TopSubs: React.FC = () => {
  const [topSubs, setTopSubs] = useState<ISub[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopSubs = async () => {
      try {
        const now = Timestamp.now();
        const yesterday = new Timestamp(
          now.seconds - 24 * 60 * 60,
          now.nanoseconds
        );
        const postsCollection = collection(db, "posts");
        const q = query(postsCollection, where("creationDate", ">", yesterday));
        const snapshot = await getDocs(q);

        const subPostCounts: { [key: string]: number } = {};
        snapshot.docs.forEach((doc) => {
          const post = doc.data();
          const subId = post.subId;
          if (subPostCounts[subId]) {
            subPostCounts[subId]++;
          } else {
            subPostCounts[subId] = 1;
          }
        });

        const sortedSubs = Object.entries(subPostCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([subId]) => subId);

        const subsCollection = collection(db, "subs");
        const subsSnapshot = await getDocs(subsCollection);
        const subsData = subsSnapshot.docs
          .filter((doc) => sortedSubs.includes(doc.id))
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as ISub[];

        setTopSubs(subsData);
      } catch (err) {
        setError("Erreur lors du chargement des top subs.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopSubs();
  }, []);

  if (loading) return <div>Loading Top subs</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        Top subs for the last 24 hours
      </h2>
      <ul>
        {topSubs.map((sub) => (
          <li key={sub.id} className="mb-2">
            <h3 className="text-lg font-bold">{sub.id}</h3>
            <p>{sub.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
