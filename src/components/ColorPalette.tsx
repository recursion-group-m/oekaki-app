import React, { useState } from "react";
import { ColorResult, SketchPicker } from "react-color";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

type Props = {
  lineColor: string;
  onChange: (event: string) => void;
};

const ColorPalette: React.VFC<Props> = ({ lineColor, onChange }) => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const handleChangeComplete = (color: ColorResult) => onChange(color.hex);

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  return (
    <div>
      {displayColorPicker ? (
        <Box sx={{ position: "absolute", bottom: "23%", left: "40%", zIndex: "tooltip" }}>
          <SketchPicker color={lineColor} onChangeComplete={handleChangeComplete} />
        </Box>
      ) : null}
      <Button
        onClick={handleClick}
        variant="contained"
        sx={{
          bgcolor: lineColor,
          color: lineColor,
          height: "100%",
          "&:hover": { color: lineColor, bgcolor: lineColor },
        }}
      >
        COLOR
      </Button>
    </div>
  );
};

export default ColorPalette;
