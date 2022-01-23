import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Top from "./pages/Top";
import Main from "./pages/Main";

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

const App = () => (
  <div style={{ textAlign: "center", height: "100%" }}>
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
        <Grid>Oekaki App みんなで遊ぼう！お絵かきアプリ！ 始める！</Grid>
        <Grid>imgおくところ</Grid>
      </Grid>
    </ThemeProvider>

    <Routes>
      <Route path="/" element={<Top />} />
      <Route path="/main" element={<Main />} />
    </Routes>
  </div>
);

export default App;
