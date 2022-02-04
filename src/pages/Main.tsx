import Konva from "konva";
import React, { useRef, useState } from "react";

import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

import Canvas from "../components/Canvas";
import { LineType, ToolType } from "../types";
import theme from "../styles";

import ToolsContainer from "../components/ToolsContainer";

type stageType = Konva.Stage;

const Main = () => {
  const stageRef = useRef<stageType>(null);
  const [lines, setLines] = useState<LineType[]>([]);
  const [tool, setTool] = useState<ToolType>("pen");
  const [history, setHistory] = useState<LineType[][]>([[]]);
  const [historyStep, setHistoryStep] = useState(0);
  const [lineColor, setLineColor] = useState("#000000");
  const [lineWidth, setLineWidth] = useState(5);

  const handleChangeToolType = (type: ToolType) => setTool(type);

  const handleUndo = () => {
    if (historyStep === 0) {
      return;
    }
    setHistoryStep(historyStep - 1);
    setLines(history[historyStep - 1]);
  };

  const handleRedo = () => {
    if (historyStep === history.length - 1) {
      return;
    }
    setHistoryStep(historyStep + 1);
    setLines(history[historyStep + 1]);
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        sx={{
          justifyContent: "center",
          height: "100vh",
          bgcolor: theme.palette.background.default,
        }}
      >
        <Grid sm={9} sx={{ pt: "3rem" }} item>
          <Stack sx={{ display: "flex", alignItems: "center" }}>
            <Canvas
              stageRef={stageRef}
              lines={lines}
              setLines={setLines}
              tool={tool}
              history={history}
              setHistory={setHistory}
              historyStep={historyStep}
              setHistoryStep={setHistoryStep}
              lineColor={lineColor}
              setLineColor={setLineColor}
              lineWidth={lineWidth}
            />
            <ToolsContainer
              handleChangeToolType={handleChangeToolType}
              lineColor={lineColor}
              setLineColor={setLineColor}
              handleUndo={handleUndo}
              handleRedo={handleRedo}
              lineWidth={lineWidth}
              setLineWidth={setLineWidth}
            />
          </Stack>
        </Grid>
      </Stack>
    </div>
  );
};

export default Main;
