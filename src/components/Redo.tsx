import React from "react";
import IconButton from "@mui/material/IconButton";
import RedoIcon from "@mui/icons-material/Redo";

type Props = {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const Redo: React.VFC<Props> = ({ onClick }) => (
  <IconButton aria-label="redo" onClick={onClick}>
    <RedoIcon />
  </IconButton>
);

export default Redo;
