import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { StateContext } from "./StateContext";
import { API } from "./api";
import { getOpponent, getPlayerSymbol, isPlayersTurn } from "./gameUtils";
import Board from "./Board";
import "./Game.css";

function Game() {
  const params = useParams();
  const { state, dispatch } = React.useContext(StateContext);

  const id = parseInt(params.id!);

  useEffect(() => {
    API.getGame(
      id,
      (game) => {
        dispatch({ type: "setActiveGame", value: game });
      },
      (error) => {
        dispatch({
          type: "addError",
          value: `Error fetching game: ${error}`
        });
      }
    )
  }, [])

  let content = null;

  if (state.activeGame && state.user) {
    content = (
      <React.Fragment>
        <div>
          <span className="label">Your symbol:</span>
          <span>{getPlayerSymbol(state.activeGame, state.user!.email)}</span>
        </div>
        <div>
          <span className="label">Opponent:</span>
          <span>{getOpponent(state.activeGame, state.user!.email)}</span>
        </div>
        <div>
          <span className="label">{isPlayersTurn(state.activeGame, state.user!.email) ? "Your turn" : "Opponents turn"}</span>
        </div>
        <Board />
      </React.Fragment>
    )
  } else {
    content = <div>Loading...</div>
  }

  return (
    <div className="Game">
      {content}
    </div>
  );
}

export default Game;