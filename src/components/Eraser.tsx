import IconButton from "@mui/material/IconButton";
import AutoFixNormalIcon from "@mui/icons-material/AutoFixNormal";
import React from "react";
import Tooltip from "@mui/material/Tooltip";

type Props = {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const Eraser: React.VFC<Props> = ({ onClick }) => (
  <Tooltip title="消しゴム" placement="top">
    <IconButton aria-label="eraser" onClick={onClick}>
      <AutoFixNormalIcon />
    </IconButton>
  </Tooltip>
);

export default Eraser;
