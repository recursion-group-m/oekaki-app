import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import theme from "../styles";
import UserList from "../components/UserList";

const Lobby = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Grid
      container
      component="main"
      display="flex"
      sx={{
        alignItems: { sm: "center" },
        height: "100vh",
        p: 3,
      }}
    >
      <Grid
        item
        xs={12}
        sm={6}
        sx={{
          height: { xs: "75%", sm: "100%" },
        }}
      >
        <Box
          sx={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <UserList />
        </Box>
      </Grid>
    </Grid>
  </ThemeProvider>
);

export default Lobby;
