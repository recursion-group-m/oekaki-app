import Konva from "konva";
import React, { useRef, useState } from "react";
import { Layer, Line, Stage } from "react-konva";
import shortid from "shortid";
// import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal';

import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
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
      sx={{ justifyContent: "space-between", minHeight: "100%", bgcolor: theme.palette.background.default }}
    >
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
          </Box>
          <Box sx={{ pt: 5, width: "70%" }}>
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
              <Box sx={{ width: "30%" }}>
                <LineWidth
                  width={lineWidth}
                  onChange={(event: Event, value: number | number[], activeThumb: number) => {
                    const currValue = (event.target as HTMLInputElement).value;
                    setLineWidth(Number(currValue));
                  }}
                />
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Grid>

      <Grid sm={3} sx={{ minHeight: "100%", pt: 2 }} item>
        <Stack sx={{ height: "100%", px: 2, pr: { sm: 5 } }}>
          <Box>
            <Typography variant="h2" color={theme.palette.secondary.main}>
              ??????
            </Typography>
          </Box>
          <Box
            sx={{
              height: "70%",
              overflow: "auto",
              bgcolor: "white",
              mt: "2rem",
              display: "flex",
              p: "1rem",
              borderRadius: "2%",
            }}
          >
            <Box>
              <Card sx={{ border: 1, borderColor: theme.palette.secondary.main }}>
                <CardContent>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    koky
                  </Typography>
                  <Typography variant="h5" component="div">
                    answer
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Box>
          <Box sx={{ pt: 5, display: "flex", justifyContent: "center" }}>
            <Stack direction="row">
              <FormControl>
                <InputLabel>ひらがな６文字</InputLabel>
                <Input id="my-input" aria-describedby="my-helper-text" />
                <FormHelperText id="my-helper-text">答えを投稿しましょう</FormHelperText>
              </FormControl>
              <Box sx={{ display: "flex", alignItems: "center", pl: 1 }}>
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
          </Box>
        </Stack>
      </Grid>
    </Stack>
  );
};

export default Canvas;
