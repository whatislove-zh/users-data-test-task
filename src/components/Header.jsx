import { AppBar, Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import logo from "../assets/Logo.svg";
import { StyledBtn } from "./StyledBtn";

import React from "react";

export const Header = () => {
  return (
    <Box>
      <AppBar position="static" sx={{ background: "none" }}>
        <Toolbar
          sx={{ display: "flex", justifyContent: "space-between", mx: "60px" }}
        >
          <Box
            component="img"
            alt="logo"
            src={logo}
            height="26px"
            width="104px"
          />
          <Box sx={{ my: "13px" }}>
            <StyledBtn title="Users" anchor="#getReq" />
            <StyledBtn title="Sign up" anchor="#putReq" />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
