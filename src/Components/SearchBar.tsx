import React, { useState } from "react";
import Stack from "@mui/joy/Stack";
import { useNavigate } from "react-router-dom";

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const placeholder = "Search for posts, communities, and users";

  return (
    <Stack>
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="input bg-[#e5ebee] text-neutral w-full h-10 max-w-xs focus:bg-white transition-all 1s"
      />
    </Stack>
  );
};

export default SearchBar;
