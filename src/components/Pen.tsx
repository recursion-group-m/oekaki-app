import React from "react";
import IconButton from "@mui/material/IconButton";
import BrushIcon from "@mui/icons-material/Brush";

type Props = {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const Pen: React.VFC<Props> = ({ onClick }) => (
  <IconButton aria-label="pen" onClick={onClick}>
    <BrushIcon />
  </IconButton>
);

export default Pen;
