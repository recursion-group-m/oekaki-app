import React from "react";
import IconButton from "@mui/material/IconButton";
import UndoIcon from "@mui/icons-material/Undo";

type Props = {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const Undo: React.VFC<Props> = ({ onClick }) => (
  <IconButton aria-label="undo" onClick={onClick}>
    <UndoIcon />
  </IconButton>
);

export default Undo;
