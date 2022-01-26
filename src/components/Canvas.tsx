import Konva from "konva";
import React, { useRef, useState } from "react";
import { Layer, Line, Stage } from "react-konva";
import shortid from "shortid";
// import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal';

import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import Paper from "@mui/material/Paper";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Box from "@mui/material/Box";

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
  const { stageRef, lines, setLines } = props;
  const [lineWidth, setLineWidth] = useState(5);
  const [lineColor, setLineColor] = useState("#000000");
  const [tool, setTool] = useState<ToolType>("pen");
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
    <Stack
      direction={{ xs: "column", sm: "row" }}
      sx={{ justifyContent: "space-between", height: "100%", bgcolor: theme.palette.background.default }}
    >
      <Grid sm={9} item>
        <Grid
          sx={{
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
          container
        >
          <Grid item>
            <Stage
              ref={stageRef}
              onMouseDown={handleMouseDown}
              onMousemove={handleMouseMove}
              onMouseup={handleMouseUp}
              width={stageWidth}
              height={stageHeight}
              style={{ boxShadow: "10px 5px 5px gray", border: "1px solid #f5f5f5", background: "white" }}
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
          <Grid sm={10} item>
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
      </Grid>

      <Grid sm={3} item>
        <Grid sx={{ justifyContent: "center", height: "100%" }} container>
          <Grid sm={12} sx={{ height: "100%" }} item>
            <Paper sx={{ bgcolor: theme.palette.background.default, color: "#5D639E" }}>
              <h1>??????</h1>
            </Paper>

            <Grid sx={{ height: "90%", justifyContent: "center", px: "2rem" }} container>
              <Grid sm={12} sx={{ height: "90%", overflow: "auto", bgcolor: "white" }} item>
                <Paper elevation={3} sx={{ height: "3rem" }}>
                  <h3>answers</h3>
                </Paper>
              </Grid>
              <Stack direction="row">
                <FormControl>
                  <InputLabel>ひらがな６文字</InputLabel>
                  <Input id="my-input" aria-describedby="my-helper-text" />
                  <FormHelperText id="my-helper-text">答えを投稿しましょう</FormHelperText>
                </FormControl>
                <Box sx={{ display: "flex", alignItems: "center", pl: "1rem" }}>
                  <Button
                    sx={{
                      bgcolor: theme.palette.secondary.main,
                      color: "white",
                      "&:hover": { color: theme.palette.secondary.dark },
                    }}
                    variant="outlined"
                    startIcon={<SendIcon />}
                  >
                    Send
                  </Button>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Canvas;
