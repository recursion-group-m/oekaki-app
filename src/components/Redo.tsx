import React from "react";
import IconButton from "@mui/material/IconButton";
import RedoIcon from "@mui/icons-material/Redo";
import Tooltip from "@mui/material/Tooltip";

type Props = {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const Redo: React.VFC<Props> = ({ onClick }) => (
  <Tooltip title="ひとつ進む" placement="top">
    <IconButton aria-label="redo" onClick={onClick}>
      <RedoIcon />
    </IconButton>
  </Tooltip>
);

export default Redo;
