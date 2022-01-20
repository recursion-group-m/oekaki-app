import Konva from "konva";
import React, { useRef, useState } from "react";
import { Layer, Line, Stage } from "react-konva";
import shortid from "shortid";
// import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal';
import Undo from "./Undo";
import Redo from "./Redo";
import Pen from "./Pen";
import Eraser from "./Eraser";
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
    isDrawing.current = false;
    setLines(lines.slice(0, historyStep + 1));
    setHistory(history.slice(0, historyStep + 1).concat([lines.slice()]));
    setHistoryStep(historyStep + 1);
  };

  const handleChangeToolType = (type: ToolType) => setTool(type);

  const handleUndo = () => {
    if (historyStep === 0) return;

    setHistoryStep(historyStep - 1);
    setLines(history[historyStep - 1]);
  };

  const handleRedo = () => {
    if (historyStep === history.length - 1) return;

    setHistoryStep(historyStep + 1);
    setLines(history[historyStep + 1]);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: 1000, height: 800 }}>
      <div style={{ display: "flex", flexDirection: "column", width: "80%", height: "80%" }}>
        <div style={{ display: "flex", alignItems: "center", paddingBottom: "3rem" }}>
          <Undo onClick={handleUndo} />
          <Redo onClick={handleRedo} />
        </div>
        <div style={{ width: "90%", height: "80%" }}>
          <Stage
            ref={stageRef}
            onMouseDown={handleMouseDown}
            onMousemove={handleMouseMove}
            onMouseup={handleMouseUp}
            width={720}
            height={600}
            style={{ boxShadow: "10px 5px 5px gray" }}
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
                />
              ))}
            </Layer>
          </Stage>
        </div>
      </div>
      <Pen
        aria-label="pen"
        onClick={() => {
          handleChangeToolType("pen");
        }}
      />
      <Eraser
        aria-label="eraser"
        onClick={() => {
          handleChangeToolType("eraser");
        }}
      />
      <LineWidth
        width={lineWidth}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLineWidth(+e.target.value)}
      />
      <div>
        <ColorPalette
          lineColor={lineColor}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLineColor(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Canvas;
