import React from "react";

type Props = {
  width: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const LineWidth: React.VFC<Props> = ({ width, onChange }) => (
  <input type="range" min="1" max="100" step="1" value={width} onChange={onChange} />
);

export default LineWidth;
