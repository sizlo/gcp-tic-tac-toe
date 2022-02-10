import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Game from "./Game";
import { StateProvider } from "./StateProvider";
import "./App.css";

function App() {
  return (
    <div className="App">
      <StateProvider>
        <h1>Tic Tac Toe</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </StateProvider>
    </div>
  );
}

export default App;
