import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Game from "./Game";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </div>
  );
}

export default App;
