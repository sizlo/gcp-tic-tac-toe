import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { StateContext } from "./StateContext";
import { API } from "./api";
import { getOpponent, getPlayerSymbol, isPlayersTurn, playerWonGame, playerLostGame, playerDrewGame } from "./gameUtils";
import Board from "./Board";
import MoveSubmit from "./MoveSubmit";
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
    const symbolInfo = (
      <div>
        <span className="label">Your symbol:</span>
        <span>{getPlayerSymbol(state.activeGame, state.user!.email)}</span>
      </div>
    );

    const opponentInfo = (
     <div>
       <span className="label">Opponent:</span>
       <span>{getOpponent(state.activeGame, state.user!.email)}</span>
     </div>
    );

    const turnInfo = (
     <div>
       <span className="label">{isPlayersTurn(state.activeGame, state.user!.email) ? "Your turn" : "Opponents turn"}</span>
     </div>
    );

    const gameResult = (
      <div className="header">
        {playerWonGame(state.activeGame!, state.user!.email) ? "You won!" : ""}
        {playerLostGame(state.activeGame!, state.user!.email) ? "You lost!" : ""}
        {playerDrewGame(state.activeGame!, state.user!.email) ? "You drew!" : ""}
      </div>
    )

    content = (
      <React.Fragment>
        {symbolInfo}
        {opponentInfo}
        {state.activeGame!.status === "IN_PROGRESS" ? turnInfo : null}
        <Board />
        <MoveSubmit />
        {gameResult}
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