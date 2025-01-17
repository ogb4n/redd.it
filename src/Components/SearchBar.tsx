import React, { useState } from "react";
import Stack from "@mui/joy/Stack";
import { useNavigate } from "react-router-dom";
import { FormLabel, Input, SvgIcon } from "@mui/joy";

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
      <FormLabel className="input input-sm input-bordered bg-[#f4f3f4cc] text-black flex items-center gap-2">
        <Input
          type="text"
          className="grow"
          placeholder={placeholder}
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />

        <SvgIcon className="h-4 w-4 opacity-70">
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </SvgIcon>
      </FormLabel>
    </Stack>
  );
};

export default SearchBar;
