import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseLine from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PaintImage from "../images/drawing.svg";
import theme from "../styles";
import LoginButton from "../components/LoginButton";

const Top = () => (
  <ThemeProvider theme={theme}>
    <CssBaseLine />
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
          height: { xs: "50%", sm: "100%" },
        }}
      >
        <Box
          sx={{
            height: "100%",
            display: "flex",
            justifyContent: { xs: "flex-end", sm: "center" },
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box sx={{ pb: 5 }}>
            <Typography variant="h2" sx={{ fontFamily: ["Neonderthaw", "cursive"].join(",") }}>
              Oekaki App
            </Typography>
            <Typography>みんなで遊ぼう！お絵かきアプリ！</Typography>
          </Box>
          <LoginButton buttonName="はじめる！" url="main" />
        </Box>
      </Grid>
      <Grid item sm={6}>
        <img style={{ width: "100%", height: "100%" }} src={PaintImage} alt="drawing img" />
      </Grid>
    </Grid>
  </ThemeProvider>
);

export default Top;
