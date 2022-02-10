import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { API } from "./api"
import { StateContext } from "./StateContext";
import { getOpponent, isPlayersTurn } from "./gameUtils";
import { IGame, IUser } from "./types";

function renderListOfGames(games: Array<IGame>, user: IUser) {
  if (games.length > 0) {
    return games.map((game) => renderGame(game, user));
  } else {
    return <div>None</div>
  }
}

function renderGame(game: IGame, user: IUser) {
  return (
    <div key={game.id}>
      <Link to={`/game/${game.id}`}>Opponent: {getOpponent(game, user.email)}</Link>
    </div>
  );
}

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
    const gamesOnYourTurn = state.gameList.filter((game) => isPlayersTurn(game, state.user!.email))
    const gamesOnOpponentsTurn = state.gameList.filter((game) => !isPlayersTurn(game, state.user!.email))

    content = (
      <React.Fragment>
        <div className="header">Active games</div>
        <div className="subheader">Your turn</div>
        {renderListOfGames(gamesOnYourTurn, state.user!)}
        <div className="subheader">Opponents turn</div>
        {renderListOfGames(gamesOnOpponentsTurn, state.user!)}
      </React.Fragment>
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