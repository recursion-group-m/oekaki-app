import React from "react";
import IconButton from "@mui/material/IconButton";
import BrushIcon from "@mui/icons-material/Brush";
import Tooltip from "@mui/material/Tooltip";

type Props = {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const Pen: React.VFC<Props> = ({ onClick }) => (
  <Tooltip title="ペン" placement="top">
    <IconButton aria-label="pen" onClick={onClick}>
      <BrushIcon />
    </IconButton>
  </Tooltip>
);

export default Pen;
