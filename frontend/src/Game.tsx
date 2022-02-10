import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { StateContext } from "./StateContext";
import { API } from "./api";

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

  if (state.activeGame) {
    content = (
      <React.Fragment>
        <div>Game {state.activeGame.id}</div>
        <div>{state.activeGame.board}</div>
        <div>{state.activeGame.nextPlayer}</div>
        <div>{state.activeGame.players["X"]}</div>
        <div>{state.activeGame.players["Y"]}</div>
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