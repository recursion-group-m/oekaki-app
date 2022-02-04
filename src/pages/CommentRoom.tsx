import Konva from "konva";
import React, { useRef, useState } from "react";

import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

import Canvas from "../components/Canvas";
import { LineType, ToolType } from "../types";
import theme from "../styles";

import RightContainer from "../components/RightContainer";

type stageType = Konva.Stage;

const CommentRoom = () => {
  const stageRef = useRef<stageType>(null);
  const [lines, setLines] = useState<LineType[]>([]);
  const [tool, setTool] = useState<ToolType>("pen"); // eslint-disable-line
  const [messageText, setMessageText] = useState<string>("");
  const [history, setHistory] = useState<LineType[][]>([[]]);
  const [historyStep, setHistoryStep] = useState(0);
  const [lineColor, setLineColor] = useState("#000000");
  const [lineWidth, setLineWidth] = useState(5); // eslint-disable-line

  const handleTextMessage = () => console.log(""); // eslint-disable-line

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        sx={{
          justifyContent: "space-between",
          height: { sx: "100%", sm: "100vh" },
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
          </Stack>
        </Grid>

        <RightContainer
          messageText={messageText}
          setMessageText={setMessageText}
          handleTextMessage={handleTextMessage}
        />
      </Stack>
    </div>
  );
};

export default CommentRoom;
