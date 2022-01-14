import React from "react";
import { Box, Toolbar, Typography } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";

const AppBar = () => (
  <Box sx={{ flexGrow: 1 }}>
    <MuiAppBar position="static" style={{ backgroundColor: "#000080" }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Oekaki App
        </Typography>
      </Toolbar>
    </MuiAppBar>
  </Box>
);

export default AppBar;
