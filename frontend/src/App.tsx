import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Game from "./Game";
import UserInfo from "./UserInfo"
import Errors from "./Errors"
import { StateProvider } from "./StateProvider";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="content">
        <StateProvider>
          <h1>Tic Tac Toe</h1>
          <Errors />
          <UserInfo />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/game/:id" element={<Game />} />
          </Routes>
        </StateProvider>
      </div>
    </div>
  );
}

export default App;
