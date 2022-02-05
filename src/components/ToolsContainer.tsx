import React, { useState } from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import BrushIcon from "@mui/icons-material/Brush";
import AutoFixNormalIcon from "@mui/icons-material/AutoFixNormal";
import ColorizeIcon from "@mui/icons-material/Colorize";
import { ThemeProvider } from "@mui/material/styles";

import ColorPalette from "./ColorPalette";
import LineWidth from "./LineWidth";
import Redo from "./Redo";
import Undo from "./Undo";

import theme from "../styles";

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
  const [alignment, setAlignment] = useState("pen");
  // const url = "oekaki-app/lobby";
  const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string | null) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  return (
    <Box sx={{ pt: 5, width: "75%" }}>
      <Stack direction={{ xs: "column", sm: "row" }} sx={{ display: "flex", justifyContent: "space-between" }}>
        <Stack>
          <Stack direction="row" sx={{ display: "flex", justifyContent: "start", alignItems: "center" }}>
            <ThemeProvider theme={theme}>
              <ToggleButtonGroup color="secondary" value={alignment} exclusive onChange={handleChange}>
                <ToggleButton
                  value="pen"
                  onClick={() => {
                    handleChangeToolType("pen");
                  }}
                >
                  <BrushIcon /> ペン
                </ToggleButton>
                <ToggleButton
                  value="eraser"
                  onClick={() => {
                    handleChangeToolType("eraser");
                  }}
                >
                  <AutoFixNormalIcon /> 消しゴム
                </ToggleButton>
                <ToggleButton
                  value="dropper"
                  onClick={() => {
                    handleChangeToolType("dropper");
                  }}
                >
                  <ColorizeIcon />
                  スポイト
                </ToggleButton>
              </ToggleButtonGroup>
            </ThemeProvider>
            <Box sx={{ pl: 4 }}>
              <ColorPalette lineColor={lineColor} onChange={(e: string) => setLineColor(e)} />
            </Box>
            <Box sx={{ pl: 4 }}>
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
        <Box>
          {/* <CompleteButton url={url} /> */}
          {/* <Link to="/commentroom" style={{ textDecoration: "none" }}>
            <Box>CommentRoomへGo!!</Box>
          </Link> */}
        </Box>
      </Stack>
    </Box>
  );
};

export default ToolsContainer;
