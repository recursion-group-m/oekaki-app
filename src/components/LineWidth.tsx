import React from "react";
import Slider from "@mui/material/Slider";

type Props = {
  width: number;
  onChange: (event: Event, value: number | number[], activeThumb: number) => void;
};

const LineWidth: React.VFC<Props> = ({ width, onChange }) => (
  <Slider value={width} min={1} max={40} step={1} valueLabelDisplay="auto" onChange={onChange} />
);

export default LineWidth;
