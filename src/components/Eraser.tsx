import IconButton from "@mui/material/IconButton";
import AutoFixNormalIcon from "@mui/icons-material/AutoFixNormal";
import React from "react";

type Props = {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const Eraser: React.VFC<Props> = ({ onClick }) => (
  <IconButton aria-label="eraser" onClick={onClick}>
    <AutoFixNormalIcon />
  </IconButton>
);

export default Eraser;
