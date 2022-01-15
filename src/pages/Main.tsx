import React from "react";
import AppBar from "../components/AppBar";
import Canvas from "../components/Canvas";

const Main = () => (
  <div style={{ width: "100%", height: "100%" }}>
    <AppBar />
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: 1000, height: 800 }}>
      <div style={{ display: "flex", flexDirection: "column", width: "80%", height: "80%" }}>
        <div style={{ width: "90%", height: "80%" }}>
          <Canvas />
        </div>
      </div>
    </div>
  </div>
);

export default Main;
