import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import theme from "../styles";
import UserList from "../components/UserList";

const Lobby = () => {
  const [open, setOpen] = useState(false);
  const url = "http://localhost:3000/oekaki-app/lobby";

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
              <Typography variant="h5">Oekaki App</Typography>
            </Box>
            <UserList />
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
            <Typography variant="h3">Oekaki App</Typography>
          </Box>
          <Box display="flex">
            <Box sx={{ pr: 1 }}>
              <Button
                variant="contained"
                onClick={handleClickOpen}
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
              <Dialog open={open} onClose={handleClose}>
                <Box display="flex" justifyContent="space-between">
                  <DialogTitle>招待</DialogTitle>
                  <DialogActions>
                    <IconButton aria-label="close" onClick={handleClose}>
                      <CloseIcon />
                    </IconButton>
                  </DialogActions>
                </Box>
                <DialogContent>
                  <DialogContentText>下のリンクをコピーして共有しよう！</DialogContentText>
                  <Box sx={{ pt: 4 }}>
                    <CopyToClipboard text={url}>
                      <IconButton size="small">
                        <ContentCopyIcon />
                      </IconButton>
                    </CopyToClipboard>
                    <SyntaxHighlighter>{url}</SyntaxHighlighter>
                  </Box>
                </DialogContent>
              </Dialog>
            </Box>
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
