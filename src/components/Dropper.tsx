import React from "react";
import IconButton from "@mui/material/IconButton";
import ColorizeIcon from "@mui/icons-material/Colorize";

type Props = {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const Dropper: React.VFC<Props> = ({ onClick }) => (
  <IconButton aria-label="dropper" onClick={onClick}>
    <ColorizeIcon />
  </IconButton>
);

export default Dropper;
