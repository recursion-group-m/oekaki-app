import Konva from "konva";
import React, { useRef, useState } from "react";
import { Layer, Line, Stage } from "react-konva";
import shortid from "shortid";
// import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal';
import { ThemeProvider } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import theme from "../styles";

import Undo from "./Undo";
import Redo from "./Redo";
import Pen from "./Pen";
import Eraser from "./Eraser";
import Dropper from "./Dropper";
import LineWidth from "./LineWidth";
import ColorPalette from "./ColorPalette";

import { LineType, ToolType } from "../types";

type Props = {
  stageRef: React.RefObject<Konva.Stage>;
  lines: LineType[];
  setLines: React.Dispatch<React.SetStateAction<LineType[]>>;
  messageText: string;
  setMessageText: React.Dispatch<React.SetStateAction<string>>;
  handleTextMessage: () => void;
  tool: ToolType;
};

function getStageWidth(): number {
  const w = window.parent.screen.width;
  if (w < 600) {
    return w * 0.95;
  }
  return w * 0.6;
}

function getStageHeight(): number {
  const w = window.parent.screen.width;
  const h = window.parent.screen.height;
  if (w < 600) {
    return h * 0.7;
  }
  return h * 0.6;
}

const Canvas: React.VFC<Props> = (props) => {
  const { stageRef, lines, setLines, messageText, setMessageText, handleTextMessage, tool } = props;
  const [lineWidth, setLineWidth] = useState(5);
  const [lineColor, setLineColor] = useState("#000000");
  // const [tool, setTool] = useState<ToolType>("pen");
  const isDrawing = useRef<boolean>(false);
  const [history, setHistory] = useState<LineType[][]>([[]]);
  const [historyStep, setHistoryStep] = useState(0);
  const stageWidth = getStageWidth();
  const stageHeight = getStageHeight();

  const handleMouseDown = (event: Konva.KonvaEventObject<MouseEvent>) => {
    if (tool === "dropper") {
      return;
    }
    isDrawing.current = true;
    const stage = event.target.getStage();
    const point = stage?.getPointerPosition();
    if (point !== null && point !== undefined) {
      setLines([...lines, { tool, points: [point.x, point.y], color: lineColor, width: lineWidth }]);
    }
  };

  const handleMouseMove = (event: Konva.KonvaEventObject<MouseEvent>) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }
    const stage = event.target.getStage();
    const point = stage?.getPointerPosition();
    const lastLine = lines[lines.length - 1];
    // add point
    if (point !== null && point !== undefined) {
      lastLine.points = lastLine.points.concat([point.x, point.y]);
    }

    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    if (tool === "dropper") {
      return;
    }
    isDrawing.current = false;
    setLines(lines.slice(0, historyStep + 1));
    setHistory(history.slice(0, historyStep + 1).concat([lines.slice()]));
    setHistoryStep(historyStep + 1);
  };

  // const handleChangeToolType = (type: ToolType) => setTool(type);

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

  const handleChangePalette = (event: Konva.KonvaEventObject<MouseEvent>) => {
    if (tool !== "dropper") {
      return;
    }
    const stroke = String(event.target.getAttr("stroke"));
    setLineColor(stroke);
  };

  return (
    <Grid sm={9} sx={{ pt: "3rem" }} item>
      <Stack sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ display: "flex" }}>
          <Stage
            ref={stageRef}
            onMouseDown={handleMouseDown}
            onMousemove={handleMouseMove}
            onMouseup={handleMouseUp}
            width={stageWidth}
            height={stageHeight}
            style={{ boxShadow: "10px 5px 5px gray", border: "1px solid #f5f5f5", background: "white" }}
            sx={{ position: "relative", zIndex: "tooltip" }}
          >
            <Layer>
              {lines.map((line) => (
                <Line
                  key={shortid.generate()}
                  points={line.points}
                  stroke={line.color}
                  strokeWidth={line.width}
                  tension={0.5}
                  lineCap="round"
                  globalCompositeOperation={line.tool === "eraser" ? "destination-out" : "source-over"}
                  onMouseDown={handleChangePalette}
                />
              ))}
            </Layer>
          </Stage>
          <ThemeProvider theme={theme}>
            <Typography
              variant="h3"
              sx={{
                zIndex: "modal",
                position: "absolute",
                top: "5%",
                left: "8%",
                color: theme.palette.secondary.main,
              }}
            >
              Oekaki App
            </Typography>
          </ThemeProvider>
        </Box>
        <Box sx={{ pt: 5, width: "75%" }}>
          <Stack>
            <Stack direction="row" sx={{ display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
              {/* <Box>
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
              </Box> */}
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
      </Stack>
    </Grid>
  );
};

export default Canvas;
