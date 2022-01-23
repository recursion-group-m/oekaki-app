import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import PaintImage from "../images/drawing.svg";

const theme = createTheme({
  typography: {
    fontFamily: ["Neonderthaw", "cursive"].join(","),
  },
  palette: {
    warning: {
      main: "#eafdb4",
    },
    secondary: {
      main: "#6c63ff",
      dark: "#6a5acd",
    },
  },
});

const Top = () => (
  <ThemeProvider theme={theme}>
    <Grid
      container
      component="main"
      display="flex"
      alignItems="center"
      sx={{
        height: "100vh",
        p: 3,
        background: theme.palette.warning.main,
      }}
    >
      <Grid
        item
        xs={12}
        sm={6}
        sx={{
          height: "100%",
        }}
      >
        <Box
          sx={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box sx={{ pb: 5 }}>
            <Typography variant="h2">Oekaki App</Typography>
            <Typography>みんなで遊ぼう！お絵かきアプリ！</Typography>
          </Box>
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
            はじめる！
          </Button>
        </Box>
      </Grid>
      <Grid item sx={{ display: { xs: "none", sm: "block" } }} sm={6}>
        <img style={{ width: "100%", height: "100%" }} src={PaintImage} alt="making art" />
      </Grid>
    </Grid>
  </ThemeProvider>
);

export default Top;
