import React from "react";
import Box from "@mui/material/Box";
import CheckIcon from "@mui/icons-material/Check";
import Button from "@mui/material/Button";

const CorrectButton = () => (
  <Box sx={{ width: "1rem", height: "1rem", ml: 1 }}>
    <Button variant="contained" sx={{ borderRadius: "5em" }}>
      <CheckIcon />
    </Button>
  </Box>
);

export default CorrectButton;
