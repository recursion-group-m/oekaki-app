import React from "react";
import IconButton from "@mui/material/IconButton";
import BrushIcon from "@mui/icons-material/Brush";

type PenProps = {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const Pen: React.VFC<PenProps> = ({ onClick }) => (
  <IconButton aria-label="pen" onClick={onClick}>
    <BrushIcon />
  </IconButton>
);

export default Pen;
