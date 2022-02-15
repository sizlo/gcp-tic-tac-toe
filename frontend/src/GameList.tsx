import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { API } from "./api"
import { StateContext } from "./StateContext";
import { getOpponent, isPlayersTurn, playerWonGame, playerLostGame, playerDrewGame } from "./gameUtils";
import { IGame, IUser } from "./types";

function renderActiveGames(activeGames: Array<IGame>, user: IUser) {
  if (activeGames.length === 0) {
    return <React.Fragment />
  }

  const gamesOnYourTurn = activeGames.filter((game) => isPlayersTurn(game, user.email));
  const gamesOnOpponentsTurn = activeGames.filter((game) => !isPlayersTurn(game, user.email));

  return (
    <React.Fragment>
      <div className="header">Active games</div>
      {renderListOfGames("Your turn", gamesOnYourTurn, user)}
      {renderListOfGames("Opponents turn", gamesOnOpponentsTurn, user)}
    </React.Fragment>
  );
}

function renderCompletedGames(completedGames: Array<IGame>, user: IUser) {
  if (completedGames.length === 0) {
    return <React.Fragment />
  }

  const drawnGames = completedGames.filter((game) => playerDrewGame(game, user.email));
  const wonGames = completedGames.filter((game) => playerWonGame(game, user.email));
  const lostGames = completedGames.filter((game) => playerLostGame(game, user.email));

  return (
    <React.Fragment>
      <div className="header">Completed games</div>
      {renderListOfGames("You won", wonGames, user)}
      {renderListOfGames("You lost", lostGames, user)}
      {renderListOfGames("You drew", drawnGames, user)}
      <div className="note">Completed games are deleted daily at midnight UTC</div>
    </React.Fragment>
  );
}

function renderListOfGames(subheading: string, games: Array<IGame>, user: IUser) {
  if (games.length === 0) {
    return <React.Fragment />
  }

  return (
    <React.Fragment>
      <div className="subheader">{subheading}</div>
      {games.map((game) => renderGame(game, user))}
    </React.Fragment>
  );
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
    const activeGames = state.gameList.filter((game) => game.status === "IN_PROGRESS");
    const completedGames = state.gameList.filter((game) => game.status !== "IN_PROGRESS");

    content = (
      <React.Fragment>
        {renderActiveGames(activeGames, state.user!)}
        {renderCompletedGames(completedGames, state.user!)}
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