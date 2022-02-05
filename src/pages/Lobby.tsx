import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Typography from "@mui/material/Typography";
import theme from "../styles";
import UserList from "../components/UserList";

const Lobby = () => {
  const userAccountList = [
    { userName: "ゲスト1" },
    { userName: "ゲスト2" },
    { userName: "ゲスト3" },
    { userName: "ゲスト4" },
    { userName: "ゲスト5" },
    { userName: "ゲスト6" },
  ];
  return (
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
            height: { xs: "80%", sm: "100%" },
          }}
        >
          <Box
            sx={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                pb: 2,
                display: { xs: "block", sm: "none" },
              }}
            >
              <Typography variant="h5" sx={{ fontFamily: ["Neonderthaw", "cursive"].join(",") }}>
                Oekaki App
              </Typography>
            </Box>
            <UserList userAccountList={userAccountList} />
          </Box>
        </Grid>
        <Grid
          item
          sm={6}
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          sx={{
            height: { xs: "20%", sm: "100%" },
            width: "100%",
          }}
        >
          <Box
            sx={{
              pb: 5,
              display: { xs: "none", sm: "block" },
            }}
          >
            <Typography variant="h3" sx={{ fontFamily: ["Neonderthaw", "cursive"].join(",") }}>
              Oekaki App
            </Typography>
          </Box>
          <Box display="flex">
            <Box sx={{ pr: 1 }}>{/* <InviteButton url={url} /> */}</Box>
            <Link to="/main" style={{ textDecoration: "none" }}>
              <Box sx={{ pl: 1 }}>
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
              </Box>
            </Link>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Lobby;
