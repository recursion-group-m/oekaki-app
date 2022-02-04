import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import Top from "./pages/Top";
import Lobby from "./pages/Lobby";
import Main from "./pages/Main";
import CommentRoom from "./pages/CommentRoom";

const App = () => {
  const [client, setClient] = useState<W3CWebSocket>();
  return (
    <div style={{ textAlign: "center", height: "100%" }}>
      <Routes>
        <Route path="/" element={<Top />} />
        <Route path="/lobby" element={<Lobby client={client} setClient={setClient} />} />
        <Route path="/main" element={<Main client={client} />} />
        <Route path="/commentroom" element={<CommentRoom client={client} />} />
      </Routes>
    </div>
  );
};
export default App;
