import React from "react";
import IconButton from "@mui/material/IconButton";
import ColorizeIcon from "@mui/icons-material/Colorize";
import { createSvgIcon } from "@mui/material/utils";

const Dropper: React.VFC = () => (
  <IconButton aria-label="dropper">
    <ColorizeIcon />
  </IconButton>
);

export default Dropper;
