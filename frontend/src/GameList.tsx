import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { API } from "./api"
import { StateContext } from "./StateContext";
import { getOpponent, isPlayersTurn } from "./gameUtils";

function GameList() {
  const { state, dispatch } = React.useContext(StateContext);

  useEffect(() => {
    API.getGameList(
      (gameList) => {
        dispatch({ type: "setGameList", value: gameList });
      },
      (error) => {
        dispatch({
          type: "addError",
          value: `Error fetching gamelist: ${error}`
        });
      }
    )
  }, [])

  let content = null;

  if (state.gameList && state.user) {
    content = state.gameList.map((game) => 
      <div key={game.id}>
        <Link to="/game">
          <span>Opponent: {getOpponent(game, state.user!.email)}</span>
          <span>{isPlayersTurn(game, state.user!.email) ? "Your turn" : "Oponnents turn"}</span>
        </Link>
      </div>
    );
  } else {
    content = <div>Loading...</div>;
  }

  return (
    <div className="GameList">
      {content}
    </div>
  );
}

export default GameList;