import React from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import ColorPalette from "./ColorPalette";
import Dropper from "./Dropper";
import Eraser from "./Eraser";
import LineWidth from "./LineWidth";
import Pen from "./Pen";
import Redo from "./Redo";
import Undo from "./Undo";

import { ToolType } from "../types";

type Props = {
  handleChangeToolType: (type: ToolType) => void;
  lineColor: string;
  setLineColor: React.Dispatch<React.SetStateAction<string>>;
  handleUndo: () => void;
  handleRedo: () => void;
  lineWidth: number;
  setLineWidth: React.Dispatch<React.SetStateAction<number>>;
};

const ToolsContainer: React.VFC<Props> = (props) => {
  const { handleChangeToolType, lineColor, setLineColor, handleUndo, handleRedo, lineWidth, setLineWidth } = props;

  return (
    <Box sx={{ pt: 5, width: "75%" }}>
      <Stack>
        <Stack direction="row" sx={{ display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
          <Box>
            <Pen
              onClick={() => {
                handleChangeToolType("pen");
              }}
            />
          </Box>
          <Box>
            <Eraser
              onClick={() => {
                handleChangeToolType("eraser");
              }}
            />
          </Box>
          <Box>
            <Dropper
              onClick={() => {
                handleChangeToolType("dropper");
              }}
            />
          </Box>
          <Box>
            <ColorPalette
              lineColor={lineColor}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLineColor(e.target.value)}
            />
          </Box>
          <Box>
            <Undo onClick={handleUndo} />
            <Redo onClick={handleRedo} />
          </Box>
        </Stack>
        <Box sx={{ width: "30%", pt: 3 }}>
          <LineWidth
            width={lineWidth}
            onChange={(event: Event, value: number | number[], activeThumb: number) => setLineWidth(Number(value))}
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default ToolsContainer;
