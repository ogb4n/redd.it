import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";
import SearchBar from "../SearchBar";
import { Auth } from "./Auth";
import { UserMenu } from "../UserMenu";
import { Box, Typography, Input, Button } from "@mui/joy";

const Navbar: React.FC = () => {
  const { user } = useAuth();

  return (
    <Box
      component="header"
      sx={{
        position: "fixed",
        top: 0,
        width: "100%",
        height: 56,
        backgroundColor: "background.surface",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid",
        borderColor: "divider",
        px: 2,
        zIndex: 1100,
      }}
    >
      <Typography
        component={Link}
        to="/"
        sx={{
          textDecoration: "none",
          fontSize: 24,
          color: "green",
          fontWeight: "bold",
        }}
      >
        Redd.it
      </Typography>

      <Box sx={{ width: "33rem", mx: "auto" }}>
        <SearchBar />
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Auth />
        {user && <UserMenu />}
      </Box>
    </Box>
  );
};

export default Navbar;
