import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchSubs } from "../../Hooks/useFetchSubs";
import { Stack, Typography } from "@mui/material";
import { List, ListItem, Button } from "@mui/joy";

export const ExplorePage: React.FC = () => {
  const { subs, loading, error } = useFetchSubs();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Explorer les Subs - Redd.it";
  }, []);

  const handleSubClick = (subId: string) => {
    navigate(`/r/${subId}`);
  };

  if (loading) return <Stack>Chargement des subs...</Stack>;
  if (error) return <Stack>{error}</Stack>;

  return (
    <Stack className="p-4">
      <Typography className="text-2xl font-bold text-black mb-4">
        Explorer les Subs
      </Typography>
      {subs.length === 0 ? (
        <p>Aucun sub trouvé.</p>
      ) : (
        <List className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {subs.map((sub) => (
            <ListItem
              key={sub.id}
              className="border rounded-lg p-4 shadow transition"
            >
              <Button
                className="w-full text-left"
                onClick={() => handleSubClick(sub.id)}
              >
                <Typography className="text-xl text-black font-semibold">
                  {sub.id}
                </Typography>
                {sub.description && (
                  <Typography className="text-slate-800 mt-2 text-sm">
                    {sub.description}
                  </Typography>
                )}
              </Button>
            </ListItem>
          ))}
        </List>
      )}
    </Stack>
  );
};
