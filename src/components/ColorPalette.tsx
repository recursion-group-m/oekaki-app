import React from "react";

type Props = {
  lineColor: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const ColorPalette: React.VFC<Props> = ({ lineColor, onChange }) => (
  <input type="color" value={lineColor} onChange={onChange} />
);

export default ColorPalette;
