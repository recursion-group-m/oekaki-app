import Konva from "konva";
import React, { useRef, useState } from "react";
import Canvas from "../components/Canvas";
import { LineType } from "../types";

type stageType = Konva.Stage;

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

  return (
    <div style={{ width: "100%", height: "100%" }}>
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
