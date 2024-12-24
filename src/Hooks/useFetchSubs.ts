import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase";
import { ISub } from "../types/Sub";

export const useFetchSubs = () => {
  const [subs, setSubs] = useState<ISub[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubs = async () => {
      try {
        const subsCollection = collection(db, "subs");
        const snapshot = await getDocs(subsCollection);
        const subsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as ISub[];
        setSubs(subsData);
      } catch (err) {
        setError("Erreur lors du chargement des subs.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubs();
  }, []);

  return { subs, loading, error };
};
