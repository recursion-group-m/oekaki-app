import Konva from "konva";
import React, { useRef, useEffect, useState } from "react";
import { Layer, Line, Stage } from "react-konva";
import shortid from "shortid";
// import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal';
import { ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import theme from "../styles";

import { LineType, ToolType } from "../types";

type Props = {
  stageRef: React.RefObject<Konva.Stage>;
  lines: LineType[];
  setLines: React.Dispatch<React.SetStateAction<LineType[]>>;
  tool: ToolType;
  history: LineType[][];
  setHistory: React.Dispatch<React.SetStateAction<LineType[][]>>;
  historyStep: number;
  setHistoryStep: React.Dispatch<React.SetStateAction<number>>;
  lineColor: string;
  setLineColor: React.Dispatch<React.SetStateAction<string>>;
  lineWidth: number;
};

function getStageHeight(): number {
  const w = window.parent.screen.width;
  const h = window.parent.screen.height;
  if (w < 600) {
    return h * 0.7;
  }
  return h * 0.6;
}

const Canvas: React.VFC<Props> = (props) => {
  const {
    stageRef,
    lines,
    setLines,
    tool,
    history,
    setHistory,
    historyStep,
    setHistoryStep,
    lineColor,
    setLineColor,
    lineWidth,
  } = props;
  const [stageWidth, setStageWidth] = useState(1000);
  const isDrawing = useRef<boolean>(false);
  const parentContainer = useRef<HTMLElement | null>(null);
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

  const handleChangePalette = (event: Konva.KonvaEventObject<MouseEvent>) => {
    if (tool !== "dropper") {
      return;
    }
    const stroke = String(event.target.getAttr("stroke"));
    setLineColor(stroke);
  };

  const checkSize = () => {
    const div = parentContainer.current;
    if (div) {
      setStageWidth(div.offsetWidth);
    }
  };

  useEffect(() => {
    checkSize();
    window.addEventListener("resize", checkSize);
  });

  return (
    <Box sx={{ display: "flex", justifyContent: "center", width: "80%" }} ref={parentContainer}>
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
            top: "7%",
            left: { xs: "15%", sm: "22%" },
            color: theme.palette.secondary.main,
            fontFamily: ["Neonderthaw", "cursive"].join(","),
            fontSize: { xs: "2rem", md: "3rem" },
          }}
        >
          Oekaki App
        </Typography>
      </ThemeProvider>
    </Box>
  );
};

export default Canvas;
