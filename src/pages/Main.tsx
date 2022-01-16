import Konva from "konva";
import React, { useRef } from "react";
import AppBar from "../components/AppBar";
import Canvas from "../components/Canvas";
import FileComboBox from "../components/FileComboBox";

type stageType = Konva.Stage;

const Main = () => {
  const stageRef = useRef<stageType>(null);
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <AppBar />
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: 1000, height: 800 }}>
        <div style={{ display: "flex", flexDirection: "column", width: "80%", height: "80%" }}>
          <FileComboBox stageRef={stageRef} />
          <div style={{ width: "90%", height: "80%" }}>
            <Canvas stageRef={stageRef} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
