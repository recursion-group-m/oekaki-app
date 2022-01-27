import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseLine from "@mui/material/CssBaseline";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import PaintImage from "../images/drawing.svg";
import theme from "../styles";

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
            <Typography variant="h2">Oekaki App</Typography>
            <Typography>みんなで遊ぼう！お絵かきアプリ！</Typography>
          </Box>
          <Link to="/lobby" style={{ textDecoration: "none" }}>
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
          </Link>
        </Box>
      </Grid>
      <Grid item sm={6}>
        <img style={{ width: "100%", height: "100%" }} src={PaintImage} alt="drawing img" />
      </Grid>
    </Grid>
  </ThemeProvider>
);

export default Top;
