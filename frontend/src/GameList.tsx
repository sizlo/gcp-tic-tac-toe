import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { IGame } from "./types";
import { API } from "./api"

function GameList() {
  const [error, setError] = useState<Error | undefined>(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  const [games, setGames] = useState<Array<IGame>>([]);

  useEffect(() => {
    API.getGameList(
      (games => {
        setIsLoaded(true);
        setGames(games);
      }),
      (error) => {
        setIsLoaded(true);
        setError(error);
      }
    )
  }, [])

  let content = null;


  if (error) {
    content = <div>Error loading games list: {error.message}</div>;
  } else if (!isLoaded) {
    content = <div>Loading...</div>;
  } else {
    const listItems = games.map((game) => 
      <li key={game.id}>
        <Link to="/game">{game.id}</Link>
      </li>
    );
    content = <ul className="GameList">{listItems}</ul>;
  }

  return (
    <div className="GameList">
      {content}
    </div>
  );
}

export default GameList;