import React from "react";
import { Routes, Route } from "react-router-dom";
import Top from "./pages/Top";
import Main from "./pages/Main";
import CommentRoom from "./pages/CommentRoom";

const App = () => (
  <div style={{ textAlign: "center", height: "100%" }}>
    <Routes>
      <Route path="/" element={<Top />} />
      <Route path="/main" element={<Main />} />
      <Route path="/comment-room/:imageId" element={<CommentRoom />} />
    </Routes>
  </div>
);
export default App;
