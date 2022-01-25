import Konva from "konva";
import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { GetUserId } from "../api/users";
import AppBar from "../components/AppBar";
import Canvas from "../components/Canvas";
import { LineType } from "../types";

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

  // subは
  // const { user } = useAuth0;
  // で置換予定
  const sub = "test1111111111";
  useEffect(() => {
    const res = GetUserId(sub);
    // ToDo: 順番
    const roomId = uuidv4();
    const client = new W3CWebSocket(`${info.djangoWsUrl}/${roomId}`);
    client.onopen = () => {
      console.log("WebSocket Client Connected");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <AppBar />
      {/* <FileComboBox stageRef={stageRef} lines={lines} /> */}
      <Canvas stageRef={stageRef} lines={lines} setLines={setLines} />
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
