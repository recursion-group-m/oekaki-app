import Konva from "konva";
import React, { useEffect, useRef, useState } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";

import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

import Canvas from "../components/Canvas";
import { DataTypeFromServer, LineType, MessageType, ToolType } from "../types";
import theme from "../styles";

import RightContainer from "../components/RightContainer";
import ToolsContainer from "../components/ToolsContainer";

type stageType = Konva.Stage;

type Props = {
  client: W3CWebSocket | undefined;
};

const Main: React.VFC<Props> = (props) => {
  const { client } = props;
  const stageRef = useRef<stageType>(null);
  const [lines, setLines] = useState<LineType[]>([]);
  const [tool, setTool] = useState<ToolType>("pen");
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [messageText, setMessageText] = useState<string>("");
  const [history, setHistory] = useState<LineType[][]>([[]]);
  const [historyStep, setHistoryStep] = useState(0);
  const [lineColor, setLineColor] = useState("#000000");
  const [lineWidth, setLineWidth] = useState(5);

  // const [confirmationState, setConfirmationState] = useState<boolean>(false);
  // const [savedJsonStringData, setSavedJsonStringData] = useState<string>("");
  // useEffect(() => {
  //   const savedData = localStorage.getItem("Oekaki App");
  //   if (savedData !== null) {
  //     setSavedJsonStringData(savedData);
  //     setConfirmationState(true);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  // const onClick = () => {
  //   setLines(JSON.parse(savedJsonStringData) as LineType[]);
  //   setConfirmationState(false);
  // };

  // subは
  // const { user } = useAuth0;
  // で置換予定
  const sub = "test1111111111";

  useEffect(() => {
    if (client !== undefined) {
      client.onopen = () => {
        // eslint-disable-next-line no-console
        console.log("WebSocket Client Connected");
      };
      client.onmessage = (message) => {
        if (typeof message.data === "string") {
          const dataFromServer = JSON.parse(message.data) as DataTypeFromServer;
          // eslint-disable-next-line no-console
          console.log(`Got Reply! ${dataFromServer.type}`);
          if (dataFromServer) {
            setMessages((prev) => [
              ...prev,
              {
                text: dataFromServer.message,
                name: dataFromServer.user,
              },
            ]);
          }
        }
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTextMessage = () => {
    if (client !== undefined) {
      client.send(
        JSON.stringify({
          type: "message",
          message: messageText,
          user: sub,
        })
      );
    }
    setMessageText("");
  };

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(messages);
  }, [messages]);

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
      {/* <FileComboBox stageRef={stageRef} lines={lines} /> */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        sx={{
          justifyContent: "center",
          height: { sx: "100%", sm: "100vh" },
          bgcolor: theme.palette.background.default,
        }}
      >
        {/* <ResumeModal
          confirmationState={confirmationState}
          setConfirmationState={setConfirmationState}
          onClick={onClick}
        />
      */}
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

        {/* <RightContainer
          messageText={messageText}
          setMessageText={setMessageText}
          handleTextMessage={handleTextMessage}
          messages={messages}
        /> */}
      </Stack>
    </div>
  );
};

export default Main;
