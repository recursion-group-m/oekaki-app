import Konva from "konva";
import React, { useEffect, useRef, useState } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import SendIcon from "@mui/icons-material/Send";

import PostRoomId from "../api/rooms";
import { GetUserId } from "../api/users";
import Canvas from "../components/Canvas";
import { DataTypeFromServer, LineType, MessageType, ToolType } from "../types";
import CommentLeft from "../components/CommentLeft";
import CommentRight from "../components/CommentRight";
import theme from "../styles";

import Pen from "../components/Pen";
import Eraser from "../components/Eraser";
import Dropper from "../components/Dropper";
import Undo from "../components/Undo";
import Redo from "../components/Redo";
import ColorPalette from "../components/ColorPalette";

type stageType = Konva.Stage;

const info = {
  djangoWsUrl: process.env.REACT_APP_DJANGO_WS_URL || "localhost",
};

const Main = () => {
  const stageRef = useRef<stageType>(null);
  const [lines, setLines] = useState<LineType[]>([]);
  const [tool, setTool] = useState<ToolType>("pen");
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [messageText, setMessageText] = useState<string>("");
  const [history, setHistory] = useState<LineType[][]>([[]]);
  const [historyStep, setHistoryStep] = useState(0);
  const [lineColor, setLineColor] = useState("#000000");
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

  const client = useRef<W3CWebSocket>();

  // subは
  // const { user } = useAuth0;
  // で置換予定
  const sub = "test1111111111";
  useEffect(() => {
    const openWebSocket = async () => {
      // eslint-disable-next-line no-console
      GetUserId(sub).catch((e) => console.log(e));
      const postResponse = await PostRoomId(sub);
      const roomId = postResponse.room_id;
      client.current = new W3CWebSocket(`${info.djangoWsUrl}/${roomId}`);
      client.current.onopen = () => {
        // eslint-disable-next-line no-console
        console.log("WebSocket Client Connected");
      };
      client.current.onmessage = (message) => {
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
    };
    // eslint-disable-next-line no-console
    openWebSocket().catch((e) => console.log(e));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTextMessage = () => {
    if (typeof client !== "undefined" && typeof client.current !== "undefined") {
      client.current.send(
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
          justifyContent: "space-between",
          height: { sx: "100%", sm: "100vh" },
          bgcolor: theme.palette.background.default,
        }}
      >
        <Canvas
          stageRef={stageRef}
          lines={lines}
          setLines={setLines}
          messageText={messageText}
          setMessageText={setMessageText}
          handleTextMessage={handleTextMessage}
          tool={tool}
          history={history}
          setHistory={setHistory}
          historyStep={historyStep}
          setHistoryStep={setHistoryStep}
          lineColor={lineColor}
          setLineColor={setLineColor}
        />
        {/* <ResumeModal
          confirmationState={confirmationState}
          setConfirmationState={setConfirmationState}
          onClick={onClick}
        />
      */}
        <Pen
          onClick={() => {
            handleChangeToolType("pen");
          }}
        />
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

        <Grid sm={3} sx={{ pt: 2 }} item>
          <Stack sx={{ height: "100%", px: 2, pr: { sm: 5 } }}>
            <Box>
              <Typography variant="h3" color={theme.palette.secondary.main}>
                ??????
              </Typography>
            </Box>
            <Box
              sx={{
                height: { xs: "300px", sm: "65%" },
                overflow: "scroll",
                bgcolor: "white",
                mt: "2rem",
                display: "flex",
                flexDirection: "column",
                p: "1rem",
                borderRadius: 5,
                boxShadow: 3,
              }}
            >
              <CommentLeft />
              <CommentLeft />
              <CommentLeft />
              <CommentLeft />
              <CommentRight />
            </Box>
            <Box sx={{ pt: 5, display: "flex", justifyContent: "center" }}>
              <Stack direction="row">
                <FormControl>
                  <InputLabel>ひらがな６文字</InputLabel>
                  <Input
                    id="my-input"
                    aria-describedby="my-helper-text"
                    value={messageText}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setMessageText(event.target.value)}
                  />
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
                    onClick={handleTextMessage}
                  >
                    Send
                  </Button>
                </Box>
              </Stack>
            </Box>
          </Stack>
        </Grid>
      </Stack>
    </div>
  );
};

export default Main;
