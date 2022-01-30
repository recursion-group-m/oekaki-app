import React from "react";
import IconButton from "@mui/material/IconButton";
import ColorizeIcon from "@mui/icons-material/Colorize";
import Tooltip from "@mui/material/Tooltip";

type Props = {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const Dropper: React.VFC<Props> = ({ onClick }) => (
  <Tooltip title="スポイト" placement="top">
    <IconButton aria-label="dropper" onClick={onClick}>
      <ColorizeIcon />
    </IconButton>
  </Tooltip>
);

export default Dropper;
