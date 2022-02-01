import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  // typography: {
  //   fontFamily: ["Neonderthaw", "cursive"].join(","),
  // },
  palette: {
    background: {
      default: "#eafdb4",
    },
    success: {
      main: "#C7E966",
    },
    secondary: {
      main: "#6c63ff",
      dark: "#6a5acd",
      light: "#8680FF",
    },
  },
});

export default theme;
