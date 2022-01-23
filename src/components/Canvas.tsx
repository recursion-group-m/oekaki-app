import Konva from "konva";
import React, { useRef, useState } from "react";
import { Layer, Line, Stage } from "react-konva";
import shortid from "shortid";
// import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal';
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Input from "@mui/material/Input";
import CallMissedOutgoingIcon from "@mui/icons-material/CallMissedOutgoing";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Fab from "@mui/material/Fab";
import NavigationIcon from "@mui/icons-material/Navigation";

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
};

const Canvas: React.VFC<Props> = (props) => {
  const { stageRef, lines, setLines } = props;
  const [lineWidth, setLineWidth] = useState(5);
  const [lineColor, setLineColor] = useState("#000000");
  const [tool, setTool] = useState<ToolType>("pen");
  const isDrawing = useRef<boolean>(false);
  const [history, setHistory] = useState<LineType[][]>([[]]);
  const [historyStep, setHistoryStep] = useState(0);

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

  const handleChangePalette = (event: Konva.KonvaEventObject<MouseEvent>) => {
    if (tool !== "dropper") {
      return;
    }
    const stroke = String(event.target.getAttr("stroke"));
    setLineColor(stroke);
  };

  return (
    <Stack direction={{ xs: "column", md: "row" }} sx={{ justifyContent: "space-between", height: "95%" }}>
      <Grid sm={8} sx={{ borderRight: 1, height: "100%", justifyContent: "center", alignItems: "center" }} container>
        <Grid item>
          <Stage
            ref={stageRef}
            onMouseDown={handleMouseDown}
            onMousemove={handleMouseMove}
            onMouseup={handleMouseUp}
            width={1000}
            height={600}
            style={{ boxShadow: "10px 5px 5px gray", border: "1px solid" }}
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
        </Grid>
        <Grid sm={10} sx={{ border: 1 }} item>
          <Grid sx={{ justifyContent: "space-evenly", alignItems: "center" }} container>
            <Grid item>
              <Pen
                onClick={() => {
                  handleChangeToolType("pen");
                }}
              />
            </Grid>
            <Grid item>
              <Eraser
                onClick={() => {
                  handleChangeToolType("eraser");
                }}
              />
            </Grid>
            <Grid item>
              <Dropper
                onClick={() => {
                  handleChangeToolType("dropper");
                }}
              />
            </Grid>
            <Grid item>
              <LineWidth
                width={lineWidth}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLineWidth(+e.target.value)}
              />
            </Grid>

            <Grid item>
              <div>
                <ColorPalette
                  lineColor={lineColor}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLineColor(e.target.value)}
                />
              </div>
            </Grid>
            <Grid item>
              <div>
                <Undo onClick={handleUndo} />
                <Redo onClick={handleRedo} />
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid sm={3} sx={{ borderLeft: 1, justifyContent: "center", height: "100%" }} container>
        <Grid sm={12} sx={{ height: "100%" }} item>
          <Paper elevation={3} sx={{ bgcolor: "#FFFBD5", color: "#5D639E" }}>
            <h1>??????</h1>
          </Paper>

          <Grid sx={{ height: "90%", justifyContent: "start", px: "2rem" }} container>
            <Grid sm={8} sx={{ height: "90%" }} item>
              <Paper elevation={2} sx={{ borderRadius: "10%", height: "3rem" }}>
                <h3>answers</h3>
              </Paper>
            </Grid>
            <Grid sm={12} item>
              <Input style={{ color: "#5D639E" }} placeholder="答えは6文字" />
              <Fab color="secondary">
                <NavigationIcon />
              </Fab>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Canvas;
