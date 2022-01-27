import Konva from "konva";
import React, { useEffect, useRef, useState } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import PostRoomId from "../api/rooms";
import { GetUserId } from "../api/users";
import Canvas from "../components/Canvas";
import { DataTypeFromServer, LineType, MessageType } from "../types";

type stageType = Konva.Stage;

const info = {
  djangoWsUrl: process.env.REACT_APP_DJANGO_WS_URL || "localhost",
};

const Main = () => {
  const stageRef = useRef<stageType>(null);
  const [lines, setLines] = useState<LineType[]>([]);
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
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [messageText, setMessageText] = useState<string>("");
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

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {/* <FileComboBox stageRef={stageRef} lines={lines} /> */}
      <Canvas
        stageRef={stageRef}
        lines={lines}
        setLines={setLines}
        messageText={messageText}
        setMessageText={setMessageText}
        handleTextMessage={handleTextMessage}
      />
      {/* <ResumeModal
          confirmationState={confirmationState}
          setConfirmationState={setConfirmationState}
          onClick={onClick}
        />
      */}
    </div>
  );
};

export default Main;
