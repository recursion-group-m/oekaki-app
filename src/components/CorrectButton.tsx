import React from "react";
import Box from "@mui/material/Box";
import CheckIcon from "@mui/icons-material/Check";
import Button from "@mui/material/Button";
import theme from "../styles";

const CorrectButton = () => (
  <Box sx={{ width: "1rem", ml: 1 }}>
    <Button variant="contained" sx={{ borderRadius: "5em", bgcolor: theme.palette.secondary.main }}>
      <CheckIcon />
    </Button>
  </Box>
);

export default CorrectButton;
