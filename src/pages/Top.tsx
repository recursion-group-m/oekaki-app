import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

const theme = createTheme({
  palette: {
    warning: {
      main: "#eafdb4",
    },
    secondary: {
      main: "#6c63ff",
    },
  },
});

const Top = () => (
  <ThemeProvider theme={theme}>
    <Grid
      container
      component="main"
      sx={{
        height: "100vh",
        p: 3,
        background: theme.palette.warning.main,
      }}
    >
      <Grid>Oekaki App</Grid>
      <Grid>みんなで遊ぼう！お絵かきアプリ！ 始める！</Grid>
      <Grid>imgおくところ</Grid>
    </Grid>
  </ThemeProvider>
);

export default Top;
