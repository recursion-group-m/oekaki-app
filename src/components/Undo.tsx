import React from "react";
import IconButton from "@mui/material/IconButton";
import UndoIcon from "@mui/icons-material/Undo";
import Tooltip from "@mui/material/Tooltip";

type Props = {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const Undo: React.VFC<Props> = ({ onClick }) => (
  <Tooltip title="ひとつ戻る" placement="top">
    <IconButton aria-label="undo" onClick={onClick}>
      <UndoIcon />
    </IconButton>
  </Tooltip>
);

export default Undo;
