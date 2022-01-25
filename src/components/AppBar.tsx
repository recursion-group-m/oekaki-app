import React from "react";
import { Box, Toolbar, Typography } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../styles";

const AppBar = () => (
  <ThemeProvider theme={theme}>
    <Box sx={{ flexGrow: 1 }}>
      <MuiAppBar position="static" style={{ backgroundColor: theme.palette.success.main }}>
        <Toolbar>
          <Typography
            variant="h5"
            component="div"
            sx={{
              flexGrow: 1,
              color: "black",
              display: "flex",
            }}
          >
            Oekaki App
          </Typography>
        </Toolbar>
      </MuiAppBar>
    </Box>
  </ThemeProvider>
);

export default AppBar;
