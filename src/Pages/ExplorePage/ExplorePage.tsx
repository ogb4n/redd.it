import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchSubs } from "../../Hooks/useFetchSubs";

export const ExplorePage: React.FC = () => {
  const { subs, loading, error } = useFetchSubs();
  const navigate = useNavigate();

  // Gestion du titre de la page
  useEffect(() => {
    document.title = "Explorer les Subs - Redd.it";
  }, []);

  const handleSubClick = (subName: string) => {
    navigate(`/r/${subName}`);
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
              className="border rounded-lg p-4 shadow transition"
            >
              <button
                className="w-full text-left"
                onClick={() => handleSubClick(sub.id)}
              >
                <h2 className="text-xl font-semibold">{sub.id}</h2>
                {sub.description && (
                  <p className="text-gray-600 mt-2 text-sm">
                    {sub.description}
                  </p>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
