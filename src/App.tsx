import React from "react";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Main from "./pages/Main";

const App = () => (
  <div className="App">
    <Link to="/login">Login</Link> /<Link to="/main">Main</Link>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/main" element={<Main />} />
    </Routes>
  </div>
);

export default App;
