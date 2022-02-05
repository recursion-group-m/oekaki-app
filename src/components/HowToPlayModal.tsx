import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import theme from "../styles";

const HowToPlayModal = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="text" size="small" sx={{ color: theme.palette.secondary.main }} onClick={handleClickOpen}>
        遊び方
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <Box display="flex" justifyContent="space-between">
          <DialogTitle>遊び方</DialogTitle>
          <DialogActions>
            <IconButton aria-label="close" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </DialogActions>
        </Box>
        <DialogContent>
          <DialogContentText>1. まずは、始めるボタンを押してログイン(サインアップ)しよう！</DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HowToPlayModal;
