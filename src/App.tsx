import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Top from "./pages/Top";
import Main from "./pages/Main";

const App = () => (
  <div style={{ textAlign: "center", height: "100%" }}>
    <Link to="/">Top</Link> /<Link to="/main">Main</Link>
    <Routes>
      <Route path="/" element={<Top />} />
      <Route path="/main" element={<Main />} />
    </Routes>
  </div>
);

export default App;
