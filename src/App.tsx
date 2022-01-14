import React from "react";
import "./App.css";
import AppBar from "./components/AppBar";
import Canvas from "./components/Canvas";

const App = () => (
  <div style={{ width: "100%", height: "100%" }}>
    <AppBar />
    <Canvas />
  </div>
);

export default App;
