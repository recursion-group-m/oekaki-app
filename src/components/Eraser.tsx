import IconButton from '@mui/material/IconButton';
import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal';
import React from 'react';

type EraserProps = {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Eraser: React.VFC<EraserProps> = ({onClick}) => {
  return (
    <IconButton
        aria-label="eraser"
        onClick={onClick}
    >
        <AutoFixNormalIcon />
    </IconButton>
  )
}


export default Eraser;