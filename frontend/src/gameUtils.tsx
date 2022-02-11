import { IGame } from "./types";

export function getOpponent(game: IGame, currentPlayer: string): string {
  const currentPlayerSymbol = getPlayerSymbol(game, currentPlayer);
  const opponentsSymbol = oppositeSymbol(currentPlayerSymbol);
  return game.players[opponentsSymbol];
}

export function getPlayerSymbol(game: IGame, player: string): string {
    if (game.players["X"] === player) return "X";
    if (game.players["O"] === player) return "O";
    throw Error(`Could not determine symbol for player: ${player}`)
}

function oppositeSymbol(symbol: String): string {
    return symbol === "X" ? "O" : "X";
}

export function isPlayersTurn(game: IGame, player: string): boolean {
    return getPlayerSymbol(game, player) === game.nextPlayer
}

export function playerWonGame(game: IGame, player: string): boolean {
    return game.status === "WON" && game.winner === player;
}

export function playerLostGame(game: IGame, player: string): boolean {
    return game.status === "WON" && game.winner !== player;
}

export function playerDrewGame(game: IGame, player: string): boolean {
    return game.status === "DRAWN";
}
