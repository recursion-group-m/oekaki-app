import { createTheme } from "@mui/material/styles";

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

export default theme;
