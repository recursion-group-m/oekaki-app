import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
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
      <Grid>
        <Button
          variant="contained"
          size="large"
          endIcon={<PersonAddAlt1Icon />}
          sx={{
            background: theme.palette.secondary.main,
            "&:hover": {
              background: theme.palette.secondary.dark,
            },
          }}
        >
          招待
        </Button>
        <Button
          variant="contained"
          size="large"
          endIcon={<SendIcon />}
          sx={{
            background: theme.palette.secondary.main,
            "&:hover": {
              background: theme.palette.secondary.dark,
            },
          }}
        >
          スタート
        </Button>
      </Grid>
    </Grid>
  </ThemeProvider>
);

export default Lobby;
