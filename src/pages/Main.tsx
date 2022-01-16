import Konva from "konva";
import React, { useRef, useState } from "react";
import AppBar from "../components/AppBar";
import Canvas from "../components/Canvas";
import FileComboBox from "../components/FileComboBox";
import { LineType } from "../types";

type stageType = Konva.Stage;

const Main = () => {
  const stageRef = useRef<stageType>(null);
  const [lines, setLines] = useState<LineType[]>([]);
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <AppBar />
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: 1000, height: 800 }}>
        <div style={{ display: "flex", flexDirection: "column", width: "80%", height: "80%" }}>
          <FileComboBox stageRef={stageRef} lines={lines} />
          <div style={{ width: "90%", height: "80%" }}>
            <Canvas stageRef={stageRef} lines={lines} setLines={setLines} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
