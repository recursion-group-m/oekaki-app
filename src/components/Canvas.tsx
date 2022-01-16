import Konva from "konva";
import React, { useRef, useState } from "react";
import { Layer, Line, Stage } from "react-konva";
import shortid from "shortid";

import IconButton from "@mui/material/IconButton";
import BrushIcon from "@mui/icons-material/Brush";
// import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal';
import Eraser from "./Eraser";

type toolType = "pen" | "eraser";

type lineType = {
  tool: toolType;
  points: number[];
};

type Props = {
  stageRef: React.RefObject<Konva.Stage>;
};

const Canvas: React.VFC<Props> = (props) => {
  const { stageRef } = props;
  const [tool, setTool] = useState<toolType>("pen");
  const [lines, setLines] = useState<lineType[]>([]);
  const [lineWidth, setLineWidth] = useState(5);
  const isDrawing = useRef<boolean>(false);

  const handleMouseDown = (event: Konva.KonvaEventObject<MouseEvent>) => {
    isDrawing.current = true;
    const stage = event.target.getStage();
    const point = stage?.getPointerPosition();
    if (point !== null && point !== undefined) {
      setLines([...lines, { tool, points: [point.x, point.y] }]);
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
  };

  const handleChangeToolType = (type: toolType) => {
    setTool(type);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: 1000, height: 800 }}>
      <div style={{ display: "flex", flexDirection: "column", width: "80%", height: "80%" }}>
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
                  stroke="#df4b26"
                  strokeWidth={lineWidth}
                  tension={0.5}
                  lineCap="round"
                  globalCompositeOperation={line.tool === "eraser" ? "destination-out" : "source-over"}
                />
              ))}
            </Layer>
          </Stage>
        </div>
      </div>
      <IconButton aria-label="pen" onClick={() => handleChangeToolType("pen")}>
        <BrushIcon />
      </IconButton>
      <Eraser
        aria-label="eraser"
        onClick={() => {
          handleChangeToolType("eraser");
        }}
      />
      <div>
        <input 
            type="range" min="1" max="50" step="1" value={lineWidth}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const width = e.target.value;
                setLineWidth(Number(width));
            }}
        />
      </div>
    </div>
  );
};

export default Canvas;
