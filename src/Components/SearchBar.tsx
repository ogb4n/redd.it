import React, { useState, KeyboardEvent } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch();
    }
  };

  const placeholder = "Search for posts, communities, and users";

  return (
    <>
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        className="input bg-[#e5ebee] text-neutral w-full h-10 max-w-xs focus:bg-white transition-all 1s"
      />
    </>
  );
};

export default SearchBar;
