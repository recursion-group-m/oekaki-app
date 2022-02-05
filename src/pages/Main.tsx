import Konva from "konva";
import React, { useEffect, useRef, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import Canvas from "../components/Canvas";
import { LineType, ToolType } from "../types";
import theme from "../styles";
import CompleteButton from "../components/CompleteButton";

import ToolsContainer from "../components/ToolsContainer";
import { GetUserId } from "../api/users";
import Config from "../configs";
import LogoutButton from "../components/LogoutButton";

type stageType = Konva.Stage;

const Main = () => {
  const stageRef = useRef<stageType>(null);
  const [lines, setLines] = useState<LineType[]>([]);
  const [tool, setTool] = useState<ToolType>("pen");
  const [history, setHistory] = useState<LineType[][]>([[]]);
  const [historyStep, setHistoryStep] = useState(0);
  const [lineColor, setLineColor] = useState("#000000");
  const [lineWidth, setLineWidth] = useState(5);
  const url = `${Config.reactUrl}/comment-room`;
  const { user } = useAuth0();

  useEffect(() => {
    if (user !== undefined && user.sub !== undefined) {
      const userName = user.nickname || user.given_name || user.family_name || "名無しさん";
      // eslint-disable-next-line no-console
      GetUserId(user.sub, userName).catch((e) => console.log(e));
    }
  }, [user]);

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
          minHeight: "100vh",
          bgcolor: theme.palette.background.default,
        }}
      >
        <Grid sm={9} sx={{ pt: "3rem" }} item>
          <LogoutButton />
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
            <Stack
              direction={{ xs: "column", md: "row" }}
              sx={{ width: "75%", alignItems: "center", justifyContent: "space-between" }}
            >
              <ToolsContainer
                handleChangeToolType={handleChangeToolType}
                lineColor={lineColor}
                setLineColor={setLineColor}
                handleUndo={handleUndo}
                handleRedo={handleRedo}
                lineWidth={lineWidth}
                setLineWidth={setLineWidth}
              />
              <Box py={{ xs: 3 }}>
                <CompleteButton url={url} stageRef={stageRef} />
              </Box>
            </Stack>
          </Stack>
        </Grid>
      </Stack>
    </div>
  );
};

export default Main;
