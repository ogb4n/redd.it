import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebase"; // Remplace par le chemin correct vers ton fichier de configuration Firebase

interface Sub {
  id: string;
  name: string;
  description?: string;
  createdAt?: string;
}

export const ExplorePage: React.FC = () => {
  document.title = "Explorer les Subs - Redd.it";
  const [subs, setSubs] = useState<Sub[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubs = async () => {
      try {
        const subsCollection = collection(db, "subs");
        const snapshot = await getDocs(subsCollection);
        const subsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Sub[];
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

  const handleSubClick = (subName: string) => {
    navigate(`/r/${subName}`); // Redirige vers la page du sub
  };

  if (loading) return <div>Chargement des subs...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Explorer les Subs</h1>
      {subs.length === 0 ? (
        <p>Aucun sub trouvé.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {subs.map((sub) => (
            <li
              key={sub.id}
              className="border rounded-lg p-4 shadow hover:shadow-lg cursor-pointer transition"
              onClick={() => handleSubClick(sub.id)}
            >
              <h2 className="text-xl font-semibold">{sub.name}</h2>
              {sub.description && (
                <p className="text-gray-600 mt-2">{sub.description}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
